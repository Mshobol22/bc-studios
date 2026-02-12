"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Smartphone,
  Globe,
  Send,
  Mail,
  MapPin,
  LayoutTemplate,
  Target,
  Settings,
  Cloud,
  Calendar,
  TrendingUp,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { HeroGlobe } from "@/components/landing/hero-globe";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-data";
import Link from "next/link";

const ScrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBlink((b) => !b), 500);
    return () => clearTimeout(t);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) return;
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => setSubIndex((s) => s + (reverse ? -1 : 1)),
      Math.max(reverse ? 75 : subIndex === words[index].length ? 1500 : 150, 100)
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-emerald-400 font-bold">
      {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
};

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const SERVICE_ITEMS = [
  { title: "Mobile", desc: "Native and cross-platform apps for iOS and Android that users love.", icon: Smartphone },
  { title: "Web", desc: "Fast, scalable web applications and sites built with modern stacks.", icon: Globe },
  { title: "UI/UX", desc: "User-centered design that drives engagement and conversion.", icon: LayoutTemplate },
  { title: "Strategy", desc: "Product and technical strategy to align vision with execution.", icon: Target },
  { title: "Maintenance", desc: "Ongoing support, updates, and performance optimization.", icon: Settings },
  { title: "Cloud", desc: "Cloud infrastructure, DevOps, and scalable deployments.", icon: Cloud },
];

const PROCESS_STEPS = [
  { step: "01", title: "Discover", desc: "We align on your vision, goals, and technical requirements." },
  { step: "02", title: "Design", desc: "Wireframes, prototypes, and a clear roadmap for build." },
  { step: "03", title: "Develop", desc: "Agile development with regular demos and feedback loops." },
  { step: "04", title: "Deploy", desc: "Launch, monitor, and iterate with ongoing support." },
];

