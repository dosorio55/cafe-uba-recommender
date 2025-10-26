"use client";

import React from "react";
import SearchHero from "./search-hero";
import ProductsList from "./products-list";
import { CoffeeCategoryScores, CoffeeProduct } from "../core/product.models";
import { useState, useEffect } from "react";
import { CoffeeCategory } from "@/global/agents/barista-agent/barista-agent";

const totals: CoffeeCategoryScores = {
  process: 8,
  variety: 8,
  flavor_tags: 6,
  body: 4,
  acidity: 4,
  mood_tags: 3,
  expected_flavor: 6,
  notes: 10,
};

const SearchProductsContext = () => {
  const [products, setProducts] = useState<CoffeeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [original, setOriginal] = useState<CoffeeProduct[]>([]);
  const [searchedWithAI, setsearchedWithAI] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // how do we add a query param to the fetch request?
        const res = await fetch("/api/scrape?limit=100", { cache: "no-store" });
        const data = await res.json();

        handleSetProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSetProducts = (inProducts: CoffeeProduct[]) => {
    setProducts(inProducts);
    setOriginal(inProducts);
  };

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9\s.-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const expandAliases = (values: string[], category: keyof CoffeeCategory) => {
    const out = new Set<string>();

    for (const v of values) {
      const n = normalize(v);

      out.add(n);

      if (category === "process") {
        if (n.includes("washing")) out.add("washed");
        if (n.includes("natural")) out.add("natural");
        if (n.includes("honey")) out.add("honey");
        if (n.includes("nitro")) out.add("nitro");
        if (n.includes("culturing")) out.add("culturing");
        if (n.includes("descafeinado")) {
          out.add("descafeinado");
          out.add("decaf");
        }
      }

      if (category === "variety") {
        if (n.includes("bourbon")) out.add("bourbon");
        if (n.includes("gesha")) out.add("gesha");
        if (n.includes("caturra")) out.add("caturra");
        if (n.includes("castle") || n.includes("castillo")) {
          out.add("castillo");
          out.add("castle");
        }
        if (n.includes("sudan rume") || n.includes("sudan rume"))
          out.add("sudan rume");
      }
    }

    return Array.from(out);
  };

  const scoreProductsByCategories = (
    selectedCategories: CoffeeCategory,
    items: CoffeeProduct[]
  ): CoffeeProduct[] => {
    const perMatch: Partial<Record<keyof CoffeeCategoryScores, number>> = {};

    (Object.keys(totals) as Array<keyof CoffeeCategoryScores>).forEach((k) => {
      const arr = Array.isArray(selectedCategories[k])
        ? (selectedCategories[k] as string[])
        : [];

      const count = arr.length || 1;
      perMatch[k] = totals[k] / count;
    });

    const makeTerms = (k: keyof CoffeeCategoryScores) => {
      const values = (selectedCategories[k] as string[]) || [];
      return expandAliases(values, k);
    };

    const termMap: Partial<Record<keyof CoffeeCategoryScores, string[]>> = {
      process: makeTerms("process"),
      variety: makeTerms("variety"),
      flavor_tags: makeTerms("flavor_tags"),
      body: makeTerms("body"),
      acidity: makeTerms("acidity"),
      mood_tags: makeTerms("mood_tags"),
      expected_flavor: makeTerms("expected_flavor"),
      notes: makeTerms("notes"),
    };

    const scored = items
      .map((coffee) => {
        const hay = normalize([coffee.name].filter(Boolean).join(" "));
        let score = 0;

        (Object.keys(termMap) as Array<keyof CoffeeCategoryScores>).forEach(
          (category) => {
            const terms = termMap[category] || [];

            if (!terms.length) return;

            const matches = new Set<string>();

            for (const term of terms) {
              if (term && hay.includes(term)) matches.add(term);
            }

            if (matches.size) score += (perMatch[category] || 0) * matches.size;
          }
        );
        return { coffee, score };
      })
      .slice(0, 5);

    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.coffee);
  };

  const handleFilterProductsBySelectedAICategories = (
    selectedCategories: CoffeeCategory
  ) => {
    if (!original.length) return;
    const sorted = scoreProductsByCategories(selectedCategories, original);
    setProducts(sorted);
    setsearchedWithAI(true);
  };

  return (
    <div className="container mx-auto px-6 sm:px-10">
      <SearchHero
        onSelectCategories={handleFilterProductsBySelectedAICategories}
      />
      {searchedWithAI ? (
        <ProductsList products={products} loading={loading} />
      ) : null}
    </div>
  );
};

export default SearchProductsContext;
