export default function HomeHero() {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted">
      <div className="container bg-primary mx-auto px-6 sm:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-display tracking-tight text-foreground">Coffee for every moment</h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">Explore fruity, sweet, and experimental profiles crafted in Colombia. Whole bean, ground, or brew-on-the-go.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/products" className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-5 py-3 text-sm font-medium">Shop All</a>
            <a href="/?q=subscription" className="inline-flex items-center justify-center rounded-md border border-foreground text-foreground px-5 py-3 text-sm font-medium">Subscriptions</a>
          </div>
        </div>
        <div className="flex-1 w-full max-w-xl aspect-[4/3] rounded-xl bg-[url('https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=1400&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
    </section>
  );
}
