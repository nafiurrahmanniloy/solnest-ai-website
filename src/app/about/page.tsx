"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";
import { MagneticButton } from "@/components/ui/magnetic-button";

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1.0];

// ─── Shared motion variants ─────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─── Content ─────────────────────────────────────────────────────────────────

const tags = [
  "Commercial Pilot",
  "STR Operator",
  "AI Coach @ STR Secrets",
  "AI Builder",
  "Yo-Yo Enthusiast",
];

const roles = [
  { role: "STR Operator", detail: "Multiple properties running fully automated, zero manual steps." },
  { role: "AI Coach", detail: "The recognized AI authority inside STR Secrets." },
  { role: "AI Builder", detail: "40+ agents deployed across real businesses." },
  { role: "Community Lead", detail: "A growing community of STR operators learning and building together." },
];

const values = [
  {
    number: "01",
    title: "Build, don't advise",
    detail: "We put working systems into your business, not slide decks.",
  },
  {
    number: "02",
    title: "Honest by default",
    detail: "Real builds, real numbers, no vaporware.",
  },
  {
    number: "03",
    title: "Any operator",
    detail: "STR roots, but we serve any business ready to move.",
  },
  {
    number: "04",
    title: "In your corner",
    detail: "We stay and keep improving what we ship.",
  },
];

const stats = [
  { value: 40, suffix: "+", label: "AI Agents Built", accent: "#C0522B" },
  { value: 50, suffix: "+", label: "Businesses Automated", accent: "#C9A84C" },
  { value: 300, suffix: "+", label: "Hours Saved / Mo", accent: "#C0522B" },
  { value: 15, suffix: "+", label: "Years Automating", accent: "#C9A84C" },
];

// ─── Animated stat ───────────────────────────────────────────────────────────

