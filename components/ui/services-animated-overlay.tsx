"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Animated beams overlay for services page. Layer over AgencyBackground.
 */
export function ServicesAnimatedOverlay() {
  const rays = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: i * 30,
    delay: i * 0.25,
    duration: 5 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        {rays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute w-[1px] h-[150%] origin-center"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.08), transparent)",
              transform: `rotate(${ray.angle}deg)`,
            }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: ray.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ray.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
