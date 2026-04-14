"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import Nav from "./Nav";
import { MagneticButton } from "@/components/ui/magnetic-button";

const WovenLightBg = dynamic(() => import("@/components/ui/woven-light-bg"), {
  ssr: false,
  loading: () => null,
});

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const childFade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Countdown timer ─── */
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const blocks = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.mins },
    { label: "Secs", value: time.secs },
  ];

  return (
    <div className="flex gap-3">
      {blocks.map((b) => (
        <div key={b.label} className="flex flex-col items-center">
          <div
            style={{
              width: "62px",
              height: "62px",
              borderRadius: "12px",
              background: "rgba(192,82,43,0.08)",
              border: "1px solid rgba(192,82,43,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "28px",
                color: "#F0EBE1",
              }}
            >
              {String(b.value).padStart(2, "0")}
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(212,204,184,0.5)",
              marginTop: "6px",
            }}
          >
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Animated input field ─── */
function FloatingInput({
  label,
  type = "text",
  name,
  required,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(e.target.value.length > 0);
        }}
        className="w-full bg-transparent outline-none"
        style={{
          padding: "22px 16px 8px",
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: "16px",
          color: "#F0EBE1",
          borderRadius: "12px",
          border: `1px solid ${focused ? "rgba(192,82,43,0.5)" : "rgba(240,235,225,0.1)"}`,
          background: focused ? "rgba(192,82,43,0.04)" : "rgba(255,255,255,0.02)",
          transition: "all 0.3s ease",
        }}
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "off"}
      />
      <label
        style={{
          position: "absolute",
          left: "16px",
          top: focused || filled ? "8px" : "16px",
          fontSize: focused || filled ? "11px" : "14px",
          fontFamily: "var(--font-condensed)",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase" as const,
          color: focused ? "#C0522B" : "rgba(212,204,184,0.45)",
          transition: "all 0.25s ease",
          pointerEvents: "none" as const,
        }}
      >
        {label}
      </label>
      <motion.div
        initial={false}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #C0522B, transparent)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}

/* ─── Main WebinarPage ─── */
export function WebinarPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextWebinar = new Date("2026-04-16T18:00:00Z");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const whatYouLearn = [
    "The single biggest time-killer in your business — and how to eliminate it with AI in under a week",
    "A live build: Ryan creates a working automation from scratch, in real time, no slides",
    "Why most business owners waste money on the wrong AI tools — and the exact stack that actually works",
    "Bring your business to the Q&A — Ryan will find your #1 bottleneck and map the fix live",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "#0D0D0B" }}>
      <Nav />


      {/* ── Woven light particle canvas ── */}
      <WovenLightBg />

      {/* ── Content ── */}
      <div
        className="relative z-10 w-full max-w-[1300px] mx-auto px-5 md:px-8"
        style={{ paddingTop: "clamp(120px, 14vh, 180px)", paddingBottom: "80px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-stretch">

          {/* ── LEFT COLUMN — Info ── */}
          <div className="flex flex-col">
            {/* Live badge */}
            <motion.div
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-8"
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(192,82,43,0.1)",
                  border: "1px solid rgba(192,82,43,0.25)",
                }}
              >
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#C0522B",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 600,
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#C0522B",
                  }}
                >
                  Live Event
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(212,204,184,0.5)",
                }}
              >
                Free Registration
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              animate="visible"
              style={{ margin: 0, lineHeight: 1.02 }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(38px, 4.8vw, 80px)",
                  color: "#F0EBE1",
                  letterSpacing: "-0.03em",
                }}
              >
                From Zero to
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(46px, 5.8vw, 96px)",
                  letterSpacing: "-0.03em",
                }}
              >
                <span style={{ color: "#C0522B", fontStyle: "italic" }}>Automated.</span>
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }}
              style={{
                height: "1px",
                background: "linear-gradient(to right, rgba(192,82,43,0.5), transparent)",
                margin: "28px 0",
                transformOrigin: "left",
                maxWidth: "400px",
              }}
            />

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={0.4}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "clamp(18px, 1.4vw, 22px)",
                lineHeight: 1.8,
                color: "rgba(212,204,184,0.85)",
                maxWidth: "520px",
                margin: "0 0 36px",
              }}
            >
              You&apos;re spending <span style={{ color: "#F0EBE1", fontWeight: 500 }}>10+ hours a week</span> on
              tasks AI could handle in minutes. In this free live demo, Ryan Lefebvre
              will show you <span style={{ color: "#F0EBE1", fontWeight: 500 }}>exactly</span> how
              {" "}&mdash; by building a real automation for a real business, on screen, start to finish.
            </motion.p>

            {/* Event details */}
            <motion.div
              variants={fadeUp}
              custom={0.5}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4 mb-8"
            >
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0522B" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  ),
                  text: "Wednesday, April 16, 2026",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0522B" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  text: "2:00 PM EST / 11:00 AM PST",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0522B" strokeWidth="1.5">
                      <path d="M15 10l5 5-5 5" />
                      <path d="M4 4v7a4 4 0 004 4h12" />
                    </svg>
                  ),
                  text: "60 min live + Q&A",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(192,82,43,0.06)",
                      border: "1px solid rgba(192,82,43,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: "15px",
                      color: "rgba(212,204,184,0.75)",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* What you'll learn — desktop only */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="hidden lg:block"
            >
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(212,204,184,0.45)",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                In 60 minutes, you&apos;ll walk away with
              </span>
              {whatYouLearn.map((item, i) => (
                <motion.div key={i} variants={childFade} className="flex items-start gap-3 mb-4">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "6px",
                      background: "rgba(192,82,43,0.1)",
                      border: "1px solid rgba(192,82,43,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="#C0522B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                      fontSize: "15px",
                      lineHeight: 1.65,
                      color: "rgba(212,204,184,0.7)",
                    }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Registration card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col"
          >
            {/* Glow behind card */}
            <div
              className="absolute -inset-4 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 30%, rgba(192,82,43,0.12), transparent 70%)",
                filter: "blur(40px)",
              }}
              aria-hidden="true"
            />

            {/* Glass card */}
            <div
              className="relative overflow-hidden flex-1 flex flex-col"
              style={{
                borderRadius: "24px",
                background: "rgba(26,26,24,0.6)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(192,82,43,0.15)",
                boxShadow:
                  "0 24px 80px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(192,82,43,0.08) inset, 0 1px 0 rgba(240,235,225,0.04) inset",
              }}
            >
              {/* Animated border beam */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ borderRadius: "24px", overflow: "hidden" }}
                aria-hidden="true"
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "-1px",
                    right: "-1px",
                    bottom: "-1px",
                    borderRadius: "24px",
                    background: `conic-gradient(from 0deg, transparent 0%, transparent 75%, rgba(192,82,43,0.4) 85%, rgba(192,82,43,0.6) 90%, rgba(192,82,43,0.4) 95%, transparent 100%)`,
                    animation: "spin 4s linear infinite",
                    maskImage: `radial-gradient(farthest-side at 50% 50%, transparent calc(100% - 2px), black calc(100% - 1px))`,
                    WebkitMaskImage: `radial-gradient(farthest-side at 50% 50%, transparent calc(100% - 2px), black calc(100% - 1px))`,
                  }}
                />
              </div>

              <div className="relative z-10 p-7 md:p-9 flex-1 flex flex-col">
                {/* Card header */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 600,
                      fontSize: "12px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C0522B",
                    }}
                  >
                    Reserve Your Spot
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="animate-pulse-dot"
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#4ade80",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-condensed)",
                        fontWeight: 500,
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        color: "rgba(74,222,128,0.7)",
                        textTransform: "uppercase",
                      }}
                    >
                      Spots Open
                    </span>
                  </div>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    fontSize: "clamp(26px, 2.6vw, 36px)",
                    color: "#F0EBE1",
                    lineHeight: 1.15,
                    margin: "0 0 6px",
                  }}
                >
                  Solnest AI <span style={{ color: "#C0522B", fontStyle: "italic" }}>Live</span> Demo
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "15px",
                    color: "rgba(212,204,184,0.65)",
                    margin: "0 0 28px",
                    lineHeight: 1.65,
                  }}
                >
                  One hour. One live build. Walk away knowing exactly what AI can do for <span style={{ color: "#F0EBE1", fontWeight: 400 }}>your</span> business.
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "linear-gradient(to right, transparent, rgba(192,82,43,0.2), transparent)",
                    margin: "0 0 28px",
                  }}
                />

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <FloatingInput label="First Name" name="firstName" required />
                        <FloatingInput label="Last Name" name="lastName" required />
                      </div>
                      <FloatingInput label="Email Address" type="email" name="email" required />
                      <FloatingInput label="Phone Number" type="tel" name="phone" />

                      {/* Submit button */}
                      <div className="mt-2">
                        <MagneticButton
                          type="submit"
                          className="w-full bg-rust text-cream overflow-hidden group"
                          style={{
                            padding: "18px 32px",
                            borderRadius: "14px",
                            boxShadow: "0 0 40px rgba(192,82,43,0.25), 0 0 80px rgba(192,82,43,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                          } as React.CSSProperties}
                        >
                          <span
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                            style={{
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                              zIndex: 1,
                              transition: "transform 0.6s ease",
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
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke="rgba(240,235,225,0.3)" strokeWidth="2" />
                                  <path d="M12 2a10 10 0 019.95 9" stroke="#F0EBE1" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Securing your spot...
                              </span>
                            ) : (
                              "Register for Demo"
                            )}
                          </span>
                        </MagneticButton>
                      </div>

                      {/* Trust line */}
                      <div className="flex items-center justify-center gap-4 mt-1">
                        {["Free to attend", "Replay available", "No credit card"].map((t) => (
                          <span
                            key={t}
                            className="flex items-center gap-1"
                            style={{
                              fontFamily: "var(--font-condensed)",
                              fontWeight: 500,
                              fontSize: "10px",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "rgba(212,204,184,0.4)",
                            }}
                          >
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                              <path d="M2.5 5L4 6.5L7.5 3" stroke="rgba(192,82,43,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-8"
                    >
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "50%",
                          background: "rgba(192,82,43,0.12)",
                          border: "1px solid rgba(192,82,43,0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px",
                        }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0522B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 300,
                          fontSize: "28px",
                          color: "#F0EBE1",
                          margin: "0 0 8px",
                        }}
                      >
                        You&apos;re <span style={{ color: "#C0522B", fontStyle: "italic" }}>in.</span>
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 300,
                          fontSize: "15px",
                          color: "rgba(212,204,184,0.65)",
                          lineHeight: 1.65,
                        }}
                      >
                        Check your inbox for the calendar invite and Zoom link.
                        <br />
                        See you on the call.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Urgency line below card */}
            <motion.p
              variants={fadeUp}
              custom={0.8}
              initial="hidden"
              animate="visible"
              className="mt-5 text-center"
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(212,204,184,0.4)",
              }}
            >
              Limited spots &mdash; we keep it small so Ryan can answer every question
            </motion.p>

            {/* ── Your Host — Ryan card ── */}
            <motion.div
              variants={fadeUp}
              custom={1.0}
              initial="hidden"
              animate="visible"
              className="mt-auto pt-8"
              style={{
                borderRadius: "18px",
                background: "rgba(26,26,24,0.45)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(192,82,43,0.1)",
                padding: "20px 22px",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Ryan photo */}
                <div
                  className="relative flex-shrink-0"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid rgba(192,82,43,0.2)",
                  }}
                >
                  <Image
                    src="/ryan.jpg"
                    alt="Ryan Lefebvre"
                    width={128}
                    height={128}
                    className="object-cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    style={{
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 600,
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(212,204,184,0.4)",
                      display: "block",
                      marginBottom: "2px",
                    }}
                  >
                    Your Host
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      fontSize: "22px",
                      color: "#F0EBE1",
                      margin: "0 0 4px",
                      lineHeight: 1.2,
                    }}
                  >
                    Ryan <span style={{ color: "#C0522B", fontStyle: "italic" }}>Lefebvre</span>
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "rgba(212,204,184,0.55)",
                      margin: 0,
                    }}
                  >
                    STR operator turned AI builder. Cut his own workload in half — now he does it for other businesses, live on camera.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3 pl-[80px]">
                {["STR Operator", "AI Builder", "Pilot", "BC, Canada"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-condensed)",
                      fontWeight: 500,
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(192,82,43,0.6)",
                      padding: "3px 8px",
                      borderRadius: "5px",
                      background: "rgba(192,82,43,0.05)",
                      border: "1px solid rgba(192,82,43,0.1)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── What you'll learn — mobile ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="lg:hidden mt-16"
        >
          <span
            style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,204,184,0.45)",
              display: "block",
              marginBottom: "16px",
            }}
          >
            In 60 minutes, you&apos;ll walk away with
          </span>
          {whatYouLearn.map((item, i) => (
            <motion.div key={i} variants={childFade} className="flex items-start gap-3 mb-4">
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "6px",
                  background: "rgba(192,82,43,0.1)",
                  border: "1px solid rgba(192,82,43,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4 7L8 3" stroke="#C0522B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "rgba(212,204,184,0.7)",
                }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
