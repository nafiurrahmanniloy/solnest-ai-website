"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const solutions = [
  {
    num: 1,
    title: "Guest Messaging Agent",
    badge: "STR Automation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C0522B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    desc: "Every guest message answered in under a second. Pre-booking to check-out — fully autonomous, in your voice.",
    features: ["0.3s Response Time", "24/7 Coverage", "12+ Properties", "Zero Staff Needed"],
  },
  {
    num: 2,
    title: "Smart Pricing Engine",
    badge: "Revenue AI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    desc: "AI reprices your listings at 2am when demand spikes. Captures every revenue opportunity you'd sleep through.",
    features: ["Dynamic Repricing", "Demand Detection", "+$2,400/mo Impact", "PriceLabs Integration"],
  },
  {
    num: 3,
    title: "Patient Concierge",
    badge: "MedSpa AI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C0522B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    desc: "Handles scheduling, consultations, and follow-ups across SMS, email, and web chat simultaneously.",
    features: ["87% Booking Rate", "2.4x More Bookings", "Zero Missed Inquiries", "$18K Revenue Added"],
  },
  {
    num: 4,
    title: "Voice Ordering Agent",
    badge: "Restaurant AI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    desc: "Takes phone orders with natural conversation. Understands customizations, upsells combos, processes payments.",
    features: ["120+ Daily Calls", "94% Accuracy", "$3.2K Weekly Recovered", "0.4s Voice Latency"],
  },
  {
    num: 5,
    title: "Patient Voice Agent",
    badge: "Dental Clinic AI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C0522B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    desc: "Answers every call, schedules appointments, handles insurance questions, and manages cancellations automatically.",
    features: ["0% Missed Calls", "62% Less No-Shows", "28 Hrs Saved/Week", "4.9★ Satisfaction"],
  },
  {
    num: 6,
    title: "Workflow Automation",
    badge: "Operations AI",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    desc: "Custom n8n and Make.com workflows that connect your entire stack. CRM, calendar, comms — all on autopilot.",
    features: ["End-to-End Automation", "Any Tool Connected", "Custom Triggers", "Zero Manual Steps"],
  },
];

export function MobileSolutions() {
  const [current, setCurrent] = useState(0);
  const sol = solutions[current];
  const isRust = sol.num % 2 === 1;
  const accent = isRust ? "#C0522B" : "#C9A84C";
  const accentRgb = isRust ? "192,82,43" : "201,168,76";

  return (
    <section className="md:hidden relative overflow-hidden" style={{ background: "#0D0D0B" }}>
      {/* Top border */}
      <div style={{
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(192,82,43,0.25), transparent)",
      }} />

      <div className="px-5 py-14">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "28px",
            lineHeight: 1.1,
            color: "#F0EBE1",
            letterSpacing: "-0.02em",
            marginBottom: "10px",
          }}>
            Six Solutions.{" "}
            <span style={{ color: "#C0522B", fontStyle: "italic" }}>One Platform.</span>
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: 1.7,
            color: "rgba(212,204,184,0.55)",
            maxWidth: "320px",
            margin: "0 auto",
          }}>
            Each one handles a piece of your operations. Together, they replace the chaos.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-5">
          <span style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "rgba(212,204,184,0.4)",
          }}>
            Step {current + 1} of {solutions.length}
          </span>
          <div className="flex gap-1.5">
            {solutions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? "18px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === current ? accent : "rgba(240,235,225,0.12)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#0F0F0D",
              border: `1px solid rgba(${accentRgb},0.2)`,
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div style={{
              padding: "20px 20px 16px",
              borderBottom: `1px solid rgba(${accentRgb},0.1)`,
            }}>
              <div className="flex items-center gap-3 mb-3">
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: `rgba(${accentRgb},0.1)`,
                  border: `1px solid rgba(${accentRgb},0.2)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {sol.icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "18px",
                    color: "#F0EBE1",
                    lineHeight: 1.2,
                  }}>
                    {sol.title}
                  </h3>
                  <span style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 600,
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: accent,
                    background: `rgba(${accentRgb},0.1)`,
                    border: `1px solid rgba(${accentRgb},0.25)`,
                    padding: "2px 8px",
                    borderRadius: "2px",
                    display: "inline-block",
                    marginTop: "4px",
                  }}>
                    Solution {sol.num}
                  </span>
                </div>
              </div>

              <p style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: 1.7,
                color: "rgba(212,204,184,0.65)",
              }}>
                {sol.desc}
              </p>
            </div>

            {/* Features */}
            <div style={{ padding: "12px 20px 20px" }}>
              {sol.features.map((feat) => (
                <div
                  key={feat}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    marginBottom: "6px",
                    background: `rgba(${accentRgb},0.04)`,
                    border: `1px solid rgba(${accentRgb},0.08)`,
                    borderRadius: "8px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke={`rgba(${accentRgb},0.3)`} />
                    <path d="M4.5 8L7 10.5L11.5 5.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "rgba(240,235,225,0.8)",
                  }}>
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            style={{
              flex: 1,
              padding: "14px",
              background: "transparent",
              border: "1px solid rgba(240,235,225,0.1)",
              borderRadius: "10px",
              fontFamily: "var(--font-condensed)",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.08em",
              color: current === 0 ? "rgba(212,204,184,0.2)" : "rgba(212,204,184,0.6)",
              cursor: current === 0 ? "default" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrent(Math.min(solutions.length - 1, current + 1))}
            disabled={current === solutions.length - 1}
            style={{
              flex: 1.3,
              padding: "14px",
              background: current === solutions.length - 1
                ? "rgba(192,82,43,0.3)"
                : "#C0522B",
              border: "none",
              borderRadius: "10px",
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.1em",
              color: "#F0EBE1",
              cursor: current === solutions.length - 1 ? "default" : "pointer",
              boxShadow: current < solutions.length - 1 ? "0 0 20px rgba(192,82,43,0.3)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {current === solutions.length - 1 ? "Done" : "Next →"}
          </button>
        </div>
      </div>
    </section>
  );
}
