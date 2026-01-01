import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage = property.images?.find((img) => img.is_primary) || property.images?.[0];

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400">No image</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-white text-slate-900">
              {property.transaction_type === "sale" ? "For Sale" : "For Rent"}
            </Badge>
            {property.is_featured && (
              <Badge className="bg-emerald-600">Featured</Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <p className="text-2xl font-bold text-slate-900 mb-2">
            {formatPrice(property.price)}
            {property.transaction_type === "rent" && <span className="text-sm font-normal text-slate-600">/year</span>}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-slate-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{property.city}, {property.state}</span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-slate-600">
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.area_sqm && (
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.area_sqm} m²</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

