export default function Reviews() {
  return (
    <section className="bg-muted/50">
      <div className="container mx-auto px-6 sm:px-10 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-display text-foreground">What people say</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-lg font-semibold">Bright and juicy</div>
            <div className="mt-1 text-sm text-muted-foreground">The Gesha is stunning. Floral nose with a clean finish.</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-lg font-semibold">Perfect daily driver</div>
            <div className="mt-1 text-sm text-muted-foreground">Balanced, smooth cups every time from the washed line.</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="text-lg font-semibold">Love the variety</div>
            <div className="mt-1 text-sm text-muted-foreground">The natural lots bring vivid fruit with a sweet finish.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
