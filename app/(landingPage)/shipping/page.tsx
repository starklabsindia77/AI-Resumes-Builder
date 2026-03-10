"use client";

import { motion } from "framer-motion";

export default function ShippingPage() {
  return (
    <div className="py-24 px-4 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-8">Shipping and Delivery Policy</h1>
          <p className="text-muted-foreground mb-6 text-lg">Last updated: March 10, 2026</p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">1. Digital Delivery Only</h2>
          <p>SmartCraft is a Software-as-a-Service (SaaS) platform providing digital products and AI-powered tools. We do not ship any physical goods to your address.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">2. Delivery Timeline</h2>
          <p>Access to professional features, resume templates, and AI tools is granted **instantly** upon successful payment processing by our payment partner, Razorpay. You will be redirected back to the dashboard where your upgraded status will be visible immediately.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">3. Receipt of Service</h2>
          <p>A confirmation email and a tax invoice for your purchase will be sent to your registered email address within minutes of the transaction. You can also download your invoices from the billing section of your dashboard.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">4. Service Disruptions</h2>
          <p>In rare cases of technical delays where features are not unlocked despite a successful payment, please contact us at support@smartcraft.ai with your payment details. We will resolve the issue and grant access manually within 24 hours.</p>

          <h2 className="text-2xl font-bold mt-10 mb-4">5. Contact Information</h2>
          <p>For any queries related to the delivery of our digital services, please reach out to our support team:</p>
          <ul className="list-disc pl-5">
            <li>Email: support@smartcraft.ai</li>
            <li>Phone: +91 98765 43210</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
