"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MobileSolutions } from "@/components/solnest/MobileSolutions";

// ─── Case Study Data ──────────────────────────────────────────────────────────

const caseStudies = {
  messaging: {
    title: "Guest Messaging Agent",
    badge: "STR Automation",
    headline: "0.3-second response time. Zero staff required.",
    what: "A fully autonomous AI agent that handles 100% of guest communication for short-term rental properties — from pre-booking questions to check-out follow-ups. Deployed directly into the host's existing phone number via Twilio.",
    why: "Ryan was managing multiple properties and spending 3+ hours a day answering the same 8 questions. The agent now handles all of it, 24/7, in the host's voice.",
    results: [
      { stat: "100%", label: "Messages handled by AI" },
      { stat: "0.3s", label: "Avg response time" },
      { stat: "3 hrs", label: "Saved per day" },
      { stat: "All", label: "Properties covered" },
    ],
    before: [
      "3+ hours/day replying to the same 8 questions",
      "Guests waiting 2-4 hours for a response",
      "Missed bookings from slow replies at night",
      "Ryan physically tied to his phone 24/7",
    ],
    after: [
      "0 minutes spent on guest messaging",
      "Every message answered in under 0.3 seconds",
      "Late-night inquiries convert while Ryan sleeps",
      "All properties running fully hands-free",
    ],
    process: [
      { step: "01", title: "Mapped every guest touchpoint", desc: "Pre-booking, check-in, mid-stay, check-out — all the messages Ryan was sending manually." },
      { step: "02", title: "Trained AI on Ryan's voice", desc: "Fed 2,000+ past messages so the agent sounds exactly like Ryan — warm, helpful, specific." },
      { step: "03", title: "Deployed via Twilio SMS", desc: "Connected to Ryan's existing phone number. Guests have no idea they're talking to AI." },
    ],
    stack: ["Claude AI", "Twilio SMS", "Make.com", "Airtable"],
    color: "#C0522B",
    colorRgb: "192,82,43",
  },
  medspa: {
    title: "Patient Concierge Agent",
    badge: "MedSpa Automation",
    headline: "87% booking rate from inbound leads. Fully hands-free.",
    what: "An AI concierge that handles appointment scheduling, treatment consultations, pre-care instructions, and post-treatment follow-ups for a luxury MedSpa — across SMS, email, and web chat simultaneously.",
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
      { step: "01", title: "Audited the lead funnel", desc: "Tracked where inquiries came from and where they dropped off — voicemail was the #1 killer." },
      { step: "02", title: "Built multi-channel concierge", desc: "SMS, email, and web chat all handled by one AI agent with full treatment knowledge." },
      { step: "03", title: "Connected to Cal.com", desc: "Appointments booked directly into the clinic's calendar — no human handoff needed." },
    ],
    stack: ["Claude AI", "Twilio", "Cal.com", "n8n", "Airtable"],
    color: "#B07BA5",
    colorRgb: "176,123,165",
  },
  restaurant: {
    title: "Voice Ordering Agent",
    badge: "Restaurant AI",
    headline: "Handles 120+ calls per day. Never puts anyone on hold.",
    what: "A voice AI agent that takes phone orders for a high-volume restaurant — understanding menu customizations, dietary restrictions, upselling combos, and processing payments. Speaks naturally with under 400ms latency.",
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
      "94% order accuracy — better than human staff",
      "$3,200/week in revenue recovered immediately",
      "Kitchen staff stays in the kitchen",
    ],
    process: [
      { step: "01", title: "Mapped the full menu + edge cases", desc: "Every item, modifier, combo, allergy note, and upsell — programmed into the voice agent." },
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
    what: "A conversational voice AI that answers every call to a dental clinic — scheduling appointments, handling insurance pre-qualification questions, sending appointment reminders, and managing cancellations and rebookings automatically.",
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
      "0% missed calls — every patient gets answered",
      "62% reduction in no-shows via smart reminders",
      "28 hours/week freed up for patient care",
      "4.9★ patient satisfaction rating maintained",
    ],
    process: [
      { step: "01", title: "Analyzed call patterns", desc: "Mapped peak call times, common questions, and where the front desk bottlenecked." },
      { step: "02", title: "Built voice agent with Vapi", desc: "Natural conversation flow for scheduling, insurance questions, and reminders." },
      { step: "03", title: "Connected to Dentrix", desc: "Direct integration with the clinic's practice management software — real-time availability." },
    ],
    stack: ["Vapi", "Claude AI", "Dentrix API", "n8n", "Twilio"],
    color: "#5BA4A4",
    colorRgb: "91,164,164",
  },
};

