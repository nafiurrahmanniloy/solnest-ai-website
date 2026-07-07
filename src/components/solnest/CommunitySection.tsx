"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LayeredText } from "@/components/ui/layered-text";
import { BorderBeam } from "@/components/ui/border-beam";

// ─── Data ─────────────────────────────────────────────────────────────────────

const classrooms = [
  {
    num: "01",
    name: "Pre Flight",
    desc: "Start here. Get oriented on how the classroom is structured and what to do first.",
    accent: "#C0522B",
    accentRgb: "192,82,43",
  },
  {
    num: "02",
    name: "Ground School: Claude",
    desc: "The foundation. Learn how Claude actually works, set it up right, and teach it your business.",
    accent: "#C9A84C",
    accentRgb: "201,168,76",
  },
  {
    num: "03",
    name: "Live Claude Series",
    desc: "Weekly live builds. Real problems, real demos, recorded and added to the library.",
    accent: "#C0522B",
    accentRgb: "192,82,43",
  },
  {
    num: "04",
    name: "The Hangar",
    desc: "Every STR session, build, and breakdown. SOPs, workflows, and tools built for short-term rentals.",
    accent: "#C9A84C",
    accentRgb: "201,168,76",
  },
  {
    num: "05",
    name: "The Flight Deck",
    desc: "General business AI sessions. Office hours, jam sessions, and live builds for any industry.",
    accent: "#C0522B",
    accentRgb: "192,82,43",
  },
  {
    num: "06",
    name: "The Runway",
    desc: "Fresh drops. New tools, quick wins, and AI updates worth knowing about.",
    accent: "#C9A84C",
    accentRgb: "201,168,76",
  },
  {
    num: "07",
    name: "The Logbook",
    desc: "The resource vault. Download agents, prompts, SOPs, Skills, and MCPs built inside the community.",
    accent: "#C0522B",
    accentRgb: "192,82,43",
  },
];

const communityStats = [
  { value: "40+", label: "Active Members" },
  { value: "Weekly", label: "Live AI Builds" },
  { value: "$97/mo", label: "Membership" },
  { value: "Cancel", label: "Anytime" },
];

const features = [
  "Live AI builds, weekly",
  "Agent library, deploy today",
  "Direct Q&A with Ryan",
  "Full SOP archive",
  "Prompt vault, copy-paste",
  "Community of STR operators",
];

// ─── STR Agent Showcase data (self-contained, no import from ShowcaseSection) ──

