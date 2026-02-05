"use client";

import React from "react";
import { SignedIn, SignedOut, UserButton, RedirectToSignIn } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <Toaster theme="dark" position="top-right" richColors closeButton />
        <div className="relative min-h-screen">
          <AppSidebar />
          <div className="md:pl-56 min-h-screen flex flex-col">
            <header className="sticky top-0 z-30 flex h-14 items-center justify-end border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md px-4 md:px-6">
              <div className="flex items-center gap-2">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "size-8",
                    },
                  }}
                />
              </div>
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
