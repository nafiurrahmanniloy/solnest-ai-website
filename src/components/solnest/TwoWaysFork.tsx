"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

// House motion system
const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
const VIEWPORT = { once: true, margin: "-80px 0px -80px 0px" } as const;

// ─── Data ─────────────────────────────────────────────────────────────────────

const paths = [
  {
    num: "01",
    badge: "For short-term rental operators",
    title: "The Community",
    desc: "Run a short-term rental? Join operators building AI systems for their STR: live builds, agents, prompts, and SOPs you can deploy the same day.",
    ctaLabel: "Join - $97/mo",
    href: "https://skool.com/solnest-ai",
    external: true,
    accent: "#C0522B",
    accentRgb: "192,82,43",
    variant: "filled" as const,
  },
  {
    num: "02",
    badge: "Any business",
    title: "Done-For-You",
    desc: "Run any other business? Ryan's team builds your AI for you: audit, build, and ongoing advisory. Any industry.",
    ctaLabel: "Book a Call",
    href: "/book",
    external: false,
    accent: "#C9A84C",
    accentRgb: "201,168,76",
    variant: "outline" as const,
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// ─── Path card ("door") ───────────────────────────────────────────────────────

function PathCard({ data }: { data: (typeof paths)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <motion.div
      ref={ref}
      variants={item}
      role="article"
      aria-label={`${data.title}: ${data.desc}`}
      onMouseMove={onMove}
      className="fork-card relative overflow-hidden flex flex-col h-full"
      style={{
        background: "#0D0D0B",
        padding: "clamp(32px, 4vw, 52px) clamp(28px, 3.4vw, 44px)",
        "--card-rgb": data.accentRgb,
      } as React.CSSProperties}
    >
      {/* Mouse glow — accent wash, pre-rendered, opacity only */}
      <div
        aria-hidden="true"
        className="fork-card-glow"
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background: `radial-gradient(420px circle at ${glow.x}px ${glow.y}px, rgba(${data.accentRgb},0.1), transparent 65%)`,
        }}
      />

      {/* Ghost number */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-24px",
          right: "-6px",
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(96px, 16vw, 180px)",
          lineHeight: 1,
          color: "rgba(240,235,225,0.03)",
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-0.04em",
        }}
      >
        {data.num}
      </div>

      {/* Top accent line — base layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(to right, rgba(240,235,225,0.08), transparent)",
        }}
      />
      {/* Top accent line — accent layer, fades in on hover (opacity only) */}
      <div
        aria-hidden="true"
        className="fork-card-line"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(to right, ${data.accent}, rgba(${data.accentRgb},0.2), transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 self-start mb-7"
          style={{
            background: `rgba(${data.accentRgb},0.08)`,
            border: `1px solid rgba(${data.accentRgb},0.25)`,
            padding: "6px 14px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: data.accent,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: data.accent,
            }}
          >
            {data.badge}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "var(--fs-display-md, clamp(26px, 2.6vw, 44px))",
            lineHeight: 1.15,
            color: "#F0EBE1",
            letterSpacing: "-0.01em",
            marginBottom: "18px",
          }}
        >
          {data.title}
        </h3>

        <div
          aria-hidden="true"
          style={{
            height: "1px",
            width: "48px",
            background: `rgba(${data.accentRgb},0.4)`,
            marginBottom: "20px",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "var(--fs-body-lg, clamp(16px, 1.1vw, 19px))",
            lineHeight: 1.6,
            color: "rgba(212,204,184,0.7)",
            marginBottom: "clamp(28px, 3vw, 40px)",
            flex: 1,
          }}
        >
          {data.desc}
        </p>

        {data.variant === "filled" ? (
          <MagneticButton
            href={data.href}
            target={data.external ? "_blank" : undefined}
            rel={data.external ? "noopener noreferrer" : undefined}
            aria-label={`${data.ctaLabel} - ${data.title}`}
            className="group bg-rust text-cream overflow-hidden relative self-start"
            style={{
              padding: "16px 32px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 0 40px rgba(192,82,43,0.28)",
            } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                zIndex: 1,
                transition: "transform 0.55s cubic-bezier(0.215,0.61,0.355,1)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                position: "relative",
                zIndex: 2,
              }}
            >
              {data.ctaLabel}
            </span>
          </MagneticButton>
        ) : (
          <MagneticButton
            href={data.href}
            aria-label={`${data.ctaLabel} - ${data.title}`}
            className="group bg-transparent text-cream self-start"
            style={{
              padding: "15px 32px",
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(201,168,76,0.4)",
              transition: "border-color 0.3s cubic-bezier(0.215,0.61,0.355,1), background 0.3s cubic-bezier(0.215,0.61,0.355,1)",
            } as React.CSSProperties}
          >
            <span
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#C9A84C",
              }}
            >
              {data.ctaLabel}
            </span>
          </MagneticButton>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TwoWaysFork() {
  return (
    <section
      id="how"
      className="relative overflow-hidden"
      style={{ background: "#0D0D0B" }}
      aria-labelledby="two-ways-heading"
    >
      {/* Top border */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)",
        }}
      />

      {/* Card hover grammar — gated behind fine pointers, transform/opacity/border-color only */}
      <style>{`
        .fork-card {
          border: 1px solid rgba(240,235,225,0.12);
          transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), border-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        .fork-card-glow, .fork-card-line {
          opacity: 0;
          transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .fork-card:hover {
            transform: translateY(-4px);
            border-color: rgba(var(--card-rgb), 0.24);
          }
          .fork-card:hover .fork-card-glow,
          .fork-card:hover .fork-card-line { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fork-card, .fork-card-glow, .fork-card-line { transition: none; }
          .fork-card:hover { transform: none; }
        }
      `}</style>

      {/* Static gold accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.07), transparent 60%)" }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={container}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div variants={item} className="mb-8 flex justify-center">
            <div
              className="inline-flex items-center gap-2"
              style={{
                background: "rgba(192,82,43,0.07)",
                border: "1px solid rgba(192,82,43,0.22)",
                padding: "6px 16px",
              }}
            >
              <div
                aria-hidden="true"
                className="animate-pulse"
                style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C0522B" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#C0522B",
                }}
              >
                Choose Your Path
              </span>
            </div>
          </motion.div>

          <motion.h2
            id="two-ways-heading"
            variants={item}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "var(--fs-display-lg, clamp(32px, 3.6vw, 64px))",
              lineHeight: 1.1,
              color: "#F0EBE1",
              letterSpacing: "-0.02em",
              maxWidth: "760px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Two ways to work with{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>Solnest AI.</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {paths.map((p) => (
            <PathCard key={p.num} data={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
