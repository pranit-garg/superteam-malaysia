export interface PartnerData {
  name: string;
  type: "ecosystem" | "infrastructure";
  logo: string;
  url: string;
}

export const PARTNERS: PartnerData[] = [
  { name: "Solana Foundation", type: "ecosystem", logo: "/images/partners/solana.svg", url: "https://solana.com" },
  { name: "Superteam", type: "ecosystem", logo: "/images/partners/superteam.svg", url: "https://superteam.fun" },
  { name: "Helius", type: "infrastructure", logo: "/images/partners/helius.svg", url: "https://helius.dev" },
  { name: "Jupiter", type: "ecosystem", logo: "/images/partners/jupiter.svg", url: "https://jup.ag" },
  { name: "Phantom", type: "ecosystem", logo: "/images/partners/phantom.svg", url: "https://phantom.app" },
  { name: "Magic Eden", type: "ecosystem", logo: "/images/partners/magiceden.svg", url: "https://magiceden.io" },
  { name: "Marinade", type: "ecosystem", logo: "/images/partners/marinade.svg", url: "https://marinade.finance" },
  { name: "Jito", type: "infrastructure", logo: "/images/partners/jito.svg", url: "https://jito.network" },
  { name: "Tensor", type: "ecosystem", logo: "/images/partners/tensor.svg", url: "https://tensor.trade" },
  { name: "Raydium", type: "ecosystem", logo: "/images/partners/raydium.svg", url: "https://raydium.io" },
  { name: "Orca", type: "ecosystem", logo: "/images/partners/orca.svg", url: "https://orca.so" },
  { name: "Drift", type: "ecosystem", logo: "/images/partners/drift.svg", url: "https://drift.trade" },
];
