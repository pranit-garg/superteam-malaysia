import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Directory",
  description:
    "Explore the builders, creators, and leaders in Superteam Malaysia. Search by name, skill, or company.",
  openGraph: {
    title: "Member Directory | Superteam Malaysia",
    description:
      "Explore the builders, creators, and leaders in Superteam Malaysia.",
  },
  alternates: {
    canonical: "https://superteammy.com/members",
  },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
