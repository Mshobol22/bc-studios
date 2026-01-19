"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Code, Zap, Smartphone, Globe, Menu, X, 
  ExternalLink, ChevronRight, Terminal, Database, Cpu 
} from "lucide-react"; 

// --- 1. UTILITY COMPONENTS (Typewriter & Smooth Scroll) ---

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) return;
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1500 : 150, parseInt(String(Math.random() * 350))));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-blue-600 font-bold">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
};

const ScrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// --- 2. SUB-COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <span className="text-slate-900 font-bold text-lg tracking-tight">BC-Studios</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => ScrollToSection('services')} className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Services</button>
          <button onClick={() => ScrollToSection('work')} className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Work</button>
          <button onClick={() => ScrollToSection('contact')} className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Contact</button>
          <Button onClick={() => ScrollToSection('contact')} size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5">
            Start Project
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 p-4 flex flex-col gap-4 shadow-xl">
          <button onClick={() => { ScrollToSection('services'); setIsOpen(false); }} className="text-left text-slate-600 font-medium py-2">Services</button>
          <button onClick={() => { ScrollToSection('work'); setIsOpen(false); }} className="text-left text-slate-600 font-medium py-2">Work</button>
          <button onClick={() => { ScrollToSection('contact'); setIsOpen(false); }} className="text-left text-slate-600 font-medium py-2">Contact</button>
          <Button onClick={() => { ScrollToSection('contact'); setIsOpen(false); }} className="w-full bg-blue-600 text-white">Start Project</Button>
        </div>
      )}
    </nav>
  );
};

const TechBadge = ({ text, icon: Icon }: { text: string, icon: any }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mx-4 whitespace-nowrap">
    <Icon size={16} className="text-blue-600" />
    <span className="text-slate-700 font-semibold text-sm">{text}</span>
  </div>
);

const ServiceCard = ({ title, desc, icon: Icon }: { title: string; desc: string; icon: any }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200 bg-white h-full flex flex-col">
    <CardHeader>
      <div className="mb-4 w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 transition-colors flex items-center justify-center text-blue-600 group-hover:text-white">
        <Icon size={24} />
      </div>
      <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </CardContent>
  </Card>
);

const ProjectCard = ({ title, desc, tag, link }: { title: string; desc: string; tag: string, link: string }) => (
  <Card className="overflow-hidden border-slate-200 hover:shadow-2xl transition-all duration-500 hover:border-blue-200 group h-full flex flex-col">
    <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center group-hover:bg-blue-50 transition-colors">
        {/* Placeholder for Project Screenshot */}
        <div className="text-center p-6">
            <Globe className="w-12 h-12 text-slate-300 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
            <span className="text-slate-400 text-sm font-medium group-hover:text-blue-400">View Application</span>
        </div>
        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors" />
    </div>
    <CardHeader>
      <div className="flex justify-between items-start mb-2">
        <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wider">{tag}</span>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-slate-600">{desc}</p>
    </CardContent>
    <CardFooter>
        <Button asChild className="w-full gap-2 group-hover:bg-blue-600 group-hover:text-white transition-all" variant="outline">
            <a href={link} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalLink size={16} />
            </a>
        </Button>
    </CardFooter>
  </Card>
);

// --- 3. MAIN PAGE COMPONENT ---

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100 pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-slate-600 text-sm font-semibold tracking-wide uppercase">
              Accepting New Clients
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            We build digital <br className="hidden md:block" />
            <Typewriter words={["Experiences.", "Applications.", "Automation.", "Realities."]} />
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            BC-Studios is a premier creative technology firm delivering pixel-perfect websites, 
            powerful AI tools, and scalable software solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => ScrollToSection('contact')} size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-full">
              Start Project
            </Button>
            <Button onClick={() => ScrollToSection('work')} size="lg" variant="outline" className="h-12 px-8 text-base border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee (Infinite Scroll) */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50 overflow-hidden">
        <div className="text-center mb-6">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Powered By Modern Tech</p>
        </div>
        {/* Simple CSS Marquee Implementation */}
        <div className="relative flex overflow-x-hidden group">
            <div className="py-2 animate-marquee whitespace-nowrap flex">
                <TechBadge text="Next.js" icon={Code} />
                <TechBadge text="React" icon={Code} />
                <TechBadge text="TypeScript" icon={Terminal} />
                <TechBadge text="OpenAI" icon={Cpu} />
                <TechBadge text="Supabase" icon={Database} />
                <TechBadge text="Tailwind CSS" icon={Code} />
                <TechBadge text="Node.js" icon={Terminal} />
                <TechBadge text="Vercel" icon={Globe} />
            </div>
            {/* Duplicate for seamless loop */}
            <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex">
                <TechBadge text="Next.js" icon={Code} />
                <TechBadge text="React" icon={Code} />
                <TechBadge text="TypeScript" icon={Terminal} />
                <TechBadge text="OpenAI" icon={Cpu} />
                <TechBadge text="Supabase" icon={Database} />
                <TechBadge text="Tailwind CSS" icon={Code} />
                <TechBadge text="Node.js" icon={Terminal} />
                <TechBadge text="Vercel" icon={Globe} />
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Expertise</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
                Comprehensive tech solutions tailored for growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              title="Web Development" 
              desc="Fast, SEO-optimized websites built with Next.js. We ensure your digital presence is flawless."
              icon={Globe}
            />
            <ServiceCard 
              title="Mobile Apps" 
              desc="Cross-platform mobile applications that provide seamless user experiences on iOS and Android."
              icon={Smartphone}
            />
            <ServiceCard 
              title="AI Integration" 
              desc="Leverage the power of Large Language Models to automate support, sales, and data analysis."
              icon={Zap}
            />
            <ServiceCard 
              title="SaaS Engineering" 
              desc="End-to-end software development. We turn complex ideas into shipping products."
              icon={Code}
            />
          </div>
        </div>
      </section>

      {/* Portfolio/Work Section */}
      <section id="work" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
                    <p className="text-slate-600 max-w-xl">
                        See how we help businesses transform with technology.
                    </p>
                </div>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-semibold gap-1">
                    View All Projects <ChevronRight size={16} />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* PROJECT 1 */}
                <ProjectCard 
                    title="Resume Roaster AI"
                    desc="An AI-powered application that analyzes resumes and provides brutal, constructive feedback to help job seekers improve."
                    tag="AI SaaS"
                    // UPDATE THIS LINK BELOW
                    link="https://roastingresumes.streamlit.app/" 
                />

                {/* PROJECT 2 */}
                <ProjectCard 
                    title="Voice2SOP"
                    desc="An AI powered application that records voice instructions and converts them into structured operational procedures."
                    tag="AI SaaS"
                    // UPDATE THIS LINK BELOW
                    link="https://voice2sop.streamlit.app/"
                />
            </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section id="contact" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 z-0"></div>
             
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
             <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

             <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to launch?</h2>
                <p className="text-slate-300 mb-8 text-lg max-w-xl mx-auto">
                  Let's discuss how BC-Studios can bring your vision to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="h-14 px-8 text-lg bg-white text-slate-900 hover:bg-blue-50 rounded-full font-semibold">
                        <a href="mailto:m@bc-studios.org">
                            Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200 text-slate-600 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} BC-Studios. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
            </div>
        </div>
      </footer>

      {/* CSS for Marquee Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
      `}</style>
    </main>
  );
}