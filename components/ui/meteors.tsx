"use client";

import React, { useEffect, useRef, useState } from "react";

interface Meteor {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  length: number;
}

interface MeteorsProps {
  /** When false, skip the solid background (parent provides it) */
  background?: boolean;
}

/**
 * Subtle shooting stars that streak across the background occasionally.
 */
export function Meteors({ background = true }: MeteorsProps) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const generate = () => {
      const count = 3 + Math.floor(Math.random() * 2);
      const newMeteors: Meteor[] = Array.from({ length: count }, () => ({
        id: ++idRef.current,
        x: Math.random() * 100,
        y: Math.random() * 30,
        delay: Math.random() * 4,
        duration: 1.5 + Math.random() * 1,
        length: 80 + Math.random() * 60,
      }));
      setMeteors((prev) => [...prev.slice(-8), ...newMeteors]);
    };

    generate();
    const interval = setInterval(generate, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {background && (
        <div className="absolute inset-0" style={{ backgroundColor: "#0f172a" }} />
      )}
      {meteors.map((m) => (
        <div
          key={m.id}
          className="absolute h-px bg-gradient-to-r from-white/0 via-white/40 to-white/0 rounded-full"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${m.length}px`,
            animation: `meteor-fall ${m.duration}s linear ${m.delay}s forwards`,
            opacity: 0,
          }}
        ></div>
      ))}
    </div>
  );
}
