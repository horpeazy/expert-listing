"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PropertyGrid } from "@/components/property/property-grid";
import { Filters } from "@/components/search/filters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    transaction_type: (searchParams.get("transaction_type") as "sale" | "rent") || undefined,
    property_type: searchParams.get("property_type")?.split(",") || [],
    state: searchParams.get("state") || undefined,
    city: searchParams.get("city") || undefined,
    min_price: searchParams.get("min_price") ? parseInt(searchParams.get("min_price")!) : undefined,
    max_price: searchParams.get("max_price") ? parseInt(searchParams.get("max_price")!) : undefined,
    bedrooms: searchParams.get("bedrooms") ? parseInt(searchParams.get("bedrooms")!) : undefined,
    bathrooms: searchParams.get("bathrooms") ? parseInt(searchParams.get("bathrooms")!) : undefined,
    sort: searchParams.get("sort") || "newest",
  });

  useEffect(() => {
    // Update URL with filters
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0)) {
        if (Array.isArray(value)) {
          params.set(key, value.join(","));
        } else {
          params.set(key, String(value));
        }
      }
    });
    router.push(`/properties?${params.toString()}`, { scroll: false });

    // Simulate fetching properties (will be replaced with actual API call)
    setLoading(true);
    setTimeout(() => {
      setProperties([]);
      setLoading(false);
    }, 500);
  }, [filters, router]);

  const handleReset = () => {
    setFilters({
      search: "",
      transaction_type: undefined,
      property_type: [],
      state: undefined,
      city: undefined,
      min_price: undefined,
      max_price: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      sort: "newest",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find Properties</h1>
              <p className="text-slate-600">
                {loading ? "Searching..." : `${properties.length} properties found`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Select
                value={filters.sort}
                onValueChange={(value) => setFilters({ ...filters, sort: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_low_to_high">Price: Low to High</SelectItem>
                  <SelectItem value="price_high_to_low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <Filters
                    filters={filters}
                    onChange={setFilters}
                    onReset={handleReset}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-lg border p-6">
                <Filters
                  filters={filters}
                  onChange={setFilters}
                  onReset={handleReset}
                />
              </div>
            </aside>

            {/* Properties Grid */}
            <div className="flex-1">
              <PropertyGrid properties={properties} loading={loading} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}

