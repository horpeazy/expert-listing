"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, MouseEvent } from "react";
import { Card } from "@/components/ui/card";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "emerald" | "gold";
}

export function GlowCard({ children, className, glowColor = "emerald" }: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColorValue = glowColor === "emerald" 
    ? "hsl(var(--primary-glow) / 0.2)" 
    : "hsl(var(--gold-glow) / 0.2)";

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Following Glow */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColorValue}, transparent 40%)`,
        }}
      />

      <Card className={className}>
        {children}
      </Card>

      {/* Floating Glow Shadow */}
      <motion.div
        className={`absolute -inset-2 rounded-lg blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity ${
          glowColor === "emerald" ? "bg-emerald-500/20" : "bg-gold/20"
        }`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColorValue}, transparent)`,
        }}
      />
    </motion.div>
  );
}

