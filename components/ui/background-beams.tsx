"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Shooting light rays in the background.
 * Creates an ambient, structural feel.
 */
export function BackgroundBeams() {
  const rays = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: i * 30,
    delay: i * 0.3,
    duration: 4 + (i % 3),
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 flex items-center justify-center">
        {rays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute w-[1px] h-[150%] origin-center"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.15), transparent)`,
              transform: `rotate(${ray.angle}deg)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: ray.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ray.delay,
            }}
          />
        ))}
      </div>
      {/* Radial fade */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
