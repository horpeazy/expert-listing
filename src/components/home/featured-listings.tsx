import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedListings() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Featured Properties
            </h2>
            <p className="text-slate-600">
              Discover our hand-picked selection of premium properties
            </p>
          </div>
          <Link href="/properties">
            <Button variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Placeholder - will be populated with actual property cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-slate-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/properties">
            <Button size="lg">
              Browse All Properties
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

