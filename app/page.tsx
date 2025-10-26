import Header from "./components/header";
import SearchProductsContext from "./components/search-products-context";
import HomeHero from "./components/home-hero";
import ShopByTaste from "./components/shop-by-taste";
import FeaturedPicks from "./components/featured-picks";
import SubscribeCta from "./components/subscribe-cta";
import BrewGuides from "./components/brew-guides";
import Reviews from "./components/reviews";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <Header />
      <main className="w-full">
        <HomeHero />
        <SearchProductsContext />
        <FeaturedPicks />
        <ShopByTaste />
        <SubscribeCta />
        <BrewGuides />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
