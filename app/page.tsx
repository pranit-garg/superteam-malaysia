import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import HeroSection from "@/components/landing/HeroSection";
import MissionSection from "@/components/landing/MissionSection";
import StatsSection from "@/components/landing/StatsSection";
import EventsSection from "@/components/landing/EventsSection";
import MemberSpotlight from "@/components/landing/MemberSpotlight";
import PartnersSection from "@/components/landing/PartnersSection";
import WallOfLove from "@/components/landing/WallOfLove";
import FAQSection from "@/components/landing/FAQSection";
import JoinCTA from "@/components/landing/JoinCTA";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <MissionSection />
        <StatsSection />
        <EventsSection />
        <MemberSpotlight />
        <PartnersSection />
        <WallOfLove />
        <FAQSection />
        <JoinCTA />
      </main>
      <Footer />
    </>
  );
}
