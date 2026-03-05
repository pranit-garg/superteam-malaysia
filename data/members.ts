import type { Member } from "@/lib/supabase/types";

// Sample members for development (replaced by Supabase in production)
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
    twitter_url: null,
    photo_url: "/images/members/marianne.png",
    status: "published",
  },
  {
    id: "2",
    name: "Han",
    title: "Co-Lead",
    company: "Superteam Malaysia",
    skills: ["Community", "Growth", "Operations"],
    badges: ["Core Contributor"],
    is_core_team: true,
    is_featured: true,
    twitter_url: null,
    photo_url: null,
    status: "published",
  },
];
