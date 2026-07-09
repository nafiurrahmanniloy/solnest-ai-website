"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import OrbitingSkills from "@/components/ui/orbiting-skills";

// House ease, shared by all motion in this file.
const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const EASE_CSS = "cubic-bezier(0.215,0.61,0.355,1)";

const services = [
  {
    num: "01",
    name: "AI Business Audit",
    price: "1,500",
    priceNum: 1500,
    priceNote: "flat rate",
    description:
      "In one session, Ryan maps every hour you're wasting on tasks AI can own. You leave with a prioritized roadmap: not theory, not guesswork. Just the exact moves that will get your time back fastest.",
    creditNote: "Every dollar applies toward a Done-For-You build.",
    href: "/book",
    linkLabel: "Book a Call",
    badge: "Best starting point",
  },
  {
    num: "02",
    name: "Done-For-You AI Build",
    price: "5,000+",
    priceNum: 5000,
    priceNote: "per project",
    description:
      "You stop doing it. Ryan's team builds it into your business: agents, automations, workflows, all running without you. You focus on growth. The machine handles the rest.",
    creditNote: null,
    href: "/book",
    linkLabel: "Book a Call",
    badge: "Most popular",
  },
  {
    num: "03",
    name: "Ongoing Advisory",
    price: "Custom",
    priceNum: 0,
    priceNote: "tailored to your business",
    description:
      "Ryan in your corner every month. Real-time strategy, implementation calls, and direct access when problems come up. Tailored to your business, because no two operations are the same.",
    creditNote: null,
    href: "/book",
    linkLabel: "Book a Call",
    badge: "Limited spots",
  },
];

// ─── Industries We Build For ─────────────────────────────────────────────────

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
    name: "Medical Offices",
    description: "Patient calls, scheduling, and reminders handled by AI.",
  },
  {
    num: "05",
    name: "Construction",
    description: "Bid follow-ups, scheduling, and job-site updates automated.",
  },
  {
    num: "06",
    name: "Coaches & Consultants",
    description: "Client acquisition and inquiry handling on autopilot.",
  },
  {
    num: "07",
    name: "E-commerce",
    description: "Support, order questions, and win-back flows handled by AI.",
  },
  {
    num: "08",
    name: "Local Service Businesses",
    description: "Missed-call capture, quotes, and scheduling on autopilot.",
  },
];

// Whispering-tail treatment: a ruled index row, not a box. Hairline rules ARE
// the design for secondary content — rust condensed index, name, one-liner.
function IndustryRow({ industry }: { industry: (typeof industries)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "38px minmax(0,1fr) auto",
        alignItems: "baseline",
        gap: "14px",
        padding: "18px 2px",
        borderBottom: "1px solid rgba(240,235,225,0.10)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "12px",
          letterSpacing: "0.2em",
          fontVariantNumeric: "tabular-nums",
          color: hovered ? "#C0522B" : "rgba(192,82,43,0.55)",
          transition: `color 0.25s ${EASE_CSS}`,
        }}
      >
        {industry.num}
      </span>
      <div style={{ minWidth: 0 }}>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(18px, 1.4vw, 23px)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            color: hovered ? "#F0EBE1" : "rgba(240,235,225,0.78)",
            transition: `color 0.25s ${EASE_CSS}`,
            marginBottom: "4px",
          }}
        >
          {industry.name}
        </h4>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "13.5px",
            lineHeight: 1.6,
            color: "rgba(212,204,184,0.5)",
          }}
        >
          {industry.description}
        </p>
      </div>
      <span
        aria-hidden="true"
        style={{
          color: "#C0522B",
          fontSize: "14px",
          opacity: hovered ? 1 : 0.3,
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: `opacity 0.25s ${EASE_CSS} 40ms, transform 0.25s ${EASE_CSS} 40ms`,
        }}
      >
        →
      </span>
    </motion.div>
  );
}

// ─── Animated Price Counter ──────────────────────────────────────────────────

function AnimatedPrice({ target, suffix = "", style }: { target: number; suffix?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" });
  const [display, setDisplay] = useState("0");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(target.toLocaleString() + suffix);
      return;
    }
    const duration = 1400;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(eased * target);
      setDisplay(val.toLocaleString());
      if (current >= steps) {
        clearInterval(timer);
        setDisplay(target.toLocaleString() + suffix);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target, suffix, reducedMotion]);

  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums", ...style }}>{display}</span>;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] } },
};

// ─── Case Sigil: one parameterized artwork recipe for every build ────────────
// The site-wide substitute for screenshots. Composes 2–3 primitives from a
// fixed motif vocabulary keyed to what each build does. Strokes only (fills
// ≤8% alpha), at most one slow breathing/rotating element, killed under
// reduced motion. Hover = strokes brighten + scale(1.05), 80ms beat delay.

export type SigilMotif = "orbit" | "nodes" | "arcs" | "bars" | "panels";

function sigilNodeLayout(count: number) {
  const pts: { x: number; y: number }[] = [{ x: 120, y: 120 }];
  const rest = Math.max(0, count - 1);
  const inner = Math.min(6, rest);
  for (let i = 0; i < inner; i++) {
    const a = (i / inner) * Math.PI * 2 - Math.PI / 2;
    pts.push({ x: 120 + Math.cos(a) * 54, y: 120 + Math.sin(a) * 54 });
  }
  const outer = rest - inner;
  for (let i = 0; i < outer; i++) {
    const a = (i / outer) * Math.PI * 2 - Math.PI / 2 + Math.PI / outer;
    pts.push({ x: 120 + Math.cos(a) * 94, y: 120 + Math.sin(a) * 94 });
  }
  return { pts, inner };
}

