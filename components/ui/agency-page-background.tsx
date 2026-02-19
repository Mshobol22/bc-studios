"use client";

import React from "react";
import { AgencyBackground } from "@/components/ui/agency-background";
import { AgencyAnimatedOverlay } from "@/components/ui/agency-animated-overlay";

/**
 * Agency page: painting + animated spotlight overlay.
 */
export function AgencyPageBackground() {
  return (
    <>
      <AgencyBackground />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <AgencyAnimatedOverlay />
      </div>
    </>
  );
}
