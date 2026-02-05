"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink, ArrowRight } from "lucide-react";

const CASE_STUDIES = [
  {
    id: "resume-roaster",
    title: "Resume Roaster AI",
    desc: "AI-powered resume analysis and constructive feedback for job seekers.",
    tag: "AI SaaS",
    link: "https://roastingresumes.streamlit.app/",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Resume Roaster AI",
  },
  {
    id: "voice2sop",
    title: "Voice2SOP",
    desc: "Voice-to-SOP converter that turns spoken instructions into structured procedures.",
    tag: "AI SaaS",
    link: "https://voice2sop.streamlit.app/",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Voice2SOP",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-transparent font-sans pt-16 pb-24 relative overflow-x-hidden">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 main-heading">Case Studies</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto main-text">
            See how we help businesses transform with technology—from AI tools to custom platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.id}
              id={study.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full overflow-hidden border border-slate-700 bg-slate-900/80 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-500 group">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={study.imageUrl}
                    alt={study.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-white">{study.title}</CardTitle>
                    <span className="px-2 py-1 bg-emerald-950 text-emerald-400 text-xs font-bold rounded uppercase tracking-wider border border-emerald-800">
                      {study.tag}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-slate-300 mb-4">{study.desc}</p>
                  <Button asChild className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                    <a href={study.link} target="_blank" rel="noopener noreferrer">
                      Live Demo <ExternalLink size={16} />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
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