const strAgents = {
  guest: {
    title: "Guest Agent",
    badge: "STR Guest Ops",
    headline: "Guest messages handled around the clock, in your voice.",
    what: "The Guest agent handles inbound and outbound guest communication (pre-booking questions, check-in details, mid-stay issues, and reviews) drawing on live PMS data through Guesty.",
    why: "Guests expect instant answers at all hours. The Guest agent replies in your voice across the full stay, so nothing goes cold.",
    results: [
      { stat: "24/7", label: "guest messaging" },
      { stat: "Live", label: "PMS data via Guesty" },
      { stat: "Your", label: "voice and tone" },
      { stat: "0", label: "missed inquiries" },
    ],
    before: [
      "Guests wait hours for a reply",
      "Repetitive questions answered by hand",
      "After-hours inquiries go cold",
      "Reviews and follow-ups slip",
    ],
    after: [
      "Every guest answered around the clock",
      "Pre-booking to check-out handled automatically",
      "Late-night inquiries convert while you sleep",
      "Reviews and follow-ups sent on time",
    ],
    process: [
      { step: "01", title: "Connected live guest data", desc: "Reads listings and reservations through Guesty so replies are accurate and specific." },
      { step: "02", title: "Trained on your voice", desc: "Responds in your tone across the full guest journey." },
      { step: "03", title: "Gated the sensitive actions", desc: "Anything like lock codes or refunds stays behind an approval gate." },
    ],
    stack: ["Claude", "Guesty", "Supabase"],
    color: "#C0522B",
    colorRgb: "192,82,43",
  },
  revenue: {
    title: "Revenue Agent",
    badge: "STR Revenue",
    headline: "Nightly rates set by a tested revenue engine, not guesswork.",
    what: "The Revenue agent turns PriceLabs and market data into nightly pricing decisions, backed by a revenue engine of 12 modules and 164 tests, and emails a weekly AI pricing report.",
    why: "Most operators set rates on gut feel and lose money on slow nights. The Revenue agent prices every night from real data.",
    results: [
      { stat: "Nightly", label: "pricing decisions" },
      { stat: "164", label: "tests behind the engine" },
      { stat: "12", label: "decision modules" },
      { stat: "Weekly", label: "AI pricing reports" },
    ],
    before: [
      "Rates set by gut feel",
      "Hours in PriceLabs every week",
      "Money left on the table on slow nights",
      "No repeatable pricing process",
    ],
    after: [
      "Nightly rates from a tested revenue engine",
      "PriceLabs scraped and reported automatically",
      "Underpriced nights caught before they cost you",
      "One repeatable, data-backed pricing workflow",
    ],
    process: [
      { step: "01", title: "Built a tested revenue engine", desc: "12 pricing modules backed by 164 tests turn market data into decisions." },
      { step: "02", title: "Automated the weekly report", desc: "Scrapes PriceLabs and emails an AI pricing report with no manual pull." },
      { step: "03", title: "Runs every night", desc: "Streams each pricing run live into the dashboard." },
    ],
    stack: ["PriceLabs", "Claude", "Python"],
    color: "#C9A84C",
    colorRgb: "201,168,76",
  },
  operations: {
    title: "Operations Agent",
    badge: "STR Automation",
    headline: "Turnovers, tasks, and owner reporting, coordinated automatically.",
    what: "The Operations agent coordinates turnovers, maintenance, and owner reporting across the operation, with a dual-approval gate on anything sensitive and an immutable activity log.",
    why: "Operations is a hundred small tasks that break when you get busy. This agent runs them and reports what happened.",
    results: [
      { stat: "Auto", label: "turnovers + tasks" },
      { stat: "Dual", label: "approval on sensitive actions" },
      { stat: "Owner", label: "reporting handled" },
      { stat: "Logged", label: "every action, immutable" },
    ],
    before: [
      "Turnovers coordinated by text and memory",
      "Owner reports built by hand",
      "Tasks fall through the cracks",
      "No audit trail for what ran",
    ],
    after: [
      "Turnovers and tasks coordinated automatically",
      "Owner reporting generated for you",
      "Nothing sensitive runs without approval",
      "Every action logged in an immutable trail",
    ],
    process: [
      { step: "01", title: "Mapped the operation", desc: "Turnovers, maintenance, and reporting modeled as agent tasks." },
      { step: "02", title: "Wired approvals", desc: "A dual-approval queue gates anything touching money or compliance." },
      { step: "03", title: "Logged everything", desc: "An append-only activity log records auto vs human-gated actions." },
    ],
    stack: ["Guesty", "Supabase", "n8n"],
    color: "#6E8BC0",
    colorRgb: "110,139,192",
  },
};

type StrAgentKey = keyof typeof strAgents;

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
        height: "100%",
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

// ─── STR Agent Case Study Modal ────────────────────────────────────────────────

