"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  caseStudies,
  CaseStudyModal,
  CaseSigil,
} from "@/components/solnest/ServicesSection";

// ─── Motion helpers ───────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1.0];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─── Shared-source types (contract with ServicesSection) ─────────────────

type CaseKey = keyof typeof caseStudies;

const FLAGSHIP_KEYS = ["strsecrets", "legacyrnr", "westproperties", "somos", "automationstack"] as const;
const LEDGER_KEYS = ["medspa", "restaurant", "dental", "realestate"] as const;

// ─── Data: capabilities (ruled list, cross-referenced to the builds) ──────

const capabilities = [
  {
    num: "01",
    title: "AI agents & orchestration",
    desc: "Specialist agents coordinated by an orchestrator, each with its own job and its own scope.",
    proof: "STR Secrets · LegacyRnR Control Center",
  },
  {
    num: "02",
    title: "Revenue & pricing intelligence",
    desc: "Market data turned into pricing decisions, tested and repeatable, not guesswork.",
    proof: "Solnest Automation Stack",
  },
  {
    num: "03",
    title: "Guest & customer messaging",
    desc: "Conversations handled automatically, on brand, without dropping a single thread.",
    proof: "Patient Concierge Agent",
  },
  {
    num: "04",
    title: "Multi-tenant SaaS platforms",
    desc: "Isolated, secure workspaces built to hold real customer data at scale.",
    proof: "STR Secrets",
  },
  {
    num: "05",
    title: "Automation & data pipelines",
    desc: "Scraping, syncing, and scheduling that runs on its own clock, not yours.",
    proof: "Solnest Automation Stack",
  },
  {
    num: "06",
    title: "Approval-gated operations",
    desc: "Anything touching money or compliance waits for a human, logged and reversible.",
    proof: "LegacyRnR Control Center",
  },
];

// ─── Data: tools band ──────────────────────────────────────────────────────

const tools = [
  "Claude", "OpenAI", "n8n", "Supabase", "Stripe", "Guesty",
  "PriceLabs", "Apify", "Socket.io", "Postgres", "Vercel", "GitHub",
];

// ─── Count-up numeral (AnimatedPrice pattern, ~0.9s, once, reduced-motion safe)

function CountUpNumber({ target, style }: { target: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(target.toLocaleString());
      return;
    }
    const duration = 900;
    const steps = 30;
    const stepTime = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target).toLocaleString());
      if (current >= steps) {
        clearInterval(timer);
        setDisplay(target.toLocaleString());
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target, reducedMotion]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {display}
    </span>
  );
}

// ─── Stat value: numeral as display type, unit in the project accent ───────

function StatValue({
  value,
  accent,
  promoted = false,
}: {
  value: string;
  accent: string;
  promoted?: boolean;
}) {
  const size = promoted
    ? "var(--fs-display-md, clamp(26px, 2.6vw, 44px))"
    : "var(--fs-display-sm, clamp(19px, 1.6vw, 26px))";
  const m = value.match(/^([$<]*)(\d+(?:\.\d+)?)(.*)$/);

  if (m) {
    const [, pre, num, suf] = m;
    const isInt = /^\d+$/.test(num);
    return (
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: size,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: "#F0EBE1",
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
        }}
      >
        {pre && <span style={{ color: accent, fontSize: "0.72em" }}>{pre}</span>}
        {isInt ? <CountUpNumber target={parseInt(num, 10)} /> : num}
        {suf && <span style={{ color: accent, fontSize: "0.72em" }}>{suf}</span>}
      </span>
    );
  }

  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        color: "#F0EBE1",
      }}
    >
      {value}
    </span>
  );
}

// ─── Section rule: full-width hairline + marginal label ────────────────────

