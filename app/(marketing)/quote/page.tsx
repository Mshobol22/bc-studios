"use client";

import React from "react";
import { motion } from "framer-motion";
import { QuoteCalculator } from "@/components/quote-calculator";

export default function QuotePage() {
  return (
    <main className="min-h-screen bg-slate-950 mesh-gradient-bg font-sans pt-16 pb-24 relative z-10 overflow-x-hidden">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Smart Quote
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 main-heading">
            Get an estimate in seconds
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto main-text">
            Choose your platform, urgency, and add-ons. We’ll show a range and, if you’d like, send a tailored proposal to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-lg mx-auto"
        >
          <QuoteCalculator />
        </motion.div>
      </div>
    </main>
  );
}
