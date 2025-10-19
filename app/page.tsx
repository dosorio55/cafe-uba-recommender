import Header from "./components/header";
import ProductsList from "./components/products-list";
import SearchHero from "./components/search-hero";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <Header />
      <div className="container mx-auto px-6 sm:px-10">
        <SearchHero />
        <ProductsList />
      </div>
    </div>
  );
}