function SectionRule({ label }: { label: string }) {
  return (
    <div aria-hidden="true" style={{ position: "relative", width: "100%" }}>
      <div style={{ height: "1px", background: "rgba(240,235,225,0.10)" }} />
      <div className="max-w-[1400px] mx-auto px-4 md:px-8" style={{ position: "relative" }}>
        <span
          className="left-4 md:left-8"
          style={{
            position: "absolute",
            top: "-8px",
            background: "#0D0D0B",
            paddingRight: "16px",
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C0522B",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Eyebrow: 34px rust rule + condensed uppercase label ───────────────────

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3.5" style={{ marginBottom: "14px" }}>
      <div style={{ width: "34px", height: "1px", background: "#C0522B" }} />
      <span
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#C0522B",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Before / After tonal diptych ───────────────────────────────────────────

function Diptych({ cs }: { cs: (typeof caseStudies)[CaseKey] }) {
  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 md:grid-cols-2"
      style={{ marginBottom: "clamp(40px, 5vw, 56px)" }}
    >
      {/* BEFORE — dim */}
      <div
        className="work-diptych-before"
        style={{ padding: "26px 28px 28px 0" }}
      >
        <div
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(212,204,184,0.45)",
            marginBottom: "18px",
          }}
        >
          Before
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", margin: 0, padding: 0 }}>
          {cs.before.map((item) => (
            <li key={item} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span aria-hidden="true" style={{ width: "12px", height: "1px", background: "rgba(212,204,184,0.35)", flexShrink: 0, marginTop: "11px" }} />
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14.5px", lineHeight: 1.65, color: "rgba(212,204,184,0.55)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* AFTER — lit, accent-tinted panel */}
      <div
        style={{
          padding: "26px 26px 28px",
          background: `rgba(${cs.colorRgb},0.04)`,
          borderLeft: "1px solid rgba(240,235,225,0.10)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: cs.color,
            marginBottom: "18px",
          }}
        >
          After
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", margin: 0, padding: 0 }}>
          {cs.after.map((item) => (
            <li key={item} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span aria-hidden="true" style={{ width: "12px", height: "1px", background: cs.color, flexShrink: 0, marginTop: "11px" }} />
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14.5px", lineHeight: 1.65, color: "rgba(240,235,225,0.88)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Process: rule-and-stop rail (hairline spine + rust square nodes) ──────

function ProcessRail({ cs }: { cs: (typeof caseStudies)[CaseKey] }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div variants={itemVariants} style={{ marginBottom: "clamp(40px, 5vw, 56px)" }}>
      <div
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "11px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(212,204,184,0.45)",
          marginBottom: "24px",
        }}
      >
        How it was built
      </div>

      <div className="work-process">
        {/* Spine — draws in once */}
        <motion.div
          aria-hidden="true"
          className="work-process-spine"
          initial={reducedMotion ? false : { scaleX: 0, scaleY: 0 }}
          whileInView={{ scaleX: 1, scaleY: 1 }}
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ transformOrigin: "top left", background: "rgba(240,235,225,0.10)" }}
        />
        {cs.process.map((step, i) => (
          <motion.div
            key={step.step}
            className="work-process-stop"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.55, delay: 0.12 * (i + 1), ease: EASE }}
          >
            <span aria-hidden="true" className="work-process-node" style={{ background: "#C0522B" }} />
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "clamp(26px, 2.4vw, 34px)",
                letterSpacing: "0.04em",
                color: "rgba(240,235,225,0.14)",
                lineHeight: 1,
                marginBottom: "10px",
              }}
            >
              {step.step}
            </div>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(17px, 1.4vw, 20px)",
                lineHeight: 1.3,
                color: "#F0EBE1",
                marginBottom: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              {step.title}
            </h4>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "13.5px",
                lineHeight: 1.7,
                color: "rgba(212,204,184,0.55)",
              }}
            >
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Flagship chapter: full editorial dossier, alternating panel ───────────

function FlagshipChapter({ id, index }: { id: CaseKey; index: number }) {
  const cs = caseStudies[id];
  const reversed = index % 2 === 1;
  const chapterNum = `0${index + 1}`;
  const [panelHovered, setPanelHovered] = useState(false);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      variants={containerVariants}
      className="work-chapter relative overflow-hidden"
      style={{
        ["--acc" as string]: cs.color,
        ["--acc-rgb" as string]: cs.colorRgb,
        paddingTop: "clamp(56px, 7vw, 96px)",
        paddingBottom: "clamp(56px, 7vw, 96px)",
      }}
    >
      {/* Ghost chapter numeral — editorial signature */}
      <div
        aria-hidden="true"
        className={`work-ghost absolute pointer-events-none ${reversed ? "right-0" : "left-0"}`}
        style={{
          top: "clamp(8px, 2vw, 24px)",
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "clamp(120px, 14vw, 220px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "rgba(240,235,225,0.045)",
          userSelect: "none",
        }}
      >
        {chapterNum}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 xl:gap-20 items-start`}>
          {/* ── Narrative column ── */}
          <div className="flex-1 min-w-0 w-full">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-5"
              style={{
                background: `rgba(${cs.colorRgb},0.1)`,
                border: `1px solid rgba(${cs.colorRgb},0.3)`,
                padding: "5px 14px",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: cs.color, boxShadow: `0 0 8px rgba(${cs.colorRgb},0.6)`,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px",
                  letterSpacing: "0.22em", textTransform: "uppercase", color: cs.color,
                }}
              >
                {cs.badge}
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "var(--fs-display-lg, clamp(34px, 4.4vw, 68px))", lineHeight: 1.06,
                color: "#F0EBE1", letterSpacing: "-0.02em", marginBottom: "16px",
                maxWidth: "820px", textWrap: "balance",
              }}
            >
              {cs.title}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(18px, 2vw, 26px)", lineHeight: 1.5,
                color: cs.color, opacity: 0.9, marginBottom: "clamp(32px, 4vw, 48px)",
                maxWidth: "700px",
              }}
            >
              &ldquo;{cs.headline}&rdquo;
            </motion.p>

            {/* The Problem */}
            <motion.div variants={itemVariants} style={{ marginBottom: "clamp(28px, 3.5vw, 40px)" }}>
              <Eyebrow label="The Problem" />
              <p
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 300,
                  fontSize: "var(--fs-body-lg, clamp(15px, 1.15vw, 18px))",
                  lineHeight: 1.85, color: "rgba(212,204,184,0.7)", maxWidth: "64ch",
                }}
              >
                {cs.why}
              </p>
            </motion.div>

            {/* The Build */}
            <motion.div variants={itemVariants} style={{ marginBottom: "clamp(36px, 4.5vw, 52px)" }}>
              <Eyebrow label="The Build" />
              <p
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 300,
                  fontSize: "var(--fs-body-lg, clamp(15px, 1.15vw, 18px))",
                  lineHeight: 1.85, color: "rgba(212,204,184,0.7)", maxWidth: "64ch",
                }}
              >
                {cs.what}
              </p>
            </motion.div>

            {/* Before / After diptych */}
            <Diptych cs={cs} />

            {/* Process rail */}
            <ProcessRail cs={cs} />

            {/* Stack pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {cs.stack.map((tool) => (
                <span
                  key={tool}
                  className="work-stack-pill"
                  style={{
                    fontFamily: "var(--font-condensed)", fontWeight: 500,
                    fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "rgba(212,204,184,0.7)",
                    border: "1px solid rgba(240,235,225,0.14)",
                    borderRadius: "9999px",
                    padding: "6px 16px",
                  }}
                >
                  {tool}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Visual panel: sigil + stat rail ── */}
          <motion.div
            variants={itemVariants}
            className="work-panel w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 lg:sticky lg:top-28 self-start relative overflow-hidden"
            onMouseEnter={() => setPanelHovered(true)}
            onMouseLeave={() => setPanelHovered(false)}
            style={{
              border: `1px solid rgba(240,235,225,${panelHovered ? 0.24 : 0.10})`,
              background: "#12110E",
              borderRadius: "2px",
              transition: "border-color 0.3s cubic-bezier(0.215,0.61,0.355,1)",
            }}
          >
            {/* Accent wash */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 70% 20%, rgba(${cs.colorRgb},0.08), transparent 60%)`,
                opacity: panelHovered ? 1 : 0.6,
                transition: "opacity 0.3s cubic-bezier(0.215,0.61,0.355,1)",
              }}
            />

            {/* Sigil */}
            <div className="relative flex items-center justify-center" style={{ padding: "clamp(28px, 3vw, 44px) 0 clamp(16px, 2vw, 28px)" }}>
              <div style={{ width: "min(260px, 62%)", aspectRatio: "1 / 1" }}>
                <CaseSigil
                  motif={cs.motif}
                  accent={cs.color}
                  accentRgb={cs.colorRgb}
                  count={"sigilCount" in cs ? cs.sigilCount : undefined}
                  active={panelHovered}
                />
              </div>
            </div>

            {/* Stat rail — hairline-divided, first stat promoted */}
            <div className="relative" style={{ borderTop: "1px solid rgba(240,235,225,0.10)" }}>
              {cs.results.map((r, i) => (
                <div
                  key={r.label}
                  style={{
                    padding: i === 0 ? "22px 26px 24px" : "16px 26px 18px",
                    borderTop: i > 0 ? "1px solid rgba(240,235,225,0.10)" : "none",
                  }}
                >
                  <StatValue value={r.stat} accent={cs.color} promoted={i === 0} />
                  <div
                    style={{
                      fontFamily: "var(--font-condensed)", fontWeight: 500,
                      fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                      color: "rgba(212,204,184,0.5)", marginTop: "6px",
                    }}
                  >
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Ledger row: compact engagement, opens the shared modal ────────────────

function LedgerRow({
  id,
  index,
  onOpen,
}: {
  id: CaseKey;
  index: number;
  onOpen: (id: CaseKey) => void;
}) {
  const cs = caseStudies[id];
  const hero = cs.results[0];

  return (
    <motion.div variants={itemVariants}>
      <button
        type="button"
        onClick={() => onOpen(id)}
        className="work-ledger-row focus-ring"
        aria-label={`Open case study: ${cs.title}`}
        style={{
          ["--acc" as string]: cs.color,
          ["--acc-rgb" as string]: cs.colorRgb,
        }}
      >
        <span
          className="work-ledger-index"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-condensed)", fontWeight: 600,
            fontSize: "clamp(18px, 1.6vw, 24px)", letterSpacing: "0.04em",
            color: "rgba(192,82,43,0.4)", lineHeight: 1,
          }}
        >
          {`0${index}`}
        </span>

        <span style={{ minWidth: 0 }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "var(--fs-display-sm, clamp(19px, 1.6vw, 26px))",
              lineHeight: 1.15, letterSpacing: "-0.01em", color: "#F0EBE1",
              marginBottom: "6px", textWrap: "balance",
            }}
          >
            {cs.title}
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "14px", lineHeight: 1.6,
              color: "rgba(212,204,184,0.55)", maxWidth: "56ch",
            }}
          >
            {cs.headline}
          </span>
        </span>

        <span className="work-ledger-stat" style={{ textAlign: "right" }}>
          <StatValue value={hero.stat} accent={cs.color} />
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-condensed)", fontWeight: 500,
              fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(212,204,184,0.45)", marginTop: "5px",
            }}
          >
            {hero.label}
          </span>
        </span>

        <span
          className="work-ledger-arrow"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-body)", fontWeight: 300,
            fontSize: "20px", color: "rgba(212,204,184,0.45)", lineHeight: 1,
          }}
        >
          →
        </span>
      </button>
    </motion.div>
  );
}

