import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SolutionNotFound() {
  return (
    <main className="min-h-screen bg-slate-950 font-sans pt-16 pb-24 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2">Project not found</h1>
        <p className="text-slate-400 mb-8">
          This solution doesn&apos;t exist or has been moved.
        </p>
        <Button asChild variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 gap-2">
          <Link href="/solutions">
            <ArrowLeft size={18} />
            Back to Solutions
          </Link>
        </Button>
      </div>
    </main>
  );
}
