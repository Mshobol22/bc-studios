"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Database, Zap } from "lucide-react";

const DEFAULT_METRICS = [
  { label: "System Status", value: "Operational", pulse: true },
  { label: "API Latency", value: "24ms", pulse: false },
  { label: "Database", value: "Connected", pulse: false },
] as const;

function StatusDot({ pulse }: { pulse: boolean }) {
  if (!pulse) return null;
  return (
    <span className="relative flex size-2.5 shrink-0">
      <motion.span
        className="absolute inset-0 rounded-full bg-emerald-500"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full bg-emerald-400 shadow-[0_0_10px_4px_rgba(16,185,129,0.5)]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
    </span>
  );
}

export function HealthMonitor({ systemStatus }: { systemStatus?: string }) {
  const metrics = systemStatus
    ? [
        { label: "System Status" as const, value: systemStatus, pulse: true },
        ...DEFAULT_METRICS.slice(1),
      ]
    : DEFAULT_METRICS;
  return (
    <Card className="overflow-hidden border-slate-700/80 bg-slate-950/90 backdrop-blur-sm shadow-xl ring-1 ring-slate-800/50">
      <CardHeader className="pb-2 pt-4 px-4 border-b border-slate-800/80">
        <CardTitle className="text-sm font-medium text-slate-200 flex items-center gap-2">
          <Activity className="size-4 text-slate-400" />
          Health Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-4 space-y-3">
        {metrics.map(({ label, value, pulse }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/50 px-3 py-2.5"
          >
            <span className="text-xs text-slate-400 flex items-center gap-2">
              {label === "System Status" && <Zap className="size-3.5 text-slate-500" />}
              {label === "API Latency" && <Activity className="size-3.5 text-slate-500" />}
              {label === "Database" && <Database className="size-3.5 text-slate-500" />}
              {label}
            </span>
            <span className="text-xs font-medium text-emerald-400/90 tabular-nums flex items-center gap-2">
              <StatusDot pulse={pulse} />
              {value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
