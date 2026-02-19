"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface VelocityScrollProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

/**
 * Infinite horizontal marquee for logos, tech stack, or social proof.
 * GPU-accelerated via framer-motion.
 */
export function VelocityScroll({
  children,
  className,
  duration = 25,
}: VelocityScrollProps) {
  return (
    <div className={cn("overflow-hidden py-8", className)}>
      <div className="flex">
        <motion.div
          className="flex gap-12 shrink-0 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration,
              ease: "linear",
            },
          }}
        >
          {children}
          {children}
        </motion.div>
      </div>
    </div>
  );
}
