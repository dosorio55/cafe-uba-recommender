export default function BrewGuides() {
  return (
    <section className="container mx-auto px-6 sm:px-10 py-12 md:py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl md:text-3xl font-display text-foreground">Brew guides</h2>
        <a href="/guides" className="text-sm text-foreground">See all</a>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/guides/pour-over" className="rounded-xl border border-border bg-card p-6">
          <div className="aspect-video w-full rounded-md bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="mt-3 text-lg font-semibold">Pour-over</div>
          <div className="text-sm text-muted-foreground">Clean, bright cups highlighting acidity.</div>
        </a>
        <a href="/guides/french-press" className="rounded-xl border border-border bg-card p-6">
          <div className="aspect-video w-full rounded-md bg-[url('https://images.unsplash.com/photo-1517702730686-df6a9938f0b2?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="mt-3 text-lg font-semibold">French press</div>
          <div className="text-sm text-muted-foreground">Full-bodied and rich extraction.</div>
        </a>
        <a href="/guides/aeropress" className="rounded-xl border border-border bg-card p-6">
          <div className="aspect-video w-full rounded-md bg-[url('https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="mt-3 text-lg font-semibold">AeroPress</div>
          <div className="text-sm text-muted-foreground">Versatile and quick, on-the-go.</div>
        </a>
      </div>
    </section>
  );
}