type CaseStudyKey = keyof typeof caseStudies;

// ─── Case Study Modal ─────────────────────────────────────────────────────────

function CaseStudyModal({ id, onClose }: { id: CaseStudyKey; onClose: () => void }) {
  const cs = caseStudies[id];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
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
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 42px)", color: "#F0EBE1", lineHeight: 1.1, letterSpacing: "-0.02em" }}>{cs.title}</h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(240,235,225,0.04)", border: "1px solid rgba(240,235,225,0.1)",
                width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0, color: "rgba(212,204,184,0.5)", fontSize: "18px",
                fontFamily: "var(--font-body)", borderRadius: "2px", transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(240,235,225,0.08)"; e.currentTarget.style.color = "rgba(212,204,184,0.8)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(240,235,225,0.04)"; e.currentTarget.style.color = "rgba(212,204,184,0.5)"; }}
            >
              ×
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
                fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
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
                  <span style={{ color: "rgba(200,80,60,0.45)", fontSize: "14px", lineHeight: "1.6", flexShrink: 0 }}>&#x2717;</span>
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
                  <span style={{ color: cs.color, fontSize: "14px", lineHeight: "1.6", flexShrink: 0 }}>&#x2713;</span>
                  <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.6, color: "rgba(212,204,184,0.7)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it was built — process steps */}
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
            href="mailto:hello@solnestai.com"
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
          >
            Build This For Me →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Agent Card ───────────────────────────────────────────────────────────────

