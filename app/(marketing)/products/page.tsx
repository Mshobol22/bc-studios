"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProductsAnimatedBackground } from "@/components/ui/products-animated-background";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-data";
import { ArrowRight } from "lucide-react";

const DUMMY_PROJECTS = PORTFOLIO_CATEGORIES.flatMap((cat) =>
  cat.projects.map((p) => ({
    id: p.id,
    title: p.title,
    imageUrl: p.imageUrl,
    category: cat.label,
  }))
);

export default function ProductsPage() {
  return (
    <main className="min-h-screen font-sans pt-16 pb-24 relative z-10 overflow-x-hidden">
      <ProductsAnimatedBackground />

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 main-heading">
            Our Work
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto main-text">
            A showcase of digital products, SaaS applications, and websites we&apos;ve built.
          </p>
        </motion.div>

        <ParallaxScroll projects={DUMMY_PROJECTS} className="mb-20" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <Button
            asChild
            variant="outline"
            className="border-slate-500/50 text-slate-200 hover:bg-white/10 hover:border-white/30 gap-2"
          >
            <Link href="/">
              Back to Home <ArrowRight size={18} className="rotate-180" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
