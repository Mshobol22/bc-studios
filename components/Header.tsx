"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50 transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer relative group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="relative flex items-center justify-center shrink-0" style={{ minHeight: 60, minWidth: 196 }}>
            <video
              src="/logo-animation.mp4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="block relative z-10 object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-screen"
              style={{ height: 60, width: "auto", minWidth: 136 }}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => ScrollToSection("about")} className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
            About
          </button>
          <button onClick={() => ScrollToSection("services")} className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
            Services
          </button>
          <button onClick={() => ScrollToSection("work")} className="text-slate-300 hover:text-white font-medium text-sm transition-colors">
            Work
          </button>
          <Button onClick={() => ScrollToSection("contact")} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 shadow-md">
            Start Project
          </Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col gap-4 shadow-xl">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsOpen(false);
            }}
            className="text-left text-slate-300 hover:text-white font-medium py-2"
          >
            Home
          </button>
          <button onClick={() => { ScrollToSection("about"); setIsOpen(false); }} className="text-left text-slate-300 hover:text-white font-medium py-2">
            About
          </button>
          <button onClick={() => { ScrollToSection("services"); setIsOpen(false); }} className="text-left text-slate-300 hover:text-white font-medium py-2">
            Services
          </button>
          <button onClick={() => { ScrollToSection("work"); setIsOpen(false); }} className="text-left text-slate-300 hover:text-white font-medium py-2">
            Work
          </button>
          <button onClick={() => { ScrollToSection("contact"); setIsOpen(false); }} className="text-left text-slate-300 hover:text-white font-medium py-2">
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}
