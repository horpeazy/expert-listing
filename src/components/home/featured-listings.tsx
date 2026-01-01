"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/reveal";
import { motion } from "framer-motion";
import { PropertyCard } from "@/components/property/property-card";
import { useEffect, useState } from "react";
import type { Property } from "@/types";

export function FeaturedListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProperties() {
      try {
        const response = await fetch("/api/properties?is_featured=true&limit=3");
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

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16">
          <FadeIn>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3 font-playfair gradient-text">
                Featured Properties
              </h2>
              <p className="text-slate-400 text-lg">
                Discover our hand-picked selection of premium properties
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/properties">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 mt-6 md:mt-0"
                >
                  View All
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </FadeIn>
        </div>

        {/* Property Cards or Loading Skeletons */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading Skeletons
            [1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <motion.div
                  className="bg-card rounded-2xl overflow-hidden border border-white/5 group"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-64 bg-gradient-to-br from-muted to-card animate-pulse relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                  </div>
                </motion.div>
              </StaggerItem>
            ))
          ) : properties.length > 0 ? (
            // Actual Property Cards
            properties.map((property) => (
              <StaggerItem key={property.id}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))
          ) : (
            // No Properties Message
            <div className="col-span-full text-center py-16">
              <p className="text-slate-400 text-lg mb-6">
                No featured properties available at the moment.
              </p>
              <Link href="/properties">
                <Button variant="outline" className="border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400">
                  Browse All Properties
                </Button>
              </Link>
            </div>
          )}
        </StaggerChildren>

        {!loading && properties.length > 0 && (
          <FadeIn delay={0.6}>
            <div className="text-center mt-16">
              <Link href="/properties">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 border-0"
                  >
                    Browse All Properties
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

