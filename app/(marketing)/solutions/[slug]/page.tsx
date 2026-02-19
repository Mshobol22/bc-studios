import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSolution } from "@/lib/solutionsData";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "./waitlist-form";
import { SolutionDetailBackground } from "@/components/ui/solution-detail-background";
import { ArrowLeft, ExternalLink } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${solution.title} | BC Studios`,
    description: solution.description,
    openGraph: {
      title: `${solution.title} | BC Studios`,
      description: solution.description,
    },
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  const isLive = solution.status === "Live";
  const isConcept = solution.status === "Concept";
  const hasExternalLink = Boolean(solution.externalLink);

  return (
    <main className="min-h-screen bg-transparent font-sans pt-16 pb-24 relative z-10 overflow-x-hidden">
      <SolutionDetailBackground />

      {/* Hero: full-width header */}
      <header className="w-full border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-md">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Solutions
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
                  solution.status === "Live"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : solution.status === "Beta"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                }`}
              >
                {solution.status}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {solution.title}
              </h1>
              <p className="text-emerald-400/90 text-xl md:text-2xl mt-3 font-medium">
                {solution.tagline}
              </p>
            </div>
            {/* Action: Launch App or Join Waitlist */}
            <div className="shrink-0">
              {isLive && hasExternalLink && (
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white gap-2"
                >
                  <a
                    href={solution.externalLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Launch App <ExternalLink size={18} />
                  </a>
                </Button>
              )}
              {solution.status === "Beta" && hasExternalLink && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 gap-2"
                >
                  <a
                    href={solution.externalLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try Beta <ExternalLink size={18} />
                  </a>
                </Button>
              )}
              {isConcept && <WaitlistForm solutionTitle={solution.title} />}
            </div>
          </div>
        </div>
      </header>

      {/* Bento-style content grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Description card */}
          <section
            className="lg:col-span-2 rounded-2xl border border-slate-700/50 bg-white/5 backdrop-blur-md p-6 md:p-8"
            aria-labelledby="description-heading"
          >
            <h2 id="description-heading" className="text-lg font-semibold text-white mb-4">
              About
            </h2>
            <p className="text-slate-300 leading-relaxed">{solution.description}</p>
          </section>

          {/* Tech stack card */}
          <section
            className="rounded-2xl border border-slate-700/50 bg-white/5 backdrop-blur-md p-6 md:p-8"
            aria-labelledby="tech-heading"
          >
            <h2 id="tech-heading" className="text-lg font-semibold text-white mb-4">
              Tech Stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {solution.techStack.map((tech) => (
                <li
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 text-sm border border-slate-700/50"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 gap-2">
            <Link href="/solutions">
              <ArrowLeft size={18} />
              All Solutions
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
