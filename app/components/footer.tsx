import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="container mx-auto px-6 sm:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <img
                src="https://www.cafeuba.com.co/cdn/shop/files/Cafe_Uba_Logo_2024_pink.png"
                alt="Cafe Uba"
                width={120}
                height={120}
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">Colombian specialty coffee. Fruity, sweet, and experimental profiles for every moment.</p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/cafeuba/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-md border border-border hover:bg-muted/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" stroke="currentColor"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" stroke="currentColor"/><path d="M17.5 6.5h.01" stroke="currentColor"/></svg>
              </a>
              <a href="https://www.facebook.com/cafeuba/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-md border border-border hover:bg-muted/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" stroke="currentColor"/></svg>
              </a>
              <a href="https://wa.me/573105974290" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2 rounded-md border border-border hover:bg-muted/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20.52 3.48A11.5 11.5 0 0 0 3.49 20.51L2 22l1.49-1.49A11.5 11.5 0 1 0 20.52 3.48Z" stroke="currentColor"/><path d="M7.98 8.02c-.29.29-.46.69-.45 1.1.01.41.21.79.53 1.05l.36.3c.52.43.7.54.82.61.33.19.52.21.66.05.23-.27.24-.5.56-.47.28.03.6.23 1.18.58.67.41 1.01.62 1.12.88.15.35.01.53-.2.78-.15.18-.34.35-.56.49-.53.33-1.2.31-1.82.1-1.01-.35-2.18-1.07-3.21-2.1-1.03-1.03-1.75-2.2-2.1-3.21-.21-.62-.23-1.29.1-1.82.14-.22.31-.41.49-.56.25-.21.43-.35.78-.2.26.11.47.45.88 1.12.35.58.55.9.58 1.18.03.32-.2.33-.47.56-.16.14-.14.33.05.66.07.12.18.3.61.82l.3.36c.26.32.64.52 1.05.53.41.01.81-.16 1.1-.45" stroke="currentColor"/></svg>
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Shop</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/collections/all" className="hover:text-foreground">All products</Link></li>
              <li><Link href="/?q=fruity" className="hover:text-foreground">Fruity</Link></li>
              <li><Link href="/?q=balanced" className="hover:text-foreground">Balanced</Link></li>
              <li><Link href="/?q=experimental" className="hover:text-foreground">Experimental</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">About</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">Our story</Link></li>
              <li><a href="https://www.instagram.com/cafeuba/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Instagram</a></li>
              <li><a href="https://www.cafeuba.com.co/en/blogs/news" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Blog</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">Support</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="https://wa.me/573105974290" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Contact</a></li>
              <li><Link href="/policies/shipping" className="hover:text-foreground">Shipping</Link></li>
              <li><Link href="/policies/returns" className="hover:text-foreground">Returns</Link></li>
            </ul>
            <form action="#" className="mt-6">
              <label className="text-sm font-semibold">Subscribe</label>
              <div className="mt-2 flex gap-2">
                <input type="email" placeholder="Email address" className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" />
                <button className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 text-sm">Join</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-6 sm:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Cafe Uba. All rights reserved.</div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/policies/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/policies/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/policies/cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
