"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PropertyCard, PropertyCardSkeleton } from "@/components/property/property-card";
import { useEffect, useState, useRef } from "react";
import type { Property } from "@/types";
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
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 max-w-[2520px]">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#222222]">
              Featured properties in Lagos
            </h2>
            <ChevronRight className="w-6 h-6 text-[#FF385C]" />
          </div>
          
          {/* Navigation Buttons Row */}
          <div className="hidden md:flex items-center justify-end gap-2 mb-6">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft || loading}
              className="bg-transparent border-0 outline-none p-0 m-0 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ width: '32px', height: '32px' }}
              aria-label="Previous"
            >
              <div 
                className="w-full h-full bg-white border border-[#DDDDDD] rounded-full shadow-sm flex items-center justify-center hover:border-[#222222] hover:shadow-md transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 32 32" 
                  aria-hidden="true" 
                  role="presentation" 
                  focusable="false" 
                  style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}
                >
                  <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
                </svg>
              </div>
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight || loading}
              className="bg-transparent border-0 outline-none p-0 m-0 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ width: '32px', height: '32px' }}
              aria-label="Next"
            >
              <div 
                className="w-full h-full bg-white border border-[#DDDDDD] rounded-full shadow-sm flex items-center justify-center hover:border-[#222222] hover:shadow-md transition-all"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 32 32" 
                  aria-hidden="true" 
                  role="presentation" 
                  focusable="false" 
                  style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}
                >
                  <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Properties Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth -mx-4 px-4 md:mx-0 md:px-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {loading ? (
              // Loading Skeletons
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-[260px] md:w-[300px]">
                  <PropertyCardSkeleton />
                </div>
              ))
            ) : properties.length > 0 ? (
              // Actual Property Cards
              properties.map((property) => (
                <div key={property.id} className="flex-shrink-0 w-[260px] md:w-[300px]">
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

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
