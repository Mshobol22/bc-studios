"use client";

import React from "react";
import { AgencyBackground } from "@/components/ui/agency-background";
import { ServicesAnimatedOverlay } from "@/components/ui/services-animated-overlay";

/**
 * Services page: painting + animated beams overlay.
 */
export function ServicesPageBackground() {
  return (
    <>
      <AgencyBackground />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <ServicesAnimatedOverlay />
      </div>
    </>
  );
}
