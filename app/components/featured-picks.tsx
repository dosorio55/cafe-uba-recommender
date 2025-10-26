export default function FeaturedPicks() {
  return (
    <section className="bg-muted/50">
      <div className="container mx-auto px-6 sm:px-10 py-12 md:py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-display text-foreground">
            Featured picks
          </h2>
          <a
            href="https://www.cafeuba.com.co/en/collections/all-products"
            className="text-sm text-foreground"
          >
            View all
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="/?q=gesha"
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="aspect-square w-full rounded-md bg-[url('https://www.cafeuba.com.co/cdn/shop/files/gesha_9c0c884e-829d-421a-b6fa-0cc7ca5df606.png?v=1741885556&width=800')] bg-contain bg-center bg-no-repeat" />
            <div className="mt-3 text-sm text-muted-foreground">Washed</div>
            <div className="text-lg font-semibold">Gesha</div>
            <div className="mt-1 text-sm">Floral, fruity, complex</div>
          </a>
          <a
            href="/?q=honey"
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="aspect-square w-full rounded-md bg-[url('https://www.cafeuba.com.co/cdn/shop/files/honey_a34956bd-c118-4c74-af0f-c88d03b77310.png?v=1741885557&width=800')] bg-contain bg-center bg-no-repeat" />
            <div className="mt-3 text-sm text-muted-foreground">Honey</div>
            <div className="text-lg font-semibold">Honey Coffee</div>
            <div className="mt-1 text-sm">Sweet, fruity, caramel</div>
          </a>
          <a
            href="/?q=natural"
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="aspect-square w-full rounded-md bg-[url('https://www.cafeuba.com.co/cdn/shop/files/natural_03f4cab6-8600-476c-b726-839527615293.png?v=1741885556&width=800')] bg-contain bg-center bg-no-repeat" />
            <div className="mt-3 text-sm text-muted-foreground">Natural</div>
            <div className="text-lg font-semibold">Natural Coffee</div>
            <div className="mt-1 text-sm">Fruity, fermented, sweet</div>
          </a>
          <a
            href="/?q=culturing"
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="aspect-square w-full rounded-md bg-[url('https://www.cafeuba.com.co/cdn/shop/files/maypop.png?v=1741885556&width=800')] bg-contain bg-center bg-no-repeat" />
            <div className="mt-3 text-sm text-muted-foreground">Culturing</div>
            <div className="text-lg font-semibold">Maypop</div>
            <div className="mt-1 text-sm">Fruity, aromatic, sweet</div>
          </a>
        </div>
      </div>
    </section>
  );
}