function StrAgentModal({ id, onClose }: { id: StrAgentKey; onClose: () => void }) {
  const cs = strAgents[id];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = `community-case-modal-title-${id}`;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "Tab" && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(6,6,5,0.92)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: 40, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          width: "min(780px, 100%)",
          maxHeight: "90vh",
          background: "#0C0C0A",
          border: `1px solid rgba(${cs.colorRgb},0.18)`,
          borderRadius: "2px",
          overflowY: "auto",
          overscrollBehavior: "contain",
          position: "relative",
          touchAction: "pan-y",
        }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute" style={{ top: '-10%', left: '20%', width: '60%', height: '40%', background: `radial-gradient(ellipse, rgba(${cs.colorRgb},0.12) 0%, transparent 70%)`, filter: 'blur(60px)' }} />

        {/* Header */}
        <div style={{ position: "relative", padding: "36px 40px 28px", borderBottom: `1px solid rgba(${cs.colorRgb},0.12)` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: `rgba(${cs.colorRgb},0.1)`, border: `1px solid rgba(${cs.colorRgb},0.28)`, padding: "5px 14px", marginBottom: "14px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: cs.color, boxShadow: `0 0 8px rgba(${cs.colorRgb},0.6)` }} />
                <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: cs.color }}>{cs.badge}</span>
              </div>
              <h2 id={titleId} style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 42px)", color: "#F0EBE1", lineHeight: 1.1, letterSpacing: "-0.02em" }}>{cs.title}</h2>
            </div>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close case study"
              style={{
                background: "rgba(240,235,225,0.04)", border: "1px solid rgba(240,235,225,0.1)",
                width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0, color: "rgba(212,204,184,0.5)", fontSize: "20px",
                fontFamily: "var(--font-body)", borderRadius: "2px", transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,235,225,0.08)"; e.currentTarget.style.color = "rgba(212,204,184,0.8)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,235,225,0.04)"; e.currentTarget.style.color = "rgba(212,204,184,0.5)"; }}
              onFocus={(e) => { e.currentTarget.style.background = "rgba(240,235,225,0.08)"; e.currentTarget.style.color = "rgba(212,204,184,0.8)"; }}
              onBlur={(e) => { e.currentTarget.style.background = "rgba(240,235,225,0.04)"; e.currentTarget.style.color = "rgba(212,204,184,0.5)"; }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {/* Headline quote */}
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.5,
            color: cs.color, marginTop: "18px", opacity: 0.85,
          }}>
            &ldquo;{cs.headline}&rdquo;
          </p>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px",
          background: `rgba(${cs.colorRgb},0.08)`,
          borderBottom: `1px solid rgba(${cs.colorRgb},0.12)`,
        }}>
          {cs.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
              style={{ background: "#0C0C0A", padding: "22px 16px", textAlign: "center" }}
            >
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "clamp(24px, 2.8vw, 36px)", color: cs.color,
                lineHeight: 1, letterSpacing: "-0.03em",
                textShadow: `0 0 30px rgba(${cs.colorRgb},0.35)`,
              }}>{r.stat}</div>
              <div style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600,
                fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
                color: `rgba(${cs.colorRgb},0.55)`, marginTop: "6px",
              }}>{r.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Before / After */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
          background: `rgba(${cs.colorRgb},0.08)`,
          borderBottom: `1px solid rgba(${cs.colorRgb},0.12)`,
        }}>
          {/* Before */}
          <div style={{ background: "#0C0C0A", padding: "28px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(200,80,60,0.4)", border: "1px solid rgba(200,80,60,0.3)" }} />
              <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,80,60,0.6)" }}>Before</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cs.before.map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0, marginTop: "5px" }}
                  >
                    <path d="M3 3L11 11M11 3L3 11" stroke="rgba(200,80,60,0.6)" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.6, color: "rgba(200,180,165,0.5)" }}>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div style={{ background: "#0C0C0A", padding: "28px 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cs.color, boxShadow: `0 0 6px rgba(${cs.colorRgb},0.5)` }} />
              <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: cs.color }}>After</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cs.after.map((line, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0, marginTop: "5px" }}
                  >
                    <path d="M2.5 7.5L5.8 10.5L11.5 4" stroke={cs.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.6, color: "rgba(212,204,184,0.7)" }}>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it was built - process steps */}
        <div style={{ padding: "28px 40px", borderBottom: `1px solid rgba(${cs.colorRgb},0.12)` }}>
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.6)`, display: "block", marginBottom: "20px" }}>How It Was Built</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {cs.process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}
              >
                <span style={{
                  fontFamily: "var(--font-display)", fontWeight: 300,
                  fontSize: "28px", color: `rgba(${cs.colorRgb},0.2)`,
                  lineHeight: 1, flexShrink: 0, width: "32px",
                }}>{p.step}</span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "15px", color: "#F0EBE1", lineHeight: 1.3, marginBottom: "4px" }}>{p.title}</h4>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.65, color: "rgba(212,204,184,0.5)" }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack + CTA */}
        <div style={{ padding: "28px 40px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.55)`, display: "block", marginBottom: "12px" }}>Tech Stack</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {cs.stack.map((tool) => (
                <span key={tool} style={{
                  fontFamily: "var(--font-condensed)", fontWeight: 500,
                  fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                  color: `rgba(${cs.colorRgb},0.7)`,
                  border: `1px solid rgba(${cs.colorRgb},0.18)`,
                  background: `rgba(${cs.colorRgb},0.05)`,
                  padding: "5px 12px", borderRadius: "1px",
                }}>{tool}</span>
              ))}
            </div>
          </div>
          <a
            href="https://skool.com/solnest-ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontFamily: "var(--font-condensed)", fontWeight: 600,
              fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase",
              color: cs.color, textDecoration: "none",
              padding: "12px 24px",
              border: `1px solid rgba(${cs.colorRgb},0.3)`,
              background: `rgba(${cs.colorRgb},0.06)`,
              borderRadius: "2px",
              transition: "background 0.2s, border-color 0.2s",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${cs.colorRgb},0.12)`; e.currentTarget.style.borderColor = `rgba(${cs.colorRgb},0.45)`; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${cs.colorRgb},0.06)`; e.currentTarget.style.borderColor = `rgba(${cs.colorRgb},0.3)`; }}
            onFocus={(e) => { e.currentTarget.style.background = `rgba(${cs.colorRgb},0.12)`; e.currentTarget.style.borderColor = `rgba(${cs.colorRgb},0.45)`; }}
            onBlur={(e) => { e.currentTarget.style.background = `rgba(${cs.colorRgb},0.06)`; e.currentTarget.style.borderColor = `rgba(${cs.colorRgb},0.3)`; }}
          >
            Build This Inside the Community →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── STR Agent Card ─────────────────────────────────────────────────────────────

