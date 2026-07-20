"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { caseStudies, CaseStudyModal, AgentCard } from "@/components/solnest/ServicesSection";

const EASE = [0.215, 0.61, 0.355, 1.0] as const;
const VIEWPORT = { once: true, margin: "-80px 0px -80px 0px" } as const;

type CaseKey = keyof typeof caseStudies;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─── How It Works ─────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    name: "Audit",
    description: "We map every hour AI can own in your operation.",
  },
  {
    num: "02",
    name: "Build",
    description: "We build the agents, automations, and workflows into your business.",
  },
  {
    num: "03",
    name: "Deploy",
    description: "It goes live and runs without you, connected to the tools you already use.",
  },
  {
    num: "04",
    name: "Advise",
    description: "We stay in your corner and keep improving it every month.",
  },
];

// ─── The 3 Offers ─────────────────────────────────────────────────────────
// Line items are the original offer descriptions, decomposed. No new claims.

const offers = [
  {
    num: "01",
    name: "AI Business Audit",
    priceValue: 1500 as number | null,
    priceSuffix: "",
    priceNote: "flat rate",
    badge: "Best starting point",
    featured: false,
    items: [
      "One session: Ryan maps every hour you are wasting on tasks AI can own",
      "You leave with a prioritized roadmap — not theory, not guesswork",
      "Every dollar applies toward a Done-For-You build",
    ],
  },
  {
    num: "02",
    name: "Done-For-You AI Build",
    priceValue: 5000 as number | null,
    priceSuffix: "+",
    priceNote: "per project",
    badge: "Most popular",
    featured: true,
    items: [
      "You stop doing it — Ryan's team builds it into your business",
      "Agents, automations, and workflows",
      "All running without you, connected to the tools you already use",
    ],
    proof: {
      label: "e.g. STR Secrets — 5 AI agents per operator",
      caseId: "strsecrets" as CaseKey,
    },
  },
  {
    num: "03",
    name: "Ongoing Advisory",
    priceValue: null as number | null,
    priceSuffix: "",
    priceNote: "tailored to your business",
    badge: "Limited spots",
    featured: false,
    items: [
      "Ryan in your corner every month",
      "Real-time strategy and implementation calls",
      "Direct access when problems come up",
    ],
  },
];

// ─── Industries We Build For ──────────────────────────────────────────────

const industries = [
  {
    num: "01",
    name: "Short-Term Rentals",
    description: "Deal analysis, guest ops, and pricing, automated.",
  },
  {
    num: "02",
    name: "Med Spas",
    description: "Concierge booking and follow-ups that never sleep.",
  },
  {
    num: "03",
    name: "Real Estate",
    description: "Instant lead capture, scoring, and response.",
  },
  {
    num: "04",
    name: "Coaches & Consultants",
    description: "Client acquisition and inquiry handling on autopilot.",
  },
  {
    num: "05",
    name: "E-commerce",
    description: "Order support, restock alerts, and review requests on autopilot.",
  },
  {
    num: "06",
    name: "Local Service Businesses",
    description: "Missed-call text-back and scheduling that never drops a lead.",
  },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Do you only work with short-term rentals?",
    a: "No. STR is our roots, but we build for any operator: med spas, real estate, coaching, e-commerce, and local service businesses.",
  },
  {
    q: "How fast can you build?",
    a: "Most Done-For-You builds go live in two to four weeks, depending on scope. The Audit tells you the exact timeline before you commit to anything.",
  },
  {
    q: "What does it cost?",
    a: "The Audit is a flat $1,500, credited toward a build. Done-For-You projects start at $5,000 and scale with scope. Ongoing Advisory is custom, priced to your business.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. Ryan and his team handle the build and the connections to your tools. You get a system that runs, not a project to manage.",
  },
  {
    q: "What tools do you use?",
    a: "Claude, OpenAI, n8n, Supabase, Stripe, Guesty, and your existing stack. We build with what you already have wherever we can.",
  },
];

// ─── Editorial primitives ───────────────────────────────────────────────────

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3.5 mb-6 md:mb-8">
      <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B", flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "#C0522B",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Oversized ghost index numeral, clipped by the section's overflow-hidden. */
