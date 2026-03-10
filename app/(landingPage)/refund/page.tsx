"use client";

import { motion } from "framer-motion";

export default function RefundPage() {
  return (
    <div className="py-24 px-4 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-8">Refund and Cancellation Policy</h1>
          <p className="text-muted-foreground mb-6 text-lg">Last updated: March 10, 2026</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">1. Cancellation Policy</h2>
          <p>You can cancel your Professional subscription at any time. Your cancellation will take effect at the end of the current billing period. To cancel, please visit your billing settings or contact support@smartcraft.ai.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. Refund Eligibility</h2>
          <p>Due to the nature of digital products (AI-generated resumes and instant access to premium features), we generally do not offer refunds once a payment is processed and features are unlocked. However, we may consider refund requests on a case-by-case basis under the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Duplicate payment accidentally made for the same subscription.</li>
            <li>Technical failure on our end that prevented you from accessing paid features for an extended period.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. No-Refund Situations</h2>
          <p>Refunds will not be provided for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Change of mind after using the premium features (e.g., ATS Optimizer, Shadow Resumes).</li>
            <li>Dissatisfaction with AI-generated content (we provide samples and a free tier to test the service).</li>
            <li>Failure to cancel a subscription before the renewal date.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Process for Refund Requests</h2>
          <p>If you believe you are eligible for a refund, please email us at support@smartcraft.ai within 7 days of the transaction. Include your transaction ID and the reason for your request. We will review your request and get back to you within 3-5 business days.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. Modifications</h2>
          <p>SmartCraft reserves the right to modify this policy at any time. Continued use of the service after such changes constitutes acceptance of the new policy.</p>
        </motion.div>
      </div>
    </div>
  );
}
