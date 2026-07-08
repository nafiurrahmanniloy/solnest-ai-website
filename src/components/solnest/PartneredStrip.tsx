"use client";

import { motion } from "framer-motion";

// ─── Section ──────────────────────────────────────────────────────────────────
// Understated credibility strip. Sits directly under the hero. Not a CTA,
// no outbound link - just quiet social proof.

export function PartneredStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#0D0D0B",
        paddingTop: "clamp(28px, 3.2vw, 44px)",
        paddingBottom: "clamp(28px, 3.2vw, 44px)",
      }}
      aria-label="Partnered with"
    >
      {/* Top hairline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(240,235,225,0.08) 30%, rgba(240,235,225,0.08) 70%, transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] }}
        className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8 flex flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <span
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(212,204,184,0.35)",
            marginBottom: "18px",
            display: "inline-block",
          }}
        >
          Partnered With
        </span>

        {/*
          STR Secrets: real logo asset (black-on-transparent source,
          inverted to off-white via CSS filter for the dark strip).
          STR AI Summit: still a typographic stand-in - no asset yet.
        */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <img
            src="/logos/str-secrets.png"
            alt="Short Term Rental Secrets"
            width={750}
            height={185}
            style={{
              height: "clamp(30px, 3.2vw, 42px)",
              width: "auto",
              // source logo is black; invert to match the strip's off-white text
              filter: "brightness(0) saturate(100%) invert(93%) sepia(6%) saturate(300%) hue-rotate(15deg)",
              opacity: 0.75,
            }}
          />

          <div
            aria-hidden="true"
            className="hidden sm:block"
            style={{
              width: "1px",
              height: "22px",
              background: "rgba(240,235,225,0.15)",
            }}
          />

          <span
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "clamp(14px, 1.3vw, 18px)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(240,235,225,0.5)",
            }}
          >
            STR AI Summit
          </span>
        </div>

        {/* Supporting line */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "13px",
            color: "rgba(212,204,184,0.35)",
            marginTop: "16px",
            lineHeight: 1.6,
          }}
        >
          Ryan is the AI coach inside STR Secrets.
        </p>
      </motion.div>

      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(240,235,225,0.08) 30%, rgba(240,235,225,0.08) 70%, transparent)",
        }}
      />
    </section>
  );
}
