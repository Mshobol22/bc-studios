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

export const metadata: Metadata = {
  title: "BC-studios | Creative Technology",
  description: "BC-studios is a premier creative technology firm delivering pixel-perfect websites, powerful AI tools, and scalable software solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
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
