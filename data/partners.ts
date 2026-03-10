export interface PartnerData {
  name: string;
  type: "ecosystem" | "infrastructure";
  logo: string;
  url: string;
}

export const PARTNERS: PartnerData[] = [
  // Existing
  { name: "Helius", type: "infrastructure", logo: "/images/partners/helius.svg", url: "https://helius.dev" },
  { name: "Jupiter", type: "ecosystem", logo: "/images/partners/jupiter.svg", url: "https://jup.ag" },
  { name: "Phantom", type: "ecosystem", logo: "/images/partners/phantom.svg", url: "https://phantom.app" },
  { name: "Magic Eden", type: "ecosystem", logo: "/images/partners/magiceden.svg", url: "https://magiceden.io" },
  { name: "Marinade", type: "ecosystem", logo: "/images/partners/marinade.svg", url: "https://marinade.finance" },
  { name: "Jito", type: "infrastructure", logo: "/images/partners/jito.svg", url: "https://jito.network" },
  { name: "Tensor", type: "ecosystem", logo: "/images/partners/tensor.svg", url: "https://tensor.trade" },
  { name: "Raydium", type: "ecosystem", logo: "/images/partners/raydium.svg", url: "https://raydium.io" },
  { name: "Orca", type: "ecosystem", logo: "/images/partners/orca.png", url: "https://orca.so" },
  { name: "Drift", type: "ecosystem", logo: "/images/partners/drift.svg", url: "https://drift.trade" },
  // Tier 1
  { name: "Kamino", type: "ecosystem", logo: "/images/partners/kamino.png", url: "https://kamino.finance" },
  { name: "Pyth", type: "infrastructure", logo: "/images/partners/pyth.png", url: "https://pyth.network" },
  { name: "Metaplex", type: "infrastructure", logo: "/images/partners/metaplex.png", url: "https://metaplex.com" },
  { name: "Wormhole", type: "infrastructure", logo: "/images/partners/wormhole.png", url: "https://wormhole.com" },
  { name: "Sanctum", type: "ecosystem", logo: "/images/partners/sanctum.png", url: "https://sanctum.so" },
  { name: "Meteora", type: "ecosystem", logo: "/images/partners/meteora.png", url: "https://meteora.ag" },
  { name: "Squads", type: "infrastructure", logo: "/images/partners/squads.png", url: "https://squads.so" },
  { name: "Backpack", type: "ecosystem", logo: "/images/partners/backpack.png", url: "https://backpack.exchange" },
  // Tier 2
  { name: "Render", type: "infrastructure", logo: "/images/partners/render.png", url: "https://rendernetwork.com" },
  { name: "Helium", type: "infrastructure", logo: "/images/partners/helium.png", url: "https://helium.com" },
  { name: "marginfi", type: "ecosystem", logo: "/images/partners/marginfi.png", url: "https://marginfi.com" },
  { name: "Solflare", type: "ecosystem", logo: "/images/partners/solflare.png", url: "https://solflare.com" },
  { name: "Switchboard", type: "infrastructure", logo: "/images/partners/switchboard.png", url: "https://switchboard.xyz" },
  { name: "Parcl", type: "ecosystem", logo: "/images/partners/parcl.png", url: "https://parcl.co" },
  { name: "Zeta", type: "ecosystem", logo: "/images/partners/zeta.png", url: "https://zeta.markets" },
];
