"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LayeredText } from "@/components/ui/layered-text";
import { BorderBeam } from "@/components/ui/border-beam";

// ─── Data ─────────────────────────────────────────────────────────────────────

const classrooms = [
  {
    num: "01",
    name: "The Runway",
    desc: "Fresh drops, new AI tools, and things being tested right now. No fluff — just signal.",
    accent: "#C0522B",
    accentRgb: "192,82,43",
  },
  {
    num: "02",
    name: "The Hangar",
    desc: "Every STR workshop, agent build, and system — recorded with SOPs so you can implement immediately.",
    accent: "#C9A84C",
    accentRgb: "201,168,76",
  },
  {
    num: "03",
    name: "The Flight Deck",
    desc: "Bring your biggest operational problem. Watch AI solve it live — in real time.",
    accent: "#C0522B",
    accentRgb: "192,82,43",
  },
  {
    num: "04",
    name: "The GPS",
    desc: "Exact agents, prompts, and systems — copy-paste and deploy directly into your operation.",
    accent: "#C9A84C",
    accentRgb: "201,168,76",
  },
  {
    num: "05",
    name: "The Logbook",
    desc: "Demos, sessions, and past webinars — all archived. 24/7 access to a library that grows.",
    accent: "#C0522B",
    accentRgb: "192,82,43",
  },
];

const communityStats = [
  { value: "247+", label: "Active Members" },
  { value: "Weekly", label: "Live AI Builds" },
  { value: "$67", label: "Founding Rate" },
  { value: "7-Day", label: "Free Trial" },
];

const features = [
  "Live AI builds — weekly",
  "Agent library — deploy today",
  "Direct Q&A with Ryan",
  "Full SOP archive",
  "Prompt vault — copy-paste",
  "Community of operators",
];

// ─── Animation variants ───────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

const itemFast = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

// ─── Classroom card ───────────────────────────────────────────────────────────

