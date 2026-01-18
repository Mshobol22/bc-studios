import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* NAVIGATION */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tighter">BC Studios</div>
        <div className="space-x-4 hidden md:flex">
          <Link href="#services" className="hover:text-blue-600 transition">Services</Link>
          <Link href="#projects" className="hover:text-blue-600 transition">Projects</Link>
        </div>
        <Button asChild>
          <Link href="mailto:m@bc-studios.net">Contact Us</Link>
        </Button>
      </nav>

      {/* HERO SECTION */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Building the <span className="text-blue-600">Intelligent Future</span>.
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Barakah Chaser Studios is a full-stack AI development house. 
          We turn complex problems into elegant software solutions.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Our Work
          </Button>
          <Button variant="outline" size="lg">
            Our Stack
          </Button>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard 
              title="AI SaaS Development" 
              desc="End-to-end development of scalable AI applications using Next.js and Python." 
            />
            <ServiceCard 
              title="Automation Workflows" 
              desc="Streamlining business logic with n8n, Supabase, and custom API integrations." 
            />
            <ServiceCard 
              title="Data Analytics" 
              desc="Turning raw data into actionable insights for local and global markets." 
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t">
        © {new Date().getFullYear()} Barakah Chaser Studios. All rights reserved.
      </footer>
    </div>
  );
}

// Simple helper component for cards
function ServiceCard({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{desc}</p>
      </CardContent>
    </Card>
  );
}