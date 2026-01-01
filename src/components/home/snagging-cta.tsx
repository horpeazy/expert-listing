import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function SnaggingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Say Goodbye to Property Surprises
          </h2>
          <p className="text-lg text-emerald-50 mb-8">
            Professional property snagging that catches defects developers hope you'll miss,
            ensuring your dream home meets the highest quality standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              "Comprehensive Inspection",
              "Detailed Report with Photos",
              "Expert Recommendations",
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/snagging">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
            <Link href="/snagging">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50">
                Book Inspection
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-emerald-100">
            Prices start from just ₦100,000
          </p>
        </div>
      </div>
    </section>
  );
}

