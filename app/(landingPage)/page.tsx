"use client";

import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ChevronRight, Video, Sparkles, Wand2, Rocket, Share2, Linkedin, Globe, ShieldCheck, Target, Layers, Copy, Check, UserPlus, FileText, Cpu, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AtsGauge } from "@/components/AtsGauge";
import { ResumeStack } from "@/components/ResumeStack";
import { EditorMockup } from "@/components/EditorMockup";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Home() {
  return (
    <div className="w-full bg-white dark:bg-slate-950 overflow-hidden">
      {/* Hero Section */}
      <div className="hero-section w-full min-h-screen relative flex items-center justify-center pt-20 pb-10">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-slate-50 dark:bg-slate-950">
          <div className="absolute inset-0 liquid-mesh opacity-[0.15] dark:opacity-[0.2]" />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          className="w-full max-w-6xl mx-auto px-4 flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="rounded-full flex items-center font-medium gap-2 text-sm h-auto p-1.5 pr-4 bg-muted border border-border/50 hover:border-primary/30 transition-colors cursor-pointer group mb-6"
          >
            <div className="px-2.5 py-0.5 h-6 flex items-center text-[10px] font-bold uppercase tracking-wider text-white bg-primary rounded-full">
              New
            </div>
            <span className="text-emerald-600/80 group-hover:text-emerald-600 transition-colors">
              SmartCraft AI is now live
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] text-glass">
              Get dream jobs with our <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-emerald-600 via-blue-500 to-purple-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                  SmartCraft AI
                </span>{" "}
                resumes
                <motion.span 
                  className="absolute -top-6 -right-8 text-emerald-500"
                  animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
                </motion.span>
              </span>
            </h1>
            
            <motion.p 
              variants={itemVariants}
              className="max-w-2xl text-lg md:text-xl mt-6 text-muted-foreground leading-relaxed"
            >
              Smarter resumes for smarter careers. Stand out from the crowd with professional, AI-optimized resumes built in minutes.
            </motion.p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Button className="h-14 px-8 text-lg font-semibold min-w-44 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all" asChild>
              <RegisterLink>Get Started Free</RegisterLink>
            </Button>
            <Button
              variant="outline"
              className="h-14 px-8 border-primary/20 hover:border-primary/100 text-foreground text-lg font-semibold min-w-44 rounded-full bg-background/50 backdrop-blur-sm transition-all"
              asChild
            >
              <a className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Watch Demo
              </a>
            </Button>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div 
            variants={itemVariants}
            className="w-full relative max-w-6xl mt-10"
          >
            <EditorMockup />
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Section */}
      <section className="py-12 px-4 border-y border-border/50 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-10">
            Trusted by professionals hired at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             <div className="text-2xl font-black italic">TCS</div>
             <div className="text-2xl font-black italic">Infosys</div>
             <div className="text-2xl font-black italic">Reliance</div>
             <div className="text-2xl font-black italic">Wipro</div>
             <div className="text-2xl font-black italic">Zomato</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for Your Success</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to build a professional resume that gets you hired.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wand2 className="w-6 h-6 text-primary" />,
                title: "AI Analysis",
                description: "Get instant feedback on your resume with our advanced AI analyzer."
              },
              {
                icon: <Rocket className="w-6 h-6 text-blue-500" />,
                title: "Fast Building",
                description: "Create a professional resume in minutes with our intuitive builder."
              },
              {
                icon: <Share2 className="w-6 h-6 text-purple-500" />,
                title: "Easy Sharing",
                description: "Share your resume with a unique link or download it in various formats."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 squircle glass-card hover:bg-white/60 dark:hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-border shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Optimizer Section */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" /> Smart Match Technology
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Beat the ATS with <br /> Precision AI Analysis
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Our proprietary algorithm analyzes your resume against thousands of job descriptions from top Indian companies. Get real-time feedback and keyword optimization to ensure you pass every automated filter.
              </p>
              <div className="space-y-4">
                 {[
                   "Keyword optimization for Indian Tech Giants",
                   "Readability and formatting scoring",
                   "Personalized impact statements"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 font-semibold">
                     <ShieldCheck className="w-5 h-5 text-emerald-600" />
                     {item}
                   </div>
                 ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 squircle glass-card relative"
            >
               <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
               <div className="flex flex-col md:flex-row items-center gap-12">
                  <AtsGauge score={87} label="Match Score" />
                  <div className="flex-1 space-y-4 w-full text-left">
                     <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Improvement Tips</div>
                     <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900 border border-emerald-500/20 text-sm hover:translate-x-2 transition-transform">
                        ✨ Add <b>"Strategic Planning"</b> to match the JD keywords.
                     </div>
                     <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900 border border-emerald-500/20 text-sm hover:translate-x-2 transition-transform">
                        🚀 Quantify your impact in the <b>Sales Manager</b> role.
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LinkedIn & Portfolio Showcase */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LinkedIn Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative group"
            >
              <Linkedin className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                <Linkedin className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold mb-4">One-Click LinkedIn Sync</h3>
              <p className="text-slate-400 text-lg mb-8">
                Import your experience, skills, and endorsements directly from LinkedIn. Keep your resume synchronized with your profile effortlessly.
              </p>
              <Button className="bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-xl h-12 px-6">
                Connect Profile
              </Button>
            </motion.div>

            {/* Portfolio Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 rounded-[2.5rem] bg-emerald-600 text-white overflow-hidden relative group"
            >
              <Globe className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                <Globe className="w-8 h-8 text-emerald-200" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Live Portfolio Link</h3>
              <p className="text-emerald-100 text-lg mb-8">
                Transform your resume into a stunning personal website. Share a live link with recruiters that showcases your projects and impact visually.
              </p>
              <Button className="bg-emerald-950 text-white hover:bg-emerald-900 font-bold rounded-xl h-12 px-6">
                Preview Portfolio
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shadow Resumes Section */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <ResumeStack />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" /> Multi-Persona Optimization
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                One Profile, <br /> Infinite Shadow Resumes
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Why limit yourself to one version? SmartCraft maintains multiple "Shadow Resumes" for different career paths (SDE, Lead, Architect) from your single source of truth.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-border bg-background">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                    <Copy className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h4 className="font-bold mb-2">Auto-Versioning</h4>
                  <p className="text-sm text-muted-foreground">Instantly swap focus areas like Skills or Summary for different roles.</p>
                </div>
                <div className="p-6 rounded-2xl border border-border bg-background">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-bold mb-2">Smart Syncing</h4>
                  <p className="text-sm text-muted-foreground">Update once, sync everywhere. All shadow versions stay current.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-6xl mx-auto">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4">How it Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Build your career foundation in four simple, AI-powered steps.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                icon: <UserPlus className="w-6 h-6 text-emerald-600" />,
                title: "Create Account", 
                description: "Sign up in seconds. Import your details or start fresh with our smart onboarding." 
              },
              { 
                step: "02", 
                icon: <FileText className="w-6 h-6 text-blue-600" />,
                title: "Input Details", 
                description: "List your experience. Our AI helps phrase your achievements for maximum impact." 
              },
              { 
                step: "03", 
                icon: <Cpu className="w-6 h-6 text-purple-600" />,
                title: "AI Optimization", 
                description: "Our proprietary AI analyzes and optimizes your content against the latest ATS trends." 
              },
              { 
                step: "04", 
                icon: <Send className="w-6 h-6 text-emerald-600" />,
                title: "Share & Apply", 
                description: "Download high-quality PDFs or share a live portfolio link with top-tier recruiters." 
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 squircle glass-card hover:bg-white/60 dark:hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="absolute top-6 right-8 text-4xl font-black text-slate-100 dark:text-slate-800 select-none group-hover:text-primary/10 transition-colors">
                  {item.step}
                </div>
                
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-border shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {item.icon}
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
                
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-border/50 to-transparent -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-primary text-primary-foreground rounded-[3rem] mx-4 my-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12">Loved by Professionals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                { quote: "SmartCraft helped me land a SDE role at a top Indian tech giant. The AI suggestions are brilliant!", author: "Rajesh Kumar", role: "Software Developer" },
                { quote: "The best resume builder I've used in India. It perfectly captures nuances of what Indian HRs look for.", author: "Priya Sharma", role: "Marketing Manager" }
              ].map((t, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                  <p className="text-xl italic mb-6">"{t.quote}"</p>
                  <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-primary-foreground/70 text-sm">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Start Smarter, Build Faster</h2>
            <p className="text-muted-foreground text-lg">Choose a plan that fits your career goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Starter", 
                price: "Free", 
                features: ["1 Resume", "Basic AI Analysis", "Standard Templates", "Community Support"],
                cta: "Get Started"
              },
              { 
                name: "Professional", 
                price: "₹99", 
                features: [
                  "Unlimited Resumes",
                  "ATS Smart Match Optimizer",
                  "LinkedIn One-Click Sync",
                  "Shadow Resumes (3 Versions)",
                  "Premium Templates & PDF"
                ],
                popular: true,
                cta: "Go Professional"
              },
              { 
                name: "Enterprise", 
                price: "Custom", 
                features: [
                  "Everything in Pro",
                  "Live Portfolio Showcase",
                  "Custom Branding",
                  "API Access"
                ],
                cta: "Contact Sales"
              }
            ].map((plan, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 squircle glass-card relative flex flex-col transition-all duration-500 ${plan.popular ? 'ring-2 ring-emerald-500/50 shadow-2xl shadow-emerald-500/10 mb-4 md:-mt-4 md:mb-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">Most Popular</div>
                )}
                <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-glass">{plan.price}</span>
                  {plan.price !== "Free" && plan.price !== "Custom" && <span className="text-muted-foreground text-sm font-bold">/mo</span>}
                </div>
                
                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className={`w-full h-12 rounded-xl font-bold transition-all ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20' : 'border-border'}`} 
                  asChild
                >
                   <Link href="/pricing">{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-slate-50/30 dark:bg-slate-900/10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Clear answers to your common queries.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "How accurate is the AI analysis?", a: "Our AI uses advanced models trained on thousands of successful resumes to provide high-precision feedback." },
              { q: "Can I download my resume for free?", a: "Yes! You can build and download your first resume for free. Premium plans offer unlimited downloads." },
              { q: "Is my data safe with SmartCraft?", a: "Absolutely. We encrypt all your personal and professional data and never share it without your permission." },
              { q: "Which file formats are supported?", a: "Currently, we support PDF and plain text downloads, with more formats coming soon." }
            ].map((faq, i) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="squircle glass-card overflow-hidden transition-all duration-300 border border-border/50 hover:border-emerald-500/30"
                >
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-6 text-left flex justify-between items-center group"
                  >
                    <span className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition-colors">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-180 bg-emerald-100 dark:bg-emerald-900/30' : ''}`}>
                       <ChevronRight className={`w-5 h-5 ${isOpen ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                          <div className="pt-4 border-t border-border/30">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 md:p-20 rounded-[3rem] bg-gradient-to-br from-emerald-600 to-teal-800 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150">
               <Rocket className="w-64 h-64" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">
              Ready to land your <br className="hidden md:block" /> dream job?
            </h2>
            <p className="text-white/80 text-xl max-w-xl mx-auto mb-12 relative z-10">
              Join thousands of professionals already using SmartCraft to accelerate their careers.
            </p>
            <Button className="h-16 px-12 text-xl font-bold bg-white text-emerald-700 hover:bg-slate-100 rounded-full shadow-2xl transition-all relative z-10" asChild>
               <RegisterLink>Build My Resume Now</RegisterLink>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">S</div>
              SmartCraft
            </div>
            <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
              The only AI-powered resume builder you'll ever need. Smarter resumes for smarter careers.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 text-sm font-semibold text-muted-foreground">
            <div className="flex flex-col gap-3">
               <div className="text-foreground font-bold uppercase tracking-wider text-xs">Product</div>
               <Link href="/#features" className="hover:text-emerald-600 transition-colors">Features</Link>
               <Link href="/pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link>
            </div>
            <div className="flex flex-col gap-3">
               <div className="text-foreground font-bold uppercase tracking-wider text-xs">Legal</div>
               <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link>
               <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms of Service</Link>
               <Link href="/refund" className="hover:text-emerald-600 transition-colors">Refund & Cancellation</Link>
            </div>
            <div className="flex flex-col gap-3">
               <div className="text-foreground font-bold uppercase tracking-wider text-xs">Support</div>
               <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact Us</Link>
               <Link href="/shipping" className="hover:text-emerald-600 transition-colors">Shipping & Delivery</Link>
               <a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-medium">© 2026 SmartCraft AI. All rights reserved.</p>
          <div className="flex gap-6">
             <div className="w-5 h-5 bg-muted rounded-full" />
             <div className="w-5 h-5 bg-muted rounded-full" />
             <div className="w-5 h-5 bg-muted rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  );
}
