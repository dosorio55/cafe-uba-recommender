import Header from "./components/Header";
import SearchHero from "./components/SearchHero";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <Header />
      <div className="px-6 sm:px-10">
        <SearchHero />
      </div>
    </div>
  );
}
