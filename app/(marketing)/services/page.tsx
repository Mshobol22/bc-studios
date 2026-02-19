"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ServicesPageBackground } from "@/components/ui/services-page-background";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const MOBILE_FAQS = [
  {
    question: "How long does an MVP take?",
    answer:
      "A typical mobile MVP takes 8–14 weeks from kickoff to first release, depending on scope (single platform vs. cross‑platform) and complexity. We’ll lock a timeline in discovery.",
  },
  {
    question: "Do you build native or cross-platform apps?",
    answer:
      "We do both: native iOS/Android when performance and platform-specific UX matter most, and React Native or Flutter when you need one codebase and faster delivery. We’ll recommend based on your goals.",
  },
  {
    question: "What’s included in ongoing support?",
    answer:
      "Support can include bug fixes, OS and dependency updates, performance monitoring, and small feature tweaks. We’ll define a retainer or SLA that fits your launch and growth plans.",
  },
];

const WEB_FAQS = [
  {
    question: "How long does an MVP take?",
    answer:
      "A web app MVP usually ships in 6–12 weeks. Timeline depends on auth, integrations, and whether you need a public site plus dashboard. We scope this in the first 1–2 workshops.",
  },
  {
    question: "Which stack do you use?",
    answer:
      "We default to Next.js (React) for SEO and DX, with TypeScript and your choice of database (Postgres, Supabase, etc.). We’ll align the stack with your team’s skills and hosting preferences.",
  },
  {
    question: "Do you handle hosting and DevOps?",
    answer:
      "Yes. We can set up and maintain hosting (e.g. Vercel, AWS, or your preferred cloud), CI/CD, and monitoring so you can focus on product, not infrastructure.",
  },
];

const AI_FAQS = [
  {
    question: "How long does an MVP take?",
    answer:
      "An AI automation MVP (e.g. chatbots, document workflows, or internal tools) often lands in 4–10 weeks. Complexity depends on data sources, model choice, and approval flows—we’ll size it in discovery.",
  },
  {
    question: "What can you automate?",
    answer:
      "We automate workflows that involve documents, forms, support, and internal ops: classification, extraction, Q&A, and custom agents. We’ll map your process and propose where AI adds the most value.",
  },
  {
    question: "How do you handle data and security?",
    answer:
      "We use your preferred cloud and APIs, keep prompts and config in your repo, and can run models on your infrastructure. We’ll align with your compliance and data residency requirements.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen font-sans pt-16 pb-24 relative z-10 overflow-x-hidden">
      <ServicesPageBackground />
      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-emerald-400 font-semibold text-sm uppercase tracking-widest mb-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            What We Build
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 main-heading [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
            Custom Development
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto main-text [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
            From discovery to deployment, we deliver tailored software that fits
            your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Tabs defaultValue="mobile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 rounded-lg bg-black/40 backdrop-blur-xl border border-white/20">
              <TabsTrigger
                value="mobile"
                className="rounded-md data-[state=active]:bg-emerald-600/80 data-[state=active]:text-white data-[state=active]:shadow-sm py-2.5 text-slate-300"
              >
                Mobile Dev
              </TabsTrigger>
              <TabsTrigger
                value="web"
                className="rounded-md data-[state=active]:bg-emerald-600/80 data-[state=active]:text-white data-[state=active]:shadow-sm py-2.5 text-slate-300"
              >
                Web Apps
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="rounded-md data-[state=active]:bg-emerald-600/80 data-[state=active]:text-white data-[state=active]:shadow-sm py-2.5 text-slate-300"
              >
                AI Automation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="mt-6">
              <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {MOBILE_FAQS.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      value={faq.question}
                      className="border-white/10 px-4 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-emerald-400 hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="web" className="mt-6">
              <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {WEB_FAQS.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      value={faq.question}
                      className="border-white/10 px-4 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-emerald-400 hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-6">
              <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {AI_FAQS.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      value={faq.question}
                      className="border-white/10 px-4 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-emerald-400 hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-300">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-full px-8 gap-2"
          >
            <Link href="/#contact">
              Start a Project <ArrowRight size={18} />
            </Link>
          </Button>
          <p className="text-slate-400 text-sm mt-4">
            Or explore our{" "}
            <Link
              href="/solutions"
              className="text-emerald-400 hover:underline"
            >
              SaaS products
            </Link>{" "}
            and{" "}
            <Link
              href="/solutions"
              className="text-emerald-400 hover:underline"
            >
              products
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </main>
  );
}
