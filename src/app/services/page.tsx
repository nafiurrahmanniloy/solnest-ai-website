"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";
import { MagneticButton } from "@/components/ui/magnetic-button";

const EASE = [0.215, 0.61, 0.355, 1.0] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
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

const offers = [
  {
    num: "01",
    name: "AI Business Audit",
    price: "1,500",
    priceNote: "flat rate",
    description:
      "In one session, Ryan maps every hour you are wasting on tasks AI can own. You leave with a prioritized roadmap: not theory, not guesswork. Every dollar applies toward a Done-For-You build.",
    badge: "Best starting point",
  },
  {
    num: "02",
    name: "Done-For-You AI Build",
    price: "5,000+",
    priceNote: "per project",
    description:
      "You stop doing it. Ryan's team builds it into your business: agents, automations, workflows, all running without you.",
    badge: "Most popular",
  },
  {
    num: "03",
    name: "Ongoing Advisory",
    price: "Custom",
    priceNote: "tailored to your business",
    description:
      "Ryan in your corner every month: real-time strategy, implementation calls, and direct access when problems come up.",
    badge: "Limited spots",
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

// ─── Recent Builds ─────────────────────────────────────────────────────────

const recentBuilds = [
  {
    name: "STR Secrets",
    badge: "Multi-Tenant STR SaaS",
    description: "Multi-tenant STR intelligence SaaS, five AI agents per operator.",
    color: "192,82,43",
  },
  {
    name: "LegacyRnR Control Center",
    badge: "AI Operations Platform",
    description: "Nineteen AI agents on one cockpit for a property operation.",
    color: "201,168,76",
  },
  {
    name: "Solnest Automation Stack",
    badge: "STR Revenue Automation",
    description: "Revenue engine and market automation for short-term rentals.",
    color: "110,139,192",
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

// ─── Section eyebrow ────────────────────────────────────────────────────────

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      <div style={{ width: "28px", height: "1px", backgroundColor: "#C0522B", flexShrink: 0 }} />
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

// ─── Step card ──────────────────────────────────────────────────────────────

function StepCard({ step }: { step: (typeof steps)[0] }) {
  return (
    <motion.div
      variants={itemVariants}
      style={{
        position: "relative",
        background: "#0F0F0D",
        border: "1px solid rgba(192,82,43,0.14)",
        padding: "28px 24px 26px",
        height: "100%",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(40px, 4vw, 56px)",
          lineHeight: 1,
          color: "rgba(192,82,43,0.28)",
          letterSpacing: "-0.03em",
          marginBottom: "16px",
        }}
      >
        {step.num}
      </div>
      <h3
        style={{
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
          fontSize: "15px",
          lineHeight: 1.7,
          color: "rgba(212,204,184,0.6)",
        }}
      >
        {step.description}
      </p>
    </motion.div>
  );
}

// ─── Offer card ─────────────────────────────────────────────────────────────

function OfferCard({ offer }: { offer: (typeof offers)[0] }) {
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
        border: `1px solid ${hovered ? "rgba(192,82,43,0.45)" : "rgba(192,82,43,0.14)"}`,
        padding: "clamp(24px, 4vw, 40px) clamp(20px, 3.5vw, 36px) clamp(24px, 4vw, 36px)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "background 0.3s ease, border-color 0.3s ease, transform 0.35s cubic-bezier(0.215,0.61,0.355,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
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
        }}
      />

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
          {offer.num}
        </span>
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
          {offer.badge}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(26px, 2.6vw, 38px)",
          lineHeight: 1.15,
          color: "#F0EBE1",
          marginBottom: "16px",
          letterSpacing: "-0.01em",
        }}
      >
        {offer.name}
      </h3>

      <div
        style={{
          height: "1px",
          background: hovered ? "rgba(192,82,43,0.3)" : "rgba(240,235,225,0.07)",
          marginBottom: "16px",
          transition: "background 0.3s ease",
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "16px",
          lineHeight: 1.8,
          color: hovered ? "rgba(212,204,184,0.8)" : "rgba(212,204,184,0.55)",
          transition: "color 0.25s ease",
          flex: 1,
          marginBottom: "8px",
        }}
      >
        {offer.description}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginTop: "20px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(192,82,43,0.1)",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
            {offer.price !== "Custom" && (
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "16px",
                  color: hovered ? "#C0522B" : "rgba(192,82,43,0.6)",
                  transition: "color 0.25s ease",
                }}
              >
                $
              </span>
            )}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: offer.price === "Custom" ? "italic" : "normal",
                fontSize: "clamp(30px, 3.4vw, 46px)",
                lineHeight: 1,
                color: hovered ? "#F0EBE1" : "rgba(240,235,225,0.85)",
                letterSpacing: "-0.02em",
                transition: "color 0.25s ease",
              }}
            >
              {offer.price}
            </span>
          </div>
          <div
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
            {offer.priceNote}
          </div>
        </div>

        <a
          href="/build-session"
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "13px",
            letterSpacing: hovered ? "0.2em" : "0.14em",
            textTransform: "uppercase",
            color: "#C0522B",
            textDecoration: "none",
            transition: "letter-spacing 0.3s ease, opacity 0.2s ease",
            opacity: hovered ? 1 : 0.75,
            paddingBottom: "2px",
            borderBottom: "1px solid rgba(192,82,43,0.4)",
            whiteSpace: "nowrap",
          }}
        >
          Book a Call →
        </a>
      </div>
    </motion.div>
  );
}

