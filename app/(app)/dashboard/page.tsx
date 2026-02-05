"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Upload,
  ExternalLink,
  Rocket,
  FileCheck,
  MessageSquare,
  Zap,
  FileText,
} from "lucide-react";
import { SystemHealth } from "@/components/dashboard/system-health";
import { HealthMonitor } from "@/components/dashboard/health-monitor";
import { MilestoneApproval } from "@/components/dashboard/milestone-approval";
import { MilestoneCard } from "@/components/dashboard/milestone-card";
import { LiveMobilePreview } from "@/components/dashboard/live-mobile-preview";
import type { PendingProposal } from "@/components/quote-calculator";

const PENDING_PROPOSAL_KEY = "pending_proposal";

const MOCK_PROJECT = {
  name: "Acme Corp — Web Platform",
  phase: "Phase 2: API Integration",
  phaseProgress: 65,
  nextMilestone: "Staging review by Feb 15",
};

const MOCK_ACTIVITY = [
  { id: "1", title: "Deployment to Staging", time: "2 hours ago", icon: Rocket },
  { id: "2", title: "Design assets approved", time: "1 day ago", icon: FileCheck },
  { id: "3", title: "Feedback on Phase 1 delivered", time: "2 days ago", icon: MessageSquare },
  { id: "4", title: "Sprint 3 completed", time: "3 days ago", icon: Zap },
];

const QUICK_ACTIONS = [
  { label: "Book Review Call", href: "#", icon: Calendar },
  { label: "Upload Assets", href: "#", icon: Upload },
  { label: "View Staging Link", href: "#", icon: ExternalLink },
];

function parsePendingProposal(raw: string | null): PendingProposal | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (
      data &&
      typeof data === "object" &&
      "name" in data &&
      "email" in data &&
      "projectTypeLabel" in data
    ) {
      return data as PendingProposal;
    }
  } catch {
    // ignore
  }
  return null;
}

function triggerConfetti() {
  if (typeof window === "undefined") return;
  import("canvas-confetti").then(({ default: confetti }) => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { x: 0.5, y: 0.4 },
      colors: ["#22c55e", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
    });
  }).catch(() => {});
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [pendingProposal, setPendingProposal] = useState<PendingProposal | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const confettiFired = useRef(false);

  useEffect(() => {
    const raw = localStorage.getItem(PENDING_PROPOSAL_KEY);
    setPendingProposal(parsePendingProposal(raw));
  }, []);

  useEffect(() => {
    if (searchParams.get("payment") !== "success") return;
    if (confettiFired.current) return;
    confettiFired.current = true;
    setPaymentSuccess(true);
    localStorage.removeItem(PENDING_PROPOSAL_KEY);
    setPendingProposal(null);
    triggerConfetti();
    window.history.replaceState({}, "", "/dashboard");
  }, [searchParams]);

  return (
    <div className="max-w-6xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <p className="mt-1 text-slate-400">System health, approvals, and live preview.</p>
      </motion.div>

      {/* Proposal Ready (Magic Bridge): show when pending_proposal exists */}
      {pendingProposal && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-emerald-500/40 bg-emerald-950/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                Proposal ready
              </CardTitle>
              <CardDescription className="text-slate-300">
                Welcome {pendingProposal.name}, your {pendingProposal.projectTypeLabel} proposal is ready.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white" asChild>
                <Link href="/dashboard/proposal">
                  <FileText className="size-4" />
                  View proposal
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Default dashboard content: hide when showing proposal-only state is not requested; we show both: proposal card + rest */}
      {!pendingProposal && (
        <>
      {/* Top row: Project Status + System Health */}
      <div className="grid gap-6 md:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <Card className="overflow-hidden border-slate-700/80 bg-slate-900/50 backdrop-blur-sm shadow-xl transition-all hover:border-slate-600/80 hover:shadow-slate-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">{MOCK_PROJECT.name}</CardTitle>
              <CardDescription className="text-slate-400">
                {MOCK_PROJECT.nextMilestone}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">{MOCK_PROJECT.phase}</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">
                    {MOCK_PROJECT.phaseProgress}%
                  </span>
                </div>
                <Progress
                  value={MOCK_PROJECT.phaseProgress}
                  className="h-2.5 bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-emerald-500"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          <SystemHealth />
        </motion.div>
      </div>

      {/* Mission Control: Health Monitor + Milestone Card */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.09 }}
        >
          <HealthMonitor systemStatus={paymentSuccess ? "Project: ACTIVE" : undefined} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MilestoneCard />
        </motion.div>
      </div>

      {/* Middle: Milestone Approval + Recent Activity + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MilestoneApproval />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          <Card className="h-full border-slate-700/80 bg-slate-900/50 backdrop-blur-sm shadow-lg transition-all hover:border-slate-600/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">Recent activity</CardTitle>
              <CardDescription className="text-slate-400">Latest updates on your project</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {MOCK_ACTIVITY.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.id}
                      className="flex items-start gap-3 rounded-lg border border-slate-800/60 bg-slate-800/30 px-3 py-2.5 transition-colors hover:bg-slate-800/50"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-700/80 text-slate-300">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.14 }}
        >
          <Card className="h-full border-slate-700/80 bg-slate-900/50 backdrop-blur-sm shadow-lg transition-all hover:border-slate-600/80">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">Quick actions</CardTitle>
              <CardDescription className="text-slate-400">Shortcuts for common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-1">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      asChild
                      variant="outline"
                      className="h-auto justify-start gap-3 border-slate-700/80 bg-slate-800/30 py-3 text-left text-slate-200 hover:border-slate-600 hover:bg-slate-800/50 hover:text-white"
                    >
                      <Link href={action.href}>
                        <Icon className="size-5 shrink-0" />
                        {action.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom: Live Mobile Preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
      >
        <LiveMobilePreview />
      </motion.div>
        </>
      )}

    </div>
  );
}
