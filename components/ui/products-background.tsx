"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductsBackgroundProps {
  className?: string;
}

/**
 * Abstract painting background for products page.
 * Dark scrim overlay ensures text and component readability on busy, high-contrast imagery.
 */
export function ProductsBackground({ className }: ProductsBackgroundProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <Image
        src="/images/products-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Dark scrim overlay for text and component readability on busy background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}
