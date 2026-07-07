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
          Placeholder wordmarks - no real logo image assets yet for
          STR Secrets / STR AI Summit. These are typographic stand-ins
          styled like an understated monochrome "as featured in" bar.
          TODO: swap for real <Image> logo assets when the client provides them.
        */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(20px, 2vw, 28px)",
              letterSpacing: "0.02em",
              color: "rgba(240,235,225,0.7)",
            }}
          >
            STR Secrets
          </span>

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
