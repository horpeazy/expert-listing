"use client";

import { Shield, Users, ClipboardCheck } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/reveal";
import { motion } from "framer-motion";

export function WhyUs() {
  const features = [
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All properties are verified by our team to ensure quality and authenticity",
      color: "emerald",
    },
    {
      icon: Users,
      title: "Direct to Developers",
      description: "Connect directly with property owners and developers for the best deals",
      color: "gold",
    },
    {
      icon: ClipboardCheck,
      title: "Professional Snagging",
      description: "Expert property inspection services to catch defects before you move in",
      color: "emerald",
    },
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair gradient-text">
              Why Expert Listing?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We make finding your dream home in Nigeria <span className="text-emerald-400">easier, safer, and more reliable</span>
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="relative text-center p-8 rounded-2xl border border-white/5 bg-card group overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${
                      feature.color === "emerald"
                        ? "hsl(var(--primary-glow) / 0.15)"
                        : "hsl(var(--gold-glow) / 0.15)"
                    }, transparent 70%)`,
                  }}
                />

                <motion.div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative ${
                    feature.color === "emerald" ? "bg-emerald-500/10" : "bg-gold/10"
                  }`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon
                    className={`w-10 h-10 ${
                      feature.color === "emerald" ? "text-emerald-500" : "text-gold"
                    }`}
                  />
                  <motion.div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity ${
                      feature.color === "emerald" ? "glow-emerald" : "glow-gold"
                    }`}
                  />
                </motion.div>

                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