function StrAgentCard({ id, onOpen, featured }: { id: StrAgentKey; onOpen: (id: StrAgentKey) => void; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const cs = strAgents[id];
  const mainResult = cs.results[0];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open case study: ${cs.title}`}
      onClick={() => onOpen(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(id);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        cursor: "pointer",
        background: hovered ? "#131311" : "#0F0F0D",
        border: `1px solid ${hovered ? `rgba(${cs.colorRgb},0.4)` : "rgba(240,235,225,0.08)"}`,
        overflow: "hidden",
        width: "100%", height: "100%",
        transition: "background 0.2s ease, box-shadow 0.2s ease, border-color 0.3s ease, outline 0.15s ease",
        boxShadow: hovered ? `inset 0 0 40px rgba(${cs.colorRgb},0.06)` : "none",
        position: "relative",
        display: "flex", flexDirection: "column",
        minHeight: featured ? "340px" : "310px",
        outline: "none",
      }}
      onFocusCapture={(e) => {
        if (e.currentTarget === e.target) {
          e.currentTarget.style.outline = `2px solid ${cs.color}`;
          e.currentTarget.style.outlineOffset = "-2px";
        }
      }}
      onBlurCapture={(e) => {
        if (e.currentTarget === e.target) {
          e.currentTarget.style.outline = "none";
        }
      }}
    >
      {featured && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: `linear-gradient(to right, ${cs.color}, rgba(${cs.colorRgb},0.2), transparent)`,
          }}
        />
      )}

      {/* Header */}
      <div style={{ padding: "18px 28px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cs.color, boxShadow: `0 0 8px rgba(${cs.colorRgb},0.8)` }} />
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.85)` }}>{cs.badge}</span>
        </div>
        {featured && (
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C" }}>Featured</span>
        )}
        <span style={{ fontFamily: "var(--font-condensed)", fontSize: "14px", color: cs.color, opacity: hovered ? 1 : 0.25, transition: "opacity 0.2s ease" }}>→</span>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 30px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: featured ? "clamp(48px, 4.2vw, 78px)" : "clamp(42px, 3.6vw, 68px)", lineHeight: 1, letterSpacing: "-0.04em", color: cs.color, textShadow: `0 0 30px rgba(${cs.colorRgb},0.4)`, marginBottom: "6px" }}>
            {mainResult.stat}
          </div>
          <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.7)`, marginBottom: "20px" }}>
            {mainResult.label}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: featured ? "clamp(24px, 2vw, 32px)" : "clamp(20px, 1.7vw, 26px)", lineHeight: 1.2, color: "#F0EBE1", letterSpacing: "-0.01em", marginBottom: "10px" }}>
            {cs.title}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "15px", lineHeight: 1.65, color: "rgba(212,204,184,0.5)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
            {cs.headline}
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "22px" }}>
          {cs.stack.slice(0, 3).map((tool) => (
            <span key={tool} style={{ fontFamily: "var(--font-condensed)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.65)`, border: `1px solid rgba(${cs.colorRgb},0.2)`, background: `rgba(${cs.colorRgb},0.05)`, padding: "4px 10px" }}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {hovered && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 28px", background: `linear-gradient(to top, rgba(${cs.colorRgb},0.12), transparent)`, display: "flex", justifyContent: "flex-end", pointerEvents: "none" }}>
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: cs.color }}>View Case Study →</span>
        </div>
      )}
    </div>
  );
}

// ─── STR Agent Showcase block ──────────────────────────────────────────────────

