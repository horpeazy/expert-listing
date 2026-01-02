import { FeaturedListings } from "@/components/home/featured-listings";
import { WhyUs } from "@/components/home/why-us";
import { SnaggingCTA } from "@/components/home/snagging-cta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <FeaturedListings />
      <WhyUs />
      <SnaggingCTA />
    </div>
  );
}
