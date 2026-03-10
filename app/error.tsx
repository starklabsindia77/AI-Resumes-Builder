"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Liquid Mesh Background */}
      <div className="absolute inset-0 liquid-mesh opacity-[0.1] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card squircle p-8 md:p-12 text-center relative z-10"
      >
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-600 mb-8 mx-auto shadow-lg shadow-red-500/20">
          <AlertCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-black mb-4 text-glass">Something went wrong</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          We encountered an unexpected error. Don't worry, your data is safe. Please try refreshing or head back home.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => reset()}
            className="w-full h-12 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full h-12 rounded-xl border-border font-bold flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-[10px] text-muted-foreground font-mono bg-slate-100 dark:bg-slate-900/50 p-2 rounded-lg">
            Error ID: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  );
}
