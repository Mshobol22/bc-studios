"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SolutionsPageBackground } from "@/components/ui/solutions-page-background";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/product-carousel";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-data";
import { ArrowRight } from "lucide-react";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen font-sans pt-16 pb-24 relative z-10 overflow-x-hidden">
      <SolutionsPageBackground />

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 main-heading [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
            Products
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto main-text [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
            SaaS apps, websites, and digital products we&apos;ve built. Browse by category below.
          </p>
        </motion.div>

        <div className="space-y-20">
          {PORTFOLIO_CATEGORIES.map((category) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCarousel title={category.label} items={category.projects} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-16"
        >
          <Button
            asChild
            variant="outline"
            className="border-white/40 bg-black/20 backdrop-blur-sm text-white hover:bg-white/15 hover:border-white/50 gap-2 shadow-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]"
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
