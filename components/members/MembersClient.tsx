"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer, TROPICAL_EASE } from "@/lib/animations";
import { MEMBER_SKILLS } from "@/lib/constants";
import type { Member } from "@/lib/supabase/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface MembersClientProps {
  members: Partial<Member>[];
}

export default function MembersClient({ members }: MembersClientProps) {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        !search ||
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.title?.toLowerCase().includes(search.toLowerCase()) ||
        m.company?.toLowerCase().includes(search.toLowerCase());

      const matchesSkill =
        !selectedSkill || m.skills?.includes(selectedSkill);

      return matchesSearch && matchesSkill;
    });
  }, [search, selectedSkill, members]);

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-bg pt-28 pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black mb-4">
              Member <span className="text-primary">Directory</span>
            </h1>
            <p className="text-text-muted max-w-lg mx-auto">
              Explore the builders, creators, and leaders in Superteam Malaysia.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, title, or company..."
                aria-label="Search members by name, title, or company"
                className="w-full pl-12 pr-4 py-3 bg-card border border-card-border rounded-xl text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary transition-colors"
              />
            </div>
          </div>

          {/* Skill Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Filter by skill">
            <button
              onClick={() => setSelectedSkill(null)}
              aria-pressed={!selectedSkill}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                !selectedSkill
                  ? "bg-primary text-bg border-primary"
                  : "bg-card border-card-border text-text-muted hover:border-primary/30"
              }`}
            >
              All
            </button>
            {MEMBER_SKILLS.map((skill) => (
              <button
                key={skill}
                onClick={() =>
                  setSelectedSkill(selectedSkill === skill ? null : skill)
                }
                aria-pressed={selectedSkill === skill}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  selectedSkill === skill
                    ? "bg-primary text-bg border-primary"
                    : "bg-card border-card-border text-text-muted hover:border-primary/30"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((member) => (
                <motion.div
                  key={member.id}
                  variants={fadeUp}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: TROPICAL_EASE }}
                  className="bg-card border border-card-border rounded-2xl p-6 hover:border-primary/20 transition-all duration-500"
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-lg font-[family-name:var(--font-display)]">
                        {member.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-bold text-lg">
                        {member.name}
                      </h3>
                      <p className="text-text-muted text-sm">{member.title}</p>
                      {member.company && (
                        <p className="text-text-muted/60 text-xs">
                          {member.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {member.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Badges */}
                  {member.badges && member.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {member.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-0.5 text-[10px] rounded-full bg-gold/10 text-gold border border-gold/20 font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Twitter */}
                  {member.twitter_url && (
                    <a
                      href={member.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors mt-2"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      @{member.twitter_url.split("/").pop()}
                    </a>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">
                No members found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
