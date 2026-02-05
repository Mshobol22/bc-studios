"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink, FileText, Bug, Mic, Sparkles } from "lucide-react";

const PRODUCTS = [
  {
    id: "resume-roaster",
    title: "Resume Roaster",
    icon: FileText,
    status: "Live" as const,
    description:
      "Get constructive, AI-driven feedback on your resume. Improve clarity, impact, and ATS compatibility with actionable suggestions.",
    tryNowUrl: "https://roastingresumes.streamlit.app/",
    learnMoreUrl: "/case-studies#resume-roaster",
  },
  {
    id: "pest-command",
    title: "Pest Command",
    icon: Bug,
    status: "Coming Soon" as const,
    description:
      "AI-powered pest identification and management guidance. Get instant recommendations for treatment and prevention.",
    tryNowUrl: null,
    learnMoreUrl: "/case-studies",
  },
  {
    id: "voice2sop",
    title: "Voice2SOP",
    icon: Mic,
    status: "Live" as const,
    description:
      "Turn spoken instructions into structured, shareable SOPs. Perfect for training, compliance, and process documentation.",
    tryNowUrl: "https://voice2sop.streamlit.app/",
    learnMoreUrl: "/case-studies#voice2sop",
  },
];

function StatusBadge({ status }: { status: "Live" | "Beta" | "Coming Soon" }) {
  const styles = {
    Live: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    Beta: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    "Coming Soon": "bg-slate-500/20 text-slate-400 border-slate-500/40",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-transparent font-sans pt-16 pb-24 relative overflow-x-hidden">
      <div className="container mx-auto px-4 pt-16 pb-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-4">
            SaaS Products
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 main-heading">
            Our Ecosystem of AI Tools.
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto main-text">
            Ready-to-use AI tools built by BC-studios. Try a demo or dive deeper into each product.
          </p>
        </motion.section>

        {/* Product Grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full flex flex-col border border-slate-700 bg-slate-900/80 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/20">
                  <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600/30 to-blue-600/30 border border-slate-600 text-emerald-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-bold text-white">
                        {product.title}
                      </CardTitle>
                    </div>
                    <StatusBadge status={product.status} />
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4 pt-0">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3">
                      {product.tryNowUrl ? (
                        <Button
                          asChild
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2"
                        >
                          <a
                            href={product.tryNowUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Try Now <ExternalLink size={14} />
                          </a>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled
                          className="bg-slate-700 text-slate-400 cursor-not-allowed gap-2"
                        >
                          Try Now <ExternalLink size={14} />
                        </Button>
                      )}
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-200 hover:bg-slate-800 gap-2"
                      >
                        <Link href={product.learnMoreUrl}>
                          Learn More <Sparkles size={14} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 text-sm mb-4">Need something custom?</p>
          <Button asChild className="bg-white hover:bg-slate-200 text-black rounded-full px-6">
            <Link href="/services">Explore Custom Development</Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
