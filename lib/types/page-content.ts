export interface HeroContent {
  headline_1: string;
  headline_2: string;
  subheadline: string;
  cta_1_text: string;
  cta_1_url: string;
  cta_2_text: string;
  cta_2_url: string;
  video_url?: string;
}

export interface MissionPillar {
  title: string;
  description: string;
}

export interface MissionContent {
  eyebrow: string;
  headline: string;
  headline_accent: string;
  description: string;
  pillars: MissionPillar[];
}

export interface PathwayLink {
  label: string;
  href: string;
}

export interface PathwayStep {
  number: string;
  label: string;
  title: string;
  description: string;
  links: PathwayLink[];
}

export interface PathwayContent {
  eyebrow: string;
  headline_1: string;
  headline_2: string;
  description: string;
  steps: PathwayStep[];
}

export interface InActionImage {
  src: string;
  alt: string;
}

export interface InActionContent {
  eyebrow: string;
  headline: string;
  headline_accent: string;
  images: InActionImage[];
}

export interface JoinCTAContent {
  eyebrow: string;
  headline_1: string;
  headline_2: string;
  subheadline: string;
  cta_1_text: string;
  cta_1_url: string;
  cta_2_text: string;
  cta_2_url: string;
  video_url?: string;
}
