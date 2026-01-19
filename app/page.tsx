"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Code, Zap, Smartphone, Globe, Menu, X, 
  ExternalLink, ChevronRight, Terminal, Database, Cpu, Send, Mail, MapPin 
} from "lucide-react"; 

// --- 1. UTILITY COMPONENTS ---

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
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer relative group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* ANIMATED LOGO CONTAINER */}
          <div className="relative inline-block animate-logo-float">
            <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
            <img 
              src="/barakah-chaser-logo.png" 
              alt="BARAKAH CHASER" 
              className="h-12 w-auto relative z-10 transition-transform duration-300 group-hover:scale-110 animate-sparkle-logo"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => ScrollToSection('services')} className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Services</button>
          <button onClick={() => ScrollToSection('work')} className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Work</button>
          <Button onClick={() => ScrollToSection('contact')} size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 shadow-md">
            Start Project
          </Button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 p-4 flex flex-col gap-4 shadow-xl">
          <button onClick={() => { ScrollToSection('services'); setIsOpen(false); }} className="text-left text-slate-600 font-medium py-2">Services</button>
          <button onClick={() => { ScrollToSection('work'); setIsOpen(false); }} className="text-left text-slate-600 font-medium py-2">Work</button>
          <Button onClick={() => { ScrollToSection('contact'); setIsOpen(false); }} className="w-full bg-blue-600 text-white">Start Project</Button>
        </div>
      )}
    </nav>
  );
};

const TechBadge = ({ text, icon: Icon }: { text: string, icon: any }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/60 rounded-full mx-4 whitespace-nowrap shadow-sm">
    <Icon size={16} className="text-blue-600" />
    <span className="text-slate-700 font-semibold text-sm">{text}</span>
  </div>
);

const ServiceCard = ({ title, desc, icon: Icon }: { title: string; desc: string; icon: any }) => (
  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-slate-100 bg-white/80 backdrop-blur-sm h-full flex flex-col relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
    <CardHeader>
      <div className="mb-4 w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 transition-colors flex items-center justify-center text-blue-600 group-hover:text-white shadow-inner">
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
  <Card className="overflow-hidden border-slate-200 hover:shadow-2xl transition-all duration-500 hover:border-blue-200 group h-full flex flex-col bg-white">
    <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center group-hover:bg-blue-50 transition-colors">
        <div className="text-center p-6 transform group-hover:scale-105 transition-transform duration-500">
            <Globe className="w-12 h-12 text-slate-300 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
            <span className="text-slate-400 text-sm font-medium group-hover:text-blue-400">View Application</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <CardHeader>
      <div className="flex justify-between items-start mb-2">
        <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wider border border-blue-100">{tag}</span>
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
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 pt-16 relative">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 animate-rainbow-bg"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm animate-fade-in-up hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-slate-600 text-xs font-bold tracking-widest uppercase">
              Accepting New Clients
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            We build digital <br className="hidden md:block" />
            <Typewriter words={["Experiences.", "Applications.", "Automation.", "Realities."]} />
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            BC-Studios is a premier creative technology firm delivering pixel-perfect websites, 
            powerful AI tools, and scalable software solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => ScrollToSection('contact')} size="lg" className="h-14 px-8 text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 rounded-full transition-all hover:scale-105">
              Start Project
            </Button>
            <Button onClick={() => ScrollToSection('work')} size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-200 bg-white/50 hover:bg-white text-slate-700 rounded-full backdrop-blur-sm transition-all hover:scale-105">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-slate-200/60 bg-white/40 backdrop-blur-sm overflow-hidden z-10 relative">
        <div className="text-center mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Powered By Modern Tech</p>
        </div>
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
      <section id="services" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Expertise</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard title="Web Development" desc="Fast, SEO-optimized websites built with Next.js." icon={Globe} />
            <ServiceCard title="Mobile Apps" desc="Cross-platform mobile applications for iOS and Android." icon={Smartphone} />
            <ServiceCard title="AI Integration" desc="Leverage Large Language Models to automate your business." icon={Zap} />
            <ServiceCard title="SaaS Engineering" desc="End-to-end software development from idea to product." icon={Code} />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-24 bg-white relative z-10 border-t border-slate-100">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
                    <p className="text-slate-600 max-w-xl text-lg">See how we help businesses transform with technology.</p>
                </div>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-semibold gap-1">
                    View All Projects <ChevronRight size={16} />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectCard title="Resume Roaster AI" desc="An AI that analyzes resumes and provides constructive feedback." tag="AI SaaS" link="https://roastingresumes.streamlit.app/" />
                <ProjectCard title="Voice2SOP" desc="Converts voice instructions into structured operational procedures." tag="AI SaaS" link="https://voice2sop.streamlit.app/" />
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
             <div className="p-10 md:p-12 text-white bg-slate-900 relative w-full md:w-2/5 flex flex-col justify-between">
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-6">Let's build something great.</h3>
                    <p className="text-slate-300 mb-8 leading-relaxed">Ready to start? Get back to you within 24 hours.</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-300"><Mail className="w-5 h-5 text-blue-400" /><span>core@bc-studios.org</span></div>
                        <div className="flex items-center gap-3 text-slate-300"><MapPin className="w-5 h-5 text-purple-400" /><span>Chicago, IL</span></div>
                    </div>
                </div>
             </div>
             <div className="p-10 md:p-12 bg-white w-full md:w-3/5">
                <form action="https://formspree.io/f/xnjjdzdy" method="POST" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input required name="name" type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-slate-200" />
                        <input required name="email" type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-200" />
                    </div>
                    <select name="project_type" className="w-full px-4 py-3 rounded-lg border border-slate-200"><option>Web Application</option><option>Mobile App</option><option>AI Integration</option></select>
                    <textarea required name="message" rows={4} placeholder="Project Details" className="w-full px-4 py-3 rounded-lg border border-slate-200 resize-none"></textarea>
                    <Button className="w-full h-12 bg-blue-600 text-white font-bold rounded-lg shadow-lg">Send Message <Send className="ml-2 w-4 h-4" /></Button>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200 text-slate-600 text-sm relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} BC-Studios. All rights reserved.</p>
        </div>
      </footer>

      {/* REFINED ANIMATION STYLES */}
      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
        @keyframes marquee2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-marquee2 { animation: marquee2 25s linear infinite; }

        /* THE LOGO ANIMATION FIXES */
        @keyframes logo-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
        .animate-logo-float {
          animation: logo-float 4s ease-in-out infinite;
        }

        @keyframes sparkle-logo {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.2)) brightness(1); }
          50% { filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) brightness(1.1); }
        }
        .animate-sparkle-logo {
          animation: sparkle-logo 3s ease-in-out infinite;
        }

        /* TWINKLING STARS BACKGROUND FOR LOGO */
        .animate-logo-float::before {
          content: '✦';
          position: absolute;
          font-size: 8px;
          color: #3b82f6;
          top: -5px;
          right: 0;
          animation: star-twinkle 2s infinite;
          opacity: 0.7;
        }
        .animate-logo-float::after {
          content: '✧';
          position: absolute;
          font-size: 10px;
          color: #6366f1;
          bottom: 5px;
          left: -10px;
          animation: star-twinkle 2s infinite 1s;
          opacity: 0.5;
        }

        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes rainbow-bg {
          0% { background-color: rgba(59, 130, 246, 0.03); }
          50% { background-color: rgba(147, 51, 234, 0.03); }
          100% { background-color: rgba(59, 130, 246, 0.03); }
        }
        .animate-rainbow-bg { animation: rainbow-bg 8s ease-in-out infinite; }
      `}</style>
    </main>
  );
}