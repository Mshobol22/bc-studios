"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Code, Zap, Smartphone, Globe, Menu, X, 
  ExternalLink, ChevronRight, Terminal, Database, Cpu, Send, Mail, MapPin,
  MessageCircle
} from "lucide-react";
import Header from "@/components/Header"; 

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
    <span className="text-blue-400 font-bold">
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

const TechBadge = ({ text, icon: Icon }: { text: string, icon: any }) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/60 rounded-full mx-4 whitespace-nowrap shadow-sm">
    <Icon size={16} className="text-blue-400" />
    <span className="text-slate-300 font-semibold text-sm">{text}</span>
  </div>
);

const ServiceCard = ({ title, desc, icon: Icon }: { title: string; desc: string; icon: any }) => (
  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-slate-800 bg-slate-900/80 backdrop-blur-sm h-full flex flex-col relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom"></div>
    <CardHeader>
      <div className="mb-4 w-12 h-12 rounded-xl bg-blue-950 group-hover:bg-blue-600 transition-colors flex items-center justify-center text-blue-400 group-hover:text-white shadow-inner">
        <Icon size={24} />
      </div>
      <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-slate-300 leading-relaxed">{desc}</p>
    </CardContent>
  </Card>
);

const ProjectCard = ({ title, desc, tag, link, imageUrl }: { title: string; desc: string; tag: string, link: string, imageUrl: string }) => (
  <Card className="overflow-hidden border-slate-800 hover:shadow-2xl transition-all duration-500 hover:border-blue-600/50 group h-full flex flex-col bg-slate-900">
    <div className="h-48 relative overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <CardHeader>
      <div className="flex justify-between items-start mb-2">
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <span className="px-2 py-1 bg-blue-950 text-blue-400 text-xs font-bold rounded uppercase tracking-wider border border-blue-800">{tag}</span>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-slate-300">{desc}</p>
    </CardContent>
    <CardFooter>
        <Button asChild className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all" variant="default">
            <a href={link} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalLink size={16} />
            </a>
        </Button>
    </CardFooter>
  </Card>
);