function StrAgentShowcase() {
  const [activeCase, setActiveCase] = useState<StrAgentKey | null>(null);
  const scrollYRef = useRef(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openCase = (id: StrAgentKey) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setActiveCase(id);
  };

  const closeCase = () => {
    setActiveCase(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!activeCase) return;
    const body = document.body;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    scrollYRef.current = window.scrollY;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      window.scrollTo({ top: scrollYRef.current, behavior: "instant" as ScrollBehavior });
    };
  }, [activeCase]);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
        className="mb-16 md:mb-20"
      >
        <motion.div variants={item} className="mb-8">
          <div
            className="inline-flex items-center gap-2 mb-5"
            style={{
              background: "rgba(201,168,76,0.07)",
              border: "1px solid rgba(201,168,76,0.25)",
              padding: "6px 16px",
            }}
          >
            <div
              aria-hidden="true"
              className="animate-pulse"
              style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C9A84C" }}
            />
            <span style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600,
              fontSize: "13px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#C9A84C",
            }}>
              STR Automations We Build
            </span>
          </div>
          <p style={{
            fontFamily: "var(--font-body)", fontWeight: 400,
            fontSize: "clamp(15px, 1.1vw, 18px)", lineHeight: 1.75,
            color: "rgba(212,204,184,0.7)", maxWidth: "680px",
          }}>
            The AI systems short-term rental operators build inside the community: the exact
            automations for the busywork that eats your week. Click a card to see how each one works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <motion.div variants={item} className="lg:col-span-1">
            <StrAgentCard id="guest" onOpen={openCase} featured />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-1">
            <StrAgentCard id="revenue" onOpen={openCase} />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-1">
            <StrAgentCard id="operations" onOpen={openCase} />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeCase && (
          <StrAgentModal id={activeCase} onClose={closeCase} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function CommunitySection() {
  return (
    <section
      id="community"
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
                The STR AI Group
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
                Built for{" "}
                <span style={{ fontStyle: "italic", color: "#C0522B" }}>
                  short-term rental
                </span>
                <br />operators.
              </motion.h2>

              <motion.p
                variants={item}
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 400,
                  fontSize: "clamp(15px, 1.1vw, 18px)", lineHeight: 1.8,
                  color: "rgba(212,204,184,0.75)", maxWidth: "560px",
                }}
              >
                This is not a general AI community. Every live build, agent, prompt, and SOP
                inside is built specifically for STR hosts and property managers, running
                real properties. Join today and build inside the same room they do.
              </motion.p>
            </div>

            {/* Layered text animation */}
            <motion.div
              variants={item}
              className="hidden lg:flex items-center justify-center"
            >
              <LayeredText
                lines={[
                  { top: " ", bottom: "AUTOMATE" },
                  { top: "AUTOMATE", bottom: "OPTIMIZE" },
                  { top: "OPTIMIZE", bottom: "DELEGATE" },
                  { top: "DELEGATE", bottom: "SCALE" },
                  { top: "SCALE", bottom: "DOMINATE" },
                  { top: "DOMINATE", bottom: "REPEAT" },
                  { top: "REPEAT", bottom: " " },
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
            STR AGENT SHOWCASE
        ════════════════════════════════════════ */}
        <StrAgentShowcase />

        {/* ════════════════════════════════════════
            CLASSROOM CARDS
        ════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-3 mb-14"
          aria-label="Community classrooms"
        >
          {classrooms.map((c, i) => (
            <div key={c.num} className={
              i < 4
                ? "lg:col-span-3"
                : i === 4
                  ? "lg:col-span-3 lg:col-start-2"
                  : "lg:col-span-3"
            }>
              <ClassroomCard data={c} />
            </div>
          ))}
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

// ─── Pricing Strip (separate component) ─────────────────────────────────────

export function CommunityPricing() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0D0D0B" }}
      aria-label="Community pricing for short-term rental operators"
    >
      <div className="relative z-10 max-w-[1360px] mx-auto px-5 md:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
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
                <div
                  className="inline-flex items-center gap-2 mb-3"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    padding: "4px 12px",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-condensed)", fontWeight: 600,
                    fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "#C9A84C",
                  }}>
                    For STR Operators
                  </span>
                </div>
                <p style={{
                  fontFamily: "var(--font-condensed)", fontWeight: 600,
                  fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase",
                  color: "rgba(192,82,43,0.7)", marginBottom: "6px",
                }}>
                  Membership
                </p>
                <div className="flex items-start lg:justify-end">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "22px", color: "rgba(240,235,225,0.65)", marginTop: "10px" }}>$</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(48px, 10vw, 77px)", color: "#F0EBE1", lineHeight: 1, letterSpacing: "-0.02em" }}>97</span>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "16px", color: "rgba(240,235,225,0.45)", alignSelf: "flex-end", paddingBottom: "10px", marginLeft: "5px" }}>/mo</span>
                </div>
              </div>

              <MagneticButton
                href="https://skool.com/solnest-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join the Solnest AI community for short-term rental operators, $97 per month"
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
                Built for short-term rental operators · Cancel anytime · Sign up via browser (not Skool app)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
