"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface BentoGridItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  span?: 1 | 2;
}

export function BentoGridItem({
  title,
  description,
  icon: Icon,
  className,
  span = 1,
}: BentoGridItemProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/20 bg-black/20 backdrop-blur-md p-6 transition-all duration-300",
        "hover:scale-[1.02] hover:brightness-110 hover:bg-black/30 hover:border-white/30",
        "hover:shadow-xl hover:shadow-emerald-900/10",
        span === 2 && "col-span-1 md:col-span-2",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      {/* Watermarked icon in corner */}
      <div
        className="absolute right-4 top-4 opacity-20 group-hover:opacity-30 transition-opacity"
        aria-hidden
      >
        <Icon size={64} className="text-white" strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/40 to-emerald-600/40 border border-white/20 flex items-center justify-center text-emerald-400 group-hover:text-white transition-colors">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
        "auto-rows-fr",
        className
      )}
    >
      {children}
    </div>
  );
}
