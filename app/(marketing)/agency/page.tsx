"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { AgencyPageBackground } from "@/components/ui/agency-page-background";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const APPROACH_ITEMS = [
  {
    title: "Engineering-First",
    desc: "We architect systems that are maintainable, scalable, and built to evolve.",
  },
  {
    title: "Design That Performs",
    desc: "Every pixel serves a purpose. We merge aesthetics with conversion and usability.",
  },
  {
    title: "Iterative Delivery",
    desc: "Agile cycles, clear milestones, and continuous feedback keep projects on track.",
  },
] as const;

export default function AgencyPage() {
  return (
    <main
      className="min-h-screen font-sans pt-16 pb-24 relative z-10 overflow-x-hidden"
      role="main"
    >
      <AgencyPageBackground />

      <div className="container mx-auto px-4 pt-16 pb-8">
        <TracingBeam>
          <article className="space-y-24">
            <section aria-labelledby="agency-heading">
              <TextRevealCard text="Building the Future" className="mb-8" textShadow />
              <motion.p
                id="agency-heading"
                className="text-slate-300 text-lg max-w-xl leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We combine structural precision with creative vision. Every project is engineered
                for scale, performance, and lasting impact.
              </motion.p>
            </section>

            <section aria-labelledby="approach-heading">
              <h2
                id="approach-heading"
                className="text-2xl font-bold text-white mb-6 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
              >
                Our Approach
              </h2>
              <div className="space-y-8">
                {APPROACH_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 md:p-8"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section aria-labelledby="why-heading">
              <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl p-6 md:p-8 max-w-2xl">
                <h2
                  id="why-heading"
                  className="text-2xl font-bold text-white mb-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
                >
                  Why BC Studios
                </h2>
                <p className="text-slate-300 leading-relaxed [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                  We bring the rigor of software engineering and the craft of design together.
                  From concept to launch, we build digital products that stand the test of time.
                </p>
              </div>
            </section>
          </article>
        </TracingBeam>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <Button
            asChild
            className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white border-0 gap-2 shadow-lg shadow-cyan-500/25"
          >
            <Link href="/quote">
              <Sparkles className="size-4" aria-hidden />
              Get a Quote
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 gap-2"
          >
            <Link href="/">
              <ArrowRight size={18} className="rotate-180" aria-hidden />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
