"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxProject {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}

interface ParallaxScrollProps {
  projects: ParallaxProject[];
  className?: string;
}

/**
 * Grid of project images with column-based parallax scroll and hover focus effect.
 * Column 1 scrolls fastest, column 2 slower, etc.
 */
export function ParallaxScroll({ projects, className }: ParallaxScrollProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const columnCount = 3;
  const col0Y = useTransform(scrollYProgress, [0, 1], [0, -96]);
  const col1Y = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const columns = [col0Y, col1Y, col2Y];

  const projectColumns = projects.reduce<ParallaxProject[][]>(
    (acc, project, i) => {
      const col = i % columnCount;
      if (!acc[col]) acc[col] = [];
      acc[col].push(project);
      return acc;
    },
    []
  );

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projectColumns.map((columnProjects, colIndex) => (
          <motion.div
            key={colIndex}
            className="flex flex-col gap-6 lg:gap-8"
            style={{ y: columns[colIndex] }}
          >
            {columnProjects.map((project) => {
              const isHovered = hoveredId === project.id;
              const anyHovered = hoveredId !== null;
              const shouldDim = anyHovered && !isHovered;

              return (
                <motion.div
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] ring-2 ring-white/15 shadow-2xl shadow-black/40"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      opacity: shouldDim ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {project.imageUrl.startsWith("/") ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold mt-1 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">{project.title}</h3>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
