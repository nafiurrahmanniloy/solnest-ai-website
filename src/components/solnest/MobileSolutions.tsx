"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "messaging",
    title: "Guest Messaging Agent",
    badge: "STR Automation",
    headline: "0.3-second response time. Zero staff required.",
    what: "A fully autonomous AI agent that handles 100% of guest communication for short-term rental properties — from pre-booking questions to check-out follow-ups.",
    results: [
      { stat: "100%", label: "Messages handled" },
      { stat: "0.3s", label: "Response time" },
      { stat: "3 hrs", label: "Saved per day" },
      { stat: "5+", label: "Properties" },
    ],
    stack: ["Claude AI", "Twilio SMS", "Make.com", "Airtable"],
    color: "#C0522B",
    colorRgb: "192,82,43",
  },
  {
    id: "medspa",
    title: "Patient Concierge Agent",
    badge: "MedSpa Automation",
    headline: "87% booking rate from inbound leads. Fully hands-free.",
    what: "An AI concierge that handles appointment scheduling, treatment consultations, and follow-ups across SMS, email, and web chat simultaneously.",
    results: [
      { stat: "87%", label: "Booking rate" },
      { stat: "2.4x", label: "More bookings" },
      { stat: "0", label: "Missed inquiries" },
      { stat: "$18K", label: "Revenue added" },
    ],
    stack: ["Claude AI", "Twilio", "Cal.com", "n8n"],
    color: "#B07BA5",
    colorRgb: "176,123,165",
  },
  {
    id: "restaurant",
    title: "Voice Ordering Agent",
    badge: "Restaurant AI",
    headline: "Handles 120+ calls per day. Never puts anyone on hold.",
    what: "A voice AI that takes phone orders — understanding customizations, upselling combos, and processing payments with under 400ms latency.",
    results: [
      { stat: "120+", label: "Daily calls" },
      { stat: "94%", label: "Accuracy" },
      { stat: "$3.2K", label: "Weekly recovered" },
      { stat: "0.4s", label: "Latency" },
    ],
    stack: ["Vapi", "Claude AI", "Square POS", "n8n"],
    color: "#D4863A",
    colorRgb: "212,134,58",
  },
  {
    id: "dental",
    title: "Patient Voice Agent",
    badge: "Dental Clinic AI",
    headline: "Zero missed patient calls. 24/7 scheduling that sounds human.",
    what: "A conversational voice AI that answers every call, schedules appointments, handles insurance questions, and manages cancellations automatically.",
    results: [
      { stat: "0%", label: "Missed calls" },
      { stat: "62%", label: "Less no-shows" },
      { stat: "28", label: "Hrs saved/week" },
      { stat: "4.9★", label: "Satisfaction" },
    ],
    stack: ["Vapi", "Claude AI", "Dentrix API", "n8n"],
    color: "#5BA4A4",
    colorRgb: "91,164,164",
  },
];

