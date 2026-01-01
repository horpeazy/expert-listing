"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextShimmerProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export function TextShimmer({ children, className = "", duration = 2 }: TextShimmerProps) {
  return (
    <motion.div
      className={`relative inline-block overflow-hidden ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}

// Alternative shimmer with rainbow gradient
export function TextShimmerRainbow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--gold)), hsl(var(--primary)))",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

// Pulsing glow text
export function TextGlow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={`relative inline-block gradient-text ${className}`}
      animate={{
        textShadow: [
          "0 0 10px hsl(var(--primary-glow) / 0.3)",
          "0 0 20px hsl(var(--primary-glow) / 0.6)",
          "0 0 10px hsl(var(--primary-glow) / 0.3)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}

