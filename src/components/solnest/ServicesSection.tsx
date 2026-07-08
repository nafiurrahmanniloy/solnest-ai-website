"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import OrbitingSkills from "@/components/ui/orbiting-skills";

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

function IndustryCard({ industry }: { industry: (typeof industries)[0] }) {
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
        overflow: "hidden",
        background: hovered ? "#111110" : "#0F0F0D",
        border: `1px solid ${hovered ? "rgba(192,82,43,0.4)" : "rgba(192,82,43,0.12)"}`,
        padding: "26px 24px 22px",
        transition: "background 0.3s ease, border-color 0.3s ease, transform 0.35s cubic-bezier(0.215,0.61,0.355,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "56px",
          lineHeight: 1,
          color: hovered ? "rgba(192,82,43,0.5)" : "rgba(192,82,43,0.25)",
          letterSpacing: "-0.03em",
          marginBottom: "14px",
          transition: "color 0.3s ease",
        }}
      >
        {industry.num}
      </div>
      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(19px, 1.6vw, 24px)",
          color: "#F0EBE1",
          marginBottom: "8px",
          letterSpacing: "-0.01em",
        }}
      >
        {industry.name}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: 1.65,
          color: "rgba(212,204,184,0.5)",
        }}
      >
        {industry.description}
      </p>
    </motion.div>
  );
}

// ─── Animated Price Counter ──────────────────────────────────────────────────

function AnimatedPrice({ target, suffix = "", style }: { target: number; suffix?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, target, suffix]);

  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums", ...style }}>{display}</span>;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] } },
};

// ─── Recent Builds: Case Study Data ──────────────────────────────────────────

const caseStudies = {
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
  },
  legacyrnr: {
    title: "LegacyRnR Control Center",
    badge: "AI Operations Platform",
    headline: "Nineteen AI agents for one property-management operation, under a single cockpit.",
    what: "A unified command center for LegacyRnR that runs 19 specialist AI agents on top of Guesty: guest, owner, and operations agents grouped into orbits, with a dual-approval gate on anything touching money or compliance, an immutable activity log, and three external portals.",
    why: "A growing property-management operation had 19 distinct jobs to automate and no safe way to run AI against live guest and reservation data. The cockpit runs every agent with real logic and human approval gates.",
    results: [
      { stat: "19", label: "AI agents, one cockpit" },
      { stat: "Guesty", label: "wired live (listings + reservations)" },
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
  },
};

type CaseStudyKey = keyof typeof caseStudies;

// ─── Recent Builds: Case Study Modal ─────────────────────────────────────────

