"use client";

import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="py-24 px-4 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-black mb-6">Get in Touch</h1>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Have questions about SmartCraft? We're here to help you build the perfect resume.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail className="text-emerald-600" />, title: "Email", info: "support@smartcraft.ai" },
                { icon: <Phone className="text-emerald-600" />, title: "Phone", info: "+91 98765 43210" },
                { icon: <MapPin className="text-emerald-600" />, title: "Office", info: "4th Block, Koramangala, Bangalore, KA" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-900/50">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{item.title}</div>
                    <div className="text-lg font-medium">{item.info}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 md:p-10 rounded-[2.5rem] border border-border bg-slate-50 dark:bg-slate-900/50"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">First Name</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Last Name</label>
                  <input type="text" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Email</label>
                <input type="email" className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Message</label>
                <textarea className="w-full h-32 p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all resize-none" placeholder="How can we help?" />
              </div>
              <Button className="w-full h-14 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-lg shadow-lg shadow-emerald-600/20">
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
