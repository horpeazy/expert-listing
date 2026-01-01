"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";
import { FadeIn, SlideIn } from "@/components/animations/reveal";
import { motion } from "framer-motion";

export function SnaggingCTA() {
  const features = [
    "Comprehensive Inspection",
    "Detailed Report with Photos",
    "Expert Recommendations",
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-left">
              <SlideIn direction="left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium">Premium Service</span>
                </div>
              </SlideIn>

              <FadeIn delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair leading-tight">
                  Say Goodbye to Property Surprises
                </h2>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-lg text-emerald-50 mb-8 leading-relaxed">
                  Professional property snagging that catches defects developers hope you'll miss,
                  ensuring your dream home meets the highest quality standards.
                </p>
              </FadeIn>

              <motion.div 
                className="space-y-4 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {features.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-emerald-50 font-medium">{item}</span>
                  </motion.div>
                ))}
              </motion.div>

              <FadeIn delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/snagging">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl"
                      >
                        Book Inspection
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/snagging">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full sm:w-auto border-white/30 hover:bg-white/10 text-white"
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={1}>
                <p className="mt-6 text-emerald-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Prices start from just <span className="font-bold">₦100,000</span>
                </p>
              </FadeIn>
            </div>

            {/* Right: Visual Element */}
            <SlideIn direction="right">
              <div className="relative">
                <motion.div
                  className="relative rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/5 p-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="relative z-10 space-y-6">
                    <div className="text-center">
                      <p className="text-5xl font-bold mb-2">3</p>
                      <p className="text-emerald-100">Packages Available</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gold">24-48h</p>
                        <p className="text-sm text-emerald-100 mt-1">Turnaround</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-gold">100%</p>
                        <p className="text-sm text-emerald-100 mt-1">Detailed</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-gold text-black px-4 py-2 rounded-full font-bold shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-sm">Most Popular</span>
                </motion.div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}