function AnimatedStat({
  value,
  suffix,
  label,
  accent,
}: {
  value: number;
  suffix: string;
  label: string;
  accent: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.min(Math.round(progress * value), value));
      if (step >= steps) clearInterval(timer);
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [inView, value, prefersReducedMotion]);

  return (
    <div ref={ref} className="flex flex-col items-center py-6 md:py-7 text-center">
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(34px, 3.8vw, 64px)",
          lineHeight: 1,
          color: "#F0EBE1",
          letterSpacing: "-0.03em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}
        <span style={{ color: accent, fontSize: "0.55em", fontWeight: 300, verticalAlign: "middle" }}>
          {suffix}
        </span>
      </div>
      <div
        aria-hidden="true"
        style={{
          width: "24px",
          height: "1px",
          background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
          margin: "12px auto 10px",
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(212,204,184,0.55)",
          padding: "0 8px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#0D0D0B",
        paddingTop: "clamp(140px, 16vw, 190px)",
        paddingBottom: "clamp(64px, 8vw, 100px)",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-15vw] left-1/2 -translate-x-1/2"
        style={{
          width: "70vw",
          height: "50vw",
          maxWidth: "900px",
          maxHeight: "700px",
          background: "radial-gradient(ellipse at center, rgba(192,82,43,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
        variants={containerVariants}
        className="relative z-10 max-w-[900px] mx-auto px-4 md:px-8 text-center"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3.5 mb-7">
          <div style={{ width: "34px", height: "1px", background: "#C0522B" }} />
          <span
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C0522B",
            }}
          >
            About Solnest AI
          </span>
          <div style={{ width: "34px", height: "1px", background: "#C0522B" }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(40px, 6vw, 96px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#F0EBE1",
            marginBottom: "24px",
          }}
        >
          The people behind{" "}
          <span style={{ color: "#C0522B", fontStyle: "italic" }}>the builds.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "clamp(17px, 1.5vw, 22px)",
            lineHeight: 1.75,
            color: "rgba(212,204,184,0.75)",
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          Solnest AI is Ryan Lefebvre and a small team that builds AI systems into
          real businesses. STR is where we started, operators of every kind are
          where we are going.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── Meet Ryan (photo / cream bio split) ────────────────────────────────────

function MeetRyanSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ background: "linear-gradient(to right, #0D0D0B 50%, #F5F0E8 50%)" }}
      >
        {/* LEFT - photo with tags overlay */}
        <div
          className="relative overflow-hidden"
          style={{ background: "#0D0D0B", minHeight: "clamp(420px, 58vw, 680px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src="/ryan.jpg"
              alt="Ryan Lefebvre, Founder of Solnest AI"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "50% 18%" }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                background:
                  "linear-gradient(to top, rgba(13,13,11,0.95) 0%, rgba(13,13,11,0.4) 55%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              aria-hidden="true"
              className="hidden lg:block"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "8%",
                background: "linear-gradient(to right, #0D0D0B, transparent)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            variants={containerVariants}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "26px 28px", zIndex: 10 }}
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C0522B",
                marginBottom: "12px",
              }}
            >
              Ryan Lefebvre
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 600,
                    fontSize: "12.5px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(240,235,225,0.85)",
                    border: "1px solid rgba(240,235,225,0.25)",
                    background: "rgba(13,13,11,0.55)",
                    padding: "6px 13px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT - bio on cream */}
        <div
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-14 lg:py-20"
          style={{ background: "#F5F0E8" }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            variants={containerVariants}
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3.5 mb-7">
              <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C0522B",
                }}
              >
                Meet Ryan Lefebvre
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(36px, 4.8vw, 72px)",
                lineHeight: 1.1,
                color: "#1A1918",
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              Pilot. Yo-yo enthusiast.
              <br />
              <span style={{ color: "#C0522B", fontStyle: "italic" }}>AI architect.</span>
            </motion.h2>

            {/* Role list */}
            <motion.div variants={itemVariants} style={{ marginBottom: "24px" }}>
              {roles.map((r, i) => (
                <div
                  key={r.role}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                  style={{
                    padding: "12px 0",
                    borderBottom: i < roles.length - 1 ? "1px solid rgba(192,82,43,0.12)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 700,
                      fontSize: "15px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#C0522B",
                      flexShrink: 0,
                      minWidth: "150px",
                    }}
                  >
                    {r.role}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: 1.6,
                      color: "rgba(44,42,37,0.7)",
                    }}
                  >
                    {r.detail}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "clamp(17px, 1.2vw, 19px)",
                lineHeight: 1.8,
                color: "#2C2A25",
                marginBottom: "14px",
              }}
            >
              Ryan built a full AI automation stack for his own STR operations,
              then realized every business owner he met had the same problem:
              too much manual work, not enough time.
            </motion.p>

            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "clamp(17px, 1.2vw, 19px)",
                lineHeight: 1.8,
                color: "#2C2A25",
              }}
            >
              His gift is sitting across from any business owner, finding their
              biggest operational pain in minutes, and showing AI solving it
              live. That is not a pitch. That is just what he does.
            </motion.p>

            {/* Quote */}
            <motion.div
              variants={itemVariants}
              style={{ borderTop: "1px solid rgba(192,82,43,0.2)", marginTop: "28px", paddingTop: "22px" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(20px, 1.56vw, 26px)",
                  lineHeight: 1.55,
                  color: "#C0522B",
                }}
              >
                "Find the pain. Show the solution. Watch what happens."
              </p>
              <p
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(44,42,37,0.7)",
                  marginTop: "10px",
                }}
              >
                - Ryan Lefebvre
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Mission / values ────────────────────────────────────────────────────────

