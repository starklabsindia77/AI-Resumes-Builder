"use client";

import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Script from "next/script";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/lib/hono-rpc";

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const { isAuthenticated, isLoading: isAuthLoading } = useKindeBrowserClient();
  const router = useRouter();

  const handlePayment = async (plan: any) => {
    if (plan.price === "Free" || plan.price === "Custom") return;

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to choose a plan and continue with the payment.",
        variant: "destructive",
      });
      return;
    }

    setLoading(plan.name);
    try {
      console.log("Initiating order creation for plan:", plan.name);
      
      const resp = await api.razorpay.order.$post({
        json: { amount: 99 },
      });

      if (!resp.ok) {
        const errorData = (await resp.json()) as any;
        console.error("Order creation failed on server:", errorData);
        throw new Error(errorData.error || "Failed to create order");
      }

      const order = await resp.json();
      console.log("Order created:", order);

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        console.error("CRITICAL: NEXT_PUBLIC_RAZORPAY_KEY_ID is missing in the browser!");
        toast({
          title: "Configuration Error",
          description: "Payment system is not properly configured. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "SmartCraft AI",
        description: `Upgrade to ${plan.name} Plan`,
        order_id: order.id,
        handler: function (response: any) {
          console.log("Razorpay Success Response:", response);
          toast({
            title: "Payment Successful!",
            description: "Your Professional subscription is being activated. Please wait a moment.",
          });
          // Redirect to dashboard where the subscription will be refreshed
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        },
        prefill: {
          name: "SmartCraft User",
        },
        notes: {
          userId: order.notes?.userId, // Safe access
        },
        theme: {
          color: "#059669",
        },
      };

      console.log("Opening Razorpay modal with options:", { ...options, key: "HIDDEN" });
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the payment. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for students and recent graduates.",
      features: ["1 Resume", "Basic AI Analysis", "Standard Templates", "Community Support"],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "₹99",
      period: "/month",
      description: "For active job seekers who want an edge.",
      features: [
        "Unlimited Resumes",
        "ATS Smart Match Optimizer",
        "LinkedIn One-Click Sync",
        "Shadow Resumes (3 Versions)",
        "Premium Templates & PDF"
      ],
      buttonText: "Go Professional",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for universities and teams.",
      features: [
        "Everything in Pro",
        "Live Portfolio Showcase",
        "Custom Branding",
        "API Access"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 pt-32 pb-24 px-4 text-left">
      {/* Liquid Mesh Background */}
      <div className="absolute inset-0 liquid-mesh opacity-[0.1] -z-10" />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">
            Unbeatable Value
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-glass">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Choose the plan that's right for your career goals. No hidden fees, just pure value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative p-8 squircle glass-card flex flex-col transition-all duration-500 ${plan.popular ? 'ring-2 ring-emerald-500/50 shadow-2xl shadow-emerald-500/10 md:-mt-8 md:p-10' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-black text-glass">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground font-bold">{plan.period}</span>}
              </div>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed font-medium">{plan.description}</p>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>

              {isAuthLoading ? (
                <Button disabled className="w-full h-14 rounded-xl font-black text-base opacity-50">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Checking Status...
                </Button>
              ) : !isAuthenticated ? (
                <LoginLink className="w-full">
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className={`w-full h-14 rounded-xl font-black text-base transition-all ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20' : 'border-border'}`}
                  >
                    {plan.buttonText}
                  </Button>
                </LoginLink>
              ) : (
                <Button
                  onClick={() => handlePayment(plan)}
                  disabled={loading === plan.name}
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full h-14 rounded-xl font-black text-base transition-all ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20' : 'border-border'}`}
                >
                  {loading === plan.name ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-sm font-medium">Safe and secure payments powered by Razorpay. ⚡</p>
        </div>
      </div>
    </div>
  );
}
