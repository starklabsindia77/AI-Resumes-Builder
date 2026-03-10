"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="py-24 px-4 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-6 text-lg">Last updated: March 10, 2026</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing or using SmartCraft, you agree to be bound by these Terms of Service.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Use of Services</h2>
          <p>You agree to use our services only for lawful purposes and in accordance with these Terms.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Intellectual Property</h2>
          <p>All content and materials available on SmartCraft, including the AI resume builder, are the property of SmartCraft or its licensors and are protected by copyright and other intellectual property laws.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. Limitation of Liability</h2>
          <p>In no event shall SmartCraft be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the services.</p>
        </motion.div>
      </div>
    </div>
  );
}
