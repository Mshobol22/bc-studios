"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToSection = (id: string) => {
  if (typeof document === "undefined") return;
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href === "/" && pathname === "/");

  return (
    <Link
      href={href}
      className={`nav-link nav-link-dark nav-link-underline relative inline-block py-1 ${isActive ? "after:!w-full" : ""}`}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/solutions", label: "Products" },
    { href: "/services", label: "Agency" },
    { href: "/quote", label: "Get Quote" },
  ] as const;

  return (
    <nav className="sticky top-0 w-full z-50 bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-800/80 transition-all shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 cursor-pointer relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg py-1"
          aria-label="BC-studios home"
        >
          <span className="flex items-baseline gap-2 transition-transform duration-300 group-hover:scale-[1.02] nav-logo-text nav-logo-dark">
            <span className="font-bold text-xl tracking-tight text-white">BC</span>
            <span className="w-px h-4 bg-slate-500 rounded-full opacity-80" aria-hidden />
            <span className="text-slate-300 font-medium text-sm tracking-wide uppercase">studios</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
          <Button asChild size="sm" variant="outline" className="rounded-full px-5 border-slate-600 bg-transparent hover:bg-slate-700/50 text-white font-medium">
            <Link href="/dashboard">Login</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Button asChild size="sm" variant="ghost" className="rounded-full px-4 text-white">
            <Link href="/dashboard">Login</Link>
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="nav-link nav-link-dark p-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800 p-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setIsOpen(false)} className="nav-link nav-link-dark text-left py-2">
              {label}
            </Link>
          ))}
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="nav-link nav-link-dark text-left py-2">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
