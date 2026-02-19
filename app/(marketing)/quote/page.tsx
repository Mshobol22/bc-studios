"use client";

import React from "react";
import { motion } from "framer-motion";
import { QuoteBackground } from "@/components/ui/quote-background";
import { QuoteContactForm } from "@/components/quote-contact-form";

export default function QuotePage() {
  return (
    <main className="min-h-screen font-sans pt-16 pb-24 relative overflow-x-hidden bg-transparent">
      <QuoteBackground />

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl"
        >
          <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <p className="text-cyan-400 font-semibold text-sm uppercase tracking-widest mb-3">
                Get Quote
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 main-heading">
                Let&apos;s build something great
              </h1>
              <p className="text-slate-400 text-sm main-text">
                Share your project details and we&apos;ll get back with a tailored proposal.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <QuoteContactForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
