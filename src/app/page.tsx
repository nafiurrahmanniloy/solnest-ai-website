import Nav from "@/components/solnest/Nav";
import Hero from "@/components/solnest/Hero";
import { PartneredStrip } from "@/components/solnest/PartneredStrip";
import { VDIvsVWASection } from "@/components/solnest/VDIvsVWASection";
import { TwoWaysFork } from "@/components/solnest/TwoWaysFork";
import { CommunitySection, CommunityPricing } from "@/components/solnest/CommunitySection";
import { ServicesSection } from "@/components/solnest/ServicesSection";
import { IntegrationStrip } from "@/components/solnest/IntegrationStrip";
import { VideoTestimonials } from "@/components/solnest/VideoTestimonials";
import { AboutSection } from "@/components/solnest/AboutSection";
import { FooterCTA } from "@/components/solnest/FooterCTA";
import Footer from "@/components/solnest/Footer";

export default function Home() {
  return (
    <main>
      {/* [1] Nav */}
      <Nav />
      {/* [2] Hero - the lobby (dual CTA: Explore the Community / Get AI Built For You) */}
      <Hero />
      {/* [3] Partnered with STR Secrets - credibility strip */}
      <PartneredStrip />
      {/* [4] Problem agitation */}
      <VDIvsVWASection />
      {/* [5] THE FORK - two doors (#how) */}
      <TwoWaysFork />
      {/* [6] Community deep-dive - STR only (#community) */}
      <CommunitySection />
      {/* $97 pricing - carries the "for STR operators" context */}
      <CommunityPricing />
      {/* [7] Done-For-You / Work With Ryan - Industries + Recent Builds (#services) */}
      <ServicesSection />
      {/* [8] Integrations */}
      <IntegrationStrip />
      {/* [9] Video testimonials - built, hidden until first video */}
      <VideoTestimonials />
      {/* [10] Ryan bio (+ AI coach inside STR Secrets) */}
      <AboutSection />
      {/* [11] Final CTA - dual */}
      <FooterCTA />
      {/* [12] Footer */}
      <Footer />
    </main>
  );
}
