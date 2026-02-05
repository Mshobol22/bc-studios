"use client";

import React from "react";

const GLOBE_SIZE = 280;

/** Equirectangular Earth texture (2:1). Blue Marble style, public domain. */
const EARTH_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg";

/**
 * Tiny green lights on countries. Positions as % of the 2:1 Earth strip:
 * longitude 0° = 0%, 360° = 100%; latitude 90°N = 0% top, 90°S = 100% top.
 * Approximate: USA, Brazil, Europe, W Africa, India, E Asia, Japan, Australia.
 */
const COUNTRY_LIGHTS: { left: number; top: number; delay: number }[] = [
  { left: 22, top: 38, delay: 0 },      // USA (east)
  { left: 28, top: 58, delay: 0.4 },    // Brazil
  { left: 48, top: 32, delay: 0.8 },   // Europe
  { left: 52, top: 48, delay: 0.2 },   // West Africa
  { left: 64, top: 38, delay: 0.6 },   // India
  { left: 76, top: 36, delay: 0.3 },   // East Asia
  { left: 82, top: 32, delay: 0.5 },   // Japan
  { left: 78, top: 62, delay: 0.7 },   // Australia
  { left: 14, top: 52, delay: 0.1 },    // North America (west)
  { left: 58, top: 58, delay: 0.55 },  // Southern Africa
];

export function HeroGlobe() {
  return (
    <div
      className="relative flex items-center justify-center w-full max-w-[320px] mx-auto"
      style={{ height: GLOBE_SIZE }}
    >
      {/* Viewport: circle clipping the rotating Earth strip */}
      <div
        className="relative rounded-full border border-slate-600/50 shadow-2xl shadow-slate-950/80 overflow-hidden bg-slate-900"
        style={{
          width: GLOBE_SIZE,
          height: GLOBE_SIZE,
          boxShadow: "inset -12px -8px 32px rgba(0,0,0,0.35)",
        }}
      >
        {/* Rotating Earth strip (2:1 equirectangular map); full width = 2x viewport */}
        <div
          className="absolute top-0 left-0 h-full w-[200%] bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${EARTH_IMAGE})`,
            backgroundSize: "100% 100%",
            animation: "globe-earth-rotate 32s linear infinite",
          }}
        >
          {/* Tiny green lights on countries — same layer so they rotate with Earth */}
          {COUNTRY_LIGHTS.map((pos, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-emerald-400 pointer-events-none"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: 6,
                height: 6,
                minWidth: 6,
                minHeight: 6,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 8px 2px rgba(16, 185, 129, 0.9), 0 0 16px 4px rgba(16, 185, 129, 0.4)",
                animation: "globe-glow ease-in-out infinite",
                animationDuration: "2.2s",
                animationDelay: `${pos.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle outer glow */}
      <div
        className="absolute rounded-full pointer-events-none border border-slate-600/30"
        style={{
          width: GLOBE_SIZE + 20,
          height: GLOBE_SIZE + 20,
          boxShadow: "0 0 50px 16px rgba(16, 185, 129, 0.06)",
        }}
      />
    </div>
  );
}
