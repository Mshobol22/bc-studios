"use client";

import React from "react";
import { ProductsBackground } from "@/components/ui/products-background";
import { SolutionsAnimatedOverlay } from "@/components/ui/solutions-animated-overlay";

/**
 * Solutions page: painting + animated grid overlay.
 */
export function SolutionsPageBackground() {
  return (
    <>
      <ProductsBackground />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <SolutionsAnimatedOverlay />
      </div>
    </>
  );
}
