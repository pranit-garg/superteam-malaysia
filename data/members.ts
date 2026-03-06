import type { Member } from "@/lib/supabase/types";

// Real members only. Add more as data becomes available.
export const SAMPLE_MEMBERS: Partial<Member>[] = [
  {
    id: "1",
    name: "Marianne",
    title: "Co-Lead",
    company: "Superteam Malaysia",
    skills: ["Community", "Growth", "Content"],
    badges: ["Core Contributor"],
    is_core_team: true,
    is_featured: true,
    twitter_url: "https://x.com/tuakdotsol",
    photo_url: "/images/members/marianne.jpg",
    status: "published",
  },
  {
    id: "2",
    name: "Han",
    title: "Co-Lead, DevRel",
    company: "Superteam Malaysia",
    skills: ["DevRel", "Community", "Operations"],
    badges: ["Core Contributor"],
    is_core_team: true,
    is_featured: true,
    twitter_url: "https://x.com/W_Han_01",
    photo_url: "/images/members/han.jpg",
    status: "published",
  },
];
