import dynamic from "next/dynamic";
import Nav from "@/components/solnest/Nav";
import Hero from "@/components/solnest/Hero";
import { PartneredStrip } from "@/components/solnest/PartneredStrip";
import Footer from "@/components/solnest/Footer";

// Below-the-fold sections are code-split so the hero paints and hydrates
// without downloading the whole page's JS. SSR stays on (default), so the
// full HTML is still served to crawlers and AI answer engines.
const VDIvsVWASection = dynamic(() =>
  import("@/components/solnest/VDIvsVWASection").then((m) => ({ default: m.VDIvsVWASection }))
);
const TwoWaysFork = dynamic(() =>
  import("@/components/solnest/TwoWaysFork").then((m) => ({ default: m.TwoWaysFork }))
);
const CommunitySection = dynamic(() =>
  import("@/components/solnest/CommunitySection").then((m) => ({ default: m.CommunitySection }))
);
const CommunityPricing = dynamic(() =>
  import("@/components/solnest/CommunitySection").then((m) => ({ default: m.CommunityPricing }))
);
const ServicesSection = dynamic(() =>
  import("@/components/solnest/ServicesSection").then((m) => ({ default: m.ServicesSection }))
);
const IntegrationStrip = dynamic(() =>
  import("@/components/solnest/IntegrationStrip").then((m) => ({ default: m.IntegrationStrip }))
);
const VideoTestimonials = dynamic(() =>
  import("@/components/solnest/VideoTestimonials").then((m) => ({ default: m.VideoTestimonials }))
);
const AboutSection = dynamic(() =>
  import("@/components/solnest/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const FooterCTA = dynamic(() =>
  import("@/components/solnest/FooterCTA").then((m) => ({ default: m.FooterCTA }))
);

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