export function MobileSolutions() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const proj = projects[current];

  return (
    <div className="md:hidden px-5 py-14">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div style={{ width: "28px", height: "1px", background: "#C0522B" }} />
          <span style={{
            fontFamily: "var(--font-condensed)", fontWeight: 600,
            fontSize: "10px", letterSpacing: "0.22em",
            textTransform: "uppercase", color: "#C0522B",
          }}>
            AI Running Right Now
          </span>
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "28px", lineHeight: 1.08,
          color: "#F0EBE1", letterSpacing: "-0.02em",
        }}>
          Running before you wake{" "}
          <span style={{ fontStyle: "italic", color: "#C0522B" }}>up.</span>
        </h2>
      </div>

      {/* Dot navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setCurrent(i); setExpanded(false); }}
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === current ? proj.color : "rgba(240,235,225,0.12)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
        <span style={{
          fontFamily: "var(--font-condensed)", fontWeight: 500,
          fontSize: "10px", letterSpacing: "0.12em",
          color: "rgba(212,204,184,0.35)",
        }}>
          {current + 1} / {projects.length}
        </span>
      </div>

      {/* Project Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          style={{
            background: "#0F0F0D",
            border: `1px solid rgba(${proj.colorRgb},0.2)`,
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ padding: "18px 18px 14px", borderBottom: `1px solid rgba(${proj.colorRgb},0.1)` }}>
            <div className="flex items-center gap-2 mb-2">
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: proj.color, boxShadow: `0 0 8px rgba(${proj.colorRgb},0.7)` }} />
              <span style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600,
                fontSize: "9px", letterSpacing: "0.18em",
                textTransform: "uppercase", color: proj.color,
              }}>
                {proj.badge}
              </span>
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 300,
              fontSize: "20px", color: "#F0EBE1", lineHeight: 1.15,
              marginBottom: "6px",
            }}>
              {proj.title}
            </h3>
            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
              fontSize: "14px", lineHeight: 1.5, color: `rgba(${proj.colorRgb},0.8)`,
            }}>
              &ldquo;{proj.headline}&rdquo;
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: `rgba(${proj.colorRgb},0.08)` }}>
            {proj.results.map((r) => (
              <div key={r.label} style={{ background: "#0F0F0D", padding: "14px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "22px", color: "#F0EBE1", lineHeight: 1, letterSpacing: "-0.02em" }}>{r.stat}</div>
                <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 500, fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", color: `rgba(${proj.colorRgb},0.6)`, marginTop: "4px" }}>{r.label}</div>
              </div>
            ))}
          </div>

          {/* Expandable detail */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ padding: "16px 18px", borderTop: `1px solid rgba(${proj.colorRgb},0.1)` }}>
                  <p style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${proj.colorRgb},0.6)`, marginBottom: "8px" }}>What Was Built</p>
                  <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "13px", lineHeight: 1.7, color: "rgba(212,204,184,0.7)", marginBottom: "14px" }}>{proj.what}</p>

                  <p style={{ fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: `rgba(${proj.colorRgb},0.6)`, marginBottom: "8px" }}>Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((t) => (
                      <span key={t} style={{
                        fontFamily: "var(--font-condensed)", fontWeight: 500,
                        fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
                        color: `rgba(${proj.colorRgb},0.7)`,
                        border: `1px solid rgba(${proj.colorRgb},0.2)`,
                        background: `rgba(${proj.colorRgb},0.05)`,
                        padding: "4px 10px", borderRadius: "2px",
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View button */}
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              width: "100%",
              padding: "14px",
              background: `rgba(${proj.colorRgb},0.06)`,
              borderTop: `1px solid rgba(${proj.colorRgb},0.1)`,
              border: "none",
              borderRadius: "0 0 12px 12px",
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: proj.color,
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
          >
            {expanded ? "Close ✕" : "View Case Study →"}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => { setCurrent(Math.max(0, current - 1)); setExpanded(false); }}
          disabled={current === 0}
          style={{
            flex: 1,
            padding: "12px",
            background: "transparent",
            border: "1px solid rgba(240,235,225,0.08)",
            borderRadius: "8px",
            fontFamily: "var(--font-condensed)",
            fontWeight: 500,
            fontSize: "12px",
            color: current === 0 ? "rgba(212,204,184,0.15)" : "rgba(212,204,184,0.5)",
            cursor: current === 0 ? "default" : "pointer",
          }}
        >
          ← Prev
        </button>
        <button
          onClick={() => { setCurrent(Math.min(projects.length - 1, current + 1)); setExpanded(false); }}
          disabled={current === projects.length - 1}
          style={{
            flex: 1.3,
            padding: "12px",
            background: current === projects.length - 1 ? "rgba(192,82,43,0.25)" : "#C0522B",
            border: "none",
            borderRadius: "8px",
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.1em",
            color: "#F0EBE1",
            cursor: current === projects.length - 1 ? "default" : "pointer",
            boxShadow: current < projects.length - 1 ? "0 0 20px rgba(192,82,43,0.25)" : "none",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
