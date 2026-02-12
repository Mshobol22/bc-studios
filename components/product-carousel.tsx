"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import type { PortfolioProject } from "@/lib/portfolio-data";

const SLIDE_DURATION = 65; // seconds for one full cycle (slow and smooth)
const CARD_GAP = 24;
const MIN_ITEMS_TO_SLIDE = 3;

type ProductCarouselProps = {
  title: string;
  items: PortfolioProject[];
};

function ProductCard({
  project,
  onMouseEnter,
  onMouseLeave,
}: {
  project: PortfolioProject;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const isExternal = project.url.startsWith("http");
  const Wrapper = isExternal ? "a" : "div";
  const wrapperProps = isExternal
    ? {
        href: project.url,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : { style: { cursor: "default" as const } };

  return (
    <motion.div
      className="flex-shrink-0 w-[280px] sm:w-[320px]"
      style={{ aspectRatio: "16/10" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "tween", duration: 0.2 }}
    >
      <Wrapper
        {...wrapperProps}
        className="group block w-full h-full cursor-pointer rounded-xl overflow-hidden border border-slate-700 bg-slate-900/80 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-emerald-900/20 hover:border-emerald-500/50 transition-all duration-300"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
      <div className="relative w-full h-full overflow-hidden">
        {project.imageUrl.startsWith("/") ? (
          <Image
            src={project.imageUrl}
            alt={project.imageAlt}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 280px, 320px"
          />
        ) : (
          <Image
            src={project.imageUrl}
            alt={project.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 280px, 320px"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <span className="inline-block px-2 py-0.5 mb-2 text-xs font-bold uppercase tracking-wider rounded bg-emerald-500/30 text-emerald-300 border border-emerald-500/50">
            {project.tag}
          </span>
          <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
          <p className="text-sm text-slate-300 mt-0.5 line-clamp-2">{project.description}</p>
        </div>
      </div>
      </Wrapper>
    </motion.div>
  );
}

export function ProductCarousel({ title, items }: ProductCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  const hasEnoughItems = items.length >= MIN_ITEMS_TO_SLIDE;
  const shouldAnimate = hasEnoughItems && contentWidth > 0;

  // Measure width of one set of cards (must render sliding layout first for ref to exist)
  useEffect(() => {
    if (!hasEnoughItems) return;
    const measure = () => {
      const el = firstSetRef.current;
      if (el) setContentWidth(el.offsetWidth + CARD_GAP);
    };
    // Measure after paint - ref may not be ready on first run
    let ro: ResizeObserver | null = null;
    const raf = requestAnimationFrame(() => {
      measure();
      const el = firstSetRef.current;
      if (el) {
        ro = new ResizeObserver(measure);
        ro.observe(el);
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [items.length, hasEnoughItems]);

  // Start/stop animation based on in-view and hover (infinite loop: 0 → -contentWidth, reset, repeat)
  useEffect(() => {
    if (!shouldAnimate || !isInView) return;

    if (isHovered) {
      animationRef.current?.stop();
      animationRef.current = null;
      return;
    }

    const run = () => {
      if (isHoveredRef.current) return;
      x.set(0);
      animationRef.current = animate(x, -contentWidth, {
        duration: SLIDE_DURATION,
        ease: "linear",
        onComplete: () => {
          if (!isHoveredRef.current) run();
        },
      });
    };
    run();

    return () => {
      animationRef.current?.stop();
      animationRef.current = null;
    };
  }, [isInView, isHovered, contentWidth, shouldAnimate]);

  // Reset position when we pause so resume doesn't jump
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
  };

  if (items.length === 0) return null;

  return (
    <section ref={containerRef} className="w-full">
      <h3 className="text-xl font-bold text-white mb-6 px-1">{title}</h3>
      <div className="overflow-hidden -mx-4 sm:mx-0">
        {hasEnoughItems ? (
          <motion.div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            style={{ x, width: "max-content" }}
          >
            <div ref={firstSetRef} className="flex gap-6 flex-shrink-0">
              {items.map((project) => (
                <ProductCard
                  key={project.id}
                  project={project}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
            <div className="flex gap-6 flex-shrink-0" aria-hidden>
              {items.map((project) => (
                <ProductCard
                  key={`${project.id}-dup`}
                  project={project}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {items.map((project) => (
              <ProductCard
                key={project.id}
                project={project}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
