/**
 * Portfolio projects by category for the Products section.
 * Used by ProductCarousel on the home page.
 */
export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  tag: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
};

export type PortfolioCategoryKey = "saas-apps" | "websites";

export type PortfolioCategory = {
  key: PortfolioCategoryKey;
  label: string;
  projects: PortfolioProject[];
};

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    key: "saas-apps",
    label: "SaaS & Apps",
    projects: [
      {
        id: "adchaser",
        title: "ADchaser",
        description: "AI-powered architectural visualization and gallery system.",
        tag: "AI SaaS",
        url: "#",
        imageUrl: "/images/adchaser.jpg",
        imageAlt: "ADchaser - AI-powered architectural visualization and gallery by BC Studios",
      },
      {
        id: "resume-roaster",
        title: "Resume Roaster AI",
        description: "AI-powered resume analysis and constructive feedback for job seekers.",
        tag: "AI SaaS",
        url: "https://roastingresumes.streamlit.app/",
        imageUrl: "/images/resume-roaster.png",
        imageAlt: "Resume Roaster AI - paper on fire, AI resume feedback tool by BC Studios",
      },
      {
        id: "voice2sop",
        title: "Voice2SOP",
        description: "Voice-to-SOP converter that turns spoken instructions into structured procedures.",
        tag: "AI SaaS",
        url: "https://voice2sop.streamlit.app/",
        imageUrl: "/images/voice2sop.png",
        imageAlt: "Voice2SOP - sound waves and voice-to-text converter by BC Studios",
      },
    ],
  },
  {
    key: "websites",
    label: "Websites",
    projects: [
      {
        id: "barakah-furniture",
        title: "Barakah Furniture",
        description: "Modern e-commerce and brand presence for a furniture retailer.",
        tag: "Website",
        url: "https://barakat-furniture.vercel.app/",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Barakah Furniture - modern furniture and e-commerce website by BC Studios",
      },
      {
        id: "salam-kings-school",
        title: "Salam Kings School",
        description: "School website with clear navigation and enrollment information.",
        tag: "Website",
        url: "https://alsalam-kings.vercel.app/",
        imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Salam Kings School - classroom with students, education website by BC Studios",
      },
    ],
  },
];
