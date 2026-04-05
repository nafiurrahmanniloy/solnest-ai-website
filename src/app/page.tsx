import Nav from "@/components/solnest/Nav";
import Hero from "@/components/solnest/Hero";
import { VDIvsVWASection } from "@/components/solnest/VDIvsVWASection";
import { ShowcaseSection } from "@/components/solnest/ShowcaseSection";
import { IntegrationStrip } from "@/components/solnest/IntegrationStrip";
import { CommunitySection } from "@/components/solnest/CommunitySection";
import { ServicesSection } from "@/components/solnest/ServicesSection";
import { AboutSection } from "@/components/solnest/AboutSection";
import { FooterCTA } from "@/components/solnest/FooterCTA";
import Footer from "@/components/solnest/Footer";
import { MobileSolutions } from "@/components/solnest/MobileSolutions";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <VDIvsVWASection />
      <ShowcaseSection />
      <MobileSolutions />
      <IntegrationStrip />
      <ServicesSection />
      <CommunitySection />
      <AboutSection />
      <FooterCTA />
      <Footer />
    </main>
  );
}
