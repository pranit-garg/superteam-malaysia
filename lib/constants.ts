export const COLORS = {
  background: "#0d1a12",
  backgroundAlt: "#142820",
  primary: "#5523DE",
  secondary: "#0AB172",
  tertiary: "#d4a246",
  textPrimary: "#ffffff",
  textMuted: "#a1a1aa",
  cardSurface: "rgba(255,255,255,0.05)",
  cardBorder: "rgba(255,255,255,0.08)",
} as const;

export const SOCIAL_LINKS = {
  twitter: "https://x.com/SuperteamMY",
  telegram: "https://t.me/SuperteamMY",
  luma: "https://lu.ma/mysuperteam",
  superteamGlobal: "https://superteam.fun",
  superteamEarn: "https://superteam.fun/earn",
  solanaDev: "https://solana.com/developers",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#mission" },
  { label: "Get Started", href: "#get-started" },
  { label: "Events", href: "#events" },
  { label: "Community", href: "#members" },
  { label: "FAQ", href: "#faq" },
] as const;

export const SITE_CONFIG = {
  name: "Superteam Malaysia",
  tagline: "The home for Solana builders in Malaysia",
  url: "https://my.superteam.fun",
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
