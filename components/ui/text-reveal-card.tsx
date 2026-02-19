"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealCardProps {
  text: string;
  className?: string;
  /** Enable text shadow for readability on busy/light backgrounds */
  textShadow?: boolean;
}

/**
 * Headline with shimmer effect on reveal.
 */
export function TextRevealCard({ text, className, textShadow }: TextRevealCardProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1
        className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight relative",
          textShadow && "[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]"
        )}
      >
        {text}
        {/* Shimmer sweep - moves across the text */}
        <motion.span
          className="absolute inset-0 block w-1/2 mix-blend-overlay pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          animate={{
            x: ["0%", "150%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        />
      </h1>
    </motion.div>
  );
}