const STATS = [
  { label: "On-Time Delivery", value: "98%", icon: Calendar },
  { label: "Delivery Rate", value: "100+", sub: "Projects", icon: TrendingUp },
  { label: "Support", value: "24/7", icon: Headphones },
];

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  return (
    <main className="min-h-screen bg-transparent font-sans selection:bg-amber-900/50 pt-16 relative overflow-x-hidden text-balance">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-slate-950" />
        <div className="northern-light northern-1" />
        <div className="northern-light northern-2" />
        <div className="northern-light northern-3" />
        <div className="northern-light northern-4" />
        <div className="northern-light northern-5" />
        <div className="northern-light northern-6" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,transparent_0%,rgba(2,6,23,0.2)_45%,rgba(2,6,23,0.5)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/50" />
      </div>

      <section id="hero" className="relative py-24 lg:py-32 z-10 min-h-[85vh] flex items-center" aria-label="Hero">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
            alt="Team collaboration and digital innovation - BC Studios Chicago web design, AI automation and SaaS development"
            fill
            className="object-cover"
            priority={true}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
        </div>

        <div className="container mx-auto px-4 relative z-0 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="flex flex-col justify-center items-center text-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-sm border border-slate-700/60 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-300 text-xs font-bold tracking-widest uppercase">Accepting New Clients</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1] max-w-xl main-heading w-full"
            >
              We build digital <br className="hidden md:block" />
              <Typewriter words={["Experiences.", "Applications.", "Automation.", "Realities."]} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg md:text-xl text-slate-300 max-w-xl mb-10 leading-relaxed main-text w-full"
            >
              BC-studios is a premier creative technology firm delivering pixel-perfect websites,
              powerful AI tools, and scalable software solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                onClick={() => ScrollToSection("contact")}
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-xl shadow-emerald-900/20 rounded-full transition-all hover:scale-105"
                aria-label="Start your project - scroll to contact section"
              >
                Start Project <ArrowRight className="ml-2 w-5 h-5" aria-hidden />
              </Button>
              <Button
                onClick={() => ScrollToSection("work")}
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-white rounded-full backdrop-blur-sm hover:scale-105"
                aria-label="View our work - scroll to featured projects"
              >
                View Our Work
              </Button>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 w-full flex items-center justify-center h-[500px] min-h-[400px]" aria-hidden>
            <HeroGlobe />
          </div>
        </div>
      </section>

      <section id="stats" className="relative z-10 py-12 border-y border-slate-800/60 bg-slate-900/30 backdrop-blur-sm" aria-label="Company statistics">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {STATS.map(({ label, value, sub, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border border-slate-700 flex items-center justify-center text-emerald-400" aria-hidden>
                  <Icon size={24} />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white bg-clip-text main-heading">
                  {value}
                  {sub && <span className="text-lg font-normal text-slate-400"> {sub}</span>}
                </p>
                <p className="text-slate-400 text-sm font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 relative z-10 overflow-hidden" aria-labelledby="services-heading">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1920&q=80"
            alt="Technology and coding workspace - BC Studios web and software development services"
            fill
            className="object-cover opacity-90 brightness-110"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-white mb-4 main-heading">Our Services</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full" />
          </motion.div>

          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={revealVariants}
                  initial="hidden"
                  animate={servicesInView ? "visible" : "hidden"}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="group h-full border border-slate-700 bg-slate-900/70 backdrop-blur-sm hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" aria-hidden />
                    <CardHeader>
                      <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/40 to-emerald-600/40 border border-slate-600 flex items-center justify-center text-emerald-400 group-hover:text-white transition-colors" aria-hidden>
                        <Icon size={24} />
                      </div>
                      <CardTitle className="text-xl font-bold text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="py-24 bg-slate-900/30 relative z-10 border-t border-slate-800" aria-labelledby="process-heading">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="process-heading" className="text-3xl md:text-4xl font-bold text-white mb-4 main-heading">How We Work</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full" />
          </motion.div>

          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={revealVariants}
                initial="hidden"
                animate={processInView ? "visible" : "hidden"}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-slate-700 to-slate-800 z-0" aria-hidden />
                )}
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/30 to-emerald-600/30 border border-slate-700 text-emerald-400 font-bold text-lg mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="py-24 relative z-10 border-t border-slate-800 overflow-hidden" aria-labelledby="work-heading">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80"
            alt="Digital art and AI-powered creative work - BC Studios SaaS and web design portfolio"
            fill
            className="object-cover brightness-105 saturate-110 contrast-105"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/45" />
        </div>

        <div className="container mx-auto px-4 relative z-0">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 id="work-heading" className="text-3xl md:text-4xl font-bold text-white mb-4 main-heading">Featured Projects</h2>
              <p className="text-slate-300 max-w-xl text-lg main-text">See how we help businesses transform with technology.</p>
            </div>
            <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 font-semibold gap-1" asChild>
              <Link href="/solutions" aria-label="View all products and projects">
                View All <ChevronRight size={16} aria-hidden />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTFOLIO_CATEGORIES.flatMap((c) => c.projects).slice(0, 4).map((project) => (
              <motion.a
                key={project.id}
                href={project.url}
                target={project.url.startsWith("http") ? "_blank" : undefined}
                rel={project.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block rounded-xl overflow-hidden border border-slate-700 bg-slate-900/80 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-emerald-900/20 hover:border-emerald-500/50 transition-all duration-300"
                style={{ aspectRatio: "16/10" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  {project.imageUrl.startsWith("/") ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <Image
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="inline-block px-2 py-0.5 mb-2 text-xs font-bold uppercase tracking-wider rounded bg-emerald-500/30 text-emerald-300 border border-emerald-500/50">
                      {project.tag}
                    </span>
                    <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
                    <p className="text-sm text-slate-300 mt-0.5 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 relative z-10 overflow-hidden" aria-labelledby="contact-heading">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1457364559154-aa2644600ebb?auto=format&fit=crop&w=1920&q=80"
            alt="Sky and clouds - Get in touch with BC Studios Chicago for web design and AI automation"
            fill
            className="object-cover brightness-[0.95] saturate-100"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="container mx-auto px-4 relative z-0">
          <div className="bg-slate-900/85 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-700/80">
            <div className="p-10 md:p-12 text-white w-full md:w-2/5 flex flex-col justify-between bg-slate-900/90">
              <div>
                <h2 id="contact-heading" className="text-3xl font-bold mb-6 main-heading text-white">Let&apos;s build something great.</h2>
                <p className="text-slate-300 mb-8 main-text">Ready to start? We&apos;ll get back to you within 24 hours.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-5 h-5 text-emerald-400" aria-hidden />
                    <a href="mailto:core@bc-studios.org" className="hover:text-white" aria-label="Email BC Studios at core@bc-studios.org">core@bc-studios.org</a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-5 h-5 text-blue-400" aria-hidden />
                    <span>Chicago, IL</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-10 md:p-12 w-full md:w-3/5 bg-slate-800/70">
              <form action="https://formspree.io/f/xnjjdzdy" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    aria-label="Your full name"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    aria-label="Your email address"
                  />
                </div>
                <select
                  name="project_type"
                  className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  aria-label="Project type"
                >
                  <option>Web Application</option>
                  <option>Mobile App</option>
                  <option>UI/UX Design</option>
                  <option>Strategy</option>
                  <option>Other</option>
                </select>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Project Details"
                  className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  aria-label="Project details or message"
                />
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold rounded-lg shadow-lg"
                  aria-label="Send your message to BC Studios"
                >
                  Send Message <Send className="ml-2 w-4 h-4" aria-hidden />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
