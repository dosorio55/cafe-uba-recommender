"use server";

import {
  getChromiumArgs,
  getChromiumExecutablePath,
} from "./chromium-singleton";
import puppeteer from "puppeteer-core";
import { ScrapedProduct } from "./product.models";

export async function scrapeCafeUbaCollection(
  collectionUrl: string = "https://www.cafeuba.com.co/en/collections/all"
): Promise<ScrapedProduct[]> {
  const launchOptions: Parameters<typeof puppeteer.launch>[0] = {
    headless: true,
    args: getChromiumArgs(),
    executablePath: await getChromiumExecutablePath(),
  };

  const browser = await puppeteer.launch(launchOptions);
  try {
    const page = await browser.newPage();

    await page.goto(collectionUrl, {
      waitUntil: "networkidle2",
      timeout: 120000,
    });
    await page.waitForSelector("#product-grid", { timeout: 120000 });

    let prevCount = 0;
    for (let i = 0; i < 50; i++) {
      const count = await page.evaluate(() => {
        const items = document.querySelectorAll("#product-grid li.grid__item");
        const last = items[items.length - 1];
        if (last && typeof last.scrollIntoView === "function")
          last.scrollIntoView();
        return items.length;
      });

      await page.evaluate(() => new Promise((r) => setTimeout(r, 800)));
      const after = await page.evaluate(
        () => document.querySelectorAll("#product-grid li.grid__item").length
      );

      if (after <= prevCount || after <= count) break;
      prevCount = after;
    }

    const origin = new URL(collectionUrl).origin;

    const data = await page.evaluate((originIn) => {
      const out: ScrapedProduct[] = [];
      const grid = document.querySelector("#product-grid");

      if (!grid) return out;

      const items = grid.querySelectorAll("li.grid__item");

      items.forEach((li) => {
        const linkEl = li.querySelector<HTMLAnchorElement>("a.card__media");
        const rawHref = linkEl?.getAttribute("href") || undefined;
        const url = rawHref ? new URL(rawHref, originIn).toString() : undefined;

        const nameEl = li.querySelector<HTMLElement>(".card-information__text");
        const name = nameEl?.textContent?.trim() || undefined;

        const imgEls = Array.from(
          li.querySelectorAll<HTMLImageElement>(".card__media img")
        );
        const images = Array.from(
          new Set(
            imgEls
              .map((img) => img.getAttribute("src") || "")
              .filter((s) => !!s)
              .map((s) => (s.startsWith("//") ? `https:${s}` : s))
          )
        );

        const regularEl = li.querySelector(
          ".price .price__regular .price-item.price-item--regular"
        );
        const saleEl = li.querySelector(
          ".price .price__sale .price-item.price-item--sale"
        );

        const textOf = (el: Element | null) =>
          el ? el.textContent?.replace(/\s+/g, " ").trim() : undefined;
        const price = { regular: textOf(regularEl), sale: textOf(saleEl) };

        out.push({ name, url, images, price });
      });

      return out;
    }, origin);

    return data;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    await browser.close();
  }
}
