import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import HeroSection from "@/components/landing/HeroSection";
import MissionSection from "@/components/landing/MissionSection";

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

export default async function Home() {
  const events = await fetchUpcomingEvents();

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
        <HeroSection />
        <PartnersSection />
        <MissionSection />
        <EventsSection events={events} />
        <PathwaySection />
        <MemberSpotlight />
        <InActionSection />
        <WallOfLove />
        <FAQSection />
        <JoinCTA />
      </main>
      <Footer />
    </>
  );
}