function AgentCard({ id, onOpen }: { id: CaseStudyKey; onOpen: (id: CaseStudyKey) => void }) {
  const [hovered, setHovered] = useState(false);
  const cs = caseStudies[id];
  const mainResult = cs.results[0];

  return (
    <div
      onClick={() => onOpen(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        background: hovered ? "#131311" : "#0F0F0D",
        borderRight: `1px solid rgba(${cs.colorRgb},0.1)`,
        borderBottom: `1px solid rgba(${cs.colorRgb},0.1)`,
        overflow: "hidden",
        width: "100%", height: "100%",
        transition: "background 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? `inset 0 0 40px rgba(${cs.colorRgb},0.06)` : "none",
        position: "relative",
        display: "flex", flexDirection: "column",
        minHeight: "310px",
      }}
    >
      {/* Header */}
      <div style={{ padding: "18px 28px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cs.color, boxShadow: `0 0 8px rgba(${cs.colorRgb},0.8)` }} />
          <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.85)` }}>{cs.badge}</span>
        </div>
        <span style={{ fontFamily: "var(--font-condensed)", fontSize: "14px", color: cs.color, opacity: hovered ? 1 : 0.25, transition: "opacity 0.2s ease" }}>→</span>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 30px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(42px, 3.6vw, 68px)", lineHeight: 1, letterSpacing: "-0.04em", color: cs.color, textShadow: `0 0 30px rgba(${cs.colorRgb},0.4)`, marginBottom: "6px" }}>
            {mainResult.stat}
          </div>
          <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${cs.colorRgb},0.7)`, marginBottom: "20px" }}>
            {mainResult.label}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(20px, 1.7vw, 26px)", lineHeight: 1.2, color: "#F0EBE1", letterSpacing: "-0.01em", marginBottom: "10px" }}>
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

// ─── Section ──────────────────────────────────────────────────────────────────

export function ShowcaseSection() {
  const [activeCase, setActiveCase] = useState<CaseStudyKey | null>(null);

  const scrollYRef = useRef(0);

  useEffect(() => {
    if (activeCase) {
      scrollYRef.current = window.scrollY;
      // Prevent background scroll by fixing body in place
      document.body.style.cssText = `overflow:hidden;position:fixed;top:-${scrollYRef.current}px;left:0;right:0;width:100%`;
    } else {
      // Restore scroll position
      const y = scrollYRef.current;
      document.body.style.cssText = "";
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    }
  }, [activeCase]);

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: "#0D0D0B" }}>

        {/* ── Mobile: stepper carousel ── */}
        <MobileSolutions />

        {/* ── Desktop: full layout ── */}
        <div className="hidden md:block">
        {/* Ambient glows */}
        <div aria-hidden="true" style={{ position: "absolute", top: "5%", right: "5%", width: "50vw", height: "50vw", background: "radial-gradient(ellipse, rgba(192,82,43,0.07) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-16 items-center">

            {/* LEFT: text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(192,82,43,0.1)", border: "1px solid rgba(192,82,43,0.3)", padding: "6px 16px", marginBottom: "28px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#C0522B", boxShadow: "0 0 8px rgba(192,82,43,0.8)" }} />
                <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C0522B" }}>AI Running Right Now</span>
              </div>

              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(38px, 4.8vw, 86px)", lineHeight: 1.05, color: "#F0EBE1", letterSpacing: "-0.02em", marginBottom: "22px" }}>
                Running before<br />you wake{" "}
                <span style={{ fontStyle: "italic", color: "#C0522B" }}>up.</span>
              </h2>

              <div style={{ height: "1px", background: "linear-gradient(to right, rgba(192,82,43,0.4), transparent)", marginBottom: "22px", maxWidth: "460px" }} />

              <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(17px, 1.2vw, 20px)", lineHeight: 1.85, color: "rgba(212,204,184,0.65)", maxWidth: "560px", marginBottom: "36px" }}>
                From short-term rentals to dental clinics — our AI agents handle calls, book appointments, manage pricing, and run entire operations. You wake up to results — not a to-do list.
              </p>

              <div style={{ display: "flex", gap: "28px", marginBottom: "40px", flexWrap: "wrap" }}>
                {[{ stat: "248", label: "Daily automations" }, { stat: "0.3s", label: "Response time" }, { stat: "24/7", label: "Always on" }].map((item) => (
                  <div key={item.label}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(26px, 2.4vw, 40px)", color: "#C0522B", letterSpacing: "-0.03em", lineHeight: 1 }}>{item.stat}</div>
                    <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,204,184,0.4)", marginTop: "4px" }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <MagneticButton
                href="https://skool.com/solnest-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-rust text-cream overflow-hidden"
                style={{ padding: "18px 42px", boxShadow: "0 0 40px rgba(192,82,43,0.25)" } as React.CSSProperties}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)", zIndex: 1, transition: "transform 0.5s ease" }} aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "15px", letterSpacing: "0.18em", textTransform: "uppercase", position: "relative", zIndex: 2 }}>See It In Action</span>
              </MagneticButton>

              <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14px", fontStyle: "italic", color: "rgba(212,204,184,0.3)", marginTop: "14px" }}>
                Click any card to see the full case study →
              </p>
            </motion.div>

            {/* RIGHT: 2×2 card grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.215, 0.61, 0.355, 1.0] }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "12px" }}
            >
              {(["messaging", "medspa", "restaurant", "dental"] as CaseStudyKey[]).map((id, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.215, 0.61, 0.355, 1.0] }}
                >
                  <AgentCard id={id} onOpen={setActiveCase} />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
        </div>
      </section>

      <AnimatePresence>
        {activeCase && (
          <CaseStudyModal id={activeCase} onClose={() => setActiveCase(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
