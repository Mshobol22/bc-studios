"use client";

import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Calendar } from "lucide-react";

// --- Pricing constants ---
const PLATFORM_BASE: Record<string, number> = {
  mobile: 5_000,
  web: 4_000,
  ai: 6_000,
};
const URGENCY_MULTIPLIER = 0.003;
const AI_ADDON = 2_000;
const RANGE_BUFFER = 0.15;

const CALENDLY_STRATEGY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_STRATEGY_URL || "https://calendly.com";

// --- Form schema ---
const quoteFormSchema = z.object({
  platform: z.enum(["mobile", "web", "ai"]),
  urgency: z.tuple([z.number().min(0).max(100)]).default([0]),
  aiIntegration: z.boolean().default(false),
  projectDescription: z.string().optional(),
});

const leadCaptureSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
export type LeadCaptureValues = z.infer<typeof leadCaptureSchema>;

export type PendingProposal = {
  name: string;
  email: string;
  platform: QuoteFormValues["platform"];
  urgency: number;
  aiIntegration: boolean;
  projectDescription: string;
  estimateLow: number;
  estimateHigh: number;
  projectTypeLabel: string;
};

const PENDING_PROPOSAL_KEY = "pending_proposal";

function computeEstimate(values: QuoteFormValues): { low: number; high: number } {
  const base = PLATFORM_BASE[values.platform] ?? PLATFORM_BASE.web;
  const urgencyMult = 1 + (values.urgency[0] ?? 0) * URGENCY_MULTIPLIER;
  const withUrgency = base * urgencyMult;
  const withAddons = withUrgency + (values.aiIntegration ? AI_ADDON : 0);
  const low = Math.round(withAddons * (1 - RANGE_BUFFER));
  const high = Math.round(withAddons * (1 + RANGE_BUFFER));
  return { low, high };
}

