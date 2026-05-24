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
  display: "block",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "block",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-condensed",
  display: "block",
});

export const metadata: Metadata = {
  title: "Solnest AI — Watch What Happens When AI Meets Your Business",
  description:
    "AI systems for operators who are serious about their time. Join the Solnest AI community and watch what happens when AI meets your business.",
  openGraph: {
    title: "Solnest AI — Watch What Happens When AI Meets Your Business",
    description:
      "AI systems for operators who are serious about their time.",
    type: "website",
  },
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
        <MotionProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
