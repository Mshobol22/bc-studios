"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Server, CheckCircle, Cloud } from "lucide-react";

const MOCK_METRICS = [
  { label: "Uptime", value: "99.9%", icon: Activity },
  { label: "Database", value: "Connected", icon: CheckCircle },
  { label: "Latest Deploy", value: "2h ago", icon: Cloud },
] as const;

function GlowDots({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="relative flex size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.6)] animate-pulse"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function SystemHealth() {
  return (
    <Card className="overflow-hidden border-slate-700/80 bg-slate-950/90 backdrop-blur-sm shadow-xl ring-1 ring-slate-800/50">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-200 flex items-center gap-2">
            <Server className="size-4 text-slate-400" />
            System Health
          </CardTitle>
          <GlowDots count={5} />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {MOCK_METRICS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/50 px-3 py-2"
          >
            <span className="text-xs text-slate-400 flex items-center gap-2">
              <Icon className="size-3.5 text-slate-500" />
              {label}
            </span>
            <span className="text-xs font-medium text-emerald-400/90 tabular-nums">
              {value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
