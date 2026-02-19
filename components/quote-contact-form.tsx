"use client";

import React, { useState } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

/**
 * Floating-label style contact form for Get Quote page.
 * Transparent bg, bottom border only. Shimmer submit button.
 */
export function QuoteContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      action="https://formspree.io/f/xnjjdzdy"
      method="POST"
      className="space-y-8"
      onSubmit={() => setIsSubmitting(true)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group">
          <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder=" "
            className={cn(
              "w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600",
              "text-white placeholder:text-slate-500",
              "focus:border-cyan-400 focus:outline-none focus:ring-0",
              "transition-colors duration-200"
            )}
            aria-label="Your full name"
          />
        </div>
        <div className="group">
          <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder=" "
            className={cn(
              "w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600",
              "text-white placeholder:text-slate-500",
              "focus:border-cyan-400 focus:outline-none focus:ring-0",
              "transition-colors duration-200"
            )}
            aria-label="Your email"
          />
        </div>
      </div>

      <div className="group">
        <label htmlFor="project_type" className="block text-sm font-medium text-slate-400 mb-2">
          Project Type
        </label>
        <select
          id="project_type"
          name="project_type"
          className={cn(
            "w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600",
            "text-white focus:border-cyan-400 focus:outline-none focus:ring-0",
            "transition-colors duration-200 appearance-none",
            "cursor-pointer"
          )}
          aria-label="Project type"
        >
          <option value="Web Application" className="bg-slate-900 text-white">
            Web Application
          </option>
          <option value="Mobile App" className="bg-slate-900 text-white">
            Mobile App
          </option>
          <option value="AI Automation" className="bg-slate-900 text-white">
            AI Automation
          </option>
          <option value="UI/UX Design" className="bg-slate-900 text-white">
            UI/UX Design
          </option>
          <option value="Strategy" className="bg-slate-900 text-white">
            Strategy
          </option>
          <option value="Other" className="bg-slate-900 text-white">
            Other
          </option>
        </select>
      </div>

      <div className="group">
        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder=" "
          className={cn(
            "w-full px-0 py-3 bg-transparent border-0 border-b-2 border-slate-600 resize-none",
            "text-white placeholder:text-slate-500",
            "focus:border-cyan-400 focus:outline-none focus:ring-0",
            "transition-colors duration-200"
          )}
          aria-label="Project details"
        />
      </div>

      <div className="pt-4">
        <ShimmerButton
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 text-base"
        >
          {isSubmitting ? "Sending…" : "Get Quote"}
        </ShimmerButton>
      </div>
    </form>
  );
}
