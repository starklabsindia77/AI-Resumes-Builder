import React from "react";
import { ExternalLink } from "lucide-react";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <div className="w-full sticky top-0 z-[9999] px-4 pt-4 pb-2">
      <div className="w-full max-w-7xl mx-auto glass-card !rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
        
        {/* Banner Section */}
        <div className="w-full h-auto bg-slate-950/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-6xl mx-auto py-2 px-4 text-center">
            <p className="text-white text-[10px] md:text-sm font-medium">
              🚀 <b>Special Launch Offer</b>! Get 50% off professional resume reviews with SmartCraft Premium
              <Link href="/pricing" className="ml-2 inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                View Pricing
                <ExternalLink size="14px" />
              </Link>
            </p>
          </div>
        </div>

        {/* Main Nav Section */}
        <div className="w-full p-4 px-5 flex items-center justify-between bg-white/10 dark:bg-slate-900/10">
          <div className="flex items-center flex-1 gap-12">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">S</div>
              <h5 className="font-black text-xl tracking-tight text-emerald-600">SmartCraft</h5>
            </Link>

            <div className="hidden lg:flex">
              <ul className="flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <li>
                  <Link href="/#features" className="hover:text-emerald-600 transition-colors">Features</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LoginLink>
              <Button variant="outline" className="rounded-xl border-white/20 dark:border-slate-700/50 hover:bg-white/10 transition-all font-bold">Sign In</Button>
            </LoginLink>
            <RegisterLink>
              <Button className="rounded-xl shadow-lg shadow-emerald-600/20 font-bold bg-emerald-600 hover:bg-emerald-700">Get Started</Button>
            </RegisterLink>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NavBar;
