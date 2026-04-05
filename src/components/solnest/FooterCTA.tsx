"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BlurText } from "@/components/ui/blur-text-animation";

const ShaderBackground = dynamic(
  () => import("@/components/ui/animated-shader-hero").then((m) => ({ default: m.ShaderBackground })),
  { ssr: false, loading: () => <div style={{ position: "absolute", inset: 0, background: "#000" }} /> }
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};

export function FooterCTA() {
  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Animated WebGL shader background */}
      <ShaderBackground />

      {/* Dark overlay for contrast */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />

      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(192,82,43,0.4), transparent)",
          zIndex: 10,
        }}
        aria-hidden="true"
      />

      <div
        className="max-w-[1600px] mx-auto px-4 md:px-8 text-center"
        style={{ position: "relative", zIndex: 10 }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {/* Small label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div style={{ width: "38px", height: "1px", backgroundColor: "#C0522B" }} />
            <span
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#C0522B",
              }}
            >
              This offer expires — no exceptions
            </span>
            <div style={{ width: "38px", height: "1px", backgroundColor: "#C0522B" }} />
          </motion.div>

          {/* Huge headline */}
          <motion.h2
            variants={itemVariants}
            className="mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#F0EBE1",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "clamp(55px, 7.4vw, 115px)",
              }}
            >
              The operators who move
            </span>
            <span
              style={{
                display: "block",
                fontSize: "clamp(55px, 7.4vw, 115px)",
              }}
            >
              fast{" "}
              <span style={{ color: "#C0522B", fontStyle: "italic" }}>
                win.
              </span>
            </span>
          </motion.h2>

          {/* Body — blur text loops to keep it alive on long page views */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "20px",
              lineHeight: 1.8,
              maxWidth: "720px",
              margin: "0 auto 56px",
            }}
          >
            <BlurText
              text="$67/mo. Locked forever. 7-day free trial. When this founding window closes, the price goes up — permanently. The only question is whether you act before or after that happens."
              loopDelay={1500}
              style={{ color: "rgba(212,204,184,0.75)" }}
            />
          </motion.p>

          {/* Full-width CTA button */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <MagneticButton
              href="https://skool.com/solnest-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{
                width: "100%",
                maxWidth: "860px",
                padding: "28px 60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 40px rgba(192,82,43,0.25), 0 0 80px rgba(192,82,43,0.1)",
              } as React.CSSProperties}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  zIndex: 1,
                  transition: "transform 0.5s ease",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "18px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Lock In $67/mo Before It&apos;s Gone
              </span>
            </MagneticButton>
          </motion.div>

          {/* Trial note */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "15px",
              color: "rgba(212,204,184,0.45)",
              lineHeight: 1.7,
            }}
          >
            7-day free trial · Cancel anytime · Use browser to sign up (not the Skool app)
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(192,82,43,0.4), transparent)",
          zIndex: 10,
        }}
        aria-hidden="true"
      />
    </section>
  );
}
