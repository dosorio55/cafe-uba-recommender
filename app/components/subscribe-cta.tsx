export default function SubscribeCta() {
  return (
    <section className="container bg-muted/50 mx-auto px-6 sm:px-10 py-12 md:py-16">
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-display text-foreground">
            Subscribe and save
          </h3>
          <p className="mt-2 text-muted-foreground">
            Never run out of coffee. Flexible deliveries, exclusive drops, and
            better pricing.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="/?q=subscription"
              className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-5 py-3 text-sm font-medium"
            >
              Start subscription
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-md border border-foreground text-foreground px-5 py-3 text-sm font-medium"
            >
              Browse coffees
            </a>
          </div>
        </div>
        <div className="flex-1 w-full max-w-xl aspect-[4/3] rounded-xl bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1400&auto=format&fit=crop')] bg-cover bg-center" />
      </div>
    </section>
  );
}
