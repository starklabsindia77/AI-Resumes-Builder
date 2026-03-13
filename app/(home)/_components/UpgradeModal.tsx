"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { api } from "@/lib/hono-rpc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Script from "next/script";

interface UpgradeModalProps {
  children: React.ReactNode;
}

export default function UpgradeModal({ children }: UpgradeModalProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();

  const handlePayment = async (plan: any) => {
    if (plan.price === "Free" || plan.price === "Custom") return;

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(plan.name);
    try {
      const resp = await api.razorpay.order.$post({
        json: { amount: 99 },
      });

      if (!resp.ok) {
        const errorData = (await resp.json()) as any;
        throw new Error(errorData.error || "Failed to create order");
      }

      const order = await resp.json();

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        toast({
          title: "Configuration Error",
          description: "Payment system error.",
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
        handler: async function (response: any) {
          try {
            console.log("Verifying payment:", response);
            const verifyResp = await api.razorpay.verify.$post({
              json: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            if (verifyResp.ok) {
              toast({
                title: "Payment Successful!",
                description: "Your subscription has been activated.",
              });
              setOpen(false);
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else {
              const errorData = (await verifyResp.json()) as any;
              throw new Error(errorData.error || "Verification failed");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast({
              title: "Verification Failed",
              description: "Payment was successful but we couldn't verify it. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "SmartCraft User",
        },
        notes: {
          userId: order.notes?.userId,
        },
        theme: {
          color: "#059669",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast({
        title: "Payment Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
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
      buttonText: "Current Plan",
      popular: false,
      disabled: true,
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
      buttonText: "Upgrade Now",
      popular: true,
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
      popular: false,
      action: () => window.location.href = "mailto:sales@smartcraft.ai"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-slate-50 dark:bg-slate-950 border-none sm:rounded-[32px] glass-card shadow-2xl">
        <div className="relative p-8 md:p-12 overflow-hidden">
          {/* Decorative mesh */}
          <div className="absolute inset-0 liquid-mesh opacity-[0.1] -z-10" />
          
          <DialogHeader className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
                <Sparkles className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <DialogTitle className="text-4xl font-black text-glass mb-2">
              Ready to Supercharge Your Career?
            </DialogTitle>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Unlock the full power of AI-driven career tools and stand out from the crowd.
            </p>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-6 squircle glass-card flex flex-col transition-all duration-300 ${plan.popular ? 'ring-2 ring-emerald-500/50 bg-white/40 dark:bg-emerald-950/20 scale-105 shadow-xl shadow-emerald-500/10' : 'bg-white/20 dark:bg-slate-900/20'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                    Best Value
                  </div>
                )}
                <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black text-glass">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm font-bold">{plan.period}</span>}
                </div>
                
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => plan.action ? plan.action() : handlePayment(plan)}
                  disabled={loading === plan.name || plan.disabled}
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full h-12 rounded-xl font-black text-sm transition-all ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-border'}`}
                >
                  {loading === plan.name ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
