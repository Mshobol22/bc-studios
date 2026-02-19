"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Button with shimmer/glow effect.
 */
export function ShimmerButton({ children, className, type = "button", ...props }: ShimmerButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="block w-full">
      <button
        type={type}
        className={cn(
          "relative overflow-hidden w-full px-8 py-4 rounded-lg font-semibold text-white",
          "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500",
          "shadow-[0_0_30px_rgba(34,211,238,0.4)]",
          "hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]",
          "transition-shadow duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {/* Shimmer sweep */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full pointer-events-none"
          animate={{
            x: ["0%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      </button>
    </motion.div>
  );
}
