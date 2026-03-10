"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="py-24 px-4 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6 text-lg">Last updated: March 10, 2026</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, build a resume, or contact us for support. This may include your name, email address, and any professional information you include in your resume.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, including to generate AI-optimized resumes and provide personalized career advice.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Data Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Sharing of Information</h2>
          <p>We do not share your professional information with third parties except as required by law or with your explicit consent.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@smartcraft.ai.</p>
        </motion.div>
      </div>
    </div>
  );
}
