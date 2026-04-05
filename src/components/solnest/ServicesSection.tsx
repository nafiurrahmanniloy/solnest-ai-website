"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import OrbitingSkills from "@/components/ui/orbiting-skills";

const services = [
  {
    num: "01",
    name: "AI Business Audit",
    price: "1,500",
    priceNum: 1500,
    priceNote: "flat rate",
    description:
      "In one session, Ryan maps every hour you're wasting on tasks AI can own. You leave with a prioritized roadmap — not theory, not guesswork. Just the exact moves that will get your time back fastest.",
    creditNote: "Every dollar applies toward a Done-For-You build.",
    href: "mailto:hello@solneststays.com",
    linkLabel: "Book an Audit",
    badge: "Best starting point",
  },
  {
    num: "02",
    name: "Done-For-You AI Build",
    price: "5,000+",
    priceNum: 5000,
    priceNote: "per project",
    description:
      "You stop doing it. Ryan's team builds it into your business — agents, automations, workflows — all running without you. You focus on growth. The machine handles the rest.",
    creditNote: null,
    href: "mailto:hello@solneststays.com",
    linkLabel: "Start a Project",
    badge: "Most popular",
  },
  {
    num: "03",
    name: "Ongoing Advisory",
    price: "1,500",
    priceNum: 1500,
    priceNote: "per month",
    description:
      "Ryan in your corner every month. Real-time strategy, implementation calls, and direct access when problems come up. Reserved for operators serious about scaling.",
    creditNote: null,
    href: "mailto:hello@solneststays.com",
    linkLabel: "Apply for Advisory",
    badge: "Limited spots",
  },
];

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

  return <span ref={ref} style={style}>{display}</span>;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] } },
};

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
            {service.linkLabel} →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
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
              Most operators spend months stuck in the "I should automate this" phase. Ryan skips that entirely — he builds the solution, puts it in your business, and moves on.
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
            <span style={{ color: "#C0522B", fontStyle: "normal", marginRight: "10px" }}>—</span>
            "I've never met a business owner who didn't have at least 3 things AI could fix immediately. Most have 10."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
