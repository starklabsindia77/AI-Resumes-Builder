export type HeroStyle = "split" | "center" | "minimal" | "gradient";
export type NavbarStyle = "floating" | "sticky" | "hidden";
export type ExperienceStyle = "timeline" | "grid" | "list";
export type PortfolioTypography = "sans" | "serif" | "mono" | "modern";
export type BackgroundStyle = "solid" | "mesh" | "dots" | "grid";

export interface PortfolioTemplateConfig {
  id: string;
  name: string;
  description: string;
  category: "Tech" | "Creative" | "Professional" | "Minimal";
  isPremium: boolean;
  styles: {
    hero: HeroStyle;
    navbar: NavbarStyle;
    experience: ExperienceStyle;
    typography: PortfolioTypography;
    background: BackgroundStyle;
    primaryColor?: string;
  };
}

export const portfolioTemplates: PortfolioTemplateConfig[] = [
  // Free Tier
  {
    id: "free-modern",
    name: "Modern Standard",
    description: "A clean, conventional single-page portfolio.",
    category: "Professional",
    isPremium: false,
    styles: {
      hero: "center",
      navbar: "sticky",
      experience: "list",
      typography: "modern",
      background: "solid",
    },
  },
  {
    id: "free-dev",
    name: "Developer Core",
    description: "Monospace fonts and dark-mode ready layout for engineers.",
    category: "Tech",
    isPremium: false,
    styles: {
      hero: "split",
      navbar: "floating",
      experience: "timeline",
      typography: "mono",
      background: "dots",
    },
  },
  {
    id: "free-minimal",
    name: "Minimalist Studio",
    description: "Bare essentials with generous whitespace.",
    category: "Minimal",
    isPremium: false,
    styles: {
      hero: "minimal",
      navbar: "hidden",
      experience: "list",
      typography: "sans",
      background: "solid",
    },
  },
  
  // Premium Tier
  {
    id: "pro-executive",
    name: "Executive Brief",
    description: "Authoritative serif typography with a structured grid.",
    category: "Professional",
    isPremium: true,
    styles: {
      hero: "split",
      navbar: "sticky",
      experience: "grid",
      typography: "serif",
      background: "grid",
      primaryColor: "#1e3a8a",
    },
  },
  {
    id: "pro-tech-lead",
    name: "Tech Lead",
    description: "Vibrant gradients and a floating interactive navbar.",
    category: "Tech",
    isPremium: true,
    styles: {
      hero: "gradient",
      navbar: "floating",
      experience: "timeline",
      typography: "modern",
      background: "mesh",
      primaryColor: "#10b981",
    },
  },
  {
    id: "pro-creative",
    name: "Creative Agency",
    description: "Bold, unconstrained layout for designers and creators.",
    category: "Creative",
    isPremium: true,
    styles: {
      hero: "center",
      navbar: "floating",
      experience: "grid",
      typography: "sans",
      background: "dots",
      primaryColor: "#f43f5e",
    },
  },
  {
    id: "pro-startup",
    name: "Startup Pitch",
    description: "High energy, conversion-focused layout.",
    category: "Professional",
    isPremium: true,
    styles: {
      hero: "gradient",
      navbar: "sticky",
      experience: "timeline",
      typography: "modern",
      background: "mesh",
      primaryColor: "#8b5cf6",
    },
  },
  {
    id: "pro-zen",
    name: "Zen Master",
    description: "Ultimate simplicity and readability.",
    category: "Minimal",
    isPremium: true,
    styles: {
      hero: "minimal",
      navbar: "hidden",
      experience: "list",
      typography: "serif",
      background: "solid",
      primaryColor: "#0f172a",
    },
  },
];
