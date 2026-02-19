"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Vertical line that grows as you scroll, tracing the content.
 * Wraps a content column with a scroll-linked beam.
 */
export function TracingBeam({ children, className }: TracingBeamProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8, 1], [0, 1, 1]);
  const strokeDashoffset = useTransform(pathLength, (v) => 100 * (1 - v));

  return (
    <div ref={containerRef} className={cn("relative max-w-4xl mx-auto px-4", className)}>
      <div className="flex gap-8">
        {/* Vertical beam line - left of content */}
        <div className="shrink-0 w-px relative pl-2 md:pl-0" aria-hidden>
          <svg className="absolute left-0 top-0 w-full h-full" viewBox="0 0 1 100" preserveAspectRatio="none">
            <motion.path
              d="M 0.5 0 L 0.5 100"
              fill="none"
              stroke="url(#tracing-beam-grad)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="100"
              style={{ strokeDashoffset }}
            />
            <defs>
              <linearGradient id="tracing-beam-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="10%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="90%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Content column */}
        <div className="flex-1 min-w-0 max-w-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
