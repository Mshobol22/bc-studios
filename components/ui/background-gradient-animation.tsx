"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Animated gradient background with deep Indigo, Violet, and Cyan.
 * Fills the screen with a subtle, high-end animation.
 */
export function BackgroundGradientAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-slate-950" />
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
          left: "10%",
          top: "20%",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
          right: "15%",
          top: "40%",
        }}
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-25 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, transparent 70%)",
          left: "50%",
          bottom: "10%",
        }}
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.35) 0%, transparent 70%)",
          right: "30%",
          bottom: "30%",
        }}
        animate={{
          x: [0, -30, 60, 0],
          y: [0, 40, -50, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      {/* Base gradient overlay for cohesion */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
