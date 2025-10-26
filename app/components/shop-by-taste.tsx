export default function ShopByTaste() {
  return (
    <section className="container mx-auto px-6 sm:px-10 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-display text-foreground">Shop by taste</h2>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <a href="/?q=fruity" className="group relative overflow-hidden rounded-xl border border-border p-6 bg-card">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1200&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
          <div className="relative">
            <div className="text-sm text-muted-foreground">Category</div>
            <div className="text-xl font-semibold">Fruity</div>
          </div>
        </a>
        <a href="/?q=sweet" className="group relative overflow-hidden rounded-xl border border-border p-6 bg-card">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
          <div className="relative">
            <div className="text-sm text-muted-foreground">Category</div>
            <div className="text-xl font-semibold">Sweet</div>
          </div>
        </a>
        <a href="/?q=balanced" className="group relative overflow-hidden rounded-xl border border-border p-6 bg-card">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517702730686-df6a9938f0b2?q=80&w=1200&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
          <div className="relative">
            <div className="text-sm text-muted-foreground">Category</div>
            <div className="text-xl font-semibold">Balanced</div>
          </div>
        </a>
        <a href="/?q=experimental" className="group relative overflow-hidden rounded-xl border border-border p-6 bg-card">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507133750040-4a8f57021524?q=80&w=1200&auto=format&fit=crop')] opacity-20 bg-cover bg-center" />
          <div className="relative">
            <div className="text-sm text-muted-foreground">Category</div>
            <div className="text-xl font-semibold">Experimental</div>
          </div>
        </a>
      </div>
    </section>
  );
}
