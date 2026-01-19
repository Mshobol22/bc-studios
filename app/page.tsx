"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Smartphone, Globe } from "lucide-react"; 

// --- 1. Typewriter Component (Fixed Animation Logic) ---
const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing loop
  useEffect(() => {
    if (index === words.length) return;

    // If finished typing word, wait then delete
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    // If finished deleting, move to next word
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Typing speed
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

// --- 2. Service Card Component ---
function ServiceCard({ title, desc, icon: Icon }: { title: string; desc: string; icon: any }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200 bg-white">
      <CardHeader>
        <div className="mb-4 w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 transition-colors flex items-center justify-center text-blue-600 group-hover:text-white">
          <Icon size={24} />
        </div>
        <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}

// --- 3. Main Page Component (BC-Studios) ---
export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-36 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-slate-600 text-sm font-semibold tracking-wide uppercase">
              BC-Studios
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            We build digital <br className="hidden md:block" />
            <Typewriter words={["Experiences.", "Applications.", "Automation.", "Realities."]} />
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A creative technology studio delivering pixel-perfect websites, 
            powerful AI tools, and scalable software solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-full">
              Start Project
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What We Do</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
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

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 z-0"></div>
             <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your business?</h2>
                <p className="text-slate-300 mb-8 text-lg max-w-xl mx-auto">
                  Let's discuss how BC-Studios can bring your vision to life with modern technology.
                </p>
                <Button className="h-14 px-8 text-lg bg-white text-slate-900 hover:bg-blue-50 rounded-full font-semibold">
                  Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}