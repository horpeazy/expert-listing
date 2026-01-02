import { FeaturedListings } from "@/components/home/featured-listings";
import { TwoBedroomProperties } from "@/components/home/two-bedroom-properties";
import { MiniFlatProperties } from "@/components/home/mini-flat-properties";
import { WhyUs } from "@/components/home/why-us";
import { SnaggingCTA } from "@/components/home/snagging-cta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <FeaturedListings />
      <TwoBedroomProperties />
      <MiniFlatProperties />
      <WhyUs />
      <SnaggingCTA />
    </div>
  );
}
