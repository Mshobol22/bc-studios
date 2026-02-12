"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  solutionTitle: string;
};

export function WaitlistForm({ solutionTitle }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    try {
      const body = new URLSearchParams({
        email: email.trim(),
        _subject: `Waitlist: ${solutionTitle}`,
      });
      const res = await fetch("https://formspree.io/f/xnjjdzdy", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-400 text-sm">
        You&apos;re on the list. We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto min-w-[260px]">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === "submitting"}
        className="flex-1 min-w-0 px-4 py-2.5 rounded-lg border border-slate-600 bg-slate-900/80 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 outline-none text-sm disabled:opacity-50"
        aria-label="Email for waitlist"
      />
      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
      >
        {status === "submitting" ? "Joining…" : "Join Waitlist"}
      </Button>
      {status === "error" && (
        <p className="text-red-400 text-xs col-span-full">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
