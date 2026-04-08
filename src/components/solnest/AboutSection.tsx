"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const tags = [
  "Commercial Pilot",
  "STR Operator",
  "AI Builder",
  "Yo-Yo Enthusiast",
  "British Columbia, CA",
];

const stats = [
  { value: 40, suffix: "+", label: "AI Agents Built", accent: "#C0522B" },
  { value: 5, suffix: "+", label: "STR Properties", accent: "#C9A84C" },
  { value: 300, suffix: "+", label: "Hours Saved / Mo", accent: "#C0522B" },
  { value: 15, suffix: "+", label: "Years Automating", accent: "#C9A84C" },
];

const roles = [
  { role: "STR Operator", detail: "Multiple properties running fully automated — zero manual steps." },
  { role: "AI Builder", detail: "40+ agents deployed across real businesses." },
  { role: "Community Lead", detail: "A growing community of operators learning and building together." },
];

function AnimatedStat({ value, suffix, label, accent }: { value: number; suffix: string; label: string; accent: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.min(Math.round(progress * value), value));
      if (step >= steps) clearInterval(timer);
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center py-7" style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: "clamp(38px, 3.8vw, 70px)",
        lineHeight: 1,
        color: "#F0EBE1",
        letterSpacing: "-0.03em",
      }}>
        {count}
        <span style={{ color: accent, fontSize: "0.55em", fontWeight: 300, verticalAlign: "middle" }}>{suffix}</span>
      </div>
      <div style={{
        width: "24px", height: "1px",
        background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
        margin: "12px auto 10px",
      }} />
      <div style={{
        fontFamily: "var(--font-condensed)",
        fontWeight: 600,
        fontSize: "13px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "rgba(212,204,184,0.55)",
      }}>
        {label}
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1.0] } },
};

export function AboutSection() {
  return (
    <section className="relative overflow-hidden">

      {/* ── Top: Photo left + Bio right ── */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ background: "linear-gradient(to right, #0D0D0B 50%, #F5F0E8 50%)" }}
      >
        {/* LEFT — full photo with tags overlay */}
        <div
          className="relative overflow-hidden"
          style={{ background: "#0D0D0B", minHeight: "clamp(420px, 58vw, 700px)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src="/ryan.jpg"
              alt="Ryan Lefebvre — Founder of Solnest AI"
              fill
              style={{ objectFit: "cover", objectPosition: "50% 18%" }}
              priority
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "50%",
                background: "linear-gradient(to top, rgba(13,13,11,0.95) 0%, rgba(13,13,11,0.4) 55%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              aria-hidden="true"
              className="hidden lg:block"
              style={{
                position: "absolute", top: 0, left: 0, bottom: 0, width: "8%",
                background: "linear-gradient(to right, #0D0D0B, transparent)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Name + tags — photo bottom */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px", zIndex: 10 }}
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "16px",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#C0522B", marginBottom: "12px",
              }}
            >
              Ryan Lefebvre
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-condensed)", fontWeight: 600,
                    fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "rgba(240,235,225,0.85)",
                    border: "1px solid rgba(240,235,225,0.25)",
                    background: "rgba(13,13,11,0.55)",
                    padding: "6px 14px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT — bio on cream */}
        <div
          className="flex flex-col justify-center px-10 lg:px-16 py-14 lg:py-20"
          style={{ background: "#F5F0E8" }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-7">
              <div style={{ width: "36px", height: "1px", backgroundColor: "#C0522B" }} />
              <span style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "14px",
                letterSpacing: "0.22em", textTransform: "uppercase", color: "#C0522B",
              }}>
                Meet Ryan Lefebvre
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)", fontWeight: 300,
                fontSize: "clamp(41px, 4.8vw, 86px)",
                lineHeight: 1.08, color: "#1A1918", marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              Pilot. Yo-yo enthusiast.<br />
              <span style={{ color: "#C0522B", fontStyle: "italic" }}>AI architect.</span>
            </motion.h2>

            {/* ── What he does — cream-native role list ── */}
            <motion.div variants={itemVariants} style={{ marginBottom: "24px" }}>
              {roles.map((r, i) => (
                <div
                  key={r.role}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "12px",
                    padding: "12px 0",
                    borderBottom: i < roles.length - 1 ? "1px solid rgba(192,82,43,0.12)" : "none",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-condensed)", fontWeight: 700,
                    fontSize: "16px", letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#C0522B", flexShrink: 0, minWidth: "160px",
                  }}>
                    {r.role}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)", fontWeight: 400,
                    fontSize: "17px", lineHeight: 1.6,
                    color: "rgba(44,42,37,0.7)",
                  }}>
                    {r.detail}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p variants={itemVariants} style={{
              fontFamily: "var(--font-body)", fontWeight: 400,
              fontSize: "clamp(18px, 1.26vw, 20px)", lineHeight: 1.8,
              color: "#2C2A25", marginBottom: "14px",
            }}>
              Ryan built a full AI automation stack for his own STR operations — then realized every business owner he met had the same problem: too much manual work, not enough time.
            </motion.p>

            <motion.p variants={itemVariants} style={{
              fontFamily: "var(--font-body)", fontWeight: 400,
              fontSize: "clamp(18px, 1.26vw, 20px)", lineHeight: 1.8,
              color: "#2C2A25",
            }}>
              His gift is sitting across from any business owner, finding their biggest operational pain in minutes, and showing AI solving it live. That's not a pitch. That's just what he does.
            </motion.p>

            {/* Quote */}
            <motion.div
              variants={itemVariants}
              style={{ borderTop: "1px solid rgba(192,82,43,0.2)", marginTop: "28px", paddingTop: "22px" }}
            >
              <p style={{
                fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(22px, 1.56vw, 26px)", lineHeight: 1.55,
                color: "#C0522B",
              }}>
                "Find the pain. Show the solution. Watch what happens."
              </p>
              <p style={{
                fontFamily: "var(--font-condensed)", fontWeight: 600, fontSize: "13px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(60,58,53,0.5)", marginTop: "10px",
              }}>
                — Ryan Lefebvre
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom: Stats bar — redesigned ── */}
      <div style={{ background: "#0D0D0B", position: "relative" }}>
        {/* Top accent line */}
        <div aria-hidden="true" style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)",
        }} />

        {/* Ambient glow */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "-20%", left: "20%",
          width: "60%", height: "100%",
          background: "radial-gradient(ellipse, rgba(192,82,43,0.05) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              style={{
                position: "relative",
                borderRight: i < stats.length - 1 ? "1px solid rgba(240,235,225,0.06)" : "none",
              }}
            >
              <AnimatedStat value={s.value} suffix={s.suffix} label={s.label} accent={s.accent} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent line */}
        <div aria-hidden="true" style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(192,82,43,0.15) 50%, transparent)",
        }} />
      </div>

    </section>
  );
}
