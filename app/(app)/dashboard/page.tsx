"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ArrowLeft } from "lucide-react";

/**
 * Placeholder dashboard page. Protect with Clerk when ready.
 */
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-transparent font-sans pt-24 pb-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-6 text-emerald-400">
            <LayoutDashboard size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 main-heading">Dashboard</h1>
          <p className="text-slate-300 mb-8 main-text">
            Your SaaS dashboard will live here. Add Clerk for authentication, then build out your app views.
          </p>
          <Button asChild variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 gap-2">
            <Link href="/">
              Back to Home <ArrowLeft size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
