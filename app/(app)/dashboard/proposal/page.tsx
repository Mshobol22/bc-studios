"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Check, ArrowLeft, Loader2 } from "lucide-react";
import type { PendingProposal } from "@/components/quote-calculator";

const PENDING_PROPOSAL_KEY = "pending_proposal";

function parsePendingProposal(raw: string | null): PendingProposal | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as unknown;
    if (
      data &&
      typeof data === "object" &&
      "name" in data &&
      "email" in data &&
      "projectTypeLabel" in data &&
      "estimateLow" in data &&
      "estimateHigh" in data
    ) {
      return data as PendingProposal;
    }
  } catch {
    // ignore
  }
  return null;
}

function formatPrice(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n}`;
}

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ProposalPage() {
  const [proposal, setProposal] = useState<PendingProposal | null>(null);
  const [mounted, setMounted] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (!proposal) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectType: proposal.projectTypeLabel }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (e) {
      console.error(e);
      setCheckoutLoading(false);
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem(PENDING_PROPOSAL_KEY);
    setProposal(parsePendingProposal(raw));
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="animate-pulse rounded-xl border border-slate-700/80 bg-slate-900/50 h-96" />
      </div>
    );
  }

  if (!proposal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto py-16 text-center"
      >
        <Card className="border-slate-700/80 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white">No active proposal</CardTitle>
            <CardDescription className="text-slate-400">
              You don’t have a pending proposal. Start a new quote to receive a proposal.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full gap-2 bg-emerald-600 hover:bg-emerald-500 text-white">
              <Link href="/quote">
                <ArrowLeft className="size-4" />
                Get a new quote
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-6 pb-12"
    >
      <Card className="overflow-hidden border-slate-700/80 bg-slate-900/50 shadow-xl">
        {/* Header: Logo + Title + Date */}
        <CardHeader className="border-b border-slate-700/80 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-xl text-white">BC</span>
                <span className="w-px h-4 bg-slate-500 rounded-full" />
                <span className="text-slate-400 font-medium text-sm uppercase tracking-wide">studios</span>
              </div>
              <Badge variant="outline" className="text-slate-400 border-slate-600">
                Proposal
              </Badge>
            </div>
            <div className="text-sm text-slate-500">{formatDate()}</div>
          </div>
          <CardTitle className="text-2xl pt-2 text-white">Project Proposal</CardTitle>
          <CardDescription className="text-slate-400">
            This document outlines the scope and estimated investment for your project.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pt-6 space-y-6">
          {/* Client Details */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Client details</h3>
            <div className="rounded-lg border border-slate-700/80 bg-slate-800/30 px-4 py-3 space-y-1">
              <p className="text-white font-medium">{proposal.name}</p>
              <p className="text-sm text-slate-400">{proposal.email}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Scope & estimate</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700/80 hover:bg-transparent">
                  <TableHead className="text-slate-400">Item</TableHead>
                  <TableHead className="text-slate-400 text-right">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-white">Project type</TableCell>
                  <TableCell className="text-right text-slate-300">{proposal.projectTypeLabel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-white">Add-ons</TableCell>
                  <TableCell className="text-right">
                    {proposal.aiIntegration ? (
                      <Badge variant="success">AI Integration</Badge>
                    ) : (
                      <span className="text-slate-500">None</span>
                    )}
                  </TableCell>
                </TableRow>
                {proposal.urgency > 0 && (
                  <TableRow>
                    <TableCell className="font-medium text-white">Urgency</TableCell>
                    <TableCell className="text-right text-slate-300">{proposal.urgency}% rush</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Total Estimate */}
          <div className="rounded-xl border border-slate-700/80 bg-slate-800/40 p-5 text-center">
            <p className="text-sm font-medium text-slate-400 mb-1">Total estimate (range)</p>
            <p
              className="text-3xl md:text-4xl font-bold tabular-nums bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
              style={{ textShadow: "0 0 40px rgba(34, 211, 238, 0.15)" }}
            >
              {formatPrice(proposal.estimateLow)} – {formatPrice(proposal.estimateHigh)}
            </p>
            <p className="text-xs text-slate-500 mt-2">Non-binding. Final scope may vary after discovery.</p>
          </div>

          {proposal.projectDescription?.trim() && (
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-2">Project notes</h3>
              <p className="text-sm text-slate-400 whitespace-pre-wrap rounded-lg border border-slate-700/80 bg-slate-800/30 p-4">
                {proposal.projectDescription.trim()}
              </p>
            </div>
          )}
        </CardContent>

        {/* Action Footer */}
        <CardFooter className="flex flex-col sm:flex-row gap-3 border-t border-slate-700/80 bg-slate-900/30 px-6 py-6">
          <Button
            className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Check className="size-4" />
            )}
            {checkoutLoading ? "Redirecting to checkout…" : "Accept proposal"}
          </Button>
          <Button variant="outline" className="flex-1 gap-2 border-slate-600 text-slate-200 hover:bg-slate-800" asChild>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Download className="size-4" />
              Download PDF
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
