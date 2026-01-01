import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { FeaturedListings } from "@/components/home/featured-listings";
import { WhyUs } from "@/components/home/why-us";
import { SnaggingCTA } from "@/components/home/snagging-cta";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedListings />
        <WhyUs />
        <SnaggingCTA />
      </main>
      <Footer />
    </div>
  );
}
