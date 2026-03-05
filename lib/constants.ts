export const COLORS = {
  background: "#0a0a0f",
  backgroundAlt: "#0f1a14",
  primary: "#14F195", // Solana Green
  secondary: "#9945FF", // Solana Purple
  tertiary: "#d4a246", // Malaysian Gold
  textPrimary: "#ffffff",
  textMuted: "#a1a1aa",
  cardSurface: "rgba(255,255,255,0.05)",
  cardBorder: "rgba(255,255,255,0.08)",
} as const;

export const SOCIAL_LINKS = {
  twitter: "https://x.com/SuperteamMY",
  telegram: "https://t.me/SuperteamMY",
  discord: "#",
  luma: "https://lu.ma/superteammy",
  superteamGlobal: "https://superteam.fun",
} as const;

export const NAV_LINKS = [
  { label: "Mission", href: "#mission" },
  { label: "Events", href: "#events" },
  { label: "Members", href: "#members" },
  { label: "Partners", href: "#partners" },
  { label: "FAQ", href: "#faq" },
] as const;

export const SITE_CONFIG = {
  name: "Superteam Malaysia",
  tagline: "The home for Solana builders in Malaysia",
  url: "https://superteammy.com",
  description:
    "Superteam Malaysia is the local chapter of the global Superteam network, empowering builders, creators, and talent in the Solana ecosystem.",
} as const;

export const MEMBER_SKILLS = [
  "Core Team",
  "Rust",
  "Frontend",
  "Design",
  "Content",
  "Growth",
  "Product",
  "Community",
] as const;

export const MEMBER_BADGES = [
  "Solana Builder",
  "Hackathon Winner",
  "Core Contributor",
  "Grant Recipient",
  "DAO Contributor",
] as const;
