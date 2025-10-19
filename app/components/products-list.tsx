"use client";

import React, { useEffect, useState } from "react";

const ProductsList = () => {
  type Price = { regular?: string; sale?: string };
  type Product = {
    name?: string;
    url?: string;
    images: string[];
    price: Price;
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/scrape", { cache: "no-store" });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border border-border rounded-lg overflow-hidden bg-card"
          >
            <div className="aspect-[1/1] bg-muted animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="mt-10 text-sm text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p, idx) => {
        const href = p.url || "#";
        const img = p.images?.[0];
        const priceText = p.price?.sale || p.price?.regular || "";

        return (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden bg-card transition-shadow"
          >
            <div className="aspect-[1/1] overflow-hidden">
              {img ? (
                <img
                  src={img}
                  alt={p.name || "Product image"}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
            </div>
            <div className="p-4">
              <div className="text-sm font-medium text-foreground line-clamp-2">
                {p.name || "Unnamed"}
              </div>
              {priceText ? (
                <div className="mt-1 text-sm text-foreground/80">
                  {priceText}
                </div>
              ) : null}
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default ProductsList;