export function CaseSigil({
  motif,
  accent,
  accentRgb,
  count,
  size = "100%",
  active = false,
}: {
  motif: SigilMotif;
  accent: string;
  accentRgb: string;
  count?: number;
  size?: number | string;
  active?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const line = (alpha: number) => `rgba(${accentRgb},${alpha})`;
  const spin = reducedMotion ? "none" : "cs-sigil-rotate 34s linear infinite";
  const breathe = reducedMotion ? "none" : "cs-sigil-breathe 24s linear infinite";

  let art: React.ReactNode = null;
  if (motif === "orbit") {
    art = (
      <>
        <circle cx="120" cy="120" r="50" fill="none" stroke={line(0.55)} strokeWidth="1" />
        <circle cx="120" cy="120" r="14" fill={line(0.06)} stroke={accent} strokeOpacity="0.9" strokeWidth="1.5" />
        <g className="cs-sigil-anim" style={{ transformOrigin: "120px 120px", animation: spin }}>
          <circle cx="120" cy="120" r="86" fill="none" stroke={line(0.7)} strokeWidth="1.25" strokeDasharray="2.5 7" />
          <circle cx="206" cy="120" r="4" fill={line(0.08)} stroke={accent} strokeOpacity="0.9" strokeWidth="1.5" />
        </g>
      </>
    );
  } else if (motif === "nodes") {
    const { pts, inner } = sigilNodeLayout(count ?? 5);
    art = (
      <>
        {pts.slice(1, 1 + inner).map((p, i) => (
          <line key={`e${i}`} x1={120} y1={120} x2={p.x} y2={p.y} stroke={line(0.5)} strokeWidth="1" />
        ))}
        {pts.slice(1 + inner).map((p, j) => {
          const t = pts[1 + (j % inner)];
          return <line key={`o${j}`} x1={t.x} y1={t.y} x2={p.x} y2={p.y} stroke={line(0.5)} strokeWidth="1" />;
        })}
        {pts.map((p, i) => (
          <circle
            key={`n${i}`}
            cx={p.x}
            cy={p.y}
            r={i === 0 ? 6 : 3.2}
            fill={line(0.06)}
            stroke={i === 0 ? accent : line(0.65)}
            strokeOpacity={i === 0 ? 0.9 : 1}
            strokeWidth={i === 0 ? 1.5 : 1}
            className={i === 0 ? "cs-sigil-anim" : undefined}
            style={i === 0 ? { animation: breathe } : undefined}
          />
        ))}
      </>
    );
  } else if (motif === "arcs") {
    const radii = [30, 58, 86, 114];
    art = (
      <>
        <circle cx="74" cy="168" r="5" fill={line(0.06)} stroke={accent} strokeOpacity="0.9" strokeWidth="1.5" />
        {radii.map((r, i) => (
          <path
            key={r}
            d={`M 74 ${168 - r} A ${r} ${r} 0 0 1 ${74 + r} 168`}
            fill="none"
            stroke={line(0.85 - i * 0.12)}
            strokeWidth={i === 0 ? 1.5 : 1.25}
            strokeLinecap="round"
            className={i === radii.length - 1 ? "cs-sigil-anim" : undefined}
            style={i === radii.length - 1 ? { animation: breathe } : undefined}
          />
        ))}
      </>
    );
  } else if (motif === "bars") {
    const heights = [38, 62, 50, 90, 118];
    art = (
      <>
        <line x1="50" y1="178" x2="192" y2="178" stroke={line(0.5)} strokeWidth="1" />
        {heights.map((h, i) => (
          <rect
            key={i}
            x={56 + i * 26}
            y={178 - h}
            width="16"
            height={h}
            fill={line(0.05)}
            stroke={i === heights.length - 1 ? accent : line(0.65)}
            strokeOpacity={i === heights.length - 1 ? 0.9 : 1}
            strokeWidth={i === heights.length - 1 ? 1.5 : 1}
          />
        ))}
        <circle cx={168} cy={48} r="3.5" fill={line(0.08)} stroke={accent} strokeOpacity="0.9" strokeWidth="1.25" className="cs-sigil-anim" style={{ animation: breathe }} />
      </>
    );
  } else {
    art = (
      <>
        <rect x="50" y="88" width="116" height="82" fill={line(0.04)} stroke={line(0.5)} strokeWidth="1" />
        <rect x="68" y="70" width="116" height="82" fill={line(0.05)} stroke={line(0.65)} strokeWidth="1" />
        <g className="cs-sigil-anim" style={{ animation: breathe }}>
          <rect x="86" y="52" width="116" height="82" fill={line(0.06)} stroke={accent} strokeOpacity="0.85" strokeWidth="1.5" />
          <line x1="98" y1="68" x2="146" y2="68" stroke={line(0.8)} strokeWidth="1.25" />
          <line x1="98" y1="82" x2="176" y2="82" stroke={line(0.45)} strokeWidth="1" />
          <line x1="98" y1="94" x2="162" y2="94" stroke={line(0.45)} strokeWidth="1" />
        </g>
      </>
    );
  }

  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      style={{
        display: "block",
        transform: active ? "scale(1.05)" : "scale(1)",
        opacity: active ? 1 : 0.75,
        transition: `transform 0.3s ${EASE_CSS} 80ms, opacity 0.3s ${EASE_CSS} 80ms`,
      }}
    >
      <style>{`
        @keyframes cs-sigil-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes cs-sigil-breathe { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .cs-sigil-anim { animation: none !important; } }
      `}</style>
      {art}
    </svg>
  );
}

// ─── Stat numeral: display-typography treatment for every metric ─────────────
// Numeral in cream at display scale, tabular-nums; unit/prefix slightly
// smaller in the project accent. Integer stats count up via AnimatedPrice.

function StatNumeral({
  stat,
  accentRgb,
  size = "var(--fs-display-sm, clamp(19px, 1.6vw, 26px))",
}: {
  stat: string;
  accentRgb: string;
  size?: string;
}) {
  const numeralStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: size,
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: "#F0EBE1",
    fontVariantNumeric: "tabular-nums",
  };
  const unitStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 300,
    fontSize: "0.62em",
    lineHeight: 1,
    color: `rgba(${accentRgb},0.9)`,
  };
  const m = /^(\D*?)(\d{1,4})(\D*)$/.exec(stat);
  if (!m) {
    return <span style={numeralStyle}>{stat}</span>;
  }
  const [, pre, num, suf] = m;
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", fontSize: size }}>
      {pre ? <span style={unitStyle}>{pre}</span> : null}
      <AnimatedPrice target={parseInt(num, 10)} style={{ ...numeralStyle, fontSize: "1em" }} />
      {suf ? <span style={unitStyle}>{suf}</span> : null}
    </span>
  );
}

// ─── Recent Builds: Case Study Data ──────────────────────────────────────────

export type CaseStudyResult = { stat: string; label: string };
export type CaseStudyProcessStep = { step: string; title: string; desc: string };
export type CaseStudy = {
  title: string;
  badge: string;
  headline: string;
  what: string;
  why: string;
  results: CaseStudyResult[];
  before: string[];
  after: string[];
  process: CaseStudyProcessStep[];
  stack: string[];
  color: string;
  colorRgb: string;
  motif: SigilMotif;
  sigilCount?: number;
};

