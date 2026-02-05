"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

export function LiveMobilePreview() {
  return (
    <Card className="overflow-hidden border-slate-700/80 bg-slate-900/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-white flex items-center gap-2">
          <Smartphone className="size-4 text-slate-400" />
          Live preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-4 pt-0">
        {/* iPhone 15 Pro–style frame: rounded corners, dynamic island, slate border */}
        <div
          className="relative rounded-[2.5rem] border-[10px] border-slate-700 bg-slate-900 shadow-2xl"
          style={{ aspectRatio: "393 / 852", maxWidth: "220px" }}
        >
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-5 z-10 h-7 w-24 -translate-x-1/2 rounded-full bg-slate-950" />
          {/* Screen area */}
          <div className="absolute inset-[6px] overflow-hidden rounded-[2rem] bg-slate-950">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center">
              <div className="rounded-xl border border-slate-700/80 bg-slate-800/50 p-4">
                <Smartphone className="mx-auto size-10 text-slate-500" />
              </div>
              <p className="text-xs font-medium text-slate-400">Work in Progress</p>
              <p className="text-[10px] text-slate-500">App preview will appear here</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
