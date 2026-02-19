"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Animated grid overlay for solutions page. Layer over ProductsBackground.
 */
export function SolutionsAnimatedOverlay() {
  const lines = 20;
  const cols = 24;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Horizontal lines */}
      {Array.from({ length: lines }, (_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-white/[0.03]"
          style={{ top: `${(i / (lines - 1)) * 100}%` }}
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: cols }, (_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-white/[0.03]"
          style={{ left: `${(i / (cols - 1)) * 100}%` }}
          animate={{ opacity: [0.03, 0.07, 0.03] }}
          transition={{
            duration: 5 + (i % 2),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
}
