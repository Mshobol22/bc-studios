"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/product-carousel";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-data";
import { ArrowRight } from "lucide-react";

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 font-sans pt-16 pb-24 relative z-10 overflow-x-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.08),transparent)]" />
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 main-heading">
            Products
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto main-text">
            SaaS apps, websites, and digital products we’ve built. Browse by category below.
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
          <Button asChild variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 gap-2">
            <Link href="/">
              Back to Home <ArrowRight size={18} className="rotate-180" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
