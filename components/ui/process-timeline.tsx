"use client";

import React, { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send, Search, Target, Palette, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "01",
    title: "Discovery",
    desc: "We dive deep into your brand, goals, and audience.",
    icon: Search,
  },
  {
    id: "02",
    title: "Strategy",
    desc: "Blueprinting the architecture and user journey.",
    icon: Target,
  },
  {
    id: "03",
    title: "Design & Build",
    desc: "Crafting pixel-perfect UI with modern tech.",
    icon: Palette,
  },
  {
    id: "04",
    title: "Launch",
    desc: "Testing, optimization, and liftoff.",
    icon: Rocket,
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathDesktopRef = useRef<SVGPathElement>(null);
  const pathMobileRef = useRef<SVGPathElement>(null);
  const desktopLenRef = useRef(100);
  const mobileLenRef = useRef(100);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Plateaus at 0.25, 0.5, 0.75 for pauses at each step
  const pathProgress = useTransform(
    scrollYProgress,
    [0, 0.1, 0.18, 0.2, 0.35, 0.42, 0.45, 0.65, 0.72, 0.75, 0.92, 1],
    [0, 0.25, 0.25, 0.25, 0.5, 0.5, 0.5, 0.75, 0.75, 0.75, 1, 1]
  );

  const strokeDashoffsetDesktop = useTransform(
    pathProgress,
    (v) => desktopLenRef.current * (1 - v)
  );
  const strokeDashoffsetMobile = useTransform(
    pathProgress,
    (v) => mobileLenRef.current * (1 - v)
  );

  // Plane position - desktop: horizontal path, x varies
  const planeLeftDesktop = useTransform(pathProgress, (v) => {
    const path = pathDesktopRef.current;
    if (!path) return "5%";
    const len = path.getTotalLength();
    const point = path.getPointAtLength(v * len);
    return `${point.x}%`;
  });

  // Plane position - mobile: vertical path, y varies
  const planeTopMobile = useTransform(pathProgress, (v) => {
    const path = pathMobileRef.current;
    if (!path) return "0%";
    const len = path.getTotalLength();
    const point = path.getPointAtLength(v * len);
    return `${point.y}%`;
  });

  const planeRotate = useTransform(pathProgress, (v) => {
    if (v < 0.25) return -45;
    if (v < 0.5) return 0;
    if (v < 0.75) return 45;
    return 90;
  });

  useLayoutEffect(() => {
    if (pathDesktopRef.current) {
      desktopLenRef.current = pathDesktopRef.current.getTotalLength();
    }
    if (pathMobileRef.current) {
      mobileLenRef.current = pathMobileRef.current.getTotalLength();
    }
  }, []);

  return (
    <div ref={containerRef} className="relative py-12">
      <div className="text-center mb-16">
        <h2
          id="process-heading"
          className="text-3xl md:text-4xl font-bold text-white mb-4 main-heading"
        >
          How We Work
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full" />
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative">
        <div className="relative pl-8">
          {/* Vertical dashed path (gray background) */}
          <svg
            className="absolute left-4 top-0 bottom-0 w-px"
            viewBox="0 0 1 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0.5 0 L 0.5 100"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
          {/* Vertical path (accent fill) */}
          <svg
            className="absolute left-4 top-0 w-px h-full"
            viewBox="0 0 1 100"
            preserveAspectRatio="none"
          >
            <motion.path
              ref={pathMobileRef}
              d="M 0.5 0 L 0.5 100"
              fill="none"
              stroke="url(#accent-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="100"
              style={{ strokeDashoffset: strokeDashoffsetMobile }}
            />
            <defs>
              <linearGradient id="accent-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {STEPS.map((step) => (
            <div key={step.id} className="relative mb-10 last:mb-0">
              <motion.div
                className={cn(
                  "rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-6",
                  "transition-all duration-300 hover:bg-black/30 hover:border-white/20"
                )}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 border border-white/10 flex items-center justify-center text-emerald-400">
                    <step.icon size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400/90">{step.id}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{step.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Paper plane - mobile */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none" aria-hidden>
          <motion.div
            className="absolute left-4 w-10 h-10 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ top: planeTopMobile }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/40 border-2 border-white/30"
              style={{ rotate: planeRotate }}
            >
              <Send size={18} className="text-white rotate-[-45deg]" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Desktop: horizontal layout */}
      <div className="hidden md:block relative">
        <div className="grid grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              className={cn(
                "rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-6",
                "transition-all duration-300 hover:bg-black/30 hover:border-white/20"
              )}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 border border-white/10 text-emerald-400 mb-4">
                  <step.icon size={28} />
                </div>
                <span className="text-xs font-bold text-emerald-400/90">{step.id}</span>
                <h3 className="text-xl font-bold text-white mt-1">{step.title}</h3>
                <p className="text-slate-400 text-sm mt-2">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SVG path overlay - desktop horizontal */}
        <div className="absolute inset-0 pointer-events-none z-10" aria-hidden>
          <svg
            className="absolute left-0 top-0 w-full"
            style={{ height: "4rem" }}
            viewBox="0 0 100 16"
            preserveAspectRatio="none"
          >
            {/* Gray dashed background */}
            <path
              d="M 5 8 L 27.5 8 L 50 8 L 72.5 8 L 95 8"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
            {/* Accent path (fills on scroll) */}
            <motion.path
              ref={pathDesktopRef}
              d="M 5 8 L 27.5 8 L 50 8 L 72.5 8 L 95 8"
              fill="none"
              stroke="url(#accent-gradient-desktop)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="100"
              style={{ strokeDashoffset: strokeDashoffsetDesktop }}
            />
            <defs>
              <linearGradient id="accent-gradient-desktop" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Paper plane - desktop */}
          <motion.div
            className="absolute top-8 w-10 h-10 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: planeLeftDesktop }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/40 border-2 border-white/30"
              style={{ rotate: planeRotate }}
            >
              <Send size={18} className="text-white rotate-[-45deg]" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
