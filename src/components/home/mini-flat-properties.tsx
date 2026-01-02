"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PropertyCard, PropertyCardSkeleton } from "@/components/property/property-card";
import { createClient } from "@/lib/supabase/client";
import type { Property } from "@/types";

export function MiniFlatProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("properties")
        .select("*, images:property_images(*)")
        .eq("status", "approved")
        .eq("property_type", "apartment")
        .eq("bedrooms", 1)
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error && data) {
        setProperties(data);
      }
      setLoading(false);
    }

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F7F7F7] py-8 md:py-16">
        <div className="mx-auto max-w-[2520px] px-4 md:px-10 lg:px-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#222222]">Mini Flats</h2>
              <ChevronRight className="w-6 h-6 text-[#FF385C]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F7F7F7] py-8 md:py-16">
      <div className="mx-auto max-w-[2520px] px-4 md:px-10 lg:px-20">
        <Link 
          href="/properties?property_type=apartment&bedrooms=1"
          className="flex items-center justify-between mb-8 group cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#222222]">Mini Flats</h2>
            <ChevronRight className="w-6 h-6 text-[#FF385C] transition-transform group-hover:translate-x-1" />
          </div>
          <span className="text-sm font-semibold text-[#FF385C] hover:underline">View all</span>
        </Link>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