function ClassroomCard({ data }: { data: (typeof classrooms)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      ref={ref}
      variants={item}
      role="article"
      aria-label={`${data.name}: ${data.desc}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0D0D0B",
        border: `1px solid ${hovered ? `rgba(${data.accentRgb},0.45)` : "rgba(240,235,225,0.08)"}`,
        padding: "38px 28px 34px",
        cursor: "default",
        transition: reduceMotion
          ? "none"
          : "border-color 0.3s ease, transform 0.35s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.35s ease",
        transform: hovered && !reduceMotion ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(${data.accentRgb},0.12)`
          : "none",
      }}
    >
      {/* Mouse glow */}
      <div
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${glow.x}px ${glow.y}px, rgba(${data.accentRgb},0.1), transparent 65%)`,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Ghost number */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-18px",
          right: "-4px",
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(72px, 18vw, 144px)",
          lineHeight: 1,
          color: hovered ? `rgba(${data.accentRgb},0.07)` : "rgba(240,235,225,0.03)",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
          transition: "color 0.4s ease",
        }}
      >
        {data.num}
      </div>

      {/* Top accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: hovered
            ? `linear-gradient(to right, ${data.accent}, rgba(${data.accentRgb},0.2), transparent)`
            : "linear-gradient(to right, rgba(240,235,225,0.06), transparent)",
          transition: "background 0.35s ease",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.28em",
            color: hovered ? data.accent : `rgba(${data.accentRgb},0.5)`,
            marginBottom: "22px",
            transition: "color 0.25s ease",
          }}
        >
          {data.num}
        </div>

        <p
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: hovered ? "#F0EBE1" : "rgba(240,235,225,0.8)",
            marginBottom: "14px",
            transition: "color 0.25s ease",
          }}
        >
          {data.name}
        </p>

        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background: hovered ? `rgba(${data.accentRgb},0.3)` : "rgba(240,235,225,0.06)",
            marginBottom: "14px",
            transition: "background 0.3s ease",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: 1.7,
            color: hovered ? "rgba(212,204,184,0.88)" : "rgba(212,204,184,0.55)",
            transition: "color 0.25s ease",
          }}
        >
          {data.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function CommunitySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0D0D0B" }}
      aria-labelledby="community-heading"
    >
      {/* ── Top border ── */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)",
        }}
      />

      {/* ── Ambient glows ── */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-8%", left: "-4%",
        width: "45%", height: "55%",
        background: "radial-gradient(ellipse, rgba(192,82,43,0.08) 0%, transparent 65%)",
        filter: "blur(90px)", pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "5%", right: "-4%",
        width: "38%", height: "48%",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 65%)",
        filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* ── Grid texture ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(240,235,225,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,225,0.015) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        pointerEvents: "none",
      }} />

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 py-20 md:py-28">

        {/* ════════════════════════════════════════
            HEADER
        ════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mb-16 md:mb-20"
        >
          {/* Label */}
          <motion.div variants={item} className="mb-8">
            <div
              className="inline-flex items-center gap-2"
              style={{
                background: "rgba(192,82,43,0.07)",
                border: "1px solid rgba(192,82,43,0.22)",
                padding: "6px 16px",
              }}
            >
              <div
                aria-hidden="true"
                className="animate-pulse"
                style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C0522B" }}
              />
              <span style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600,
                fontSize: "13px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#C0522B",
              }}>
                The Solnest AI Community
              </span>
            </div>
          </motion.div>

          {/* Headline row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-8 lg:gap-6 items-center">
            <div>
              <motion.h2
                id="community-heading"
                variants={item}
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 300,
                  fontSize: "clamp(34px, 3.6vw, 64px)",
                  lineHeight: 1.04, color: "#F0EBE1",
                  letterSpacing: "-0.02em", marginBottom: "22px",
                }}
              >
                Your competitors are{" "}
                <span style={{ fontStyle: "italic", color: "#C0522B" }}>
                  already using AI.
                </span>
                <br />Are you?
              </motion.h2>

              <motion.p
                variants={item}
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 400,
                  fontSize: "clamp(15px, 1.1vw, 18px)", lineHeight: 1.8,
                  color: "rgba(212,204,184,0.75)", maxWidth: "560px",
                }}
              >
                Get live builds, exact systems, and a community of operators already
                winning with AI. The founding rate disappears the moment this window closes.
              </motion.p>
            </div>

            {/* Layered text animation */}
            <motion.div
              variants={item}
              className="hidden lg:flex items-center justify-center"
            >
              <LayeredText
                lines={[
                  { top: "\u00A0", bottom: "AUTOMATE" },
                  { top: "AUTOMATE", bottom: "OPTIMIZE" },
                  { top: "OPTIMIZE", bottom: "DELEGATE" },
                  { top: "DELEGATE", bottom: "SCALE" },
                  { top: "SCALE", bottom: "DOMINATE" },
                  { top: "DOMINATE", bottom: "REPEAT" },
                  { top: "REPEAT", bottom: "\u00A0" },
                ]}
                fontSize="48px"
                fontSizeMd="28px"
                lineHeight={42}
                lineHeightMd={26}
                className="py-0 text-[#C0522B]"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════
            STATS BAR
        ════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={container}
          className="grid grid-cols-2 md:grid-cols-4 mb-14"
          style={{ borderTop: "1px solid rgba(240,235,225,0.08)", borderBottom: "1px solid rgba(240,235,225,0.08)" }}
          aria-label="Community statistics"
        >
          {communityStats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={itemFast}
              className="flex flex-col items-center justify-center py-8 px-4"
              style={{
                borderRight: i < communityStats.length - 1 ? "1px solid rgba(240,235,225,0.08)" : "none",
              }}
            >
              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "clamp(34px, 3.6vw, 53px)", lineHeight: 1,
                color: "#F0EBE1", letterSpacing: "-0.02em",
              }}>
                {s.value}
              </span>
              <span style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600,
                fontSize: "13px", letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(192,82,43,0.7)", marginTop: "8px",
              }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ════════════════════════════════════════
            CLASSROOM CARDS
        ════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-14"
          aria-label="Community classrooms"
        >
          {classrooms.map((c) => (
            <ClassroomCard key={c.num} data={c} />
          ))}
        </motion.div>

        {/* ════════════════════════════════════════
            PRICING STRIP
        ════════════════════════════════════════ */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1.0] }}
          className="relative overflow-hidden"
          style={{
            background: "rgba(13,13,11,0.97)",
            border: "1px solid rgba(192,82,43,0.2)",
            boxShadow: "0 0 0 1px rgba(192,82,43,0.05), 0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          <BorderBeam colorFrom="#C0522B" colorTo="#C9A84C" duration={14} />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-12 p-10 md:p-12 lg:p-14">

            {/* Features list */}
            <div className="flex-1">
              <p style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600,
                fontSize: "14px", letterSpacing: "0.28em", textTransform: "uppercase",
                color: "#C0522B", marginBottom: "20px",
              }}>
                Everything Inside
              </p>
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12"
                aria-label="Community features"
              >
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <svg
                      width="12" height="12" viewBox="0 0 12 12"
                      fill="none" aria-hidden="true" style={{ flexShrink: 0 }}
                    >
                      <circle cx="6" cy="6" r="5.5" stroke="rgba(192,82,43,0.45)" />
                      <path d="M3 6L5 8L9 3.5" stroke="#C0522B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{
                      fontFamily: "var(--font-body)", fontWeight: 400,
                      fontSize: "17px", color: "rgba(212,204,184,0.8)",
                    }}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vertical divider */}
            <div
              aria-hidden="true"
              className="hidden lg:block"
              style={{
                width: "1px", alignSelf: "stretch",
                background: "linear-gradient(to bottom, transparent, rgba(192,82,43,0.2) 25%, rgba(192,82,43,0.2) 75%, transparent)",
              }}
            />

            {/* CTA column */}
            <div className="flex flex-col items-start lg:items-end gap-5 flex-shrink-0">
              <div className="lg:text-right">
                <p style={{
                  fontFamily: "var(--font-condensed)", fontWeight: 600,
                  fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase",
                  color: "rgba(192,82,43,0.7)", marginBottom: "6px",
                }}>
                  7-day free trial
                </p>
                <div className="flex items-start lg:justify-end">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "22px", color: "rgba(240,235,225,0.65)", marginTop: "10px" }}>$</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(48px, 10vw, 77px)", color: "#F0EBE1", lineHeight: 1, letterSpacing: "-0.02em" }}>67</span>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "16px", color: "rgba(240,235,225,0.45)", alignSelf: "flex-end", paddingBottom: "10px", marginLeft: "5px" }}>/mo</span>
                </div>
              </div>

              <MagneticButton
                href="https://skool.com/solnest-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join the Solnest AI community — Claim your founding member spot"
                className="group bg-rust text-cream overflow-hidden relative"
                style={{
                  padding: "18px 40px",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "0 0 48px rgba(192,82,43,0.3)",
                } as React.CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                    zIndex: 1,
                    transition: "transform 0.55s ease",
                  }}
                />
                <span style={{
                  fontFamily: "var(--font-condensed)", fontWeight: 600,
                  fontSize: "16px", letterSpacing: "0.18em", textTransform: "uppercase",
                  position: "relative", zIndex: 2,
                }}>
                  Claim Your Spot Now
                </span>
              </MagneticButton>

              <p style={{
                fontFamily: "var(--font-body)", fontWeight: 400,
                fontSize: "15px", color: "rgba(240,235,225,0.4)",
                lineHeight: 1.7, textAlign: "right",
              }}>
                Cancel anytime · Sign up via browser (not Skool app)
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom border ── */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(192,82,43,0.15) 50%, transparent)",
        }}
      />
    </section>
  );
}