const caseStudiesData = {
  strsecrets: {
    title: "STR Secrets",
    badge: "Multi-Tenant STR SaaS",
    headline: "Five AI agents per operator, one multi-tenant dashboard, running every night.",
    what: "A multi-tenant SaaS where each short-term-rental operator connects their PMS and tools, then five specialist AI agents (Revenue, Guest, Operations, Analytics, Marketing) analyze pricing, messaging, turnovers, and market data, coordinated by an orchestrator, streamed live, and swept nightly.",
    why: "Operators were stitching together spreadsheets, PMS exports, and guesswork. STR Secrets puts a full AI operations team behind one login, isolated and secure per workspace.",
    results: [
      { stat: "5", label: "AI agents per operator" },
      { stat: "Nightly", label: "automated sweep + live stream" },
      { stat: "Isolated", label: "per-tenant, RLS-enforced" },
      { stat: "Live", label: "in production, CI/CD" },
    ],
    before: [
      "Pricing, messaging, and ops run by hand",
      "Data scattered across PMS and spreadsheets",
      "No isolation or security for client data",
      "Insights that are always a day behind",
    ],
    after: [
      "Five specialist agents run the operation",
      "One dashboard connects PMS, pricing, and market data",
      "Per-tenant encrypted credentials, RLS isolation",
      "Nightly automation plus live run streaming",
    ],
    process: [
      { step: "01", title: "Built a strict multi-tenant backend", desc: "Express and Supabase Postgres with row-level security, a 5-layer architecture, and AES-256-GCM per-tenant credentials." },
      { step: "02", title: "Coordinated five agents with an orchestrator", desc: "Revenue, Guest, Operations, Analytics, and Marketing agents run on schedule and stream every run live over Socket.io." },
      { step: "03", title: "Shipped as a real product", desc: "React 19 dashboard, Stripe billing, and CI/CD that auto-deploys on merge to main." },
    ],
    stack: ["React 19", "Node 22", "Express", "Supabase", "Socket.io", "Stripe", "OpenRouter", "n8n"],
    color: "#C0522B",
    colorRgb: "192,82,43",
    motif: "nodes",
    sigilCount: 5,
  },
  legacyrnr: {
    title: "LegacyRnR Control Center",
    badge: "AI Operations Platform",
    headline: "Nineteen AI agents for one property-management operation, under a single cockpit.",
    what: "A unified command center for LegacyRnR that runs 19 specialist AI agents on top of Guesty: guest, owner, and operations agents grouped into orbits, with a dual-approval gate on anything touching money or compliance, an immutable activity log, and three external portals.",
    why: "A growing property-management operation had 19 distinct jobs to automate and no safe way to run AI against live guest and reservation data. The cockpit runs every agent with real logic and human approval gates.",
    results: [
      { stat: "19", label: "AI agents, one cockpit" },
      { stat: "Guesty", label: "wired in live" },
      { stat: "Dual", label: "approval on money + compliance" },
      { stat: "3", label: "guest, owner, education portals" },
    ],
    before: [
      "19 manual jobs across a property operation",
      "No safe way to run AI on live guest data",
      "No audit trail for automated actions",
      "Owners and guests on disconnected tools",
    ],
    after: [
      "All 19 agents run under one command center",
      "Guesty wired live for real listings and reservations",
      "Dual-approval queue: nothing auto-applies on money",
      "Immutable activity log and three external portals",
    ],
    process: [
      { step: "01", title: "Turned specs into 19 real agents", desc: "Built from the client's agent build list into a typed agent runtime with training briefs and real run logic, no mock data." },
      { step: "02", title: "Wired Guesty live behind a snapshot adapter", desc: "A cached snapshot maps live listings and reservations into every agent, with writes gated behind approval." },
      { step: "03", title: "Gated every sensitive action", desc: "A dual-approval queue and append-only activity log so money and compliance actions are human-approved, never auto-applied." },
    ],
    stack: ["Next.js 14", "TypeScript", "Supabase", "Inngest", "Claude", "Guesty"],
    color: "#C9A84C",
    colorRgb: "201,168,76",
    motif: "nodes",
    sigilCount: 19,
  },
  westproperties: {
    title: "West Properties Ops Platform",
    badge: "STR Management Automation",
    headline: "Eight AI agents running the busywork of a 27-property management company.",
    what: "A single-client operations platform for West Properties: eight specialist agents covering guest messaging, review intelligence, partner statements, revenue sheets, an AI revenue manager on top of PriceLabs, daily booking reports, a Slack-to-Monday bridge, and a content engine, wired into Guesty for Pros, per-partner QuickBooks, and Google Sheets.",
    why: "A management company with revenue-share partners was losing its team to reporting, messaging, and copy-paste work between tools. The platform runs those jobs automatically, with a human approval loop in Slack before anything reaches a partner or guest.",
    results: [
      { stat: "8", label: "AI agents, one platform" },
      { stat: "27", label: "properties under management" },
      { stat: "502", label: "tests behind the platform" },
      { stat: "Slack", label: "approval loop before anything sends" },
    ],
    before: [
      "Partner statements assembled by hand every month",
      "Guest messages and reviews handled one by one",
      "Pricing managed ad hoc across 27 properties",
      "Team copy-pasting between Slack, Monday, and Sheets",
    ],
    after: [
      "Statements generated and routed for approval automatically",
      "Guest messaging and review intelligence run as agents",
      "Daily and weekly AI pricing scans on top of PriceLabs",
      "Slack and Monday bridged, reports delivered daily",
    ],
    process: [
      { step: "01", title: "Built a strict layered backend", desc: "Adapters, controllers, services, and repositories with per-partner QuickBooks OAuth and Supabase Vault for secrets." },
      { step: "02", title: "Shipped agents behind approval loops", desc: "Each agent runs in shadow mode first; statements and pricing pushes require named-human approval in Slack before anything sends." },
      { step: "03", title: "Automated the calendar", desc: "n8n crons drive daily 30-day and weekly 90-day pricing scans, booking reports, and statement cycles." },
    ],
    stack: ["Node", "Express", "Supabase", "Guesty", "PriceLabs", "QuickBooks", "Slack", "n8n"],
    color: "#7FA8C9",
    colorRgb: "127,168,201",
    motif: "bars",
    sigilCount: 8,
  },
  somos: {
    title: "Stay With Somos Platform",
    badge: "STR Operations Platform",
    headline: "Seven AI agents and one dashboard for a mixed arbitrage-and-management portfolio.",
    what: "A full operations platform for Stay With Somos: seven specialist AI agents (guest messaging, revenue intelligence, analytics, operations, marketing, market comping, and lead response) plus an accounting engine posting across two QuickBooks companies, all behind a seven-page dashboard, with owner statements that correctly handle a portfolio mixing rental arbitrage and managed properties.",
    why: "Operators running both arbitrage units and managed properties get statements wrong with off-the-shelf tools: flat rent lines for one model, commission and expenses for the other. This platform models both per property, per owner.",
    results: [
      { stat: "7", label: "AI agents behind one dashboard" },
      { stat: "2", label: "QuickBooks companies, one view" },
      { stat: "Mixed", label: "arbitrage + managed statements" },
      { stat: "7", label: "dashboard pages, live data" },
    ],
    before: [
      "Two QuickBooks companies reconciled by hand",
      "Owner statements broke on mixed business models",
      "Guest messaging and pricing run manually",
      "Leads followed up whenever someone had time",
    ],
    after: [
      "Accounting agent posts across both ledgers",
      "Per-property statements: flat rent or commission, correctly",
      "Seven agents run the day-to-day operation",
      "Lead agent responds and follows up automatically",
    ],
    process: [
      { step: "01", title: "Integrated the full stack", desc: "Guesty, dual-realm QuickBooks, PriceLabs, GoHighLevel, Stripe, and Turno wired in behind one backend." },
      { step: "02", title: "Modeled the mixed portfolio", desc: "Per-property business-model rules so arbitrage units bill flat monthly rent while managed units carry commission and expenses." },
      { step: "03", title: "Ran shadow mode before cutover", desc: "Every agent message and posting visible for review before the system went live with real guests and real money." },
    ],
    stack: ["Node", "Python", "Supabase", "Guesty", "QuickBooks", "PriceLabs", "GoHighLevel", "Stripe"],
    color: "#5CBFA8",
    colorRgb: "92,191,168",
    motif: "panels",
    sigilCount: 7,
  },
  automationstack: {
    title: "Solnest Automation Stack",
    badge: "STR Revenue Automation",
    headline: "Revenue intelligence, pricing reports, and market scraping, on autopilot.",
    what: "The automation stack powering Solnest Stays: a multi-agent revenue engine, a PriceLabs agent that scrapes rates weekly and emails AI pricing reports, plus Airbnb and Instagram scrapers that feed Claude analysis, all wired through n8n.",
    why: "Revenue management and market research for short-term rentals is hours of manual scraping and spreadsheet work every week. This stack runs it automatically and delivers decisions, not raw data.",
    results: [
      { stat: "164", label: "tests behind the revenue engine" },
      { stat: "12", label: "pricing decision modules" },
      { stat: "Weekly", label: "AI pricing reports, emailed" },
      { stat: "Claude", label: "analysis on scraped market data" },
    ],
    before: [
      "Hours of manual PriceLabs and market research weekly",
      "Pricing decisions made on gut feel",
      "Competitor and review data pulled by hand",
      "No repeatable revenue process",
    ],
    after: [
      "A battle-tested revenue engine makes the calls",
      "PriceLabs scraped weekly, AI reports emailed automatically",
      "Airbnb and Instagram data pulled via Apify, analyzed by Claude",
      "One repeatable, automated revenue workflow",
    ],
    process: [
      { step: "01", title: "Built a tested revenue engine", desc: "A Python pricing engine of 12 modules backed by 164 tests turns market data into pricing decisions." },
      { step: "02", title: "Automated the weekly pricing report", desc: "A Node agent scrapes PriceLabs, generates an AI pricing report, and emails it, no manual pull required." },
      { step: "03", title: "Fed the agents live market data", desc: "Apify scrapers pull Airbnb listings, reviews, and Instagram profiles into Claude for analysis." },
    ],
    stack: ["Claude", "Python", "Node.js", "PriceLabs", "Apify", "n8n"],
    color: "#6E8BC0",
    colorRgb: "110,139,192",
    motif: "bars",
  },
  medspa: {
    title: "Patient Concierge Agent",
    badge: "MedSpa Automation",
    headline: "87% booking rate from inbound leads. Fully hands-free.",
    what: "An AI concierge that handles appointment scheduling, treatment consultations, pre-care instructions, and post-treatment follow-ups for a luxury MedSpa - across SMS, email, and web chat simultaneously.",
    why: "The front desk was losing 40% of leads to voicemail during peak hours. The concierge agent now captures every inquiry within seconds and books them directly into the calendar.",
    results: [
      { stat: "87%", label: "Lead-to-booking rate" },
      { stat: "2.4x", label: "More bookings/mo" },
      { stat: "0", label: "Missed inquiries" },
      { stat: "$18K", label: "Monthly revenue added" },
    ],
    before: [
      "40% of leads going to voicemail during peak hours",
      "2-person front desk overwhelmed by phone + walk-ins",
      "Follow-ups falling through the cracks",
      "$18K+ in potential revenue lost monthly",
    ],
    after: [
      "Every inquiry captured in under 3 seconds",
      "87% of leads converted to booked appointments",
      "Automated pre-care and post-treatment follow-ups",
      "Front desk focuses on in-person experience only",
    ],
    process: [
      { step: "01", title: "Audited the lead funnel", desc: "Tracked where inquiries came from and where they dropped off - voicemail was the #1 killer." },
      { step: "02", title: "Built multi-channel concierge", desc: "SMS, email, and web chat all handled by one AI agent with full treatment knowledge." },
      { step: "03", title: "Connected to Cal.com", desc: "Appointments booked directly into the clinic's calendar - no human handoff needed." },
    ],
    stack: ["Claude AI", "Twilio", "Cal.com", "n8n", "Airtable"],
    color: "#B07BA5",
    colorRgb: "176,123,165",
    motif: "orbit",
  },
  medspafinance: {
    title: "MedSpa Financial Automation",
    badge: "MedSpa Finance AI",
    headline: "The monthly financial close of a med spa, fully automated with an AI CFO.",
    what: "A financial automation system that replaces days of fractional-CFO work every month: bots collect data from the booking, membership, and payment systems, journal entries post to QuickBooks automatically, an 18-KPI engine feeds a nine-page dashboard, and Claude writes plain-English CFO commentary delivered as a monthly report. Now running for two clinics.",
    why: "Clinic owners were losing 3-4 days a month to manual bookkeeping across Jane, RepeatMD, and Stripe - and still had no clear picture of the numbers. The close now runs itself, with a human approving before anything posts.",
    results: [
      { stat: "18", label: "KPIs computed monthly" },
      { stat: "6", label: "journal entries auto-posted to QuickBooks" },
      { stat: "9", label: "dashboard pages, live financials" },
      { stat: "2", label: "clinics running in production" },
    ],
    before: [
      "3-4 days of manual close work every month",
      "Data scattered across Jane, RepeatMD, and Stripe",
      "Hundreds of SKUs reconciled by hand",
      "Numbers arrived too late to act on",
    ],
    after: [
      "Automated collection, matching, and posting",
      "18 KPIs and a 9-page dashboard, always current",
      "AI CFO commentary explains the month in plain English",
      "Human-in-the-loop approval before anything posts",
    ],
    process: [
      { step: "01", title: "Automated the data collection", desc: "A Playwright bot pulls Jane reports; RepeatMD and Stripe flow in through APIs, all landing in Supabase via n8n." },
      { step: "02", title: "Built the accounting agents", desc: "Expense review, GL validation, deposit matching, and vendor-bill agents - each with confidence scoring and human approval before QuickBooks posting." },
      { step: "03", title: "Shipped the AI CFO layer", desc: "An 18-KPI engine feeds a React dashboard and a Claude-written monthly commentary, delivered as a PDF report." },
    ],
    stack: ["n8n", "Supabase", "QuickBooks", "Stripe", "Playwright", "Claude", "React", "GoHighLevel"],
    color: "#D48FB8",
    colorRgb: "212,143,184",
    motif: "arcs",
    sigilCount: 6,
  },
  restaurant: {
    title: "Voice Ordering Agent",
    badge: "Restaurant AI",
    headline: "Handles 120+ calls per day. Never puts anyone on hold.",
    what: "A voice AI agent that takes phone orders for a high-volume restaurant - understanding menu customizations, dietary restrictions, upselling combos, and processing payments. Speaks naturally with under 400ms latency.",
    why: "The restaurant was losing $3,200/week in abandoned phone orders during the dinner rush. Staff couldn't answer fast enough. The voice agent now handles the entire queue.",
    results: [
      { stat: "120+", label: "Daily calls handled" },
      { stat: "94%", label: "Order accuracy" },
      { stat: "$3.2K", label: "Weekly revenue recovered" },
      { stat: "0.4s", label: "Voice latency" },
    ],
    before: [
      "$3,200/week lost to abandoned phone orders",
      "Customers on hold 4+ minutes during dinner rush",
      "Staff pulled from kitchen to answer phones",
      "Order errors from rushed, distracted staff",
    ],
    after: [
      "120+ calls handled daily with zero hold time",
      "94% order accuracy - better than human staff",
      "$3,200/week in revenue recovered immediately",
      "Kitchen staff stays in the kitchen",
    ],
    process: [
      { step: "01", title: "Mapped the full menu + edge cases", desc: "Every item, modifier, combo, allergy note, and upsell - programmed into the voice agent." },
      { step: "02", title: "Built natural voice flow via Vapi", desc: "Under 400ms response latency. Customers don't realize they're ordering from AI." },
      { step: "03", title: "Integrated with Square POS", desc: "Orders go straight into the kitchen queue. Payment processed on the call." },
    ],
    stack: ["Vapi", "Claude AI", "Square POS", "n8n", "Twilio"],
    color: "#D4863A",
    colorRgb: "212,134,58",
    motif: "arcs",
  },
  dental: {
    title: "Patient Voice Agent",
    badge: "Dental Clinic AI",
    headline: "Zero missed patient calls. 24/7 scheduling that sounds human.",
    what: "A conversational voice AI that answers every call to a dental clinic - scheduling appointments, handling insurance pre-qualification questions, sending appointment reminders, and managing cancellations and rebookings automatically.",
    why: "The clinic's two-person front desk was overwhelmed, resulting in 35% of calls going to voicemail. Most of those patients never called back. The voice agent eliminated that entirely.",
    results: [
      { stat: "0%", label: "Missed calls" },
      { stat: "62%", label: "Fewer no-shows" },
      { stat: "28", label: "Hours saved/week" },
      { stat: "4.9★", label: "Patient satisfaction" },
    ],
    before: [
      "35% of patient calls going to voicemail",
      "Most voicemail patients never called back",
      "High no-show rate with no automated reminders",
      "28 hours/week spent on phone scheduling alone",
    ],
    after: [
      "0% missed calls - every patient gets answered",
      "62% reduction in no-shows via smart reminders",
      "28 hours/week freed up for patient care",
      "4.9★ patient satisfaction rating maintained",
    ],
    process: [
      { step: "01", title: "Analyzed call patterns", desc: "Mapped peak call times, common questions, and where the front desk bottlenecked." },
      { step: "02", title: "Built voice agent with Vapi", desc: "Natural conversation flow for scheduling, insurance questions, and reminders." },
      { step: "03", title: "Connected to Dentrix", desc: "Direct integration with the clinic's practice management software - real-time availability." },
    ],
    stack: ["Vapi", "Claude AI", "Dentrix API", "n8n", "Twilio"],
    color: "#5BA4A4",
    colorRgb: "91,164,164",
    motif: "arcs",
  },
  realestate: {
    title: "Lead Gen Agent",
    badge: "Real Estate AI",
    headline: "Every lead answered in under 60 seconds. Around the clock.",
    what: "An AI lead-response agent for a real estate team that engages every inbound lead instantly over SMS and email - qualifying budget, timeline, and area, scoring the lead, booking showings into the agent's calendar, and running the full follow-up sequence until the lead answers or opts out.",
    why: "The average agent takes over 15 hours to respond to a new lead, and 78% of buyers end up working with whoever answers first. Responding inside 5 minutes makes a lead 21x more likely to qualify - so the agent responds in seconds, every time, including nights and weekends.",
    results: [
      { stat: "<60s", label: "Response time, 24/7" },
      { stat: "21x", label: "Higher qualification odds vs. 30-min response" },
      { stat: "5+", label: "Follow-up touches, automated" },
      { stat: "0", label: "Leads left cold" },
    ],
    before: [
      "First response measured in hours, not seconds",
      "Leads arriving nights and weekends went cold",
      "Follow-up stopped after one or two attempts",
      "No qualification - every lead treated the same",
    ],
    after: [
      "Every lead engaged in under a minute, day or night",
      "Budget, timeline, and area qualified automatically",
      "Scored leads pushed to the CRM, showings booked",
      "Persistent follow-up until answer or opt-out",
    ],
    process: [
      { step: "01", title: "Wired every lead source into one intake", desc: "Zillow, portal, and website leads all flow into a single pipeline - nothing depends on an agent seeing an email." },
      { step: "02", title: "Built instant qualification over SMS", desc: "The agent opens a natural conversation, qualifies budget, timeline, and area, and scores the lead in real time." },
      { step: "03", title: "Automated booking and follow-up", desc: "Qualified leads book straight into the calendar via GoHighLevel; everyone else enters a persistent multi-touch sequence." },
    ],
    stack: ["Claude AI", "GoHighLevel", "Twilio", "n8n"],
    color: "#8CAF6E",
    colorRgb: "140,175,110",
    motif: "orbit",
  },
} satisfies Record<string, CaseStudy>;

