"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, Rocket } from "lucide-react";

function triggerConfetti(button: HTMLButtonElement | null) {
  if (typeof window === "undefined") return;
  import("canvas-confetti")
    .then(({ default: confetti }) => {
      const rect = button?.getBoundingClientRect();
      if (rect) {
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
          colors: ["#22c55e", "#10b981", "#34d399", "#6ee7b7"],
        });
      } else {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      }
    })
    .catch(() => {});
}

export function MilestoneCard() {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleComplete = useCallback(() => {
    if (completed) return;
    setLoading(true);
    triggerConfetti(buttonRef.current);
    setTimeout(() => {
      setCompleted(true);
      setLoading(false);
    }, 500);
  }, [completed]);

  return (
    <Card className="overflow-hidden border-slate-700/80 bg-slate-900/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-white">Current phase</CardTitle>
        <CardDescription className="text-slate-400">
          Complete steps to unlock the next stage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
            >
              <p className="text-sm font-medium text-slate-200">Onboarding</p>
              <p className="text-xs text-slate-500 mt-0.5">Set up your project and team access</p>
              <Button
                ref={buttonRef}
                size="lg"
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2"
                onClick={handleComplete}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle className="size-5" />
                    Complete onboarding
                  </>
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="awaiting"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4"
            >
              <CheckCircle className="size-8 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-white">Status: Awaiting Kickoff</p>
                <p className="text-xs text-emerald-400/90 flex items-center gap-1 mt-0.5">
                  <Rocket className="size-3.5" />
                  Next: Project kickoff call
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
