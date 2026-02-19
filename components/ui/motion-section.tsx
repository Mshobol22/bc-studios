"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  delay?: number;
  once?: boolean;
  margin?: string;
}

/**
 * Section wrapper with scroll-triggered reveal: fade in + slide up.
 * Uses whileInView for GPU-accelerated animations.
 */
export function MotionSection({
  children,
  className,
  id,
  "aria-labelledby": ariaLabelledBy,
  delay = 0,
  once = true,
  margin = "-80px",
}: MotionSectionProps) {
  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledBy}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
}
