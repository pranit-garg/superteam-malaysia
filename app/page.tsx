import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import HeroSection from "@/components/landing/HeroSection";
import MissionSection from "@/components/landing/MissionSection";
import StatsSection from "@/components/landing/StatsSection";
import PathwaySection from "@/components/landing/PathwaySection";
import EventsSection from "@/components/landing/EventsSection";
import MemberSpotlight from "@/components/landing/MemberSpotlight";
import InActionSection from "@/components/landing/InActionSection";
import PartnersSection from "@/components/landing/PartnersSection";
import WallOfLove from "@/components/landing/WallOfLove";
import FAQSection from "@/components/landing/FAQSection";
import JoinCTA from "@/components/landing/JoinCTA";
import { FAQ_ITEMS } from "@/data/faq";
import { fetchUpcomingEvents } from "@/lib/supabase/queries/events";
import { fetchPartners } from "@/lib/supabase/queries/partners";
import { fetchStats } from "@/lib/supabase/queries/stats";
import { fetchFAQ } from "@/lib/supabase/queries/faq";
import { fetchTestimonials } from "@/lib/supabase/queries/testimonials";
import { fetchFeaturedMembers } from "@/lib/supabase/queries/members";
import { fetchPageContent } from "@/lib/supabase/queries/page-content";
import type { HeroContent, MissionContent, PathwayContent, InActionContent, JoinCTAContent } from "@/lib/types/page-content";

export default async function Home() {
  const [events, supabasePartners, supabaseStats, supabaseFaq, testimonials, featuredMembers, heroContent, missionContent, pathwayContent, inActionContent, joinCtaContent] = await Promise.all([
    fetchUpcomingEvents(),
    fetchPartners(),
    fetchStats(),
    fetchFAQ(),
    fetchTestimonials(),
    fetchFeaturedMembers(),
    fetchPageContent<HeroContent>("hero"),
    fetchPageContent<MissionContent>("mission"),
    fetchPageContent<PathwayContent>("pathway"),
    fetchPageContent<InActionContent>("in_action"),
    fetchPageContent<JoinCTAContent>("join_cta"),
  ]);

  const partners = supabasePartners?.map(p => ({
    name: p.name,
    type: p.partner_type as "ecosystem" | "infrastructure",
    logo: p.logo_url || "",
    url: p.website_url || "",
  }));

  const stats = supabaseStats?.map(s => ({
    key: s.stat_key,
    label: s.label,
    value: s.value,
    suffix: s.suffix || "",
  }));

  const faqItems = supabaseFaq ?? FAQ_ITEMS;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <HeroSection content={heroContent} />
        <PartnersSection partners={partners ?? undefined} />
        <MissionSection content={missionContent} />
        <EventsSection events={events} />
        <StatsSection stats={stats ?? undefined} />
        <PathwaySection content={pathwayContent} />
        <MemberSpotlight members={featuredMembers ?? undefined} />
        <InActionSection content={inActionContent} />
        <WallOfLove testimonials={testimonials} />
        <FAQSection items={supabaseFaq ?? undefined} />
        <JoinCTA content={joinCtaContent} />
      </main>
      <Footer />
    </>
  );
}
