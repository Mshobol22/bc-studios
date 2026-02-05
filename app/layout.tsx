import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://bc-studios.net";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BC Studios - AI SaaS & Web Design Chicago",
    template: "%s | BC Studios - AI SaaS & Web Design Chicago",
  },
  description:
    "BC-studios is a premier creative technology firm delivering pixel-perfect websites, powerful AI tools, and scalable software solutions. AI Automation, SaaS development, and web design in Chicago.",
  keywords: [
    "AI Automation",
    "Web Design Chicago",
    "Vibecoding",
    "SaaS Development",
    "Resume Roaster",
  ],
  authors: [{ name: "BC Studios", url: BASE_URL }],
  openGraph: {
    type: "website",
    siteName: "BC Studios",
    url: BASE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BC Studios - AI SaaS & Web Design Chicago",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Barakah Chaser Studios",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  sameAs: [
    "https://twitter.com/bcstudios",
    "https://www.linkedin.com/company/bc-studios",
    "https://github.com/Mshobol22/bc-studios",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-312-555-0100",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chicago",
      addressRegion: "IL",
      addressCountry: "US",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased mesh-gradient-bg min-h-screen text-white`}>
        <ClerkProvider>
          <ThemeProvider defaultTheme="dark" forcedTheme="dark">
            <PageTransition>{children}</PageTransition>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
