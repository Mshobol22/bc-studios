"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MILESTONE = "Phase 1: UI/UX Design";

function triggerConfetti(button: HTMLButtonElement | null) {
  if (typeof window === "undefined") return;
  // Dynamic import so app builds even if canvas-confetti isn't installed yet
  import("canvas-confetti").then((confettiModule) => {
    const confetti = confettiModule.default;
    const rect = button?.getBoundingClientRect();
    if (rect) {
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { x, y },
        colors: ["#22c55e", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
      });
    } else {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  }).catch(() => {
    // Optional: confetti not installed; toast still works
  });
}

export function MilestoneApproval() {
  const [status, setStatus] = useState<"pending" | "completed">("pending");
  const [isApproving, setIsApproving] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleApprove = useCallback(() => {
    if (status === "completed") return;
    setIsApproving(true);
    triggerConfetti(buttonRef.current);
    setTimeout(() => {
      setStatus("completed");
      setIsApproving(false);
      toast.success("Phase 1 Approved! Production starting…");
    }, 400);
  }, [status]);

  return (
    <Card className="overflow-hidden border-slate-700/80 bg-slate-900/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-white">Milestone approval</CardTitle>
        <CardDescription className="text-slate-400">
          Review and approve completed phases
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          {status === "pending" ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
            >
              <p className="text-sm font-medium text-slate-200">{MILESTONE}</p>
              <p className="text-xs text-slate-500 mt-0.5">Ready for your approval</p>
              <Button
                ref={buttonRef}
                size="lg"
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                onClick={handleApprove}
                disabled={isApproving}
              >
                {isApproving ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Approve milestone"
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4"
            >
              <CheckCircle className="size-8 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-white">{MILESTONE}</p>
                <p className="text-xs text-emerald-400/90">Completed</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
