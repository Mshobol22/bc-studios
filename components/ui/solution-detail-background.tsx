"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Solution detail page: animated gradient orbs (emerald/teal palette).
 */
export function SolutionDetailBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-slate-950" />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -40, 35, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.35) 0%, transparent 70%)",
          right: "15%",
          top: "50%",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 30, -25, 0],
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
        className="absolute w-[450px] h-[450px] rounded-full opacity-18 blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)",
          left: "50%",
          bottom: "5%",
        }}
        animate={{
          x: [0, 35, -45, 0],
          y: [0, -35, 45, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.06)_0%,transparent_50%)]"
      />
    </div>
  );
}