function formatPrice(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n}`;
}

function getProjectTypeLabel(platform: QuoteFormValues["platform"]): string {
  return platform === "ai" ? "AI Automation" : platform === "mobile" ? "Mobile App" : "Web App";
}

/**
 * Stub: eventually send lead + quote context to Supabase/Resend.
 * Call this when the user submits the "Where should we send your estimate?" form.
 */
async function handleLeadSubmit(
  lead: LeadCaptureValues,
  quote: QuoteFormValues,
  estimate: { low: number; high: number }
): Promise<void> {
  // TODO: send to Supabase (e.g. leads table) and/or Resend (email)
  await new Promise((r) => setTimeout(r, 100));
  if (process.env.NODE_ENV === "development") {
    console.log("[handleLeadSubmit] Lead:", lead, "Quote:", quote, "Estimate:", estimate);
  }
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function QuoteCalculator() {
  const [leadDialogOpen, setLeadDialogOpen] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [capturedLead, setCapturedLead] = useState<LeadCaptureValues | null>(null);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      platform: "web",
      urgency: [0],
      aiIntegration: false,
      projectDescription: "",
    },
  });

  const leadForm = useForm<LeadCaptureValues>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: { name: "", email: "" },
  });

  const watchPlatform = form.watch("platform");
  const watchUrgency = form.watch("urgency");
  const watchAi = form.watch("aiIntegration");

  const estimate = useMemo(
    () => computeEstimate({ platform: watchPlatform, urgency: watchUrgency, aiIntegration: watchAi }),
    [watchPlatform, watchUrgency, watchAi]
  );

  const onGetProposal = () => {
    form.handleSubmit((values) => {
      setSubmittedQuote(values);
      setLeadSubmitted(false);
      setLeadDialogOpen(true);
    })();
  };

  const onLeadSubmit = leadForm.handleSubmit(async (data) => {
    if (!submittedQuote) return;
    setIsSubmitting(true);
    const estimateResult = computeEstimate(submittedQuote);
    try {
      await handleLeadSubmit(data, submittedQuote, estimateResult);
    } finally {
      setIsSubmitting(false);
    }
    setCapturedLead(data);
    setLeadSubmitted(true);
    const pending: PendingProposal = {
      name: data.name,
      email: data.email,
      platform: submittedQuote.platform,
      urgency: submittedQuote.urgency[0],
      aiIntegration: submittedQuote.aiIntegration,
      projectDescription: submittedQuote.projectDescription ?? "",
      estimateLow: estimateResult.low,
      estimateHigh: estimateResult.high,
      projectTypeLabel: getProjectTypeLabel(submittedQuote.platform),
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(PENDING_PROPOSAL_KEY, JSON.stringify(pending));
    }
  });

  const closeLeadDialog = () => {
    setLeadDialogOpen(false);
    setLeadSubmitted(false);
    setCapturedLead(null);
    setSubmittedQuote(null);
    leadForm.reset();
  };

  const finalEstimate = submittedQuote ? computeEstimate(submittedQuote) : null;

  return (
    <>
      <Card className="border-slate-700/80 bg-slate-900/60 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-white">Your project</CardTitle>
          <CardDescription className="text-slate-400">
            Adjust options to see an estimated range. Non-binding.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="form-fields"
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <motion.div variants={item} className="space-y-2">
                <Label htmlFor="platform" className="text-slate-300">
                  Platform type
                </Label>
                <Controller
                  name="platform"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="platform"
                        className="border-slate-600 bg-slate-800/50 text-white"
                      >
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent className="border-slate-700 bg-slate-900">
                        <SelectItem value="mobile" className="text-slate-200">
                          Mobile App
                        </SelectItem>
                        <SelectItem value="web" className="text-slate-200">
                          Web App
                        </SelectItem>
                        <SelectItem value="ai" className="text-slate-200">
                          AI Automation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </motion.div>

              <motion.div variants={item} className="space-y-3">
                <Controller
                  name="urgency"
                  control={form.control}
                  render={({ field }) => (
                    <>
                      <div className="flex justify-between">
                        <Label className="text-slate-300">Project urgency</Label>
                        <span className="text-sm text-slate-500">{field.value[0]}% rush</span>
                      </div>
                      <Slider
                        value={field.value}
                        onValueChange={field.onChange}
                        max={100}
                        step={5}
                        className="text-emerald-500"
                      />
                    </>
                  )}
                />
              </motion.div>

              <motion.div variants={item} className="flex items-center justify-between rounded-lg border border-slate-700/80 bg-slate-800/40 p-4">
                <div>
                  <Label htmlFor="ai-addon" className="text-slate-300">
                    AI integration
                  </Label>
                  <p className="text-xs text-slate-500 mt-0.5">Chatbots, workflows, or custom models</p>
                </div>
                <Controller
                  name="aiIntegration"
                  control={form.control}
                  render={({ field }) => (
                    <Switch id="ai-addon" checked={field.value} onCheckedChange={field.onChange} />
                  )}
                />
              </motion.div>

              <motion.div variants={item} className="space-y-2">
                <Label htmlFor="project-description" className="text-slate-300">
                  Describe your project
                </Label>
                <p className="text-xs text-slate-500">
                  Optional — goals, features, timeline, audience, or anything that helps us tailor your estimate.
                </p>
                <Textarea
                  id="project-description"
                  placeholder="e.g. We need a mobile app for field technicians to log jobs and sync offline. Target launch Q3, ~5k users. Interested in AI for smart scheduling..."
                  rows={8}
                  className="min-h-[10rem] resize-y border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500 focus-visible:ring-slate-500"
                  {...form.register("projectDescription")}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            variants={item}
            className="rounded-xl border border-slate-700/80 bg-slate-800/40 p-5 text-center"
          >
            <p className="text-sm font-medium text-slate-400 mb-1">Estimated range</p>
            <p
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tabular-nums"
              style={{ textShadow: "0 0 40px rgba(34, 211, 238, 0.2)" }}
            >
              {formatPrice(estimate.low)} – {formatPrice(estimate.high)}
            </p>
          </motion.div>

          <Button
            type="button"
            onClick={onGetProposal}
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-lg py-6 text-base font-semibold gap-2"
            data-id="submit-quote"
          >
            <Sparkles className="size-5" />
            Get final proposal
          </Button>
        </CardContent>
      </Card>

      {/* Lead gate: "Where should we send your estimate?" → then show price + CTA */}
      <Dialog open={leadDialogOpen} onOpenChange={(open) => !open && closeLeadDialog()}>
        <DialogContent
          showClose={true}
          className="border-slate-700 bg-slate-900 text-white"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          {!leadSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">Where should we send your estimate?</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Enter your name and email and we’ll show your estimate and next steps.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={onLeadSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lead-name" className="text-slate-300">
                    Name
                  </Label>
                  <Input
                    id="lead-name"
                    {...leadForm.register("name")}
                    placeholder="Your name"
                    className="border-slate-600 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                  {leadForm.formState.errors.name && (
                    <p className="text-sm text-red-400">{leadForm.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead-email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="lead-email"
                    type="email"
                    {...leadForm.register("email")}
                    placeholder="you@company.com"
                    className="border-slate-600 bg-slate-800 text-white placeholder:text-slate-500"
                  />
                  {leadForm.formState.errors.email && (
                    <p className="text-sm text-red-400">{leadForm.formState.errors.email.message}</p>
                  )}
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeLeadDialog}
                    className="border-slate-600 text-slate-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    {isSubmitting ? "Sending…" : "Send my estimate"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">Your estimate</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {capturedLead && (
                    <>We’ve sent a copy to {capturedLead.email}. Book a call to discuss next steps.</>
                  )}
                </DialogDescription>
              </DialogHeader>
              {finalEstimate && submittedQuote && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-700/80 bg-slate-800/40 p-5 text-center">
                    <p className="text-sm font-medium text-slate-400 mb-1">Estimated range</p>
                    <p
                      className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent tabular-nums"
                      style={{ textShadow: "0 0 40px rgba(34, 211, 238, 0.2)" }}
                    >
                      {formatPrice(finalEstimate.low)} – {formatPrice(finalEstimate.high)}
                    </p>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white rounded-lg py-6 text-base font-semibold gap-2"
                    data-id="contact"
                  >
                    <a
                      href={CALENDLY_STRATEGY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Book a strategy call with BC Studios"
                    >
                      <Calendar className="size-5" />
                      Book a Strategy Call
                    </a>
                  </Button>
                </div>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeLeadDialog}
                  className="border-slate-600 text-slate-300"
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
