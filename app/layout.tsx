import type { Metadata } from "next";
import { Urbanist, Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/context/query-provider";

const urbanist = Urbanist({ subsets: ["latin"] });
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
});

export const metadata: Metadata = {
  title: "SmartCraft - Smarter Resumes for Smarter Careers",
  description: "Generate professional AI-optimized resumes in minutes. Enhance your job search with SmartCraft's AI-powered tools.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://smartcraft.ai"),
  openGraph: {
    title: "SmartCraft - AI Resume Builder",
    description: "Smarter resumes for smarter careers. Build your dream resume with AI.",
    url: "https://smartcraft.ai",
    siteName: "SmartCraft",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartCraft - AI Resume Builder",
    description: "Build your dream resume with AI in minutes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background", open_sans.variable, urbanist.className)}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
