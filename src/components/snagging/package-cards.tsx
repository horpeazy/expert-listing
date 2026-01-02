"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { SNAGGING_PACKAGES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "@/components/animations/reveal";

interface PackageCardsProps {
  onSelectPackage: (packageType: "basic" | "standard" | "premium") => void;
}

export function PackageCards({ onSelectPackage }: PackageCardsProps) {
  return (
    <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {(Object.entries(SNAGGING_PACKAGES) as Array<[keyof typeof SNAGGING_PACKAGES, typeof SNAGGING_PACKAGES[keyof typeof SNAGGING_PACKAGES]]>).map(([key, pkg]) => (
        <StaggerItem key={key}>
          <motion.div
            className="relative h-full"
            whileHover={{ y: -10, scale: (pkg as any).popular ? 1.03 : 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`relative h-full bg-card border-white/5 overflow-hidden ${
                (pkg as any).popular ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/20" : ""
              }`}
            >
              {/* Glow Effect for Popular */}
              {(pkg as any).popular && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}

              {(pkg as any).popular && (
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gold to-yellow-600 text-black border-0 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </motion.div>
              )}

              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl text-white mb-4">{pkg.name}</CardTitle>
                <div className="space-y-3">
                  <motion.p
                    className="text-5xl font-bold gradient-text"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {formatPrice(pkg.price)}
                  </motion.p>
                  <p className="text-sm text-slate-400 leading-relaxed">{pkg.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-medium text-emerald-400">
                      {pkg.turnaround} turnaround
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {pkg.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-sm text-slate-300 leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className={`w-full ${
                      (pkg as any).popular
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 border-0"
                        : "border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400"
                    }`}
                    variant={(pkg as any).popular ? "default" : "outline"}
                    onClick={() => onSelectPackage(key)}
                  >
                    Book {pkg.name}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>

            {/* Floating Shadow */}
            {(pkg as any).popular && (
              <motion.div
                className="absolute -inset-4 rounded-2xl bg-emerald-500/10 blur-xl -z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}

