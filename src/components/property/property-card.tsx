"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const primaryImage = property.images?.find((img) => img.is_primary) || property.images?.[0];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <motion.div
        className="relative bg-card rounded-2xl overflow-hidden border border-white/5 group"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary-glow) / 0.15), transparent 40%)`,
          }}
        />

        {/* Glow Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          {primaryImage ? (
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={primaryImage.url}
                alt={property.title}
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Badge className="bg-black/50 backdrop-blur-sm text-white border-white/10">
                {property.transaction_type === "sale" ? "For Sale" : "For Rent"}
              </Badge>
            </motion.div>
            {property.is_featured && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 glow-emerald">
                  Featured
                </Badge>
              </motion.div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-3xl font-bold text-white mb-3">
              {formatPrice(property.price)}
              {property.transaction_type === "rent" && (
                <span className="text-sm font-normal text-slate-400">/year</span>
              )}
            </p>
          </motion.div>

          {/* Title */}
          <h3 className="font-semibold text-lg text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-slate-400 mb-4">
            <MapPin className="w-4 h-4 mr-1.5 text-emerald-500" />
            <span className="line-clamp-1">{property.city}, {property.state}</span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-5 text-sm text-slate-400 pt-4 border-t border-white/5">
            {property.bedrooms && (
              <motion.div
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </motion.div>
            )}
            {property.bathrooms && (
              <motion.div
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </motion.div>
            )}
            {property.area_sqm && (
              <motion.div
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
              >
                <Square className="w-4 h-4" />
                <span>{property.area_sqm}m²</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Floating Shadow */}
        <motion.div
          className="absolute -inset-4 rounded-2xl bg-emerald-500/10 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary-glow) / 0.2), transparent)`,
          }}
        />
      </motion.div>
    </Link>
  );
}

