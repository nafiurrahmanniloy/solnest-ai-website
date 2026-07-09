import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Barlow,
  Barlow_Condensed,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { MotionProvider } from "@/components/ui/motion-provider";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

const SITE_URL = "https://solnestai.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Solnest AI - Watch What Happens When AI Meets Your Business",
    template: "%s | Solnest AI",
  },
  description:
    "Solnest AI is a top-tier AI software development agency specializing in short-term rentals, real estate, and med spas. We build production AI systems: multi-agent platforms, AI guest messaging, revenue engines, voice agents, and lead-gen agents.",
  keywords: [
    "AI development agency",
    "AI for short-term rentals",
    "STR AI automation",
    "AI guest messaging",
    "AI for real estate",
    "AI for med spas",
    "AI voice agents",
    "multi-agent AI systems",
    "AI revenue engine",
    "AI lead generation",
    "Solnest AI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Solnest AI - Watch What Happens When AI Meets Your Business",
    description:
      "Production AI systems for short-term rentals, real estate, and med spas: multi-agent platforms, AI guest messaging, revenue engines, voice agents, and lead-gen agents.",
    url: SITE_URL,
    siteName: "Solnest AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/solnest-logo.png",
        width: 1200,
        height: 630,
        alt: "Solnest AI - AI software development agency for STR, real estate, and med spas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solnest AI - Watch What Happens When AI Meets Your Business",
    description:
      "Production AI systems for short-term rentals, real estate, and med spas: multi-agent platforms, AI guest messaging, revenue engines, voice agents, and lead-gen agents.",
    images: ["/solnest-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Solnest AI",
      url: SITE_URL,
      logo: `${SITE_URL}/solnest-logo.png`,
      email: "hello@solnestai.com",
      description:
        "Top-tier AI software development agency specializing in production AI systems for short-term rentals, real estate, and med spas: multi-agent platforms, AI guest messaging, revenue engines, voice agents, and lead-gen agents.",
      founder: {
        "@type": "Person",
        "@id": `${SITE_URL}/#founder`,
        name: "Ryan",
        jobTitle: "Founder & AI Architect",
        description:
          "Pilot, AI architect, and the AI coach inside STR Secrets. Builds production multi-agent AI systems for short-term rental operators, real estate teams, and med spas.",
        image: `${SITE_URL}/ryan.jpg`,
        worksFor: { "@id": `${SITE_URL}/#organization` },
      },
      sameAs: ["https://skool.com/solnest-ai"],
      knowsAbout: [
        "Artificial intelligence software development",
        "Multi-agent AI systems",
        "AI guest messaging for short-term rentals",
        "Short-term rental (STR) operations and automation",
        "Vacation rental revenue management and dynamic pricing",
        "Guesty and property management system integrations",
        "AI voice agents",
        "AI lead generation for real estate",
        "Med spa patient concierge and booking automation",
        "Dental and medical office AI automation",
        "Restaurant AI voice ordering",
        "Business process automation",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Solnest AI",
      url: SITE_URL,
      image: `${SITE_URL}/solnest-logo.png`,
      email: "hello@solnestai.com",
      description:
        "AI software development agency building production AI systems for short-term rentals, real estate, and med spas — including a 5-agents-per-operator multi-tenant SaaS for STR Secrets, a 19-agent control center on Guesty, a med spa patient concierge with an 87% booking rate, and a real estate lead-gen agent with under-60-second response.",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Worldwide",
      priceRange: "$$$",
      sameAs: ["https://skool.com/solnest-ai"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Solnest AI Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Business Audit",
              description:
                "A structured assessment mapping where AI agents and automation produce measurable ROI in your business before any build begins.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Done-For-You AI Build",
              description:
                "End-to-end design, build, testing, and deployment of production AI systems: multi-agent platforms, AI guest messaging, revenue engines, voice agents, and lead-gen agents.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ongoing Advisory",
              description:
                "Retained access to Solnest AI's architects for roadmap, optimization, and expansion of deployed AI systems.",
            },
          },
        ],
      },
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
