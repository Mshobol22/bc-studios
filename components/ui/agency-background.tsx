"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AgencyBackgroundProps {
  className?: string;
}

/**
 * Abstract painting background with dark scrim for text readability.
 * Ensures WCAG contrast on light, vibrant imagery.
 */
export function AgencyBackground({ className }: AgencyBackgroundProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <Image
        src="/images/agency-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Dark scrim overlay for text readability on light, vibrant background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
