"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (pathname.startsWith(href) && href !== "/dashboard");
        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
            )}
          >
            <Icon className="size-5 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppSidebar() {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 z-40 h-screen w-56 flex-col border-r border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
        <div className="flex h-14 items-center gap-2 border-b border-slate-800/80 px-4">
          <span className="font-semibold text-white">Client Portal</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <NavLinks />
        </div>
      </aside>

      {/* Mobile: Sheet trigger + Sheet */}
      <div className="md:hidden fixed left-0 top-0 z-40 flex h-14 w-full items-center border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger className="flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-slate-800 bg-slate-900 p-0">
            <div className="flex h-14 items-center border-b border-slate-800 px-4">
              <span className="font-semibold text-white">Client Portal</span>
            </div>
            <div className="p-3">
              <NavLinks onLinkClick={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
