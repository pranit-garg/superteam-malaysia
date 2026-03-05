import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-bold text-sm font-[family-name:var(--font-display)]">
                  ST
                </span>
              </div>
              <span className="font-[family-name:var(--font-display)] font-bold text-lg">
                Superteam <span className="text-primary">MY</span>
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-[family-name:var(--font-display)] font-bold text-sm mb-4 text-text-muted uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/members"
                  className="text-sm text-text-muted hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Member Directory
                </Link>
              </li>
            </ul>
          </nav>

          {/* Community */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-sm mb-4 text-text-muted uppercase tracking-wider">
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.luma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Events (Luma)
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.superteamGlobal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-primary transition-colors rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Superteam Global
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Superteam Malaysia. Part of the{" "}
            <a
              href={SOCIAL_LINKS.superteamGlobal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline rounded focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Superteam
            </a>{" "}
            network.
          </p>
          <p className="text-xs text-text-muted">
            Powered by{" "}
            <span className="text-primary">Solana</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
