"use client";

import { useMemo, useState } from "react";
import { generateBaristaReply } from "../core/agent-barista.core";

export default function SearchHero() {
  const suggestions = useMemo(
    () => [
      "medium roast",
      "sweet",
      "citrus",
      "espresso",
      "filter",
      "balanced",
      "fruity",
      "chocolatey",
      "honey",
      "decaf",
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const addToken = (token: string) => {
    if (!query) return setQuery(token);
    const hasSpace = /\s$/.test(query);
    setQuery(hasSpace ? `${query}${token}` : `${query} ${token}`);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setReply(null);

      const reply = await generateBaristaReply(query);
      if (!reply) {
        throw new Error("Request failed");
      }

      setReply(reply);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-6 py-12">
      <h2 className="text-2xl md:text-3xl font-display text-foreground tracking-wide">
        What coffee do you want today?
      </h2>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl flex items-stretch gap-2"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your ideal cup..."
          className="flex-1 h-12 rounded-md px-4 bg-card text-foreground border border-border outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="h-12 px-5 rounded-md bg-primary text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          disabled={loading}
        >
          Search
        </button>
      </form>
      <div className="w-full max-w-2xl flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => addToken(s)}
            className="px-3 py-2 rounded-full bg-secondary text-secondary-foreground border border-border text-sm hover:bg-muted hover:text-muted-foreground transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
      <div className="w-full max-w-2xl mt-4">
        {loading && (
          <div className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">
            Thinking...
          </div>
        )}
        {!loading && reply && (
          <div className="rounded-md border border-border bg-card p-4 whitespace-pre-wrap">
            {reply}
          </div>
        )}
      </div>
    </section>
  );
}
