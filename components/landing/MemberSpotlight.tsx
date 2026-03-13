"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { fadeLeft, fadeRight, fadeUp, staggerContainer } from "@/lib/animations";
import { SAMPLE_MEMBERS } from "@/data/members";
import type { Member } from "@/lib/supabase/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

function MemberCard({ member }: { member: (typeof SAMPLE_MEMBERS)[0] }) {
  const Wrapper = member.twitter_url ? "a" : "div";
  const linkProps = member.twitter_url
    ? { href: member.twitter_url, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="relative block h-72 rounded-2xl bg-card border border-card-border p-6 group hover:border-primary/30 hover:shadow-[0_0_30px_rgba(85,35,222,0.1)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      {/* X/Twitter icon in top-right corner */}
      {member.twitter_url && (
        <div className="absolute top-4 right-4 text-text-muted/40 group-hover:text-primary transition-colors duration-300">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      )}

      <div className="flex flex-col items-center justify-center text-center h-full">
        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4 overflow-hidden group-hover:border-primary/50 transition-colors duration-300">
          {member.photo_url ? (
            <Image
              src={member.photo_url}
              alt={member.name || "Member"}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-primary font-bold text-xl font-[family-name:var(--font-display)]">
              {member.name?.split(" ").map((n) => n[0]).join("")}
            </span>
          )}
        </div>
        <h3 className="font-[family-name:var(--font-display)] font-bold text-lg">
          {member.name}
        </h3>
        <p className="text-text-muted text-sm">{member.title}</p>
        <p className="text-text-muted/60 text-xs mt-1">{member.company}</p>

        <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
          {member.badges?.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className="px-2 py-0.5 text-[10px] rounded-full bg-gold/10 text-gold border border-gold/20 font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default function MemberSpotlight({ members }: { members?: Partial<Member>[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featured = (members && members.length > 0 ? members : SAMPLE_MEMBERS).filter((m) => m.is_featured);

  return (
    <SectionWrapper id="members" bg="warm">
      <div ref={ref} className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left 40%: Sticky info */}
        <motion.div
          className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start"
          variants={fadeLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">
            Our Builders
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mb-4">
            Meet the <span className="text-primary">Community</span>
          </h2>
          <p className="text-text-muted mb-8 leading-relaxed">
            Developers, designers, creators, and operators building on Solana
            across Malaysia.
          </p>
          <Link href="/members">
            <Button variant="ghost">View Full Directory</Button>
          </Link>
        </motion.div>

        {/* Right 60%: Card grid */}
        <motion.div
          className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featured.map((member, i) => (
            <motion.div
              key={member.id}
              variants={fadeRight}
              custom={i * 0.08}
            >
              <MemberCard member={member} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
