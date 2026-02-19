"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Animated spotlight overlay for agency page. Layer over AgencyBackground.
 */
export function AgencyAnimatedOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 60%)",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          x: ["-50%", "-45%", "-55%", "-50%"],
          y: ["-50%", "-55%", "-45%", "-50%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 60%)",
          right: "10%",
          top: "30%",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
