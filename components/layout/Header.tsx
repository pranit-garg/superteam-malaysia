"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { TROPICAL_EASE } from "@/lib/animations";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: TROPICAL_EASE }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="text-primary font-bold text-sm font-[family-name:var(--font-display)]">
                ST
              </span>
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight">
              Superteam{" "}
              <span className="text-primary">MY</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-primary transition-colors duration-300 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/members"
              className="text-sm text-text-muted hover:text-primary transition-colors duration-300 rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Directory
            </Link>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-bg font-medium text-sm rounded-full hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none"
            >
              Join Community
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <motion.span
                className="w-5 h-[1.5px] bg-text block"
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="w-5 h-[1.5px] bg-text block"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="w-5 h-[1.5px] bg-text block"
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-[family-name:var(--font-display)] font-bold text-text hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, ease: TROPICAL_EASE }}
                >
                  {link.label}
                </motion.a>
              ))}
              <Link
                href="/members"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-[family-name:var(--font-display)] font-bold text-text hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                Directory
              </Link>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-8 py-3 bg-primary text-bg font-medium rounded-full focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none"
              >
                Join Community
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
