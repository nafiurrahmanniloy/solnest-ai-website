"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";
import { MagneticButton } from "@/components/ui/magnetic-button";

// ─── Motion helpers ───────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1.0];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─── Data: the three real builds ─────────────────────────────────────────

interface Build {
  num: string;
  title: string;
  badge: string;
  oneLiner: string;
  summary: string;
  highlights: string[];
  stack: string[];
  color: string;
  colorRgb: string;
}

const builds: Build[] = [
  {
    num: "01",
    title: "STR Secrets",
    badge: "Multi-Tenant STR SaaS",
    oneLiner:
      "Five AI agents per operator, one multi-tenant dashboard, running every night.",
    summary:
      "A multi-tenant SaaS where each short-term-rental operator connects their PMS and tools, then five specialist AI agents (Revenue, Guest, Operations, Analytics, Marketing) analyze pricing, messaging, turnovers, and market data, coordinated by an orchestrator, streamed live, and swept nightly. Each workspace is isolated and secure.",
    highlights: [
      "5 AI agents per operator",
      "Nightly automation + live streaming",
      "Per-tenant isolation (Postgres RLS)",
      "Stripe billing, live in production",
    ],
    stack: ["React 19", "Node 22", "Express", "Supabase", "Socket.io", "Stripe", "OpenRouter", "n8n"],
    color: "#C0522B",
    colorRgb: "192,82,43",
  },
  {
    num: "02",
    title: "LegacyRnR Control Center",
    badge: "AI Operations Platform",
    oneLiner:
      "Nineteen AI agents for one property-management operation, under a single cockpit.",
    summary:
      "A unified command center that runs 19 specialist AI agents on top of Guesty: guest, owner, and operations agents grouped into orbits, with a dual-approval gate on anything touching money or compliance, an immutable activity log, and three external portals (guest, owner, education).",
    highlights: [
      "19 AI agents in one cockpit",
      "Guesty wired live",
      "Dual-approval gate on money + compliance",
      "Immutable activity log + 3 portals",
    ],
    stack: ["Next.js 14", "TypeScript", "Supabase", "Inngest", "Claude", "Guesty"],
    color: "#C9A84C",
    colorRgb: "201,168,76",
  },
  {
    num: "03",
    title: "Solnest Automation Stack",
    badge: "STR Revenue Automation",
    oneLiner:
      "Revenue intelligence, pricing reports, and market scraping, on autopilot.",
    summary:
      "The automation stack powering Solnest Stays: a revenue engine of 12 modules backed by 164 tests, a PriceLabs agent that scrapes rates weekly and emails AI pricing reports, plus Airbnb and Instagram scrapers that feed Claude analysis, all wired through n8n.",
    highlights: [
      "164 tests behind the revenue engine",
      "12 pricing decision modules",
      "Weekly AI pricing reports, emailed",
      "Claude analysis on scraped market data",
    ],
    stack: ["Claude", "Python", "Node.js", "PriceLabs", "Apify", "n8n"],
    color: "#6E8BC0",
    colorRgb: "110,139,192",
  },
];

// ─── Data: capabilities band ──────────────────────────────────────────────

const capabilities = [
  {
    num: "01",
    title: "AI agents & orchestration",
    desc: "Specialist agents coordinated by an orchestrator, each with its own job and its own scope.",
  },
  {
    num: "02",
    title: "Revenue & pricing intelligence",
    desc: "Market data turned into pricing decisions, tested and repeatable, not guesswork.",
  },
  {
    num: "03",
    title: "Guest & customer messaging",
    desc: "Conversations handled automatically, on brand, without dropping a single thread.",
  },
  {
    num: "04",
    title: "Multi-tenant SaaS platforms",
    desc: "Isolated, secure workspaces built to hold real customer data at scale.",
  },
  {
    num: "05",
    title: "Automation & data pipelines",
    desc: "Scraping, syncing, and scheduling that runs on its own clock, not yours.",
  },
  {
    num: "06",
    title: "Approval-gated operations",
    desc: "Anything touching money or compliance waits for a human, logged and reversible.",
  },
];

// ─── Data: tools band ──────────────────────────────────────────────────────

const tools = [
  "Claude", "OpenAI", "n8n", "Supabase", "Stripe", "Guesty",
  "PriceLabs", "Apify", "Socket.io", "Postgres", "Vercel", "GitHub",
];

// ─── Build block: large alternating feature section ───────────────────────