function GhostNumeral({ n }: { n: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-0 select-none"
      style={{
        top: "clamp(12px, 2.5vw, 36px)",
        right: "clamp(4px, 2.5vw, 40px)",
        fontFamily: "var(--font-condensed)",
        fontWeight: 700,
        fontSize: "clamp(80px, 10vw, 160px)",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        color: "rgba(240,235,225,0.06)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {n}
    </div>
  );
}

/** Full-width hairline divider with a marginal label sitting on the rule. */
function SectionDivider({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="relative w-full" style={{ height: "1px", background: "rgba(240,235,225,0.10)" }}>
      <div className="max-w-[1400px] mx-auto relative h-full">
        <span
          className="absolute left-4 md:left-8"
          style={{
            top: 0,
            transform: "translateY(-50%)",
            background: "#0D0D0B",
            padding: "2px 12px 2px 0",
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

/** Count-up numeral on viewport entry — same pattern as the homepage AnimatedPrice. */
function AnimatedPrice({
  target,
  suffix = "",
  style,
}: {
  target: number;
  suffix?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(target.toLocaleString() + suffix);
      return;
    }
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (progress >= 1) {
        setDisplay(target.toLocaleString() + suffix);
        return;
      }
      setDisplay(Math.round(eased * target).toLocaleString());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, suffix, reducedMotion]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {display}
    </span>
  );
}

// ─── Process timeline: rule-and-stop ─────────────────────────────────────────

function ProcessTimeline() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="relative">
      {/* Horizontal spine (desktop) */}
      <motion.div
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: "absolute",
          top: "4px",
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(240,235,225,0.10)",
          transformOrigin: "left center",
        }}
        initial={reducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
      />
      {/* Vertical spine (mobile) */}
      <motion.div
        aria-hidden="true"
        className="lg:hidden"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "4px",
          width: "1px",
          background: "rgba(240,235,225,0.10)",
          transformOrigin: "center top",
        }}
        initial={reducedMotion ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            className="relative pl-8 lg:pl-0 lg:pt-10"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: reducedMotion ? 0 : 0.15 + i * 0.08 }}
          >
            {/* Rust square node, sitting on the spine */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 lg:top-0"
              style={{ width: "9px", height: "9px", background: "#C0522B", display: "block" }}
            />
            {/* Ghost stop numeral */}
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 700,
                fontSize: "clamp(48px, 4.5vw, 68px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "rgba(240,235,225,0.08)",
                marginBottom: "-14px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {step.num}
            </div>
            <h3
              style={{
                position: "relative",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(21px, 2vw, 27px)",
                color: "#F0EBE1",
                marginBottom: "10px",
                letterSpacing: "-0.01em",
              }}
            >
              {step.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "var(--fs-body, 15px)",
                lineHeight: 1.7,
                color: "rgba(212,204,184,0.6)",
                maxWidth: "34ch",
              }}
            >
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Offer card ─────────────────────────────────────────────────────────────

