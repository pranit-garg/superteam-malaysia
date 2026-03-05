"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { fadeUp, staggerContainer, TROPICAL_EASE } from "@/lib/animations";
import { SAMPLE_MEMBERS } from "@/data/members";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

function MemberCard({ member }: { member: (typeof SAMPLE_MEMBERS)[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-72 cursor-pointer perspective-[1000px] rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped(!flipped)}
      tabIndex={0}
      role="button"
      aria-label={`${flipped ? "Hide" : "View"} ${member.name}'s profile details`}
    >
      <motion.div
        className="absolute inset-0 transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          rotateY: flipped ? 180 : 0,
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: TROPICAL_EASE }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card border border-card-border rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Avatar placeholder */}
          <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-4">
            <span className="text-primary font-bold text-xl font-[family-name:var(--font-display)]">
              {member.name?.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-display)] font-bold text-lg">
            {member.name}
          </h3>
          <p className="text-text-muted text-sm">
            {member.title}
          </p>
          <p className="text-text-muted/60 text-xs mt-1">
            {member.company}
          </p>

          {/* Badges */}
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

        {/* Back */}
        <div
          className="absolute inset-0 bg-card border border-primary/20 rounded-2xl p-6 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="font-[family-name:var(--font-display)] font-bold text-lg mb-3 text-primary">
            {member.name}
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
                Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {member.twitter_url && (
              <a
                href={member.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @{member.twitter_url.split("/").pop()}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function MemberSpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featured = SAMPLE_MEMBERS.filter((m) => m.is_featured);

  return (
    <SectionWrapper id="members">
      <div className="text-center mb-16">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          Our Builders
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
        >
          Meet the <span className="text-primary">Community</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-text-muted mt-4 max-w-lg mx-auto"
        >
          Tap a card to see what they're working on.
        </motion.p>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
      >
        {featured.map((member, i) => (
          <motion.div key={member.id} variants={fadeUp} custom={i * 0.05}>
            <MemberCard member={member} />
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <Link href="/members">
          <Button variant="ghost">View Full Directory</Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
