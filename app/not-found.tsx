"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, Ghost } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Liquid Mesh Background */}
      <div className="absolute inset-0 liquid-mesh opacity-[0.1] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card squircle p-8 md:p-12 text-center relative z-10"
      >
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-8 mx-auto relative">
           <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
           <Ghost className="w-12 h-12 relative z-10 animate-bounce" />
        </div>
        
        <div className="text-6xl font-black mb-2 text-glass opacity-20">404</div>
        <h1 className="text-3xl font-black mb-4 text-glass">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for seems to have vanished into thin air. Let's get you back on track.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link href="/" className="w-full">
            <Button className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/dashboard" className="w-full">
            <Button variant="outline" className="w-full h-12 rounded-xl border-border font-bold flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
