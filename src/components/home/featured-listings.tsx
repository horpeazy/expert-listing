"use client";

import Link from "next/link";
import { PropertyCard, PropertyCardSkeleton } from "@/components/property/property-card";
import { useEffect, useState, useRef } from "react";
import type { Property } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    async function fetchFeaturedProperties() {
      try {
        const response = await fetch("/api/properties?is_featured=true&limit=6");
        if (response.ok) {
          const data = await response.json();
          setProperties(data.properties || []);
        }
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProperties();
  }, []);

  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    updateScrollButtons();
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container?.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [properties]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Featured properties in Lagos
            </h2>
          </div>
          <Link href="/properties" className="hidden md:block">
            <Button variant="ghost" className="text-sm font-semibold hover:bg-gray-100 rounded-full">
              Show all
            </Button>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Left Arrow */}
          {!loading && canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Right Arrow */}
          {!loading && canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Properties Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {loading ? (
              // Loading Skeletons
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-[300px]">
                  <PropertyCardSkeleton />
                </div>
              ))
            ) : properties.length > 0 ? (
              // Actual Property Cards
              properties.map((property) => (
                <div key={property.id} className="flex-shrink-0 w-[300px]">
                  <PropertyCard property={property} />
                </div>
              ))
            ) : (
              // No Properties Message
              <div className="w-full text-center py-16">
                <p className="text-muted-foreground text-lg mb-6">
                  No featured properties available at the moment.
                </p>
                <Link href="/properties">
                  <Button variant="outline" className="rounded-full">
                    Browse All Properties
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Show All Link */}
        {!loading && properties.length > 0 && (
          <div className="mt-6 md:hidden">
            <Link href="/properties">
              <Button variant="outline" className="w-full rounded-full">
                Show all properties
              </Button>
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
