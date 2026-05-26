"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ShutterText } from "@/components/ui/hero-shutter-text";
import { BlurText } from "@/components/ui/blur-text-animation";

const SplineScene = dynamic(
  () => import("@/components/ui/spline-scene").then((m) => ({ default: m.SplineScene })),
  { ssr: false }
);

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

const TunnelBackground = dynamic(() => import("@/components/ui/tunnel-hero"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", inset: 0, background: "#0D0D0B" }} />,
});

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SCRAMBLE_DURATION = 1400;
const SCRAMBLE_INTERVAL = 40;

function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      if (elapsed >= SCRAMBLE_DURATION) {
        setDisplay(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      setDisplay(
        text
          .split("")
          .map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
          .join("")
      );
    }, SCRAMBLE_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return <>{display}</>;
}

export default function Hero() {
  const isDesktop = useIsDesktop();
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0D0D0B", minHeight: "100dvh", display: "flex", alignItems: "center" }}
    >
      {/* Tunnel — behind everything. Must have explicit dimensions: the
          canvas inside is absolutely positioned, so without inset-0 the
          container collapses to zero height and the ResizeObserver shrinks
          the background to nothing on the first reflow. */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <TunnelBackground opacity={0.6} />
      </div>

      {/* Ambient glow — left side */}
      <div
        className="pointer-events-none absolute top-[-10vw] left-[-5vw] z-[1] animate-breathe"
        style={{
          width: "55vw", height: "55vw",
          background: "radial-gradient(ellipse at center, rgba(192,82,43,0.13) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

<div
        className="relative z-[2] w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center"
        style={{ paddingTop: "80px" }}
      >
        {/* ── LEFT: text ── */}
        <div className="px-6 md:px-10 lg:pl-[max(40px,4vw)] lg:pr-10 py-8 lg:py-12 flex flex-col justify-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55 }}
            className="flex items-center gap-3 mb-8"
          >
            <div style={{ width: "34px", height: "1px", background: "#C0522B", flexShrink: 0 }} />
            <span style={{
              fontFamily: "var(--font-condensed)",
              fontWeight: 600, fontSize: "13px",
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: "#C0522B",
            }}>
              AI Systems for Serious Operators
            </span>
          </motion.div>

          {/* ── HEADLINE ──
              All 4 lines use the SAME font-size clamp so they fill
              the column evenly. "AI" gets its own line and rust italic
              treatment but same scale — no awkward size jumps.
          */}
          <h1 style={{ margin: 0, padding: 0 }}>

            {/* Line 1: shutter reveal — cream */}
            <ShutterText
              text="Watch what happens"
              delay={0.15}
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(36px, 4.2vw, 82px)",
                color: "#F0EBE1",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            />

            {/* Line 2: unified shutter — "when " dim, "AI" rust italic, " meets" cream */}
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(36px, 4.2vw, 82px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              <ShutterText
                text="when "
                delay={0.38}
                style={{ color: "rgba(240,235,225,0.6)" }}
              />
              <ShutterText
                text="AI"
                delay={0.54}
                style={{ color: "#C0522B", fontStyle: "italic" }}
              />
              <ShutterText
                text=" meets"
                delay={0.62}
                style={{ color: "#F0EBE1" }}
              />
            </span>

            {/* Line 3: shutter reveal — cream */}
            <ShutterText
              text="your business."
              delay={0.82}
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(36px, 4.2vw, 82px)",
                color: "#F0EBE1",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            />

          </h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] }}
            style={{
              height: "1px",
              background: "linear-gradient(to right, rgba(192,82,43,0.6), transparent)",
              margin: "28px 0",
              transformOrigin: "left",
              maxWidth: "780px",
            }}
          />

          {/* Value prop — blur text animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.3 }}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(19px, 1.38vw, 23px)",
              lineHeight: 1.8,
              maxWidth: "780px",
              margin: "0 0 34px",
            }}
          >
            <BlurText
              text="Stop doing manually what AI can do in seconds. Solnest AI builds the exact systems that cut your workload in half — and puts them directly into your business."
              once
              style={{ color: "rgba(212,204,184,0.85)" }}
            />
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: `rgba(192,82,43,${0.2 + i * 0.12})`,
                  border: "2px solid #0D0D0B",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: "rgba(240,235,225,0.3)" }} />
                </div>
              ))}
            </div>
            <span style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400, fontSize: "17px",
              color: "rgba(212,204,184,0.7)",
            }}>
              <span style={{ color: "#C0522B", fontWeight: 500 }}>47+ operators</span> saving 10+ hrs/week
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-7"
          >
            <MagneticButton
              href="https://skool.com/solnest-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{
                padding: "19px 44px",
                boxShadow: "0 0 40px rgba(192,82,43,0.3), 0 0 80px rgba(192,82,43,0.1)",
              } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  zIndex: 1, transition: "transform 0.5s ease",
                }}
                aria-hidden="true"
              />
              <span style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600, fontSize: "15px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                position: "relative", zIndex: 2,
              }}>
                Join for $97/mo
              </span>
            </MagneticButton>

            <a
              href="#services"
              style={{
                fontFamily: "var(--font-body)", fontWeight: 400, fontSize: "18px",
                color: "rgba(212,204,184,0.75)",
                borderBottom: "1px solid rgba(212,204,184,0.28)",
                paddingBottom: "2px", textDecoration: "none",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#F0EBE1"; el.style.borderColor = "rgba(212,204,184,0.55)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "rgba(212,204,184,0.75)"; el.style.borderColor = "rgba(212,204,184,0.28)";
              }}
              onFocus={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#F0EBE1"; el.style.borderColor = "rgba(212,204,184,0.55)";
              }}
              onBlur={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "rgba(212,204,184,0.75)"; el.style.borderColor = "rgba(212,204,184,0.28)";
              }}
            >
              See how it works →
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {["Cancel anytime", "No long-term contract"].map((item) => (
              <span key={item} className="flex items-center gap-1.5" style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600, fontSize: "12px",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(212,204,184,0.58)",
              }}>
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4.5" stroke="rgba(192,82,43,0.6)" />
                  <path d="M2.5 5L4 6.5L7.5 3" stroke="#C0522B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </span>
            ))}
          </motion.div>

        </div>

        {/* ── RIGHT: Spline robot — desktop only, lazy-mounted ── */}
        {isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.4 }}
            aria-hidden="true"
            className="hidden lg:block"
            style={{
              position: "relative",
              // Extra headroom so the robot's idle float never clips off the top
              height: "clamp(480px, 62vw, 860px)",
              marginRight: "-8vw",
            }}
          >
            {/* Masked layer — soft-edged window onto the 3D scene. The mask
                lives here (not on the outer wrapper) so the watermark cover
                below is NOT faded out by it. */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                WebkitMaskImage:
                  "radial-gradient(ellipse 92% 95% at 58% 50%, black 50%, transparent 85%)",
                maskImage:
                  "radial-gradient(ellipse 92% 95% at 58% 50%, black 50%, transparent 85%)",
              }}
            >
              <SplineScene
                src="/robot.splinecode"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  // Shrink the canvas so the baked float covers far fewer
                  // on-screen pixels and always stays inside the frame.
                  // (The float amplitude itself is baked into the .splinecode
                  // scene and can only be reduced in the Spline editor.)
                  transform: "scale(0.86) translateY(2%)",
                  transformOrigin: "center center",
                  // Disable cursor interactivity so the baked "Look At" event
                  // never fires — this stops the robot from following the mouse
                  // AND from swinging out of position while Lenis smooth-scrolls
                  // the canvas under a stationary cursor. (Decorative only.)
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Cover the "Built with Spline" watermark, which the runtime
                paints into the canvas pixels (bottom-right) on free-plan
                exports — it is not a DOM node, so it can only be masked here
                or removed via a paid Spline re-export. Feathered so it blends
                into the dark hero background. */}
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: "42%",
                height: "34%",
                background:
                  "radial-gradient(ellipse at bottom right, #0D0D0B 60%, transparent 85%)",
                pointerEvents: "none",
                zIndex: 4,
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-[max(40px,4vw)] z-[3] pointer-events-none hidden lg:flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, rgba(192,82,43,0.5))" }}
        />
        <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(192,82,43,0.5)" }} />
      </motion.div>

    </section>
  );
}