// --- CHAT WIDGET COMPONENT ---
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'bot' | 'user', text: string }>>([
    { type: 'bot', text: "Hi! I'm the BC-Studios assistant. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState<'options' | 'inputting_project' | 'final_cta'>('options');
  const [projectDescription, setProjectDescription] = useState('');

  const quickQuestions = [
    "What services do you offer?",
    "How much does a project cost?",
    "I want to start a project."
  ];

  const responses: Record<string, string> = {
    "What services do you offer?": "We offer Web Development (Next.js websites), Mobile Apps (iOS/Android), AI Integration (LLM automation), and SaaS Engineering (end-to-end software development). Would you like details on any specific service?",
    "How much does a project cost?": "Project costs vary based on scope and complexity. We provide custom quotes after understanding your needs. Typically, websites start around $5,000-$15,000, while SaaS platforms range from $20,000-$100,000+. Let's discuss your project to get an accurate estimate!",
    "I want to start a project.": "Great! Let's get started. You can fill out our contact form on this page, email us at core@bc-studios.org, or tell me more about your project here and I'll help guide you through the next steps."
  };

  // Helper function to render messages with clickable emails
  const renderMessage = (text: string) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const parts = text.split(emailRegex);
    
    return parts.map((part, idx) => {
      if (emailRegex.test(part)) {
        return (
          <a
            key={idx}
            href={`mailto:${part}`}
            className="underline text-blue-400 hover:text-blue-300"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const handleQuestionClick = (question: string) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    setIsTyping(true);

    // Special handling for "I want to start a project"
    if (question === "I want to start a project.") {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { type: 'bot', text: responses[question] }]);
        setChatMode('inputting_project');
      }, 1000);
    } else {
      // Simulate typing delay for other questions
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { type: 'bot', text: responses[question] || "I'm here to help! Feel free to ask more questions." }]);
      }, 1000);
    }
  };

  const handleProjectSubmit = () => {
    if (!projectDescription.trim()) return;

    // Add user message with description
    setMessages(prev => [...prev, { type: 'user', text: projectDescription }]);
    setProjectDescription('');
    setIsTyping(true);

    // Bot responds with email CTA
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "Thanks! I've prepared an email with those details for our team. Click below to send it." 
      }]);
      setChatMode('final_cta');
    }, 1000);
  };

  const handleChatToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // Reset state when closing
    if (!newIsOpen) {
      setChatMode('options');
      setProjectDescription('');
      setMessages([{ type: 'bot', text: "Hi! I'm the BC-Studios assistant. How can I help you today?" }]);
    }
  };

  const getEmailLink = () => {
    // Find the last user message (should be the project description)
    const userMessages = messages.filter(m => m.type === 'user' && m.text !== "I want to start a project.");
    const projectDescription = userMessages.length > 0 
      ? userMessages[userMessages.length - 1].text 
      : '';
    const encodedDescription = encodeURIComponent(projectDescription);
    return `mailto:core@bc-studios.org?subject=New Project Inquiry&body=${encodedDescription}`;
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-slate-800/50 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">BC-Studios Assistant</p>
                  <p className="text-slate-400 text-xs">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{renderMessage(msg.text)}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Footer Based on Chat Mode */}
            {!isTyping && chatMode === 'options' && (
              <div className="border-t border-slate-700 p-4 space-y-2 bg-slate-800/30">
                <p className="text-slate-400 text-xs mb-2">Quick questions:</p>
                {quickQuestions.map((question, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleQuestionClick(question)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            )}

            {!isTyping && chatMode === 'inputting_project' && (
              <div className="border-t border-slate-700 p-4 space-y-2 bg-slate-800/30">
                <p className="text-slate-400 text-xs mb-2">Tell us about your project:</p>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your project idea, goals, timeline, and any specific requirements..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm min-h-[100px]"
                  rows={4}
                />
                <motion.button
                  onClick={handleProjectSubmit}
                  disabled={!projectDescription.trim()}
                  whileHover={{ scale: projectDescription.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: projectDescription.trim() ? 0.98 : 1 }}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors ${
                    !projectDescription.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Submit Description
                </motion.button>
              </div>
            )}

            {!isTyping && chatMode === 'final_cta' && (
              <div className="border-t border-slate-700 p-4 bg-slate-800/30">
                <motion.a
                  href={getEmailLink()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-3 text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  Click to Compose Email to Core Team
                </motion.a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Message Button */}
      <motion.button
        onClick={handleChatToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-colors"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
};

// --- 3. MAIN PAGE COMPONENT ---

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 font-sans selection:bg-blue-900 pt-16 relative overflow-x-hidden">

      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 shadow-sm animate-fade-in-up hover:scale-105 transition-transform cursor-default backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-slate-300 text-xs font-bold tracking-widest uppercase">
              Accepting New Clients
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
            We build digital <br className="hidden md:block" />
            <Typewriter words={["Experiences.", "Applications.", "Automation.", "Realities."]} />
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            BC-Studios is a premier creative technology firm delivering pixel-perfect websites, 
            powerful AI tools, and scalable software solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => ScrollToSection('contact')} size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/20 rounded-full transition-all hover:scale-105">
              Start Project
            </Button>
            <Button onClick={() => ScrollToSection('work')} size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white rounded-full backdrop-blur-sm transition-all hover:scale-105">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About BC-Studios</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-slate-300 leading-relaxed">
              We are a Chicago-based creative technology firm. We bridge the gap between imagination and engineering. 
              From AI-driven SaaS platforms to pixel-perfect web experiences, we build digital assets that drive business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-slate-800/60 bg-slate-900/40 backdrop-blur-sm overflow-hidden z-10 relative">
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Expertise</h2>
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
      <section id="work" className="py-24 bg-slate-900/50 relative z-10 border-t border-slate-800">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
                    <p className="text-slate-300 max-w-xl text-lg">See how we help businesses transform with technology.</p>
                </div>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 font-semibold gap-1">
                    View All Projects <ChevronRight size={16} />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProjectCard 
                  title="Resume Roaster AI" 
                  desc="An AI-powered application that analyzes resumes and provides brutal, constructive feedback to help job seekers improve." 
                  tag="AI SaaS" 
                  link="https://roastingresumes.streamlit.app/"
                  imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                />
                <ProjectCard 
                  title="Voice2SOP" 
                  desc="A voice-to-SOP converter that records voice instructions and converts them into structured operational procedures." 
                  tag="AI SaaS" 
                  link="https://voice2sop.streamlit.app/"
                  imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                />
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-b from-slate-950/90 to-slate-900/90 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row backdrop-blur-sm">
             <div className="p-10 md:p-12 text-white bg-slate-900/80 backdrop-blur-sm relative w-full md:w-2/5 flex flex-col justify-between">
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-6">Let's build something great.</h3>
                    <p className="text-slate-300 mb-8 leading-relaxed">Ready to start? Get back to you within 24 hours.</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-300"><Mail className="w-5 h-5 text-blue-400" /><span>core@bc-studios.org</span></div>
                        <div className="flex items-center gap-3 text-slate-300"><MapPin className="w-5 h-5 text-purple-400" /><span>Chicago, IL</span></div>
                    </div>
                </div>
             </div>
             <div className="p-10 md:p-12 bg-slate-800/80 backdrop-blur-sm w-full md:w-3/5">
                <form action="https://formspree.io/f/xnjjdzdy" method="POST" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input required name="name" type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                        <input required name="email" type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                    </div>
                    <select name="project_type" className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                      <option>Web Application</option>
                      <option>Mobile App</option>
                      <option>AI Integration</option>
                      <option>Website Redesign</option>
                      <option>Other</option>
                    </select>
                    <textarea required name="message" rows={4} placeholder="Project Details" className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"></textarea>
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1">
                      Send Message <Send className="ml-2 w-4 h-4" />
                    </Button>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-b from-slate-950/80 to-slate-900/80 backdrop-blur-sm border-t border-slate-800 text-slate-400 text-sm relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} BC-Studios. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />

      {/* REFINED ANIMATION STYLES */}
      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
        @keyframes marquee2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-marquee2 { animation: marquee2 25s linear infinite; }

        /* MOON GLOW ANIMATION - Pulsing blue/white drop-shadow (for logo) */
        @keyframes moon-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
          }
          50% { 
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.6));
          }
        }
        
        .animate-moon-glow {
          animation: moon-glow 3s ease-in-out infinite;
        }

        /* TWINKLING STARS - Opacity 0 to 1 */
        @keyframes star-twinkle-1 {
          0%, 100% { opacity: 0; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes star-twinkle-2 {
          0%, 100% { opacity: 0; transform: scale(0.9) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(-180deg); }
        }
        
        .animate-star-twinkle-1 {
          animation: star-twinkle-1 2s ease-in-out infinite;
        }
        
        .animate-star-twinkle-2 {
          animation: star-twinkle-2 2.5s ease-in-out infinite 0.5s;
        }

        /* STARRY SKY ANIMATIONS */
        @keyframes starry-sky {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        
        .animate-starry-sky {
          animation: starry-sky 20s linear infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        /* MOON GLOW EFFECT */
        .moon-glow {
          background: radial-gradient(circle, rgba(255, 255, 200, 0.3) 0%, rgba(255, 255, 180, 0.2) 30%, transparent 70%);
          filter: blur(60px);
        }
        
        .moon-glow-inner {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
        }
      `}</style>
    </main>
  );
}