export type CaseStudyKey = keyof typeof caseStudiesData;

// Widened view: literal keys, uniform CaseStudy values (so optional fields
// like `sigilCount` are visible on every entry for consumers).
export const caseStudies: Record<CaseStudyKey, CaseStudy> = caseStudiesData;

// ─── Recent Builds: Case Study Dossier Modal ─────────────────────────────────
// Asymmetric two-column dossier: narrative left (Problem / Build / diptych /
// process rail), sticky fact rail right (stats, stack pills, CTA). Rail-first
// single column on mobile. Reduced motion = opacity-only collapse.

export function CaseStudyModal({ id, onClose }: { id: CaseStudyKey; onClose: () => void }) {
  const cs: CaseStudy = caseStudies[id];
  const reducedMotion = useReducedMotion();
  const indexNum = String((Object.keys(caseStudies) as CaseStudyKey[]).indexOf(id) + 1).padStart(2, "0");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = `services-case-modal-title-${id}`;

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

  const hairline = "1px solid rgba(240,235,225,0.10)";

  // Internal stagger: 70ms steps, capped at 0.4s total. Opacity-only under
  // reduced motion.
  const rise = (i: number) => ({
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay: Math.min(0.12 + i * 0.07, 0.4), ease: EASE },
  });

  const eyebrowRow = (label: string, mb = "16px") => (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: mb }}>
      <div style={{ width: "34px", height: "1px", backgroundColor: cs.color }} />
      <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", color: cs.color }}>{label}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.22, ease: EASE } }}
      transition={{ duration: 0.25, ease: EASE }}
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(13,13,11,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(12px, 3vw, 28px)",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={
          reducedMotion
            ? { opacity: 0, transition: { duration: 0.22, ease: EASE } }
            : { opacity: 0, y: 16, transition: { duration: 0.22, ease: EASE } }
        }
        transition={{ duration: 0.55, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          width: "min(1040px, 100%)",
          maxHeight: "90vh",
          background: "#0D0D0B",
          border: `1px solid rgba(${cs.colorRgb},0.18)`,
          borderRadius: "2px",
          overflowY: "auto",
          overscrollBehavior: "contain",
          position: "relative",
          touchAction: "pan-y",
        }}
      >

        {/* Header: badge eyebrow, title, headline, sigil artwork, ghost numeral */}
        <div style={{ position: "relative", overflow: "hidden", padding: "clamp(24px, 4.5vw, 40px) clamp(20px, 5vw, 44px) clamp(22px, 3.5vw, 32px)", borderBottom: hairline }}>
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 70% 20%, rgba(${cs.colorRgb},0.08), transparent 60%)`, pointerEvents: "none" }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute", bottom: "-24px", right: "-6px",
              fontFamily: "var(--font-condensed)", fontWeight: 600,
              fontSize: "clamp(80px, 10vw, 200px)", lineHeight: 0.8, letterSpacing: "-0.03em",
              color: "rgba(240,235,225,0.05)", pointerEvents: "none", userSelect: "none",
            }}
          >
            {indexNum}
          </div>

          <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "clamp(16px, 3vw, 36px)" }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              {eyebrowRow(cs.badge, "18px")}
              <motion.h2
                id={titleId}
                {...rise(0)}
                style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "var(--fs-display-md, clamp(26px, 2.6vw, 44px))", color: "#F0EBE1", lineHeight: 1.12, letterSpacing: "-0.02em", textWrap: "balance" }}
              >
                {cs.title}
              </motion.h2>
              <motion.p
                {...rise(1)}
                style={{
                  fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(17px, 2vw, 22px)", lineHeight: 1.5,
                  color: cs.color, marginTop: "14px", opacity: 0.85, maxWidth: "56ch",
                }}
              >
                {cs.headline}
              </motion.p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px", flexShrink: 0 }}>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close case study"
                style={{
                  background: "rgba(240,235,225,0.04)", border: "1px solid rgba(240,235,225,0.1)",
                  width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0, color: "rgba(212,204,184,0.5)", fontSize: "20px",
                  fontFamily: "var(--font-body)", borderRadius: "2px", transition: `background 0.25s ${EASE_CSS}, color 0.25s ${EASE_CSS}`,
                }}
                className="focus-ring"
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,235,225,0.08)"; e.currentTarget.style.color = "rgba(212,204,184,0.8)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,235,225,0.04)"; e.currentTarget.style.color = "rgba(212,204,184,0.5)"; }}
              >
                <span aria-hidden="true">×</span>
              </button>
              <motion.div {...rise(1)} className="hidden sm:block" style={{ width: "clamp(96px, 11vw, 140px)" }}>
                <CaseSigil motif={cs.motif} accent={cs.color} accentRgb={cs.colorRgb} count={cs.sigilCount} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Dossier body: narrative left (7), sticky fact rail right (4). Rail first on mobile. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">

          {/* Narrative column */}
          <div className="order-2 lg:order-1" style={{ padding: "clamp(24px, 4vw, 40px) clamp(20px, 5vw, 44px) clamp(28px, 4vw, 44px)" }}>
            <motion.div {...rise(2)}>
              {eyebrowRow("The Problem")}
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))", lineHeight: 1.75, color: "rgba(212,204,184,0.7)", maxWidth: "64ch" }}>
                {cs.why}
              </p>
            </motion.div>

            <motion.div {...rise(3)} style={{ marginTop: "36px" }}>
              {eyebrowRow("The Build")}
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))", lineHeight: 1.75, color: "rgba(212,204,184,0.7)", maxWidth: "64ch" }}>
                {cs.what}
              </p>
            </motion.div>

            {/* Before / After tonal diptych: BEFORE dim, AFTER lit on a faint accent panel */}
            <motion.div {...rise(4)} className="grid grid-cols-1 sm:grid-cols-2" style={{ marginTop: "40px", borderTop: hairline }}>
              <div
                className="border-b border-[rgba(240,235,225,0.10)] sm:border-b-0 sm:border-r sm:border-[rgba(240,235,225,0.10)]"
                style={{ padding: "22px clamp(16px, 2vw, 26px) 22px 0" }}
              >
                <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,204,184,0.45)", display: "block", marginBottom: "14px" }}>Before</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {cs.before.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                      <span aria-hidden="true" style={{ color: "rgba(212,204,184,0.35)", fontSize: "12px", flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13.5px", lineHeight: 1.6, color: "rgba(212,204,184,0.6)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: "22px clamp(16px, 2vw, 26px)", background: `rgba(${cs.colorRgb},0.04)` }}>
                <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: cs.color, display: "block", marginBottom: "14px" }}>After</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {cs.after.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                      <span aria-hidden="true" style={{ color: cs.color, fontSize: "12px", flexShrink: 0 }}>→</span>
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13.5px", lineHeight: 1.6, color: "rgba(240,235,225,0.9)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Process: one hairline spine, rust square stops, ghost step numerals */}
            <div style={{ marginTop: "44px" }}>
              <motion.div {...rise(5)}>{eyebrowRow("How It Was Built", "22px")}</motion.div>
              <div style={{ position: "relative", paddingLeft: "26px" }}>
                <motion.div
                  aria-hidden="true"
                  initial={reducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                  style={{ position: "absolute", left: "3px", top: "6px", bottom: "6px", width: "1px", background: "rgba(240,235,225,0.10)", transformOrigin: "top" }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
                  {cs.process.map((p, i) => (
                    <motion.div key={p.step} {...rise(5 + i)} style={{ position: "relative" }}>
                      <div aria-hidden="true" style={{ position: "absolute", left: "-26px", top: "6px", width: "7px", height: "7px", background: "#C0522B" }} />
                      <div style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                        <span
                          aria-hidden="true"
                          style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "26px", lineHeight: 1, letterSpacing: "-0.02em", color: "rgba(240,235,225,0.14)", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}
                        >
                          {p.step}
                        </span>
                        <div>
                          <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "15px", color: "#F0EBE1", lineHeight: 1.3, marginBottom: "4px" }}>{p.title}</h4>
                          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.65, color: "rgba(212,204,184,0.55)" }}>{p.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fact rail: sticky inside the modal scroll container */}
          <div
            className="order-1 lg:order-2 border-b border-[rgba(240,235,225,0.10)] lg:border-b-0 lg:border-l lg:border-[rgba(240,235,225,0.10)] lg:sticky lg:top-0 lg:self-start"
            style={{ padding: "clamp(22px, 3.5vw, 30px) clamp(20px, 4vw, 34px)" }}
          >
            <div>
              {cs.results.map((r, i) => (
                <motion.div
                  key={r.label}
                  {...rise(1 + i)}
                  style={{ padding: i === 0 ? "0 0 16px" : "16px 0", borderTop: i === 0 ? "none" : hairline }}
                >
                  <StatNumeral
                    stat={r.stat}
                    accentRgb={cs.colorRgb}
                    size={i === 0 ? "var(--fs-display-md, clamp(26px, 2.6vw, 44px))" : "var(--fs-display-sm, clamp(19px, 1.6vw, 26px))"}
                  />
                  <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,204,184,0.5)", marginTop: "8px", lineHeight: 1.45 }}>{r.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div {...rise(5)} style={{ borderTop: hairline, paddingTop: "18px" }}>
              <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(212,204,184,0.5)", display: "block", marginBottom: "12px" }}>Stack</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {cs.stack.map((tool) => (
                  <span
                    key={tool}
                    style={{
                      fontFamily: "var(--font-condensed)", fontWeight: 500,
                      fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "rgba(212,204,184,0.75)",
                      border: "1px solid rgba(240,235,225,0.14)",
                      borderRadius: "9999px",
                      padding: "5px 14px",
                      transition: `border-color 0.25s ${EASE_CSS}`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(${cs.colorRgb},0.4)`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(240,235,225,0.14)"; }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.a
              {...rise(6)}
              href="/book"
              className="focus-ring"
              style={{
                marginTop: "24px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                fontFamily: "var(--font-condensed)", fontWeight: 600,
                fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase",
                color: cs.color, textDecoration: "none",
                padding: "14px 20px",
                border: `1px solid rgba(${cs.colorRgb},0.3)`,
                background: `rgba(${cs.colorRgb},0.06)`,
                borderRadius: "2px",
                transition: `background 0.25s ${EASE_CSS}, border-color 0.25s ${EASE_CSS}`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${cs.colorRgb},0.12)`; e.currentTarget.style.borderColor = `rgba(${cs.colorRgb},0.45)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${cs.colorRgb},0.06)`; e.currentTarget.style.borderColor = `rgba(${cs.colorRgb},0.3)`; }}
            >
              Book This For Me →
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Recent Builds: Agent Card ───────────────────────────────────────────────
// Dossier tile: sigil artwork up top, ghost index numeral behind, mini
// hairline-divided stat rail, clean footer row. 3-beat hover choreography
// (lift → wash/numeral → arrow/sigil) at 0/40/80ms, gated behind hover:hover.

export function AgentCard({
  id,
  onOpen,
  index = 0,
  featured = false,
}: {
  id: CaseStudyKey;
  onOpen: (id: CaseStudyKey) => void;
  index?: number;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const cs: CaseStudy = caseStudies[id];
  const railStats = featured ? cs.results : cs.results.slice(0, 3);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      role="button"
      tabIndex={0}
      className="rb-agent-card"
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
        background: hovered ? "#12110E" : "#0F0F0D",
        border: `1px solid rgba(${cs.colorRgb},${hovered ? 0.24 : 0.12})`,
        borderRadius: "2px",
        overflow: "hidden",
        width: "100%", height: "100%",
        position: "relative",
        display: "flex", flexDirection: "column",
        minHeight: featured ? "400px" : "360px",
      }}
    >
      {/* Self-contained hover grammar so the exported card works on any page */}
      <style>{`
        .rb-agent-card { transition: background 0.25s ${EASE_CSS}, border-color 0.25s ${EASE_CSS}; }
        .rb-agent-card:focus-visible { outline: 2px solid #C9A84C; outline-offset: 3px; }
        @media (hover: hover) and (pointer: fine) {
          .rb-agent-card { transition: transform 0.3s ${EASE_CSS}, background 0.25s ${EASE_CSS}, border-color 0.25s ${EASE_CSS}; }
          .rb-agent-card:hover { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rb-agent-card:hover { transform: none; }
        }
      `}</style>

      {/* Ghost index numeral: beat 2 (40ms) — tint toward accent, 10px drift */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: "26px", left: "8px", zIndex: 0,
          fontFamily: "var(--font-condensed)", fontWeight: 600,
          fontSize: "clamp(80px, 10vw, 200px)", lineHeight: 0.8, letterSpacing: "-0.03em",
          color: hovered ? `rgba(${cs.colorRgb},0.10)` : "rgba(240,235,225,0.05)",
          transform: hovered ? "translateX(10px)" : "translateX(0)",
          transition: `color 0.3s ${EASE_CSS} 40ms, transform 0.3s ${EASE_CSS} 40ms`,
          pointerEvents: "none", userSelect: "none",
        }}
      >
        {num}
      </div>

      {/* Accent wash: beat 2 (40ms) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse at 70% 20%, rgba(${cs.colorRgb},0.08), transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: `opacity 0.3s ${EASE_CSS} 40ms`,
          pointerEvents: "none",
        }}
      />

      {/* Header row: badge + small index numeral */}
      <div style={{ position: "relative", zIndex: 1, padding: "18px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: cs.color, flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.85)`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cs.badge}</span>
        </div>
        <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.18em", fontVariantNumeric: "tabular-nums", color: hovered ? cs.color : "rgba(240,235,225,0.35)", transition: `color 0.25s ${EASE_CSS} 40ms`, flexShrink: 0 }}>{num}</span>
      </div>

      {/* Sigil band: the site-wide substitute for screenshots */}
      <div style={{ position: "relative", zIndex: 1, height: featured ? "150px" : "118px", display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "8px 24px 0" }}>
        <div style={{ width: featured ? "132px" : "102px" }}>
          <CaseSigil motif={cs.motif} accent={cs.color} accentRgb={cs.colorRgb} count={cs.sigilCount} active={hovered} />
        </div>
      </div>

      {/* Title + headline */}
      <div style={{ position: "relative", zIndex: 1, padding: "8px 24px 0" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: featured ? "var(--fs-display-md, clamp(26px, 2.6vw, 44px))" : "var(--fs-display-sm, clamp(19px, 1.6vw, 26px))", lineHeight: 1.15, color: "#F0EBE1", letterSpacing: "-0.01em", marginBottom: "8px", textWrap: "balance" }}>
          {cs.title}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14px", lineHeight: 1.6, color: "rgba(212,204,184,0.55)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
          {cs.headline}
        </p>
      </div>

      {/* Featured tier: one-line before → after */}
      {featured && (
        <div style={{ position: "relative", zIndex: 1, padding: "16px 24px 0", display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.5, color: "rgba(212,204,184,0.55)" }}>{cs.before[0]}</span>
          <span aria-hidden="true" style={{ color: cs.color, fontSize: "13px", flexShrink: 0 }}>→</span>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.5, color: "rgba(240,235,225,0.9)" }}>{cs.after[0]}</span>
        </div>
      )}

      {/* Stat rail: hairline-divided, tabular numerals in cream, unit in accent */}
      <div style={{ position: "relative", zIndex: 1, marginTop: "auto", padding: "18px 24px 16px", display: "flex" }}>
        {railStats.map((r, i) => (
          <div key={r.label} style={{ flex: 1, minWidth: 0, paddingLeft: i ? "14px" : 0, paddingRight: "10px", borderLeft: i ? "1px solid rgba(240,235,225,0.10)" : "none" }}>
            <StatNumeral
              stat={r.stat}
              accentRgb={cs.colorRgb}
              size={featured && i === 0 ? "clamp(28px, 2.4vw, 40px)" : "var(--fs-display-sm, clamp(19px, 1.6vw, 26px))"}
            />
            {/* Fixed 2-line label box so the numeral row aligns across sibling cards */}
            <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,204,184,0.5)", marginTop: "7px", lineHeight: 1.4, height: "28px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{r.label}</div>
          </div>
        ))}
      </div>

      {/* Footer row: beat 3 (80ms) — label brightens, arrow slides */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(240,235,225,0.10)", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: hovered ? "#F0EBE1" : "rgba(212,204,184,0.55)", transition: `color 0.25s ${EASE_CSS} 80ms` }}>View Case Study</span>
        <span aria-hidden="true" style={{ color: cs.color, fontSize: "14px", transform: hovered ? "translateX(5px)" : "translateX(0)", opacity: hovered ? 1 : 0.5, transition: `transform 0.25s ${EASE_CSS} 80ms, opacity 0.25s ${EASE_CSS} 80ms` }}>→</span>
      </div>
    </div>
  );
}

