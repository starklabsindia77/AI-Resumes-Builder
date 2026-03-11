export type TypographyStyle = "classic" | "modern" | "minimalist" | "serif" | "mono" | "elegant";
export type LayoutType = "single-column" | "split-left" | "split-right";
export type SpacingStyle = "compact" | "normal" | "spacious";
export type BorderStyle = "none" | "thin" | "thick" | "accent-left" | "accent-top" | "accent-bottom" | "boxed";
export type AccentStyle = "solid" | "subtle-bg" | "outline" | "none";
export type HeaderAlignment = "left" | "center" | "right";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: "Professional" | "Creative" | "Tech" | "Executive" | "Minimal";
  isPremium: boolean;
  styles: {
    typography: TypographyStyle;
    layout: LayoutType;
    spacing: SpacingStyle;
    borders: BorderStyle;
    sectionHeadings: AccentStyle;
    headerAlignment: HeaderAlignment;
    primaryColor?: string; // If undefined, falls back to user's theme color choice
  };
}

// Ensure exactly 50 distinct templates
export const templateConfigurations: TemplateConfig[] = [
  // --- FREE TIER (10 Templates) ---
  {
    id: "free-classic",
    name: "Classic Standard",
    description: "The universally accepted traditional single-column format.",
    category: "Professional",
    isPremium: false,
    styles: { typography: "classic", layout: "single-column", spacing: "normal", borders: "accent-top", sectionHeadings: "outline", headerAlignment: "left" }
  },
  {
    id: "free-modern",
    name: "Modern Alpha",
    description: "A clean, modern take with sans-serif fonts and subtle accents.",
    category: "Tech",
    isPremium: false,
    styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "accent-left", sectionHeadings: "none", headerAlignment: "left" }
  },
  {
    id: "free-minimal",
    name: "Bare Minimum",
    description: "Zero distractions. Focus entirely on the content.",
    category: "Minimal",
    isPremium: false,
    styles: { typography: "minimalist", layout: "single-column", spacing: "spacious", borders: "none", sectionHeadings: "none", headerAlignment: "center" }
  },
  {
    id: "free-split",
    name: "Standard Split",
    description: "A basic two-column layout separating skills and experience.",
    category: "Professional",
    isPremium: false,
    styles: { typography: "classic", layout: "split-left", spacing: "normal", borders: "none", sectionHeadings: "solid", headerAlignment: "left" }
  },
  {
    id: "free-creative",
    name: "Creative Start",
    description: "A slightly more expressive free layout.",
    category: "Creative",
    isPremium: false,
    styles: { typography: "elegant", layout: "single-column", spacing: "compact", borders: "boxed", sectionHeadings: "subtle-bg", headerAlignment: "center" }
  },
  {
    id: "free-tech",
    name: "Developer Basic",
    description: "Monospaced hints for the technical professional.",
    category: "Tech",
    isPremium: false,
    styles: { typography: "mono", layout: "single-column", spacing: "compact", borders: "accent-bottom", sectionHeadings: "outline", headerAlignment: "left" }
  },
  {
    id: "free-exec",
    name: "Managerial",
    description: "Stark and authoritative free layout.",
    category: "Executive",
    isPremium: false,
    styles: { typography: "serif", layout: "single-column", spacing: "normal", borders: "thin", sectionHeadings: "none", headerAlignment: "center" }
  },
  {
    id: "free-spacious",
    name: "Aero",
    description: "A highly breathable, relaxed layout.",
    category: "Minimal",
    isPremium: false,
    styles: { typography: "modern", layout: "single-column", spacing: "spacious", borders: "accent-top", sectionHeadings: "none", headerAlignment: "left" }
  },
  {
    id: "free-compact",
    name: "Densify",
    description: "Fit as much information on one page as possible.",
    category: "Professional",
    isPremium: false,
    styles: { typography: "classic", layout: "single-column", spacing: "compact", borders: "none", sectionHeadings: "outline", headerAlignment: "left" }
  },
  {
    id: "free-bold",
    name: "Bold Entry",
    description: "Heavy headers and aggressive styling.",
    category: "Creative",
    isPremium: false,
    styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "thick", sectionHeadings: "solid", headerAlignment: "left" }
  },

  // --- PREMIUM TIER (40 Templates) ---
  // Professional
  { id: "pro-corp-1", name: "Wall Street", description: "The definitive finance and consulting resume.", category: "Professional", isPremium: true, styles: { typography: "serif", layout: "single-column", spacing: "compact", borders: "accent-top", sectionHeadings: "none", headerAlignment: "center", primaryColor: "#1e3a8a" }},
  { id: "pro-corp-2", name: "Corporate Executive", description: "Authoritative and structured.", category: "Executive", isPremium: true, styles: { typography: "classic", layout: "split-left", spacing: "normal", borders: "accent-left", sectionHeadings: "subtle-bg", headerAlignment: "left" }},
  { id: "pro-corp-3", name: "Boardroom", description: "Designed for C-suite and VP level.", category: "Executive", isPremium: true, styles: { typography: "elegant", layout: "single-column", spacing: "spacious", borders: "thick", sectionHeadings: "outline", headerAlignment: "center" }},
  { id: "pro-corp-4", name: "The Consultant", description: "Focuses heavily on quantified achievements.", category: "Professional", isPremium: true, styles: { typography: "classic", layout: "single-column", spacing: "normal", borders: "none", sectionHeadings: "solid", headerAlignment: "left" }},
  { id: "pro-corp-5", name: "Legal Pro", description: "Highly formal typography for legal professions.", category: "Professional", isPremium: true, styles: { typography: "serif", layout: "single-column", spacing: "compact", borders: "boxed", sectionHeadings: "none", headerAlignment: "center" }},
  { id: "pro-corp-6", name: "Enterprise", description: "A balanced, safe corporate bet.", category: "Professional", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "thin", sectionHeadings: "subtle-bg", headerAlignment: "left" }},
  { id: "pro-corp-7", name: "Global Operations", description: "Excellent for multi-national career histories.", category: "Professional", isPremium: true, styles: { typography: "classic", layout: "split-right", spacing: "compact", borders: "none", sectionHeadings: "outline", headerAlignment: "left" }},
  { id: "pro-corp-8", name: "The Director", description: "Emphasizes leadership summaries.", category: "Executive", isPremium: true, styles: { typography: "serif", layout: "single-column", spacing: "spacious", borders: "accent-bottom", sectionHeadings: "solid", headerAlignment: "center" }},
  { id: "pro-corp-9", name: "Financial Analyst", description: "Dense but highly readable data lists.", category: "Professional", isPremium: true, styles: { typography: "classic", layout: "single-column", spacing: "compact", borders: "accent-left", sectionHeadings: "none", headerAlignment: "left" }},
  { id: "pro-corp-10", name: "Business Strategy", description: "A modern take on the traditional business layout.", category: "Professional", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "accent-top", sectionHeadings: "outline", headerAlignment: "left" }},

  // Tech / Engineering
  { id: "pro-tech-1", name: "Silicon Valley", description: "The quintessential software engineer layout.", category: "Tech", isPremium: true, styles: { typography: "modern", layout: "split-left", spacing: "normal", borders: "none", sectionHeadings: "subtle-bg", headerAlignment: "left", primaryColor: "#10b981" }},
  { id: "pro-tech-2", name: "Full Stack", description: "Highlights broad skillsets effectively.", category: "Tech", isPremium: true, styles: { typography: "mono", layout: "single-column", spacing: "compact", borders: "accent-left", sectionHeadings: "outline", headerAlignment: "left" }},
  { id: "pro-tech-3", name: "Data Scientist", description: "Crisp formatting for complex algorithms and analysis.", category: "Tech", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "accent-top", sectionHeadings: "solid", headerAlignment: "center" }},
  { id: "pro-tech-4", name: "DevOps Engineer", description: "Structured and reliable, like your deployments.", category: "Tech", isPremium: true, styles: { typography: "mono", layout: "split-right", spacing: "compact", borders: "thin", sectionHeadings: "none", headerAlignment: "left" }},
  { id: "pro-tech-5", name: "Product Manager", description: "Balances technical and leadership achievements.", category: "Tech", isPremium: true, styles: { typography: "classic", layout: "single-column", spacing: "spacious", borders: "accent-left", sectionHeadings: "outline", headerAlignment: "left" }},
  { id: "pro-tech-6", name: "Frontend Artisan", description: "A visually striking layout for UI engineers.", category: "Tech", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "thick", sectionHeadings: "subtle-bg", headerAlignment: "right" }},
  { id: "pro-tech-7", name: "Cloud Architect", description: "High-level overview layout.", category: "Tech", isPremium: true, styles: { typography: "modern", layout: "split-left", spacing: "spacious", borders: "accent-top", sectionHeadings: "none", headerAlignment: "left" }},
  { id: "pro-tech-8", name: "Cybersecurity", description: "Monospaced, secure, and aggressive.", category: "Tech", isPremium: true, styles: { typography: "mono", layout: "single-column", spacing: "compact", borders: "boxed", sectionHeadings: "solid", headerAlignment: "center", primaryColor: "#ef4444" }},
  { id: "pro-tech-9", name: "AI Researcher", description: "Academic yet modern styling.", category: "Tech", isPremium: true, styles: { typography: "serif", layout: "single-column", spacing: "normal", borders: "none", sectionHeadings: "outline", headerAlignment: "center" }},
  { id: "pro-tech-10", name: "Systems Admin", description: "No-nonsense tabular design.", category: "Tech", isPremium: true, styles: { typography: "classic", layout: "single-column", spacing: "compact", borders: "thin", sectionHeadings: "solid", headerAlignment: "left" }},

  // Creative / Design
  { id: "pro-creative-1", name: "Studio Agency", description: "Bold colors and striking header typography.", category: "Creative", isPremium: true, styles: { typography: "elegant", layout: "single-column", spacing: "spacious", borders: "accent-left", sectionHeadings: "solid", headerAlignment: "left", primaryColor: "#f43f5e" }},
  { id: "pro-creative-2", name: "UI/UX Designer", description: "Demonstrates your understanding of spacing and hierarchy.", category: "Creative", isPremium: true, styles: { typography: "minimalist", layout: "split-right", spacing: "spacious", borders: "none", sectionHeadings: "subtle-bg", headerAlignment: "left" }},
  { id: "pro-creative-3", name: "Brand Manager", description: "Highly styled with strong accent use.", category: "Creative", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "accent-top", sectionHeadings: "outline", headerAlignment: "center" }},
  { id: "pro-creative-4", name: "Marketing Guru", description: "Dynamic layout to hook the reader.", category: "Creative", isPremium: true, styles: { typography: "modern", layout: "split-left", spacing: "compact", borders: "accent-bottom", sectionHeadings: "solid", headerAlignment: "left" }},
  { id: "pro-creative-5", name: "Copywriter", description: "Typography-forward design that makes words shine.", category: "Creative", isPremium: true, styles: { typography: "serif", layout: "single-column", spacing: "spacious", borders: "none", sectionHeadings: "none", headerAlignment: "center" }},
  { id: "pro-creative-6", name: "Art Director", description: "Unconventional right-aligned headers.", category: "Creative", isPremium: true, styles: { typography: "elegant", layout: "single-column", spacing: "normal", borders: "boxed", sectionHeadings: "outline", headerAlignment: "right" }},
  { id: "pro-creative-7", name: "Illustrator", description: "Playful accents and relaxed spacing.", category: "Creative", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "spacious", borders: "thick", sectionHeadings: "subtle-bg", headerAlignment: "center", primaryColor: "#8b5cf6" }},
  { id: "pro-creative-8", name: "Content Creator", description: "Social-media inspired fluid design.", category: "Creative", isPremium: true, styles: { typography: "minimalist", layout: "split-right", spacing: "normal", borders: "accent-left", sectionHeadings: "none", headerAlignment: "left" }},
  { id: "pro-creative-9", name: "Video Producer", description: "Cinematic dark-mode friendly defaults.", category: "Creative", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "compact", borders: "accent-top", sectionHeadings: "solid", headerAlignment: "center" }},
  { id: "pro-creative-10", name: "Freelancer Focus", description: "Designed to highlight diverse project portfolios.", category: "Creative", isPremium: true, styles: { typography: "elegant", layout: "single-column", spacing: "normal", borders: "thin", sectionHeadings: "subtle-bg", headerAlignment: "left" }},

  // Minimal / Modern
  { id: "pro-min-1", name: "Nordic Minimal", description: "Extreme minimalism inspired by scandinavian design.", category: "Minimal", isPremium: true, styles: { typography: "minimalist", layout: "single-column", spacing: "spacious", borders: "none", sectionHeadings: "none", headerAlignment: "left" }},
  { id: "pro-min-2", name: "Tokyo Clean", description: "Sharp, high-contrast black and white styling.", category: "Minimal", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "thick", sectionHeadings: "solid", headerAlignment: "center", primaryColor: "#000000" }},
  { id: "pro-min-3", name: "Swiss Grid", description: "Rigid typography based on historical grid systems.", category: "Minimal", isPremium: true, styles: { typography: "modern", layout: "split-left", spacing: "compact", borders: "none", sectionHeadings: "outline", headerAlignment: "left" }},
  { id: "pro-min-4", name: "Essentialist", description: "Only what matters.", category: "Minimal", isPremium: true, styles: { typography: "serif", layout: "single-column", spacing: "spacious", borders: "accent-bottom", sectionHeadings: "none", headerAlignment: "center" }},
  { id: "pro-min-5", name: "Breathable", description: "Huge margins, tiny fonts. Very chic.", category: "Minimal", isPremium: true, styles: { typography: "minimalist", layout: "single-column", spacing: "spacious", borders: "none", sectionHeadings: "subtle-bg", headerAlignment: "left" }},
  { id: "pro-min-6", name: "Monochrome", description: "Greyscale strictly.", category: "Minimal", isPremium: true, styles: { typography: "mono", layout: "single-column", spacing: "compact", borders: "thin", sectionHeadings: "none", headerAlignment: "left", primaryColor: "#475569" }},
  { id: "pro-min-7", name: "Line Art", description: "Uses very thin dividing lines extensively.", category: "Minimal", isPremium: true, styles: { typography: "classic", layout: "single-column", spacing: "normal", borders: "accent-top", sectionHeadings: "outline", headerAlignment: "center" }},
  { id: "pro-min-8", name: "Offset Left", description: "Heavy left margin to draw the eye.", category: "Minimal", isPremium: true, styles: { typography: "modern", layout: "single-column", spacing: "normal", borders: "accent-left", sectionHeadings: "none", headerAlignment: "left" }},
  { id: "pro-min-9", name: "Centered Stack", description: "Everything center aligned. Very unique.", category: "Minimal", isPremium: true, styles: { typography: "elegant", layout: "single-column", spacing: "spacious", borders: "none", sectionHeadings: "solid", headerAlignment: "center" }},
  { id: "pro-min-10", name: "The Void", description: "Deep spacing between every section.", category: "Minimal", isPremium: true, styles: { typography: "minimalist", layout: "split-right", spacing: "spacious", borders: "none", sectionHeadings: "outline", headerAlignment: "right" }},
];
