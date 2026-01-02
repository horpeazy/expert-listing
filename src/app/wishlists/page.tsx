"use client";

import { useEffect, useState } from "react";
import { useWishlist } from "@/hooks/use-wishlist";
import { PropertyCard } from "@/components/property/property-card";
import { createClient } from "@/lib/supabase/client";
import type { Property } from "@/types";
import { Heart } from "lucide-react";

export default function WishlistsPage() {
  const { wishlist, loading: wishlistLoading } = useWishlist();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      if (wishlist.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data } = await supabase
        .from("properties")
        .select("*, images:property_images(*)")
        .in("id", wishlist.map((item) => item.id))
        .eq("status", "approved");

      setProperties(data || []);
      setLoading(false);
    }

    if (!wishlistLoading) {
      loadProperties();
    }
  }, [wishlist, wishlistLoading]);

  if (loading || wishlistLoading) {
    return (
      <div className="container mx-auto px-4 md:px-10 lg:px-20 py-8 max-w-[2520px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Wishlists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-10 lg:px-20 py-16 max-w-[2520px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Wishlists</h1>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No saved properties yet
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Start exploring properties and save your favorites by clicking the heart icon.
          </p>
          <a
            href="/properties"
            className="px-6 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
          >
            Explore Properties
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-10 lg:px-20 py-8 max-w-[2520px]">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Wishlists</h1>
        <p className="text-gray-600">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

