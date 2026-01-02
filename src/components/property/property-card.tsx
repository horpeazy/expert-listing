"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const primaryImage = property.images?.find((img) => img.is_primary) || property.images?.[0];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors z-10 shadow-sm"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? "fill-primary text-primary" : "text-gray-700"
              }`}
            />
          </button>

          {/* Featured Badge */}
          {property.is_featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-white border-0 shadow-sm">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1">
          {/* Location & Transaction Type */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground line-clamp-1 flex-1">
              {property.city}, {property.state}
            </h3>
          </div>

          {/* Title/Type */}
          <p className="text-sm text-muted-foreground line-clamp-1">
            {property.title}
          </p>

          {/* Features */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {property.bedrooms && (
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                {property.bathrooms}
              </span>
            )}
            {property.area_sqm && (
              <span className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                {property.area_sqm}m²
              </span>
            )}
          </div>

          {/* Price */}
          <div className="pt-1">
            <p className="text-foreground font-semibold">
              {formatPrice(property.price)}
              {property.transaction_type === "rent" && (
                <span className="text-sm font-normal text-muted-foreground"> /year</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] rounded-xl bg-gray-200 mb-3" />
      <div className="space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-5 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}