function OfferCard({
  offer,
  onProof,
}: {
  offer: (typeof offers)[number];
  onProof?: (id: CaseKey) => void;
}) {
  const accent = offer.featured ? "#C9A84C" : "#C0522B";
  const accentRgb = offer.featured ? "201,168,76" : "192,82,43";
  return (
    <motion.div
      variants={itemVariants}
      className={`offer-card relative overflow-hidden ${offer.featured ? "oc-featured" : "oc-standard"}`}
      style={
        {
          "--oc-accent": accent,
          background: offer.featured ? "#12110E" : "transparent",
          border: `1px solid ${offer.featured ? "rgba(201,168,76,0.24)" : "rgba(240,235,225,0.10)"}`,
          borderRadius: "2px",
          padding: offer.featured
            ? "clamp(30px, 4vw, 48px) clamp(24px, 3.5vw, 44px)"
            : "clamp(24px, 3vw, 36px) clamp(20px, 3vw, 36px)",
        } as React.CSSProperties
      }
    >
      {/* Accent wash — beat 2 of the hover sequence */}
      <div
        aria-hidden="true"
        className="oc-wash"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse at 70% 20%, rgba(${accentRgb},0.08), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header: index + badge pill */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="oc-num"
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.22em",
              color: "rgba(240,235,225,0.3)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {offer.num}
          </span>
          <span
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: accent,
              border: `1px solid rgba(${accentRgb},0.4)`,
              background: `rgba(${accentRgb},0.06)`,
              borderRadius: "9999px",
              padding: "5px 14px",
            }}
          >
            {offer.badge}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10 mb-7">
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: offer.featured ? "clamp(28px, 2.8vw, 42px)" : "clamp(24px, 2.2vw, 34px)",
              lineHeight: 1.12,
              color: "#F0EBE1",
              letterSpacing: "-0.01em",
              maxWidth: "16ch",
            }}
          >
            {offer.name}
          </h3>

          {/* Price as editorial typography */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "3px" }}>
              {offer.priceValue !== null && (
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    fontSize: "clamp(14px, 1.1vw, 18px)",
                    color: accent,
                    marginTop: "5px",
                  }}
                >
                  $
                </span>
              )}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: offer.featured ? "var(--fs-display-md, clamp(26px, 2.6vw, 44px))" : "clamp(24px, 2.2vw, 36px)",
                  lineHeight: 1,
                  color: "#F0EBE1",
                  letterSpacing: "-0.02em",
                }}
              >
                {offer.priceValue !== null ? (
                  <AnimatedPrice target={offer.priceValue} suffix={offer.priceSuffix} />
                ) : (
                  <span style={{ fontStyle: "italic" }}>Custom</span>
                )}
              </span>
            </div>
            <div
              style={{
                height: "1px",
                background: "rgba(240,235,225,0.10)",
                margin: "10px 0 7px",
              }}
            />
            <div
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(212,204,184,0.4)",
              }}
            >
              {offer.priceNote}
            </div>
          </div>
        </div>

        {/* Hairline-ruled checklist */}
        <ul style={{ listStyle: "none", margin: "0 0 26px", padding: 0 }}>
          {offer.items.map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                padding: "13px 2px",
                borderTop: "1px solid rgba(240,235,225,0.10)",
              }}
            >
              <span
                aria-hidden="true"
                style={{ width: "8px", height: "8px", background: "#C0522B", flexShrink: 0, marginTop: "7px" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "var(--fs-body, 15px)",
                  lineHeight: 1.65,
                  color: "rgba(212,204,184,0.72)",
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <MagneticButton
            href="/book"
            className="group relative bg-rust text-cream overflow-hidden"
            style={{
              padding: "14px 30px",
              borderRadius: "9999px",
              alignSelf: "flex-start",
            } as React.CSSProperties}
          >
            <span
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                position: "relative",
                zIndex: 2,
              }}
            >
              Book a Call
            </span>
          </MagneticButton>
          <a
            href="#builds"
            className="focus-ring"
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(212,204,184,0.6)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(240,235,225,0.14)",
              paddingBottom: "3px",
              alignSelf: "flex-start",
            }}
          >
            See it in production <span className="oc-arrow" style={{ display: "inline-block", color: "#C0522B" }}>↓</span>
          </a>
        </div>

        {/* Proof caption (Done-For-You) — opens the shared case-study modal */}
        {offer.proof && onProof && (
          <button
            onClick={() => onProof(offer.proof.caseId)}
            className="focus-ring"
            style={{
              display: "block",
              marginTop: "18px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "13px",
              color: "rgba(212,204,184,0.5)",
              borderBottom: "1px solid rgba(240,235,225,0.10)",
              paddingBottom: "3px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = accent;
              e.currentTarget.style.borderBottomColor = `rgba(${accentRgb},0.4)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(212,204,184,0.5)";
              e.currentTarget.style.borderBottomColor = "rgba(240,235,225,0.10)";
            }}
          >
            {offer.proof.label} →
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Industry row ────────────────────────────────────────────────────────────

function IndustryRow({ industry }: { industry: (typeof industries)[number] }) {
  return (
    <motion.div
      variants={itemVariants}
      className="ind-row"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "20px",
        padding: "22px 8px",
        borderBottom: "1px solid rgba(240,235,225,0.10)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.22em",
          color: "#C0522B",
          paddingTop: "6px",
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {industry.num}
      </span>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "5px" }}>
          <span
            className="ind-name"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))",
              letterSpacing: "-0.01em",
            }}
          >
            {industry.name}
          </span>
          <span aria-hidden="true" className="ind-arrow" style={{ color: "#C0522B", fontSize: "14px" }}>
            →
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "var(--fs-body, 14px)",
            lineHeight: 1.65,
            color: "rgba(212,204,184,0.5)",
          }}
        >
          {industry.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── FAQ row ────────────────────────────────────────────────────────────────

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const reducedMotion = useReducedMotion();
  const panelId = `services-faq-panel-${index}`;
  const buttonId = `services-faq-button-${index}`;
  const rowIndex = String(index + 1).padStart(2, "0");
  return (
    <motion.div variants={itemVariants} style={{ borderBottom: "1px solid rgba(240,235,225,0.10)" }}>
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="faq-toggle"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          gap: "18px",
          padding: "24px 4px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.22em",
            color: "#C0522B",
            paddingTop: "6px",
            width: "30px",
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {rowIndex}
        </span>
        <span
          className="faq-q"
          style={{
            flex: 1,
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))",
            lineHeight: 1.45,
          }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25, ease: EASE }}
          aria-hidden="true"
          className="faq-plus"
          style={{
            flexShrink: 0,
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.3, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(212,204,184,0.6)",
                padding: "0 4px 26px 52px",
                maxWidth: "60ch",
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCase, setActiveCase] = useState<CaseKey | null>(null);
  const scrollYRef = useRef(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Flagship trio: the first three case studies (STR Secrets, LegacyRnR, Automation Stack)
  const buildIds = (Object.keys(caseStudies) as CaseKey[]).slice(0, 3);

  const openCase = (id: CaseKey) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setActiveCase(id);
  };

  const closeCase = () => {
    setActiveCase(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  // Scroll lock while the case-study modal is open (same pattern as the homepage)
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
    <main style={{ background: "#0D0D0B", minHeight: "100vh", color: "#F0EBE1" }}>
      {/* dangerouslySetInnerHTML: quoted attribute selectors get entity-escaped
          in SSR text nodes, which breaks hydration inside raw-text <style> tags */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── FAQ rows ── */
        .faq-toggle .faq-q {
          color: rgba(240,235,225,0.88);
          transition: color 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .faq-toggle .faq-plus {
          color: rgba(192,82,43,0.65);
          transition: color 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .faq-toggle[aria-expanded="true"] .faq-q { color: #F0EBE1; }
        .faq-toggle[aria-expanded="true"] .faq-plus { color: #C0522B; }
        .faq-toggle:focus-visible {
          outline: 2px solid #C9A84C;
          outline-offset: 3px;
        }
        .faq-toggle:focus-visible .faq-q { color: #F0EBE1; }

        /* ── Offer cards: 3-beat hover (lift 0ms → wash 40ms → accents 80ms) ── */
        .offer-card {
          transition:
            transform 0.3s cubic-bezier(0.215,0.61,0.355,1),
            border-color 0.3s cubic-bezier(0.215,0.61,0.355,1);
        }
        .offer-card .oc-wash {
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.215,0.61,0.355,1) 0.04s;
        }
        .offer-card .oc-num {
          transition: color 0.25s cubic-bezier(0.215,0.61,0.355,1) 0.08s;
        }
        .offer-card .oc-arrow {
          transition: transform 0.25s cubic-bezier(0.215,0.61,0.355,1) 0.08s;
        }

        /* ── Industry rows: whole-row hover, no lift ── */
        .ind-row {
          transition: background 0.25s cubic-bezier(0.215,0.61,0.355,1);
        }
        .ind-row .ind-name {
          color: rgba(240,235,225,0.82);
          transition: color 0.25s cubic-bezier(0.215,0.61,0.355,1);
        }
        .ind-row .ind-arrow {
          display: inline-block;
          opacity: 0;
          transform: translateX(-4px);
          transition:
            opacity 0.25s cubic-bezier(0.215,0.61,0.355,1) 0.04s,
            transform 0.25s cubic-bezier(0.215,0.61,0.355,1) 0.04s;
        }

        @media (hover: hover) and (pointer: fine) {
          .faq-toggle:hover .faq-q { color: #F0EBE1; }
          .faq-toggle:hover .faq-plus { color: #C0522B; }

          .offer-card:hover { transform: translateY(-4px); }
          .offer-card.oc-standard:hover { border-color: rgba(240,235,225,0.24); }
          .offer-card.oc-featured:hover { border-color: rgba(201,168,76,0.4); }
          .offer-card:hover .oc-wash { opacity: 1; }
          .offer-card:hover .oc-num { color: var(--oc-accent, #C0522B); }
          .offer-card:hover .oc-arrow { transform: translateX(0) translateY(3px); }

          .ind-row:hover { background: rgba(240,235,225,0.02); }
          .ind-row:hover .ind-name { color: #F0EBE1; }
          .ind-row:hover .ind-arrow { opacity: 1; transform: translateX(0); }
        }

        /* ── Recent Builds cards (shared AgentCard hover grammar) ── */
        .rb-agent-card:focus-visible { outline: 2px solid #C9A84C; outline-offset: 3px; }
        .rb-agent-card { transition: background 0.25s cubic-bezier(0.215,0.61,0.355,1), border-color 0.25s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.25s cubic-bezier(0.215,0.61,0.355,1), transform 0.3s cubic-bezier(0.215,0.61,0.355,1); }
        .rb-agent-cta { opacity: 1; transform: translateY(0); transition: opacity 0.25s cubic-bezier(0.215,0.61,0.355,1), transform 0.25s cubic-bezier(0.215,0.61,0.355,1); }
        @media (hover: hover) and (pointer: fine) {
          .rb-agent-card:hover { transform: translateY(-4px); }
          .rb-agent-cta { opacity: 0; transform: translateY(6px); }
          .rb-agent-card:hover .rb-agent-cta, .rb-agent-card:focus-visible .rb-agent-cta { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-toggle .faq-q, .faq-toggle .faq-plus,
          .offer-card, .offer-card .oc-wash, .offer-card .oc-num, .offer-card .oc-arrow,
          .ind-row, .ind-row .ind-name, .ind-row .ind-arrow,
          .rb-agent-card, .rb-agent-cta { transition: none !important; }
          .offer-card:hover, .rb-agent-card:hover { transform: none; }
        }
      ` }} />
      <Nav />

      {/* ── Hero: left-aligned, ghost rule system on the right ── */}
      <section
        className="relative overflow-hidden px-4 md:px-8"
        style={{ paddingTop: "140px", paddingBottom: "clamp(48px, 8vw, 96px)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-14vw] left-[-8vw]"
          style={{
            width: "48vw",
            height: "48vw",
            background: "radial-gradient(ellipse at center, rgba(192,82,43,0.10) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.55, ease: EASE }}
              className="flex items-center gap-3.5 mb-7"
            >
              <div style={{ width: "34px", height: "1px", background: "#C0522B", flexShrink: 0 }} />
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
                Work With Ryan Directly
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease: EASE }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))",
                lineHeight: 1.05,
                color: "#F0EBE1",
                letterSpacing: "-0.02em",
                margin: "0 0 24px",
              }}
            >
              AI, <span style={{ fontStyle: "italic", color: "#C0522B" }}>built into your business.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6, ease: EASE }}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "clamp(17px, 1.6vw, 21px)",
                lineHeight: 1.8,
                color: "rgba(212,204,184,0.7)",
                maxWidth: "640px",
                margin: "0 0 40px",
              }}
            >
              From short-term rentals to med spas to real estate, we design, build, and run the AI
              systems that take the busywork off your plate. Any industry, done for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <MagneticButton
                href="/book"
                className="group relative bg-rust text-cream overflow-hidden"
                style={{
                  padding: "18px 38px",
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
                    letterSpacing: "0.18em",
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
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(212,204,184,0.8)",
                  textDecoration: "none",
                  paddingBottom: "3px",
                }}
              >
                See recent builds →
              </a>
            </motion.div>
          </div>

          {/* Ghost rule system — restrained anchor for the empty right space.
              Numbers restate the frozen FAQ fact: most builds go live in 2–4 weeks. */}
          <motion.div
            aria-hidden="true"
            className="hidden lg:block lg:col-span-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
          >
            <div style={{ paddingLeft: "clamp(16px, 3vw, 56px)" }}>
              <div style={{ height: "1px", background: "rgba(240,235,225,0.10)", marginBottom: "26px" }} />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(90px, 9vw, 150px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "rgba(240,235,225,0.07)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                2–4
              </div>
              <div
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(212,204,184,0.35)",
                  margin: "18px 0 26px",
                }}
              >
                Weeks — most builds go live
              </div>
              <div style={{ height: "1px", background: "rgba(240,235,225,0.10)" }} />
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider label="01 / Process" />

      {/* ── How It Works: rule-and-stop timeline ── */}
      <section
        className="relative overflow-hidden px-4 md:px-8"
        style={{
          background: "#0D0D0B",
          paddingTop: "var(--section-pad, clamp(80px, 10vw, 144px))",
          paddingBottom: "var(--section-pad, clamp(80px, 10vw, 144px))",
        }}
      >
        <GhostNumeral n="01" />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={containerVariants}
            className="mb-14 md:mb-20 max-w-[700px]"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow label="How It Works" />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "var(--fs-display-lg, clamp(32px, 3.6vw, 64px))",
                lineHeight: 1.1,
                color: "#F0EBE1",
              }}
            >
              Four steps. <span style={{ fontStyle: "italic", color: "#C0522B" }}>No busywork left.</span>
            </motion.h2>
          </motion.div>

          <ProcessTimeline />
        </div>
      </section>

      <SectionDivider label="02 / Engagements" />

      {/* ── The 3 Offers: split-scroll engagement ladder ── */}
      <section
        id="offers"
        className="relative overflow-hidden px-4 md:px-8"
        style={{
          background: "#0D0D0B",
          paddingTop: "var(--section-pad, clamp(80px, 10vw, 144px))",
          paddingBottom: "var(--section-pad, clamp(80px, 10vw, 144px))",
        }}
      >
        <GhostNumeral n="02" />
        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Sticky left rail */}
          <div className="lg:col-span-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={containerVariants}
              className="lg:sticky"
              style={{ top: "96px" }}
            >
              <motion.div variants={itemVariants}>
                <Eyebrow label="Ways To Work Together" />
              </motion.div>
              <motion.h2
                variants={itemVariants}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "var(--fs-display-lg, clamp(32px, 3.6vw, 64px))",
                  lineHeight: 1.1,
                  color: "#F0EBE1",
                  marginBottom: "20px",
                }}
              >
                Pick where you <span style={{ fontStyle: "italic", color: "#C0522B" }}>start.</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))",
                  lineHeight: 1.75,
                  color: "rgba(212,204,184,0.6)",
                  maxWidth: "38ch",
                  marginBottom: "32px",
                }}
              >
                Start with the Audit — every dollar applies toward a Done-For-You build.
              </motion.p>
              <motion.div variants={itemVariants}>
                <MagneticButton
                  href="/book"
                  className="group relative bg-rust text-cream overflow-hidden"
                  style={{
                    padding: "16px 34px",
                    borderRadius: "9999px",
                    boxShadow: "0 0 40px rgba(192,82,43,0.25)",
                  } as React.CSSProperties}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 600,
                      fontSize: "14px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    Book a Call
                  </span>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>

          {/* Stacked offers with the rust connector ladder */}
          <div className="lg:col-span-8 relative lg:pl-9">
            {/* The audit-credits-toward-build ladder: one thin rust line threads the three */}
            <motion.div
              aria-hidden="true"
              className="hidden lg:block"
              style={{
                position: "absolute",
                left: "4px",
                top: "36px",
                bottom: "36px",
                width: "1px",
                background: "rgba(192,82,43,0.3)",
                transformOrigin: "center top",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE }}
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={containerVariants}
              className="flex flex-col gap-6"
            >
              {offers.map((offer) => (
                <div key={offer.num} className="relative">
                  <span
                    aria-hidden="true"
                    className="hidden lg:block"
                    style={{
                      position: "absolute",
                      left: "-36px",
                      top: "32px",
                      width: "9px",
                      height: "9px",
                      background: "#C0522B",
                    }}
                  />
                  <OfferCard offer={offer} onProof={openCase} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider label="03 / Industries" />

      {/* ── Industries: ruled index table ── */}
      <section
        className="relative overflow-hidden px-4 md:px-8"
        style={{
          background: "#0D0D0B",
          paddingTop: "var(--section-pad, clamp(80px, 10vw, 144px))",
          paddingBottom: "var(--section-pad, clamp(80px, 10vw, 144px))",
        }}
      >
        <GhostNumeral n="03" />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={containerVariants}
            className="mb-10 md:mb-14 max-w-[700px]"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow label="Industries We Build For" />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(28px, 3.2vw, 46px)",
                lineHeight: 1.15,
                color: "#F0EBE1",
              }}
            >
              Built for <span style={{ fontStyle: "italic", color: "#C0522B" }}>any operator.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16"
            style={{ borderTop: "1px solid rgba(240,235,225,0.10)" }}
          >
            {industries.map((industry) => (
              <IndustryRow key={industry.num} industry={industry} />
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider label="04 / Proof" />

      {/* ── Recent Builds: full-bleed lift strip, shared case studies ── */}
      <section
        id="builds"
        className="relative overflow-hidden px-4 md:px-8"
        style={{
          background: "#12110E",
          borderBottom: "1px solid rgba(240,235,225,0.10)",
          paddingTop: "calc(var(--section-pad, clamp(80px, 10vw, 144px)) * 0.7)",
          paddingBottom: "calc(var(--section-pad, clamp(80px, 10vw, 144px)) * 0.7)",
        }}
      >
        <GhostNumeral n="04" />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={containerVariants}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12"
          >
            <div>
              <motion.div variants={itemVariants}>
                <Eyebrow label="Recent Builds" />
              </motion.div>
              <motion.h2
                variants={itemVariants}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(28px, 3.2vw, 46px)",
                  lineHeight: 1.15,
                  color: "#F0EBE1",
                  maxWidth: "600px",
                }}
              >
                Proof, not <span style={{ fontStyle: "italic", color: "#C0522B" }}>promises.</span>
              </motion.h2>
            </div>
            <motion.a
              variants={itemVariants}
              href="/work"
              className="link-underline focus-ring"
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C0522B",
                textDecoration: "none",
                paddingBottom: "2px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              See the full case studies →
            </motion.a>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {buildIds.map((id, i) => (
              <motion.div key={String(id)} variants={itemVariants}>
                <AgentCard id={id} onOpen={openCase} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider label="05 / Questions" />

      {/* ── FAQ: ruled rows ── */}
      <section
        className="relative overflow-hidden px-4 md:px-8"
        style={{
          background: "#0D0D0B",
          paddingTop: "var(--section-pad, clamp(80px, 10vw, 144px))",
          paddingBottom: "var(--section-pad, clamp(80px, 10vw, 144px))",
        }}
      >
        <GhostNumeral n="05" />
        <div className="relative z-10 max-w-[860px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={containerVariants}
            className="mb-10 md:mb-12"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow label="Frequently Asked" />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(28px, 3.2vw, 46px)",
                lineHeight: 1.15,
                color: "#F0EBE1",
              }}
            >
              Questions <span style={{ fontStyle: "italic", color: "#C0522B" }}>worth asking.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={containerVariants}
            style={{ borderTop: "1px solid rgba(240,235,225,0.10)" }}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA band ── */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden" style={{ background: "#0D0D0B" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2"
          style={{
            width: "60vw",
            height: "40vw",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse at center, rgba(192,82,43,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))",
              lineHeight: 1.05,
              color: "#F0EBE1",
              marginBottom: "32px",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to put <span style={{ fontStyle: "italic", color: "#C0522B" }}>AI to work?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <MagneticButton
              href="/book"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{
                padding: "19px 42px",
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
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Book a Call
              </span>
            </MagneticButton>

            <p
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(212,204,184,0.45)",
                marginTop: "24px",
              }}
            >
              The Audit is a flat $1,500, credited toward a build.
            </p>

            <a
              href="https://skool.com/solnest-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring"
              style={{
                display: "inline-block",
                marginTop: "18px",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "14px",
                color: "rgba(212,204,184,0.55)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(240,235,225,0.14)",
                paddingBottom: "2px",
              }}
            >
              Not ready yet? Join the community →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Shared case-study modal (same dossier as homepage and /work) */}
      <AnimatePresence>
        {activeCase && <CaseStudyModal id={activeCase} onClose={closeCase} />}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
