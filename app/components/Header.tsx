"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="header-wrapper header-wrapper--border-bottom header-wrapper--uppercase border-b border-border uppercase text-[12px] tracking-[0.06rem]">
      <header className="header page-width header-section--padding flex items-center justify-between py-3 px-4 md:px-8">
        <div className="header__left flex items-center gap-2">
          <button
            aria-label="Menu"
            className="header__icon header__icon--menu focus-inset p-2 md:hidden"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              className="icon icon-hamburger"
              fill="none"
              viewBox="0 0 32 32"
              width="24"
              height="24"
            >
              <path
                d="M0 26.667h32M0 16h26.98M0 5.333h32"
                stroke="currentColor"
              />
            </svg>
          </button>
        </div>

        <h1 className="header__heading m-0">
          <Link
            href="/"
            className="header__heading-link focus-inset inline-flex items-center"
          >
            <img
              src="https://www.cafeuba.com.co/cdn/shop/files/Cafe_Uba_Logo_2024_pink.png"
              alt="Cafe Uba"
              width={120}
              height={120}
              className="block"
            />
          </Link>
        </h1>

        <nav className="header__inline-menu small-hide hidden md:block">
          <ul
            className="list-menu list-menu--inline flex items-center gap-6"
            role="list"
          >
            <li>
              <Link
                href="/"
                className="header__menu-item header__menu-item--top list-menu__item focus-inset text-foreground hover:opacity-80"
              >
                <span className="label">START</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="header__menu-item header__menu-item--top list-menu__item focus-inset text-foreground hover:opacity-80"
              >
                <span className="label">US</span>
              </Link>
            </li>
            <li>
              <Link
                href="/collections"
                className="header__menu-item header__menu-item--top list-menu__item focus-inset text-foreground hover:opacity-80"
              >
                <span className="label">STORE</span>
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/573105974290?text=Hola%20Caf%C3%A9%20Uba%2C%20estoy%20antojado%20del%20mejor%20caf%C3%A9"
                className="header__menu-item header__menu-item--top list-menu__item focus-inset text-foreground hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="label">CONTACT US</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="header__right flex items-center gap-3">
          <button
            aria-label="Account"
            className="header__icon header__icon--account focus-inset hidden md:inline-flex p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              className="icon icon-account"
              fill="none"
              viewBox="0 0 14 18"
              width="18"
              height="18"
            >
              <path
                d="M7.345 10.093c-3.314 0-6.001 2.518-6.001 5.624 0 .776.629 1.405 1.406 1.405h9.188c.776 0 1.405-.629 1.405-1.405 0-3.106-2.686-5.624-6-5.624Z"
                stroke="currentColor"
              />
              <ellipse
                cx="7.345"
                cy="5.026"
                rx="3.636"
                ry="3.513"
                stroke="currentColor"
                strokeLinecap="square"
              />
            </svg>
          </button>
          <button
            aria-label="Cart"
            className="header__icon header__icon--cart focus-inset p-2"
          >
            <svg
              className="icon icon-cart"
              aria-hidden="true"
              focusable="false"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2M7.17 14l.94-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49L19.42 2 16 8H8.53l-.31-.65L6.16 4H2v2h3l3.6 7.59L7.24 17H19v-2z"
              />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="menu-drawer motion-reduce absolute top-0 left-0 h-full w-80 max-w-[85%] bg-background text-foreground shadow-xl p-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm">Menu</span>
              <button
                className="header__icon header__icon--menu p-2"
                onClick={() => setOpen(false)}
              >
                <svg
                  className="icon icon-close"
                  aria-hidden="true"
                  focusable="false"
                  width="20"
                  height="20"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M1 1L11 11"
                    stroke="currentColor"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M11 1L1 11"
                    stroke="currentColor"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
            <nav className="menu-drawer__navigation">
              <ul
                className="menu-drawer__menu list-menu flex flex-col gap-4"
                role="list"
              >
                <li>
                  <Link
                    href="/"
                    className="menu-drawer__menu-item list-menu__item focus-inset"
                  >
                    START
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="menu-drawer__menu-item list-menu__item focus-inset"
                  >
                    US
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections/all"
                    className="menu-drawer__menu-item list-menu__item focus-inset"
                  >
                    STORE
                  </Link>
                </li>
                <li>
                  <a
                    href="https://wa.me/573105974290?text=Hola%20Caf%C3%A9%20Uba%2C%20estoy%20antojado%20del%20mejor%20caf%C3%A9"
                    className="menu-drawer__menu-item list-menu__item focus-inset"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CONTACT US
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      <span className="header-background block h-px" />
    </div>
  );
}