function CaseStudyModal({ id, onClose }: { id: CaseStudyKey; onClose: () => void }) {
  const cs = caseStudies[id];
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
              {cs.before.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0, marginTop: "5px" }}
                  >
                    <path d="M3 3L11 11M11 3L3 11" stroke="rgba(200,80,60,0.6)" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.6, color: "rgba(200,180,165,0.5)" }}>{item}</span>
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
              {cs.after.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0, marginTop: "5px" }}
                  >
                    <path d="M2.5 7.5L5.8 10.5L11.5 4" stroke={cs.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.6, color: "rgba(212,204,184,0.7)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it was built: process steps */}
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
            href="/book"
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
            Book This For Me →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Recent Builds: Agent Card ───────────────────────────────────────────────

function AgentCard({ id, onOpen }: { id: CaseStudyKey; onOpen: (id: CaseStudyKey) => void }) {
  const [hovered, setHovered] = useState(false);
  const cs = caseStudies[id];
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
        border: `1px solid rgba(${cs.colorRgb},0.12)`,
        overflow: "hidden",
        width: "100%", height: "100%",
        transition: "background 0.2s ease, box-shadow 0.2s ease, outline 0.15s ease, border-color 0.2s ease",
        boxShadow: hovered ? `inset 0 0 40px rgba(${cs.colorRgb},0.06)` : "none",
        position: "relative",
        display: "flex", flexDirection: "column",
        minHeight: "300px",
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
      {/* Header */}
      <div style={{ padding: "18px 26px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cs.color, boxShadow: `0 0 8px rgba(${cs.colorRgb},0.8)` }} />
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.85)` }}>{cs.badge}</span>
        </div>
        <span style={{ fontFamily: "var(--font-condensed)", fontSize: "14px", color: cs.color, opacity: hovered ? 1 : 0.25, transition: "opacity 0.2s ease" }}>→</span>
      </div>

      {/* Body */}
      <div style={{ padding: "26px 28px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(38px, 3.2vw, 60px)", lineHeight: 1, letterSpacing: "-0.04em", color: cs.color, textShadow: `0 0 30px rgba(${cs.colorRgb},0.4)`, marginBottom: "6px" }}>
            {mainResult.stat}
          </div>
          <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.7)`, marginBottom: "18px" }}>
            {mainResult.label}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(19px, 1.5vw, 24px)", lineHeight: 1.2, color: "#F0EBE1", letterSpacing: "-0.01em", marginBottom: "10px" }}>
            {cs.title}
          </h3>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14px", lineHeight: 1.6, color: "rgba(212,204,184,0.5)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
            {cs.headline}
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "20px" }}>
          {cs.stack.slice(0, 3).map((tool) => (
            <span key={tool} style={{ fontFamily: "var(--font-condensed)", fontWeight: 500, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.65)`, border: `1px solid rgba(${cs.colorRgb},0.2)`, background: `rgba(${cs.colorRgb},0.05)`, padding: "4px 10px" }}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {hovered && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 26px", background: `linear-gradient(to top, rgba(${cs.colorRgb},0.12), transparent)`, display: "flex", justifyContent: "flex-end", pointerEvents: "none" }}>
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: cs.color }}>View Case Study →</span>
        </div>
      )}
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
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {ids.map((id) => (
          <motion.div key={id} variants={itemVariants}>
            <AgentCard id={id} onOpen={onOpen} />
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

  const stepSize = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + 16 : track.clientWidth;
  };

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const step = slide ? slide.offsetWidth + 16 : track.clientWidth;
    const idx = step ? Math.round(track.scrollLeft / step) : 0;
    setActive(Math.max(0, Math.min(ids.length - 1, idx)));
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, [ids.length]);

  useEffect(() => {
    update();
    const onResize = () => update();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [update]);

  const nudge = (dir: number) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: dir * stepSize(), behavior: "smooth" });
  };
  const goTo = (i: number) => {
    const track = trackRef.current;
    if (track) track.scrollTo({ left: i * stepSize(), behavior: "smooth" });
  };

  const arrowBase: React.CSSProperties = {
    width: "46px", height: "46px", borderRadius: "9999px",
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "1px solid rgba(192,82,43,0.35)", background: "rgba(13,13,11,0.6)",
    transition: "transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",
    flexShrink: 0,
  };
  const arrow = (disabled: boolean): React.CSSProperties => ({
    ...arrowBase,
    color: disabled ? "rgba(212,204,184,0.3)" : "#C0522B",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  });
  const arrowEnter = (e: React.MouseEvent<HTMLButtonElement>, disabled: boolean) => {
    if (disabled) return;
    e.currentTarget.style.transform = "scale(1.08)";
    e.currentTarget.style.background = "rgba(192,82,43,0.12)";
  };
  const arrowLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.background = "rgba(13,13,11,0.6)";
  };

  return (
    <div>
      <style>{`.rb-track::-webkit-scrollbar{display:none}`}</style>
      <motion.div
        ref={trackRef}
        onScroll={update}
        className="rb-track"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        style={{
          display: "flex", gap: "16px", overflowX: "auto",
          scrollSnapType: "x mandatory", scrollbarWidth: "none",
          paddingBottom: "6px", WebkitOverflowScrolling: "touch",
        }}
      >
        {ids.map((id) => (
          <motion.div
            key={id}
            data-slide
            variants={itemVariants}
            style={{ flex: "0 0 clamp(280px, 31%, 440px)", scrollSnapAlign: "start" }}
          >
            <AgentCard id={id} onOpen={onOpen} />
          </motion.div>
        ))}
      </motion.div>

      {/* Controls: prev / dots / next */}
      <div className="flex items-center justify-center gap-4 mt-7">
        <button
          type="button" aria-label="Previous builds" onClick={() => nudge(-1)} disabled={atStart}
          style={arrow(atStart)}
          onMouseEnter={(e) => arrowEnter(e, atStart)} onMouseLeave={arrowLeave}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        <div className="flex items-center gap-2">
          {ids.map((id, i) => (
            <button
              key={id} type="button" aria-label={`Go to build ${i + 1}`} onClick={() => goTo(i)}
              style={{
                height: "6px", width: active === i ? "28px" : "6px",
                borderRadius: "9999px", border: "none", padding: 0,
                background: active === i ? "#C0522B" : "rgba(240,235,225,0.22)",
                boxShadow: active === i ? "0 0 12px rgba(192,82,43,0.5)" : "none",
                cursor: "pointer", transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          type="button" aria-label="Next builds" onClick={() => nudge(1)} disabled={atEnd}
          style={arrow(atEnd)}
          onMouseEnter={(e) => arrowEnter(e, atEnd)} onMouseLeave={arrowLeave}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
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
        transition: "background 0.3s ease, border-color 0.3s ease, transform 0.35s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
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
          transition: "opacity 0.3s ease",
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
          transition: "background 0.4s ease",
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
          transition: "color 0.5s ease",
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
              transition: "color 0.25s ease",
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
            fontSize: "clamp(29px, 2.9vw, 50px)",
            lineHeight: 1.1,
            color: "#F0EBE1",
            marginBottom: "16px",
            letterSpacing: "-0.01em",
            fontStyle: "italic",
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
            transition: "background 0.3s ease",
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
            transition: "color 0.25s ease",
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
              color: "rgba(212,204,184,0.35)",
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
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "16px",
                  color: hovered ? "#C0522B" : "rgba(192,82,43,0.6)",
                  marginTop: "8px",
                  transition: "color 0.25s ease",
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
                  transition: "color 0.25s ease",
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
                transition: "color 0.25s ease",
                fontStyle: "italic",
              }}>
                Custom
              </span>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: hovered ? "rgba(192,82,43,0.5)" : "rgba(212,204,184,0.35)",
                marginTop: "3px",
                transition: "color 0.25s ease",
              }}
            >
              {service.priceNote}
            </motion.div>
          </div>

          <a
            href={service.href}
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: hovered ? "0.2em" : "0.14em",
              textTransform: "uppercase",
              color: "#C0522B",
              textDecoration: "none",
              transition: "letter-spacing 0.3s ease, opacity 0.2s ease",
              opacity: hovered ? 1 : 0.7,
              paddingBottom: "2px",
              borderBottom: "1px solid rgba(192,82,43,0.4)",
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
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ background: "#0D0D0B" }}
    >
      {/* Ambient glow top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 z-0"
        style={{
          width: "60vw", height: "60vw",
          background: "radial-gradient(ellipse at top right, rgba(192,82,43,0.07) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      {/* Ambient glow bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0"
        style={{
          width: "40vw", height: "40vw",
          background: "radial-gradient(ellipse at bottom left, rgba(192,82,43,0.04) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center mb-12 md:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-7">
              <div style={{ width: "38px", height: "1px", backgroundColor: "#C0522B" }} />
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
                fontSize: "clamp(38px, 5vw, 90px)",
                lineHeight: 1.06, color: "#F0EBE1", maxWidth: "960px",
              }}
            >
              Done talking about AI.{" "}
              <span style={{ fontStyle: "italic", color: "#C0522B" }}>Time to actually use it.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "18px",
                lineHeight: 1.85, color: "rgba(212,204,184,0.6)",
                maxWidth: "720px", marginTop: "18px",
              }}
            >
              Most operators spend months stuck in the "I should automate this" phase. Ryan skips that entirely: he builds the solution, puts it in your business, and moves on.
            </motion.p>
          </motion.div>

          {/* Orbiting AI Tools */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="hidden lg:flex items-center justify-center -ml-32"
          >
            <OrbitingSkills />
          </motion.div>
        </div>

        {/* Industries We Build For */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="mb-16 md:mb-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
            <div style={{ width: "28px", height: "1px", backgroundColor: "#C0522B" }} />
            <span style={{
              fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px",
              letterSpacing: "0.26em", textTransform: "uppercase", color: "#C0522B",
            }}>
              Industries We Build For
            </span>
          </motion.div>

          <motion.p variants={itemVariants} style={{
            fontFamily: "var(--font-body)", fontWeight: 300,
            fontSize: "clamp(16px, 1.15vw, 19px)", lineHeight: 1.7,
            color: "rgba(212,204,184,0.6)", maxWidth: "620px", marginBottom: "32px",
          }}>
            Short-term rentals are where we started. The same AI systems, agents, revenue
            intelligence, messaging, and automation, run just as well for any operation.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry) => (
              <IndustryCard key={industry.num} industry={industry} />
            ))}
          </div>
        </motion.div>

        {/* Recent Builds */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="flex items-center gap-4 mb-6"
          >
            <div style={{ width: "28px", height: "1px", backgroundColor: "#C0522B" }} />
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
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] }}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "clamp(28px, 3.2vw, 52px)",
              lineHeight: 1.12, color: "#F0EBE1", marginBottom: "12px",
              maxWidth: "760px",
            }}
          >
            Built for{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>any business.</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1.0] }}
            style={{
              fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "16px",
              lineHeight: 1.8, color: "rgba(212,204,184,0.55)",
              maxWidth: "600px", marginBottom: "36px",
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
          viewport={{ once: true, margin: "-60px" }}
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
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