// ─── Industry card ──────────────────────────────────────────────────────────

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
        height: "100%",
        transition: "background 0.3s ease, border-color 0.3s ease, transform 0.35s cubic-bezier(0.215,0.61,0.355,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(38px, 3.4vw, 56px)",
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

// ─── Recent build card ───────────────────────────────────────────────────────

function BuildCard({ build }: { build: (typeof recentBuilds)[0] }) {
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
        background: hovered ? "#131311" : "#0F0F0D",
        border: `1px solid rgba(${build.color},0.16)`,
        padding: "24px 26px",
        height: "100%",
        transition: "background 0.25s ease, border-color 0.25s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
        <div
          style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: `rgb(${build.color})`,
            boxShadow: `0 0 8px rgba(${build.color},0.7)`,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: `rgba(${build.color},0.85)`,
          }}
        >
          {build.badge}
        </span>
      </div>
      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(19px, 1.8vw, 24px)",
          color: "#F0EBE1",
          marginBottom: "8px",
          letterSpacing: "-0.01em",
        }}
      >
        {build.name}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "14px",
          lineHeight: 1.65,
          color: "rgba(212,204,184,0.55)",
        }}
      >
        {build.description}
      </p>
    </motion.div>
  );
}

// ─── FAQ item ────────────────────────────────────────────────────────────────

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `services-faq-panel-${index}`;
  const buttonId = `services-faq-button-${index}`;
  return (
    <motion.div
      variants={itemVariants}
      style={{
        borderBottom: "1px solid rgba(192,82,43,0.14)",
      }}
    >
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "22px 4px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(17px, 1.8vw, 21px)",
            color: "#F0EBE1",
            lineHeight: 1.4,
          }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: 300,
            color: "#C0522B",
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(212,204,184,0.6)",
                padding: "0 4px 24px",
                maxWidth: "760px",
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main style={{ background: "#0D0D0B", minHeight: "100vh", color: "#F0EBE1" }}>
      <Nav />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden px-4 md:px-8"
        style={{ paddingTop: "140px", paddingBottom: "clamp(48px, 8vw, 96px)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-10vw] right-[-10vw] animate-breathe"
          style={{
            width: "50vw", height: "50vw",
            background: "radial-gradient(ellipse at center, rgba(192,82,43,0.12) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-10vw] left-[-10vw]"
          style={{
            width: "40vw", height: "40vw",
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-[1000px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55 }}
            className="flex items-center justify-center gap-3 mb-7"
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
            <div style={{ width: "34px", height: "1px", background: "#C0522B", flexShrink: 0 }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: EASE }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(38px, 6vw, 84px)",
              lineHeight: 1.08,
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
            transition={{ delay: 0.24, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(17px, 1.6vw, 21px)",
              lineHeight: 1.8,
              color: "rgba(212,204,184,0.7)",
              maxWidth: "700px",
              margin: "0 auto 40px",
            }}
          >
            From short-term rentals to med spas to real estate, we design, build, and run the AI
            systems that take the busywork off your plate. Any industry, done for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <MagneticButton
              href="/build-session"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{
                padding: "18px 38px",
                boxShadow: "0 0 40px rgba(192,82,43,0.3), 0 0 80px rgba(192,82,43,0.1)",
              } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  zIndex: 1,
                  transition: "transform 0.5s ease",
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
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(212,204,184,0.8)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(192,82,43,0.35)",
                paddingBottom: "3px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE1"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,204,184,0.8)"; }}
            >
              See recent builds →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative py-12 md:py-16 px-4 md:px-8" style={{ background: "#0D0D0B" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="mb-12 md:mb-14 max-w-[700px]"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow label="How It Works" />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(30px, 3.6vw, 54px)",
                lineHeight: 1.12,
                color: "#F0EBE1",
              }}
            >
              Four steps. <span style={{ fontStyle: "italic", color: "#C0522B" }}>No busywork left.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {steps.map((step) => (
              <StepCard key={step.num} step={step} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── The 3 Offers ── */}
      <section id="offers" className="relative py-12 md:py-16 px-4 md:px-8 overflow-hidden" style={{ background: "#0D0D0B" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0"
          style={{
            width: "50vw", height: "50vw",
            background: "radial-gradient(ellipse at top right, rgba(192,82,43,0.06) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="mb-12 md:mb-14 max-w-[720px]"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow label="Ways To Work Together" />
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(30px, 3.6vw, 54px)",
                lineHeight: 1.12,
                color: "#F0EBE1",
              }}
            >
              Pick where you <span style={{ fontStyle: "italic", color: "#C0522B" }}>start.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {offers.map((offer) => (
              <OfferCard key={offer.num} offer={offer} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Industries We Build For ── */}
      <section className="relative py-12 md:py-16 px-4 md:px-8" style={{ background: "#0D0D0B" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="mb-10 md:mb-12 max-w-[700px]"
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
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {industries.map((industry) => (
              <IndustryCard key={industry.num} industry={industry} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Recent Builds strip ── */}
      <section className="relative py-12 md:py-16 px-4 md:px-8" style={{ background: "#0D0D0B" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
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
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C0522B",
                textDecoration: "none",
                borderBottom: "1px solid rgba(192,82,43,0.4)",
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
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {recentBuilds.map((build) => (
              <BuildCard key={build.name} build={build} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative py-12 md:py-16 px-4 md:px-8" style={{ background: "#0D0D0B" }}>
        <div className="relative z-10 max-w-[860px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="mb-10 md:mb-12"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
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
                textAlign: "center",
              }}
            >
              Questions <span style={{ fontStyle: "italic", color: "#C0522B" }}>worth asking.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
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
      <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden" style={{ background: "#0A0A08" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 animate-breathe"
          style={{
            width: "60vw",
            height: "40vw",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse at center, rgba(192,82,43,0.14) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative z-10 max-w-[820px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(32px, 4.6vw, 62px)",
                lineHeight: 1.12,
                color: "#F0EBE1",
                marginBottom: "28px",
                letterSpacing: "-0.01em",
              }}
            >
              Ready to put <span style={{ fontStyle: "italic", color: "#C0522B" }}>AI to work?</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <MagneticButton
              href="/build-session"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{
                padding: "19px 42px",
                boxShadow: "0 0 40px rgba(192,82,43,0.3), 0 0 80px rgba(192,82,43,0.1)",
              } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  zIndex: 1,
                  transition: "transform 0.5s ease",
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