// ─── Capability row: ruled typography, no boxes ────────────────────────────

function CapabilityRow({ cap }: { cap: (typeof capabilities)[0] }) {
  return (
    <motion.div
      variants={itemVariants}
      className="work-cap-row"
      style={{
        borderTop: "1px solid rgba(240,235,225,0.10)",
        padding: "26px 12px 28px 0",
      }}
    >
      <div className="flex items-baseline gap-4" style={{ marginBottom: "8px" }}>
        <span
          className="work-cap-num"
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
            letterSpacing: "0.2em", color: "rgba(192,82,43,0.5)",
          }}
        >
          {cap.num}
        </span>
        <h4
          style={{
            fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(19px, 1.7vw, 23px)", color: "#F0EBE1",
            letterSpacing: "-0.01em", lineHeight: 1.25,
          }}
        >
          {cap.title}
        </h4>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14.5px",
          lineHeight: 1.7, color: "rgba(212,204,184,0.55)",
          paddingLeft: "34px", marginBottom: "10px",
        }}
      >
        {cap.desc}
      </p>
      <p
        style={{
          fontFamily: "var(--font-condensed)", fontWeight: 500, fontSize: "11px",
          letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(212,204,184,0.4)", paddingLeft: "34px",
        }}
      >
        Proven in — <span style={{ color: "rgba(192,82,43,0.75)" }}>{cap.proof}</span>
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
  const [activeCase, setActiveCase] = useState<CaseKey | null>(null);
  const scrollYRef = useRef(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openCase = (id: CaseKey) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setActiveCase(id);
  };

  const closeCase = () => {
    setActiveCase(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  // Scroll lock while the modal is open (same treatment as the homepage showcase)
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

  const proofStats = [
    { value: Object.keys(caseStudies).length, label: "Systems shipped" },
    { value: 19, label: "AI agents, one cockpit" },
    { value: 164, label: "Tests, revenue engine" },
  ];

  return (
    <main style={{ background: "#0D0D0B", minHeight: "100vh", color: "#F0EBE1" }} className="overflow-x-hidden">
      {/* Dossier-layer choreography: 3-beat hovers, ledger + process + pills */}
      <style>{`
        .work-ledger-row {
          display: grid;
          grid-template-columns: 64px 1fr auto auto;
          align-items: center;
          gap: clamp(16px, 2.5vw, 32px);
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          border-top: 1px solid rgba(240,235,225,0.10);
          padding: clamp(22px, 3vw, 30px) clamp(8px, 1vw, 16px);
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.3s cubic-bezier(0.215,0.61,0.355,1);
        }
        .work-ledger-last .work-ledger-row {
          border-bottom: 1px solid rgba(240,235,225,0.10);
        }
        .work-ledger-index {
          transition: color 0.3s cubic-bezier(0.215,0.61,0.355,1) 40ms;
        }
        .work-ledger-arrow {
          transition: transform 0.3s cubic-bezier(0.215,0.61,0.355,1) 80ms, color 0.3s cubic-bezier(0.215,0.61,0.355,1) 80ms;
        }
        @media (hover: hover) and (pointer: fine) {
          .work-ledger-row:hover { background: rgba(var(--acc-rgb), 0.05); }
          .work-ledger-row:hover .work-ledger-index { color: var(--acc); }
          .work-ledger-row:hover .work-ledger-arrow { transform: translateX(5px); color: var(--acc); }
          .work-cap-row { transition: background 0.3s cubic-bezier(0.215,0.61,0.355,1); }
          .work-cap-num { transition: color 0.3s cubic-bezier(0.215,0.61,0.355,1) 40ms; }
          .work-cap-row:hover { background: rgba(240,235,225,0.02); }
          .work-cap-row:hover .work-cap-num { color: #C0522B; }
          .work-stack-pill { transition: border-color 0.25s cubic-bezier(0.215,0.61,0.355,1), color 0.25s cubic-bezier(0.215,0.61,0.355,1); }
          .work-stack-pill:hover { border-color: rgba(var(--acc-rgb), 0.4); color: #F0EBE1; }
          .work-ghost { transition: transform 0.35s cubic-bezier(0.215,0.61,0.355,1); }
          .work-chapter:hover .work-ghost { transform: translateX(10px); }
        }
        @media (max-width: 767px) {
          .work-ledger-row { grid-template-columns: 40px 1fr auto; }
          .work-ledger-stat { grid-column: 2; grid-row: 2; text-align: left !important; margin-top: 12px; }
          .work-ledger-arrow { grid-column: 3; grid-row: 1; }
          .work-diptych-before { padding-right: 0 !important; }
          .work-diptych-before + div { border-left: none !important; border-top: 1px solid rgba(240,235,225,0.10); }
        }
        .work-process {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          padding-left: 26px;
        }
        .work-process-spine {
          position: absolute;
          left: 3px;
          top: 0;
          bottom: 0;
          width: 1px;
        }
        .work-process-stop { position: relative; }
        .work-process-node {
          position: absolute;
          width: 7px;
          height: 7px;
          left: -26px;
          top: 6px;
        }
        @media (min-width: 768px) {
          .work-process {
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(20px, 3vw, 36px);
            padding-left: 0;
            padding-top: 26px;
          }
          .work-process-spine {
            left: 0;
            right: 0;
            top: 3px;
            bottom: auto;
            width: auto;
            height: 1px;
          }
          .work-process-node {
            left: 0;
            top: -26px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .work-ledger-row, .work-ledger-index, .work-ledger-arrow,
          .work-cap-row, .work-cap-num, .work-stack-pill, .work-ghost {
            transition: none !important;
          }
        }
      `}</style>

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

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
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
              fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))", lineHeight: 1.05,
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
              margin: "22px auto 0",
            }}
          >
            Real AI systems, shipped and running. Here is what they replaced, what they do now, and how they were made.
          </motion.p>

          {/* Proof strip — hairline-divided, frozen numbers only */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
            className="flex items-stretch justify-center"
            style={{ margin: "36px auto 40px" }}
          >
            {proofStats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "4px clamp(20px, 4vw, 48px)",
                  borderLeft: i > 0 ? "1px solid rgba(240,235,225,0.10)" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)", fontWeight: 300,
                    fontSize: "var(--fs-display-md, clamp(26px, 2.6vw, 44px))",
                    lineHeight: 1.05, letterSpacing: "-0.02em", color: "#F0EBE1",
                  }}
                >
                  <CountUpNumber target={s.value} />
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-condensed)", fontWeight: 500,
                    fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "rgba(212,204,184,0.5)", marginTop: "6px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
          >
            <MagneticButton
              href="/book"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{ padding: "18px 40px", borderRadius: "9999px", boxShadow: "0 0 40px rgba(192,82,43,0.3)" } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)", zIndex: 1, transition: "transform 0.5s cubic-bezier(0.215,0.61,0.355,1)", borderRadius: "9999px" }}
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

      {/* ── 01 / Flagship chapters ── */}
      <SectionRule label="01 / Flagship Builds" />
      <section style={{ background: "#0D0D0B" }}>
        {FLAGSHIP_KEYS.map((id, i) => (
          <FlagshipChapter key={id} id={id} index={i} />
        ))}
      </section>

      {/* ── 02 / More engagements: the ledger ── */}
      <SectionRule label="02 / More Engagements" />
      <section style={{ background: "#0D0D0B", paddingTop: "clamp(56px, 7vw, 88px)", paddingBottom: "clamp(64px, 8vw, 104px)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            variants={containerVariants}
            className="mb-10 md:mb-12"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow label="More Engagements" />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "var(--fs-display-md, clamp(26px, 2.6vw, 44px))", lineHeight: 1.12,
                color: "#F0EBE1", maxWidth: "760px", textWrap: "balance",
              }}
            >
              Smaller systems, <span style={{ fontStyle: "italic", color: "#C0522B" }}>same discipline.</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "15px",
                lineHeight: 1.7, color: "rgba(212,204,184,0.55)", maxWidth: "560px",
                marginTop: "12px",
              }}
            >
              Open any row for the full case study: what it replaced, what it does now, and how it was built.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            variants={containerVariants}
          >
            {LEDGER_KEYS.map((id, i) => (
              <div key={id} className={i === LEDGER_KEYS.length - 1 ? "work-ledger-last" : undefined}>
                <LedgerRow id={id} index={i + 4} onOpen={openCase} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 03 / Capabilities: ruled list, no boxes ── */}
      <SectionRule label="03 / Capabilities" />
      <section className="relative overflow-hidden" style={{ background: "#0D0D0B", paddingTop: "clamp(56px, 7vw, 88px)", paddingBottom: "clamp(64px, 8vw, 96px)" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0"
          style={{ width: "50vw", height: "50vw", background: "radial-gradient(ellipse at top right, rgba(192,82,43,0.05) 0%, transparent 60%)", filter: "blur(70px)" }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            variants={containerVariants}
            className="mb-12 md:mb-14"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow label="What We Build" />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "var(--fs-display-md, clamp(26px, 2.6vw, 44px))", lineHeight: 1.1,
                color: "#F0EBE1", maxWidth: "760px",
              }}
            >
              Six kinds of systems, <span style={{ fontStyle: "italic", color: "#C0522B" }}>one team.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16"
          >
            {capabilities.map((cap) => (
              <CapabilityRow key={cap.num} cap={cap} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 04 / Tools band ── */}
      <SectionRule label="04 / Tooling" />
      <section className="relative" style={{ background: "#0D0D0B", paddingTop: "clamp(56px, 7vw, 80px)", paddingBottom: "clamp(56px, 7vw, 80px)" }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-center justify-center gap-3.5"
          >
            <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
            <span style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
              letterSpacing: "0.26em", textTransform: "uppercase", color: "#C0522B",
            }}>
              Real Tools, Real Builds
            </span>
            <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
          </motion.div>
        </div>
        <ToolsMarquee />
      </section>

      {/* ── 05 / Final CTA ── */}
      <SectionRule label="05 / Start" />
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
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
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
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <MagneticButton
              href="/book"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{ padding: "19px 40px", borderRadius: "9999px", boxShadow: "0 0 40px rgba(192,82,43,0.3)" } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)", zIndex: 1, transition: "transform 0.5s cubic-bezier(0.215,0.61,0.355,1)", borderRadius: "9999px" }}
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
              className="link-underline focus-ring"
              style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "14px",
                letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,204,184,0.75)",
                textDecoration: "none", paddingBottom: "2px",
              }}
            >
              See services →
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Shared case-study modal — same object as the homepage showcase */}
      <AnimatePresence>
        {activeCase && <CaseStudyModal id={activeCase} onClose={closeCase} />}
      </AnimatePresence>
    </main>
  );
}
