"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Products page: floating bubble/orb background with parallax motion.
 */
export function ProductsAnimatedBackground() {
  const bubbles = [
    { size: 400, x: "5%", y: "10%", color: "rgba(34, 211, 238, 0.25)", dur: 25, delay: 0 },
    { size: 350, x: "70%", y: "20%", color: "rgba(139, 92, 246, 0.22)", dur: 22, delay: 2 },
    { size: 450, x: "40%", y: "60%", color: "rgba(6, 182, 212, 0.2)", dur: 28, delay: 1 },
    { size: 300, x: "80%", y: "70%", color: "rgba(99, 102, 241, 0.2)", dur: 20, delay: 3 },
    { size: 380, x: "15%", y: "75%", color: "rgba(16, 185, 129, 0.18)", dur: 24, delay: 1.5 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-slate-950" />
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px]"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 35, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.06) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
