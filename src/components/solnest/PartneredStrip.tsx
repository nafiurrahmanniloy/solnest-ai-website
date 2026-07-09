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
        paddingTop: "var(--strip-pad, clamp(40px, 5vw, 80px))",
        paddingBottom: "var(--strip-pad, clamp(40px, 5vw, 80px))",
      }}
      aria-label="Partnered with"
    >
      {/* Section seam - single full-bleed hairline, top only */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] }}
        className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8 flex flex-col items-center text-center"
      >
        {/* Eyebrow - house device: rust rule, 14px gap, flanked (centered) */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "18px",
          }}
        >
          <span
            aria-hidden="true"
            style={{ width: "34px", height: "1px", background: "#C0522B", flexShrink: 0 }}
          />
          <span
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(212,204,184,0.65)",
            }}
          >
            Partnered With
          </span>
          <span
            aria-hidden="true"
            style={{ width: "34px", height: "1px", background: "#C0522B", flexShrink: 0 }}
          />
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
            className="opacity-60 hover:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]"
            style={{
              height: "clamp(30px, 3.2vw, 42px)",
              width: "auto",
              // source logo is black; invert to match the strip's off-white text
              filter: "brightness(0) saturate(100%) invert(93%) sepia(6%) saturate(300%) hue-rotate(15deg)",
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
            className="opacity-60 hover:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.215,0.61,0.355,1)]"
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "clamp(14px, 1.3vw, 18px)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(240,235,225,0.92)",
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
            color: "rgba(212,204,184,0.55)",
            marginTop: "16px",
            lineHeight: 1.6,
          }}
        >
          Ryan is the AI coach inside STR Secrets.
        </p>
      </motion.div>
    </section>
  );
}
