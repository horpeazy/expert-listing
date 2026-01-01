"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    damping: 20,
    stiffness: 50,
  });

  const display = useTransform(spring, (current) =>
    prefix + current.toFixed(decimals) + suffix
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {display}
    </motion.span>
  );
}

// Usage example:
// <AnimatedCounter value={1000} suffix="+" className="text-4xl font-bold" />
// <AnimatedCounter value={99.5} decimals={1} suffix="%" className="text-3xl" />
// <AnimatedCounter value={5000} prefix="₦" className="text-2xl" />

