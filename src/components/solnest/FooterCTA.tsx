"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BlurText } from "@/components/ui/blur-text-animation";

const ShaderBackground = dynamic(
  () => import("@/components/ui/animated-shader-hero").then((m) => ({ default: m.ShaderBackground })),
  { ssr: false, loading: () => <div style={{ position: "absolute", inset: 0, background: "#0D0D0B" }} /> }
);

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1.0];

const BODY_COPY =
  "Run a short-term rental? Join the community for $97/mo: live builds, the agent library, the SOPs, all of it. Run any other business? Book a call and Ryan's team builds your AI for you. The only question is whether you start today or three months from now.";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Sanctioned parallax moment (c): heading rises ~40px as the section scrolls in.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const headingParallaxY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "#0D0D0B" }}
    >
      {/* Animated WebGL shader background */}
      <div aria-hidden="true">
        <ShaderBackground />
      </div>

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

      {/* Top seam */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)",
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
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          variants={containerVariants}
        >
          {/* Small label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-6"
            style={{ gap: "14px" }}
          >
            <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
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
              Two ways in. Pick your door.
            </span>
            <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
          </motion.div>

          {/* Huge headline - sanctioned parallax: rises ~40px on scroll */}
          <motion.div style={{ y: prefersReducedMotion ? 0 : headingParallaxY }}>
            <motion.h2
              variants={itemVariants}
              className="mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                lineHeight: 1.05,
                color: "#F0EBE1",
                textWrap: "balance",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))",
                }}
              >
                The operators who move
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))",
                }}
              >
                fast{" "}
                <span style={{ color: "#C0522B", fontStyle: "italic" }}>
                  win.
                </span>
              </span>
            </motion.h2>
          </motion.div>

          {/* Body - blur text animates once, settles at final state */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))",
              lineHeight: 1.6,
              maxWidth: "720px",
              margin: "0 auto 56px",
              textWrap: "pretty",
            }}
          >
            {prefersReducedMotion ? (
              <span style={{ color: "rgba(212,204,184,0.75)" }}>{BODY_COPY}</span>
            ) : (
              <BlurText
                text={BODY_COPY}
                once
                style={{ color: "rgba(212,204,184,0.75)" }}
              />
            )}
          </motion.p>

          {/* Dual CTA - the two doors */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-stretch gap-4 mb-8 mx-auto"
            style={{ maxWidth: "860px" }}
          >
            {/* Door 1 - STR community */}
            <MagneticButton
              href="https://skool.com/solnest-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-rust text-cream overflow-hidden flex-1"
              style={{
                padding: "26px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 40px rgba(192,82,43,0.25), 0 0 80px rgba(192,82,43,0.1)",
              } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  zIndex: 1,
                  transition: "transform 0.5s cubic-bezier(0.215,0.61,0.355,1)",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "17px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                }}
              >
                Join the Community <span style={{ opacity: 0.7 }}>$97/mo</span>
              </span>
            </MagneticButton>

            {/* Door 2 - Done-For-You */}
            <MagneticButton
              href="/book"
              className="group relative overflow-hidden flex-1"
              style={{
                padding: "26px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(240,235,225,0.3)",
                background: "rgba(240,235,225,0.03)",
              } as React.CSSProperties}
            >
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "17px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#F0EBE1",
                  position: "relative",
                  zIndex: 2,
                  textAlign: "center",
                }}
              >
                Book a Call
              </span>
            </MagneticButton>
          </motion.div>

          {/* Trial note */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "var(--fs-caption, 13px)",
              color: "rgba(212,204,184,0.55)",
              lineHeight: 1.7,
            }}
          >
            Cancel anytime · Use browser to sign up (not the Skool app)
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
