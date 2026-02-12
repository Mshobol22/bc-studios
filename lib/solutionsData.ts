// lib/solutionsData.ts

export type SolutionStatus = "Live" | "Beta" | "Concept";

export interface Solution {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: SolutionStatus;
  externalLink?: string;
  techStack: string[];
  thumbnail?: string; // Optional: specific image for the card
}

export const solutions: Solution[] = [
  // --- LIVE APPS ---
  {
    slug: "resume-roaster",
    title: "Resume Roaster",
    tagline: "AI-Powered Career Optimization",
    description: "Beat the ATS bots. Deep analysis and rewriting of resumes to match job descriptions.",
    status: "Live",
    externalLink: "https://resume-roaster.com",
    techStack: ["Next.js", "OpenAI", "Stripe"]
  },
  {
    slug: "voice-2-sop",
    title: "Voice2SOP",
    tagline: "Voice to Standard Operating Procedure",
    description: "Turn voice notes into formatted, professional SOP documents instantly.",
    status: "Live", // Assuming live based on context
    externalLink: "https://voice2sop.com",
    techStack: ["Whisper AI", "React", "Python"]
  },
  
  // --- IN DEVELOPMENT ---
  {
    slug: "adchaser",
    title: "ADchaser",
    tagline: "High-Conversion Video Ads",
    description: "Generate viral video hooks and scripts in seconds using Claude 3.5 Sonnet.",
    status: "Beta",
    externalLink: "https://a-dchaser.vercel.app/",
    techStack: ["Next.js", "Claude 3.5", "Tailwind"]
  },

  // --- CONCEPTS (Landing Pages Only) ---
  {
    slug: "tow-command",
    title: "TowCommand",
    tagline: "Uber for Towing Logistics",
    description: "Centralized dispatch connecting stranded drivers with tow trucks.",
    status: "Concept",
    techStack: ["React Native", "Supabase", "Maps"]
  }
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}