// ─── Recent Builds showcase: static grid for <=3, horizontal slider for 4+ ───
// Driven by the caseStudies data, so adding a new build auto-appears and, once
// there are 4+, the section becomes a compact snap-scrolling carousel.
function RecentBuildsShowcase({ ids, onOpen }: { ids: CaseStudyKey[]; onOpen: (id: CaseStudyKey) => void }) {
  if (ids.length <= 3) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {ids.map((id, i) => (
          <motion.div key={id} variants={itemVariants}>
            <AgentCard id={id} onOpen={onOpen} index={i} />
          </motion.div>
        ))}
      </motion.div>
    );
  }
  return <RecentBuildsCarousel ids={ids} onOpen={onOpen} />;
}

function RecentBuildsCarousel({ ids, onOpen }: { ids: CaseStudyKey[]; onOpen: (id: CaseStudyKey) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  const getSlides = () => {
    const track = trackRef.current;
    return track ? Array.from(track.querySelectorAll<HTMLElement>("[data-slide]")) : [];
  };

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"));
    if (slides.length === 0) return;
    // Slides have mixed widths (featured first slide), so find the nearest
    // slide origin instead of dividing by a fixed step.
    const base = slides[0].offsetLeft;
    let idx = 0;
    let best = Infinity;
    slides.forEach((el, i) => {
      const d = Math.abs(el.offsetLeft - base - track.scrollLeft);
      if (d < best) { best = d; idx = i; }
    });
    setActive(Math.max(0, Math.min(ids.length - 1, idx)));
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 1);
  }, [ids.length]);

  useEffect(() => {
    update();
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [update]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slides = getSlides();
    if (!track || slides.length === 0) return;
    const clamped = Math.max(0, Math.min(ids.length - 1, i));
    track.scrollTo({ left: slides[clamped].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
  };
  const nudge = (dir: number) => goTo(active + dir);

  // Hairline arrows: smaller, quieter than the old filled pills.
  const arrow = (disabled: boolean): React.CSSProperties => ({
    width: "36px", height: "36px", borderRadius: "9999px",
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "1px solid rgba(240,235,225,0.14)", background: "transparent",
    color: disabled ? "rgba(212,204,184,0.25)" : "rgba(212,204,184,0.7)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: `border-color 0.25s ${EASE_CSS}, color 0.25s ${EASE_CSS}`,
    flexShrink: 0,
  });
  const arrowEnter = (e: React.MouseEvent<HTMLButtonElement>, disabled: boolean) => {
    if (disabled) return;
    e.currentTarget.style.borderColor = "rgba(192,82,43,0.45)";
    e.currentTarget.style.color = "#C0522B";
  };
  const arrowLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = "rgba(240,235,225,0.14)";
    e.currentTarget.style.color = "rgba(212,204,184,0.7)";
  };

  return (
    <div>
      {/* Content-width track: cards clip at the content edge on both sides,
          so the section keeps the same outer gap left and right. */}
      <style>{`
        .rb-track::-webkit-scrollbar { display: none; }
      `}</style>
      <div>
        <motion.div
          ref={trackRef}
          onScroll={update}
          className="rb-track"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          variants={containerVariants}
          style={{
            display: "flex", gap: "16px", overflowX: "auto",
            scrollSnapType: "x mandatory", scrollbarWidth: "none",
            paddingBottom: "6px", WebkitOverflowScrolling: "touch",
          }}
        >
          {ids.map((id, i) => (
            <motion.div
              key={id}
              data-slide
              variants={itemVariants}
              style={{
                flex: i === 0 ? "0 0 min(88vw, clamp(420px, 48%, 640px))" : "0 0 clamp(280px, 31%, 420px)",
                scrollSnapAlign: "start",
              }}
            >
              <AgentCard id={id} onOpen={onOpen} index={i} featured={i === 0} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Editorial index: counter + progress rule + hairline arrows */}
      <div className="flex items-center gap-5 mt-7">
        <span
          aria-live="polite"
          style={{
            fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
            letterSpacing: "0.2em", color: "rgba(240,235,225,0.7)",
            fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
          }}
        >
          {String(active + 1).padStart(2, "0")}
          <span aria-hidden="true" style={{ color: "rgba(212,204,184,0.35)", margin: "0 6px" }}>—</span>
          {String(ids.length).padStart(2, "0")}
        </span>
        <div aria-hidden="true" style={{ flex: 1, height: "1px", background: "rgba(240,235,225,0.10)", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${progress * 100}%`, background: "#C0522B", transition: "width 0.15s linear" }} />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button" aria-label="Previous builds" onClick={() => nudge(-1)} disabled={atStart}
            style={arrow(atStart)}
            onMouseEnter={(e) => arrowEnter(e, atStart)} onMouseLeave={arrowLeave}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            type="button" aria-label="Next builds" onClick={() => nudge(1)} disabled={atEnd}
            style={arrow(atEnd)}
            onMouseEnter={(e) => arrowEnter(e, atEnd)} onMouseLeave={arrowLeave}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: hovered ? "#111110" : "#0F0F0D",
        border: `1px solid ${hovered ? "rgba(192,82,43,0.45)" : "rgba(192,82,43,0.14)"}`,
        padding: "clamp(24px, 4vw, 48px) clamp(20px, 3.5vw, 44px) clamp(24px, 4vw, 44px)",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.25s cubic-bezier(0.215,0.61,0.355,1), border-color 0.25s cubic-bezier(0.215,0.61,0.355,1), transform 0.35s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.35s cubic-bezier(0.215,0.61,0.355,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(192,82,43,0.15)"
          : "0 4px 24px rgba(0,0,0,0.2)",
        cursor: "default",
      }}
    >
      {/* Mouse-tracking glow */}
      <div
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${glow.x}px ${glow.y}px, rgba(192,82,43,0.1), transparent 65%)`,
          transition: "opacity 0.3s cubic-bezier(0.215,0.61,0.355,1)",
          zIndex: 0,
        }}
      />

      {/* Top rust line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: hovered
            ? "linear-gradient(to right, #C0522B, rgba(192,82,43,0.2))"
            : "linear-gradient(to right, rgba(192,82,43,0.25), transparent)",
          transition: "background 0.4s cubic-bezier(0.215,0.61,0.355,1)",
          zIndex: 1,
        }}
      />

      {/* Ghost number watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "8px",
          right: "20px",
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "156px",
          lineHeight: 1,
          color: hovered ? "rgba(192,82,43,0.18)" : "rgba(240,235,225,0.09)",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
          transition: "color 0.5s cubic-bezier(0.215,0.61,0.355,1)",
          zIndex: 0,
        }}
      >
        {service.num}
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>

        {/* Top row: number + badge */}
        <div className="flex items-center justify-between mb-6">
          <span
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.22em",
              color: hovered ? "#C0522B" : "rgba(192,82,43,0.45)",
              transition: "color 0.25s cubic-bezier(0.215,0.61,0.355,1)",
            }}
          >
            {service.num}
          </span>
          {service.badge && (
            <span
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C0522B",
                border: "1px solid rgba(192,82,43,0.4)",
                background: "rgba(192,82,43,0.07)",
                padding: "4px 11px",
              }}
            >
              {service.badge}
            </span>
          )}
        </div>

        {/* Service name */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "var(--fs-display-md, clamp(26px, 2.6vw, 44px))",
            lineHeight: 1.15,
            color: "#F0EBE1",
            marginBottom: "16px",
            letterSpacing: "-0.01em",
            fontStyle: "italic",
            textWrap: "balance",
          }}
        >
          {service.name}
        </h3>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: hovered ? "rgba(192,82,43,0.3)" : "rgba(240,235,225,0.07)",
            marginBottom: "16px",
            transition: "background 0.3s cubic-bezier(0.215,0.61,0.355,1)",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "17px",
            lineHeight: 1.82,
            color: hovered ? "rgba(212,204,184,0.8)" : "rgba(212,204,184,0.55)",
            marginBottom: "8px",
            transition: "color 0.25s cubic-bezier(0.215,0.61,0.355,1)",
            flex: 1,
          }}
        >
          {service.description}
        </p>

        {service.creditNote && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(212,204,184,0.55)",
              fontStyle: "italic",
              marginBottom: "8px",
            }}
          >
            {service.creditNote}
          </p>
        )}

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(192,82,43,0.1)",
          }}
        >
          <div>
            <div className="flex items-start gap-0.5">
              {service.priceNum > 0 && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "16px",
                  color: hovered ? "#C0522B" : "rgba(192,82,43,0.6)",
                  marginTop: "8px",
                  transition: "color 0.25s cubic-bezier(0.215,0.61,0.355,1)",
                }}
              >
                $
              </motion.span>
              )}
              {service.priceNum > 0 ? (
              <AnimatedPrice
                target={service.priceNum}
                suffix={service.price.includes("+") ? "+" : ""}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(38px, 4.2vw, 74px)",
                  lineHeight: 1,
                  color: hovered ? "#F0EBE1" : "rgba(240,235,225,0.85)",
                  letterSpacing: "-0.02em",
                  transition: "color 0.25s cubic-bezier(0.215,0.61,0.355,1)",
                  textShadow: hovered ? "0 0 40px rgba(192,82,43,0.3)" : "none",
                }}
              />
              ) : (
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(32px, 3.5vw, 58px)",
                lineHeight: 1,
                color: hovered ? "#F0EBE1" : "rgba(240,235,225,0.85)",
                letterSpacing: "-0.02em",
                transition: "color 0.25s cubic-bezier(0.215,0.61,0.355,1)",
                fontStyle: "italic",
              }}>
                Custom
              </span>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.215, 0.61, 0.355, 1.0] }}
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: hovered ? "rgba(192,82,43,0.7)" : "rgba(212,204,184,0.55)",
                marginTop: "3px",
                transition: "color 0.25s cubic-bezier(0.215,0.61,0.355,1)",
              }}
            >
              {service.priceNote}
            </motion.div>
          </div>

          <a
            href={service.href}
            className="link-underline focus-ring"
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#C0522B",
              textDecoration: "none",
              transition: "opacity 0.25s cubic-bezier(0.215,0.61,0.355,1)",
              opacity: hovered ? 1 : 0.7,
              paddingBottom: "2px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "-2px", marginRight: "6px" }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {service.linkLabel} →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const [activeCase, setActiveCase] = useState<CaseStudyKey | null>(null);
  const scrollYRef = useRef(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openCase = (id: CaseStudyKey) => {
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
    <section
      id="services"
      className="relative overflow-hidden"
      style={{
        background: "#0D0D0B",
        paddingTop: "var(--section-pad, clamp(80px, 10vw, 144px))",
        paddingBottom: "var(--section-pad, clamp(80px, 10vw, 144px))",
      }}
    >
      {/* Section accent glow: single static layer, rust */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(192,82,43,0.07), transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center mb-12 md:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3.5 mb-7">
              <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
              <span style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "13px",
                letterSpacing: "0.28em", textTransform: "uppercase", color: "#C0522B",
              }}>
                Work With Ryan Directly
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))",
                lineHeight: 1.05, color: "#F0EBE1", maxWidth: "960px",
                textWrap: "balance",
              }}
            >
              Done talking about AI.{" "}
              <span style={{ fontStyle: "italic", color: "#C0522B" }}>Time to actually use it.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 300,
                fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))",
                lineHeight: 1.6, color: "rgba(212,204,184,0.6)",
                maxWidth: "720px", marginTop: "18px",
                textWrap: "pretty",
              }}
            >
              Most operators spend months stuck in the "I should automate this" phase. Ryan skips that entirely: he builds the solution, puts it in your business, and moves on.
            </motion.p>
          </motion.div>

          {/* Orbiting AI Tools */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="hidden lg:flex items-center justify-center -ml-32"
          >
            <OrbitingSkills />
          </motion.div>
        </div>

        {/* Industries We Build For */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          variants={containerVariants}
          className="mb-16 md:mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3.5 mb-4">
            <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
            <span style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
              letterSpacing: "0.26em", textTransform: "uppercase", color: "#C0522B",
            }}>
              Industries We Build For
            </span>
          </motion.div>

          <motion.p variants={itemVariants} style={{
            fontFamily: "var(--font-body)", fontWeight: 300,
            fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))", lineHeight: 1.6,
            color: "rgba(212,204,184,0.6)", maxWidth: "620px", marginBottom: "32px",
            textWrap: "pretty",
          }}>
            Short-term rentals are where we started. The same AI systems, agents, revenue
            intelligence, messaging, and automation, run just as well for any operation.
          </motion.p>

          {/* Ruled index list: hairline rows, no boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16" style={{ borderTop: "1px solid rgba(240,235,225,0.10)" }}>
            {industries.map((industry) => (
              <IndustryRow key={industry.num} industry={industry} />
            ))}
          </div>
        </motion.div>

        {/* Recent Builds */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="flex items-center gap-3.5 mb-6"
          >
            <div style={{ width: "34px", height: "1px", backgroundColor: "#C0522B" }} />
            <span style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
              letterSpacing: "0.26em", textTransform: "uppercase", color: "#C0522B",
            }}>
              Recent Builds
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "var(--fs-display-md, clamp(26px, 2.6vw, 44px))",
              lineHeight: 1.15, color: "#F0EBE1", marginBottom: "12px",
              maxWidth: "760px",
              textWrap: "balance",
            }}
          >
            Built for{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>any business.</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1.0] }}
            style={{
              fontFamily: "var(--font-body)", fontWeight: 300,
              fontSize: "var(--fs-body, clamp(14px, 0.95vw, 16px))",
              lineHeight: 1.6, color: "rgba(212,204,184,0.55)",
              maxWidth: "600px", marginBottom: "36px",
              textWrap: "pretty",
            }}
          >
            Click any card to see the full case study: what it replaced, what it does now, and how it was built.
          </motion.p>

          <RecentBuildsShowcase
            ids={Object.keys(caseStudies) as CaseStudyKey[]}
            onOpen={openCase}
          />
        </div>

        {/* 3 cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16"
        >
          {services.map((s) => (
            <ServiceCard key={s.num} service={s} />
          ))}
        </motion.div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] }}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            paddingTop: "16px",
            borderTop: "1px solid rgba(192,82,43,0.1)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(22px, 2.4vw, 40px)",
              lineHeight: 1.55,
              color: "rgba(212,204,184,0.6)",
            }}
          >
            <span style={{ color: "#C0522B", fontStyle: "normal", marginRight: "10px" }}>-</span>
            "I've never met a business owner who didn't have at least 3 things AI could fix immediately. Most have 10."
          </p>
        </motion.div>
      </div>
    </section>

    <AnimatePresence>
      {activeCase && (
        <CaseStudyModal id={activeCase} onClose={closeCase} />
      )}
    </AnimatePresence>
    </>
  );
}
