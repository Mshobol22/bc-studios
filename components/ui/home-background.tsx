"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Home page background: northern lights + animated dot grid overlay.
 */
export function HomeBackground() {
  const dots = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: (i % 16) * 6.25 + 2,
    y: Math.floor(i / 16) * 8 + 4,
    delay: (i % 5) * 0.4,
    duration: 3 + (i % 4) * 0.5,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-slate-950" />
      <div className="northern-light northern-1" />
      <div className="northern-light northern-2" />
      <div className="northern-light northern-3" />
      <div className="northern-light northern-4" />
      <div className="northern-light northern-5" />
      <div className="northern-light northern-6" />
      {/* Animated dot grid */}
      <div className="absolute inset-0">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/30"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,transparent_0%,rgba(2,6,23,0.2)_45%,rgba(2,6,23,0.5)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/50" />
    </div>
  );
}