function BuildBlock({ build, index }: { build: Build; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-14 items-start relative`}
    >
      {/* Ghost number column */}
      <motion.div
        variants={itemVariants}
        aria-hidden="true"
        className="flex-shrink-0 lg:w-[160px] flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0"
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(64px, 9vw, 140px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: `rgba(${build.colorRgb},0.16)`,
            userSelect: "none",
          }}
        >
          {build.num}
        </span>
        <div
          className="hidden lg:block"
          style={{ width: "40px", height: "1px", background: `rgba(${build.colorRgb},0.4)`, marginTop: "12px" }}
        />
      </motion.div>

      {/* Content column */}
      <div className="flex-1 min-w-0 w-full">
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 mb-5"
          style={{
            background: `rgba(${build.colorRgb},0.1)`,
            border: `1px solid rgba(${build.colorRgb},0.3)`,
            padding: "5px 14px",
          }}
        >
          <div
            style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: build.color, boxShadow: `0 0 8px rgba(${build.colorRgb},0.6)`,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px",
              letterSpacing: "0.22em", textTransform: "uppercase", color: build.color,
            }}
          >
            {build.badge}
          </span>
        </motion.div>

        <motion.h3
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 300,
            fontSize: "clamp(30px, 4vw, 56px)", lineHeight: 1.08,
            color: "#F0EBE1", letterSpacing: "-0.02em", marginBottom: "16px",
            maxWidth: "820px",
          }}
        >
          {build.title}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(18px, 2vw, 26px)", lineHeight: 1.5,
            color: build.color, opacity: 0.9, marginBottom: "22px",
            maxWidth: "760px",
          }}
        >
          &ldquo;{build.oneLiner}&rdquo;
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "16px",
            lineHeight: 1.85, color: "rgba(212,204,184,0.65)",
            maxWidth: "700px", marginBottom: "28px",
          }}
        >
          {build.summary}
        </motion.p>

        {/* Highlights */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8"
          style={{ maxWidth: "700px" }}
        >
          {build.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2.5">
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: "4px" }}>
                <path d="M2.5 7.5L5.8 10.5L11.5 4" stroke={build.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14.5px", lineHeight: 1.6, color: "rgba(212,204,184,0.8)" }}>
                {h}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stack tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {build.stack.map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-condensed)", fontWeight: 500,
                fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                color: `rgba(${build.colorRgb},0.75)`,
                border: `1px solid rgba(${build.colorRgb},0.22)`,
                background: `rgba(${build.colorRgb},0.05)`,
                padding: "5px 12px",
              }}
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Capability card ────────────────────────────────────────────────────────

function CapabilityCard({ cap }: { cap: (typeof capabilities)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "#111110" : "#0F0F0D",
        border: `1px solid ${hovered ? "rgba(192,82,43,0.35)" : "rgba(192,82,43,0.12)"}`,
        padding: "28px 26px 26px",
        transition: "background 0.3s ease, border-color 0.3s ease, transform 0.35s cubic-bezier(0.215,0.61,0.355,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
          letterSpacing: "0.2em", color: hovered ? "#C0522B" : "rgba(192,82,43,0.5)",
          marginBottom: "14px", transition: "color 0.25s ease",
        }}
      >
        {cap.num}
      </div>
      <h4
        style={{
          fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic",
          fontSize: "clamp(19px, 1.7vw, 23px)", color: "#F0EBE1",
          marginBottom: "10px", letterSpacing: "-0.01em", lineHeight: 1.25,
        }}
      >
        {cap.title}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14.5px",
          lineHeight: 1.7, color: "rgba(212,204,184,0.55)",
        }}
      >
        {cap.desc}
      </p>
    </motion.div>
  );
}

// ─── Tools marquee ──────────────────────────────────────────────────────────

function ToolsMarquee() {
  return (
    <div className="marquee-row relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
      <div className="flex w-max animate-marquee" style={{ gap: "16px" }}>
        {[...tools, ...tools].map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600,
              fontSize: "13px", letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(240,235,225,0.7)",
              border: "1px solid rgba(192,82,43,0.2)",
              background: "rgba(240,235,225,0.02)",
              padding: "12px 24px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function WorkPage() {
  return (
    <main style={{ background: "#0D0D0B", minHeight: "100vh", color: "#F0EBE1" }} className="overflow-x-hidden">
      <Nav />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(140px, 18vw, 180px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: "70vw", height: "50vw", maxWidth: "1000px", maxHeight: "700px",
            background: "radial-gradient(ellipse, rgba(192,82,43,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-7"
          >
            <div style={{ width: "34px", height: "1px", background: "#C0522B" }} />
            <span style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "13px",
              letterSpacing: "0.28em", textTransform: "uppercase", color: "#C0522B",
            }}>
              Selected Work
            </span>
            <div style={{ width: "34px", height: "1px", background: "#C0522B" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(38px, 6vw, 88px)", lineHeight: 1.06,
              color: "#F0EBE1", maxWidth: "900px", margin: "0 auto",
            }}
          >
            What we&apos;ve <span style={{ fontStyle: "italic", color: "#C0522B" }}>built.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            style={{
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "clamp(16px, 1.5vw, 20px)", lineHeight: 1.8,
              color: "rgba(212,204,184,0.65)", maxWidth: "620px",
              margin: "22px auto 36px",
            }}
          >
            Real AI systems, shipped and running. Here is what they replaced, what they do now, and how they were made.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <MagneticButton
              href="/book"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{ padding: "18px 40px", boxShadow: "0 0 40px rgba(192,82,43,0.3)" } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)", zIndex: 1, transition: "transform 0.5s ease" }}
                aria-hidden="true"
              />
              <span style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "15px",
                letterSpacing: "0.18em", textTransform: "uppercase", position: "relative", zIndex: 2,
              }}>
                Book a Call
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── The builds ── */}
      <section className="relative" style={{ background: "#0D0D0B", paddingBottom: "clamp(64px, 8vw, 96px)" }}>
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex flex-col" style={{ gap: "clamp(72px, 9vw, 128px)" }}>
          {builds.map((build, i) => (
            <BuildBlock key={build.title} build={build} index={i} />
          ))}
        </div>
      </section>

      {/* ── Capabilities band ── */}
      <section className="relative overflow-hidden" style={{ background: "#0F0F0D", paddingTop: "clamp(64px, 8vw, 96px)", paddingBottom: "clamp(64px, 8vw, 96px)" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0"
          style={{ width: "50vw", height: "50vw", background: "radial-gradient(ellipse at top right, rgba(192,82,43,0.05) 0%, transparent 60%)", filter: "blur(70px)" }}
        />
        <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="mb-12 md:mb-14"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <div style={{ width: "28px", height: "1px", backgroundColor: "#C0522B" }} />
              <span style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
                letterSpacing: "0.26em", textTransform: "uppercase", color: "#C0522B",
              }}>
                What We Build
              </span>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "clamp(28px, 3.4vw, 52px)", lineHeight: 1.1,
                color: "#F0EBE1", maxWidth: "760px",
              }}
            >
              Six kinds of systems, <span style={{ fontStyle: "italic", color: "#C0522B" }}>one team.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {capabilities.map((cap) => (
              <CapabilityCard key={cap.num} cap={cap} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tools band ── */}
      <section className="relative" style={{ background: "#0D0D0B", paddingTop: "clamp(56px, 7vw, 80px)", paddingBottom: "clamp(56px, 7vw, 80px)" }}>
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center justify-center gap-4"
          >
            <div style={{ width: "28px", height: "1px", backgroundColor: "#C0522B" }} />
            <span style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
              letterSpacing: "0.26em", textTransform: "uppercase", color: "#C0522B",
            }}>
              Real Tools, Real Builds
            </span>
            <div style={{ width: "28px", height: "1px", backgroundColor: "#C0522B" }} />
          </motion.div>
        </div>
        <ToolsMarquee />
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden" style={{ background: "#0D0D0B", paddingTop: "clamp(64px, 9vw, 110px)", paddingBottom: "clamp(72px, 10vw, 120px)" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "60vw", height: "40vw", maxWidth: "900px", maxHeight: "560px",
            background: "radial-gradient(ellipse, rgba(192,82,43,0.1) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 md:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(28px, 4.2vw, 58px)", lineHeight: 1.15,
              color: "#F0EBE1", marginBottom: "24px",
            }}
          >
            Want something like this{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>for your business?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <MagneticButton
              href="/book"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{ padding: "19px 40px", boxShadow: "0 0 40px rgba(192,82,43,0.3)" } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)", zIndex: 1, transition: "transform 0.5s ease" }}
                aria-hidden="true"
              />
              <span style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "15px",
                letterSpacing: "0.18em", textTransform: "uppercase", position: "relative", zIndex: 2,
              }}>
                Book a Call
              </span>
            </MagneticButton>

            <a
              href="/services"
              className="group"
              style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "14px",
                letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,204,184,0.75)",
                textDecoration: "none", paddingBottom: "2px",
                borderBottom: "1px solid rgba(212,204,184,0.25)",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#F0EBE1"; e.currentTarget.style.borderColor = "rgba(240,235,225,0.6)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(212,204,184,0.75)"; e.currentTarget.style.borderColor = "rgba(212,204,184,0.25)"; }}
              onFocus={(e) => { e.currentTarget.style.color = "#F0EBE1"; e.currentTarget.style.borderColor = "rgba(240,235,225,0.6)"; }}
              onBlur={(e) => { e.currentTarget.style.color = "rgba(212,204,184,0.75)"; e.currentTarget.style.borderColor = "rgba(212,204,184,0.25)"; }}
            >
              See services →
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
