"use client";

import { motion } from "framer-motion";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

const images = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1280&h=720&fit=crop&auto=format&q=80",
    alt: "Luxury STR property exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1280&h=720&fit=crop&auto=format&q=80",
    alt: "Modern interior living space",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&auto=format&q=80",
    alt: "Dark moody architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1280&h=720&fit=crop&auto=format&q=80",
    alt: "Premium home exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=800&fit=crop&auto=format&q=80",
    alt: "Minimalist interior design",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1280&h=720&fit=crop&auto=format&q=80",
    alt: "Modern architectural home",
  },
  {
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1280&h=720&fit=crop&auto=format&q=80",
    alt: "Luxury property at night",
  },
];

export function ParallaxSection() {
  return (
    <div style={{ background: "#0D0D0B" }}>
      {/* Intro label - visible before scroll starts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="flex items-center gap-4 mb-5">
          <div style={{ width: "32px", height: "1px", backgroundColor: "#C0522B" }} />
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C0522B" }}>
            Properties We Automate
          </span>
          <div style={{ width: "32px", height: "1px", backgroundColor: "#C0522B" }} />
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.06, color: "#F0EBE1", letterSpacing: "-0.02em" }}>
          Scroll to see what{" "}
          <span style={{ fontStyle: "italic", color: "#C0522B" }}>AI runs.</span>
        </h2>
      </motion.div>

      <ZoomParallax images={images} />
    </div>
  );
}
