"use client";

import React from "react";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { QuoteParticles } from "@/components/ui/quote-particles";

const BASE = "#0f172a"; // slate-950

/**
 * Layered background for quote page: particles + meteors + gradient orbs.
 */
export function QuoteBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0" style={{ backgroundColor: BASE }} />

      {/* Connected particle network */}
      <QuoteParticles />

      {/* Animated gradient orbs — cyan/emerald palette */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, transparent 65%)",
          left: "5%",
          top: "15%",
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[90px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, transparent 65%)",
          right: "10%",
          top: "35%",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full blur-[80px] opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 65%)",
          left: "45%",
          bottom: "5%",
        }}
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(15, 23, 42, 0.4) 100%)",
        }}
      />

      {/* Meteors layer */}
      <Meteors background={false} />
    </div>
  );
}