function ValuesSection() {
  return (
    <section
      className="relative"
      style={{
        background: "#0D0D0B",
        paddingTop: "clamp(64px, 8vw, 100px)",
        paddingBottom: "clamp(64px, 8vw, 100px)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3.5 mb-6">
            <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
            <span
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#C0522B",
              }}
            >
              How We Work
            </span>
            <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: "#F0EBE1",
              letterSpacing: "-0.02em",
            }}
          >
            A short list of{" "}
            <span style={{ color: "#C0522B", fontStyle: "italic" }}>rules</span> we
            do not break.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={itemVariants}
              className="relative"
              style={{
                padding: "32px 26px",
                background: "rgba(240,235,225,0.02)",
                border: "1px solid rgba(192,82,43,0.15)",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "34px",
                  color: "rgba(192,82,43,0.4)",
                  marginBottom: "18px",
                  lineHeight: 1,
                }}
              >
                {v.number}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 700,
                  fontSize: "16px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#F0EBE1",
                  marginBottom: "12px",
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "15.5px",
                  lineHeight: 1.7,
                  color: "rgba(212,204,184,0.65)",
                }}
              >
                {v.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stats band ──────────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <div style={{ background: "#0D0D0B", position: "relative" }}>
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "20%",
          width: "60%",
          height: "100%",
          background: "radial-gradient(ellipse, rgba(192,82,43,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
        variants={containerVariants}
        className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={itemVariants}
            className={[
              "relative border-[rgba(240,235,225,0.06)]",
              i % 2 === 0 ? "border-r" : "",
              i >= 2 ? "border-t md:border-t-0" : "",
              i === 1 ? "md:border-r" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <AnimatedStat value={s.value} suffix={s.suffix} label={s.label} accent={s.accent} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── STR Secrets credibility strip ──────────────────────────────────────────

function CredibilityStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#0D0D0B",
        paddingTop: "clamp(40px, 5vw, 60px)",
        paddingBottom: "clamp(40px, 5vw, 60px)",
      }}
      aria-label="STR Secrets"
    >
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
        transition={{ duration: 0.7, ease: EASE }}
        className="relative z-10 max-w-[720px] mx-auto px-4 md:px-8 flex flex-col items-center text-center"
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(19px, 2vw, 26px)",
            letterSpacing: "0.01em",
            color: "rgba(240,235,225,0.75)",
            marginBottom: "10px",
          }}
        >
          Ryan is the AI coach inside STR Secrets.
        </span>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "14px",
            color: "rgba(212,204,184,0.4)",
            lineHeight: 1.6,
          }}
        >
          Solnest AI partners with STR Secrets, the recognized STR education brand.
        </p>
      </motion.div>

    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#0D0D0B",
        paddingTop: "clamp(72px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 9vw, 120px)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15vw] right-[-5vw]"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          maxHeight: "700px",
          background: "radial-gradient(ellipse at center, rgba(192,82,43,0.12) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
        variants={containerVariants}
        className="relative z-10 max-w-[820px] mx-auto px-4 md:px-8 text-center"
      >
        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(34px, 5.2vw, 68px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#F0EBE1",
            marginBottom: "36px",
          }}
        >
          Let's talk about{" "}
          <span style={{ color: "#C0522B", fontStyle: "italic" }}>your business.</span>
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8"
        >
          <MagneticButton
            href="/book"
            className="group relative bg-rust text-cream overflow-hidden"
            style={{
              padding: "19px 44px",
              borderRadius: "9999px",
              boxShadow: "0 0 40px rgba(192,82,43,0.3), 0 0 80px rgba(192,82,43,0.1)",
            } as React.CSSProperties}
          >
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                zIndex: 1,
                transition: "transform 0.5s cubic-bezier(0.215,0.61,0.355,1)",
                borderRadius: "9999px",
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                position: "relative",
                zIndex: 2,
              }}
            >
              Book a Call
            </span>
          </MagneticButton>

          <a
            href="/work"
            className="link-underline focus-ring"
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(212,204,184,0.75)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            See our work
            <span aria-hidden="true">-&gt;</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <main style={{ background: "#0D0D0B", color: "#F0EBE1", overflowX: "hidden" }}>
      <Nav />
      <HeroSection />
      <MeetRyanSection />
      <ValuesSection />
      <StatsSection />
      <CredibilityStrip />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
