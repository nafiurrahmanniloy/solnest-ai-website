"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

/**
 * Hold the heavy Spline robot back ~1.2s so its runtime parse and second
 * WebGL context don't block the main thread or fight the GPU while the
 * headline intro is playing. The network is warmed at T=0 (see the warm-up
 * effect in Hero), so by mount time both the runtime chunk and the scene
 * file are already in the browser cache - the delay only dodges the parse.
 */
function useDeferredMount(delayMs = 1200) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // A fixed timeout (NOT requestIdleCallback): rIC fires opportunistically
    // during idle gaps that occur *while the intro is still playing*, so the
    // robot's ~2.2s scene-parse freeze would land mid-reveal. A hard delay
    // guarantees the headline intro finishes before the robot ever mounts.
    const timer = setTimeout(() => setReady(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);
  return ready;
}

const TunnelBackground = dynamic(() => import("@/components/ui/tunnel-hero"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", inset: 0, background: "#0D0D0B" }} />,
});

// House ease - the one sanctioned motion curve site-wide.
const EASE: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

export default function Hero() {
  const isDesktop = useIsDesktop();
  const robotReady = useDeferredMount();
  const prefersReducedMotion = useReducedMotion();

  // Warm the network at T=0: kick off the Spline runtime chunk and the scene
  // file immediately so the deferred mount parses from browser cache instead
  // of hitting the network cold. Fire-and-forget; errors swallowed - the
  // deferred mount handles real failures via its own error boundary.
  useEffect(() => {
    import("@splinetool/react-spline").catch(() => {});
    fetch("/robot.splinecode").catch(() => {});
  }, []);

  // Sanctioned parallax moment (a): the Spline column drifts up ~60px slower
  // than the copy as the hero scrolls away. Transforms only; off under
  // reduced motion.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const splineY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#0D0D0B", minHeight: "100dvh", display: "flex", alignItems: "center" }}
    >
      {/* Tunnel - behind everything. Must have explicit dimensions: the
          canvas inside is absolutely positioned, so without inset-0 the
          container collapses to zero height and the ResizeObserver shrinks
          the background to nothing on the first reflow. */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <TunnelBackground opacity={0.6} />
      </div>

      {/* Ambient glow - left side */}
      <div
        className="pointer-events-none absolute top-[-10vw] left-[-5vw] z-[1]"
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
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
              treatment but same scale - no awkward size jumps.
          */}
          <h1 style={{ margin: 0, padding: 0 }}>

            {/* Line 1: shutter reveal - cream */}
            <ShutterText
              text="Watch what happens"
              delay={0.15}
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))",
                color: "#F0EBE1",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            />

            {/* Line 2: unified shutter - "when " dim, "AI" rust italic, " meets" cream */}
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))",
                lineHeight: 1.05,
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

            {/* Line 3: shutter reveal - cream */}
            <ShutterText
              text="your business."
              delay={0.82}
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "var(--fs-display-xl, clamp(40px, 6vw, 96px))",
                color: "#F0EBE1",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            />

          </h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
            style={{
              height: "1px",
              background: "linear-gradient(to right, rgba(192,82,43,0.6), transparent)",
              margin: "28px 0",
              transformOrigin: "left",
              maxWidth: "780px",
            }}
          />

          {/* Value prop - blur text animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
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
              text="We help operators put AI to work: running the busywork so the business runs without you. Short-term rental or any other business, there's a door for you."
              once
              style={{ color: "rgba(212,204,184,0.85)" }}
            />
          </motion.p>

          {/* Social proof — a true statement, not a made-up metric */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
            className="flex items-center gap-2.5 mb-7"
          >
            <span
              aria-hidden="true"
              style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#C0522B", boxShadow: "0 0 10px rgba(192,82,43,0.6)",
                flexShrink: 0,
              }}
            />
            <span style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400, fontSize: "17px",
              color: "rgba(212,204,184,0.7)",
            }}>
              Real AI systems, <span style={{ color: "#C0522B", fontWeight: 500 }}>running in real businesses.</span>
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-7"
          >
            {/* Primary door → scroll to the STR community deep-dive */}
            <MagneticButton
              href="#community"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{
                padding: "19px 40px",
                boxShadow: "0 0 40px rgba(192,82,43,0.3), 0 0 80px rgba(192,82,43,0.1)",
              } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  zIndex: 1, transition: "transform 0.5s cubic-bezier(0.215,0.61,0.355,1)",
                }}
                aria-hidden="true"
              />
              <span style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600, fontSize: "15px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                position: "relative", zIndex: 2,
              }}>
                Explore the Community
              </span>
            </MagneticButton>

            {/* Secondary door → scroll to Done-For-You services */}
            <MagneticButton
              href="#services"
              className="group relative overflow-hidden"
              style={{
                padding: "19px 40px",
                border: "1px solid rgba(240,235,225,0.28)",
                background: "rgba(240,235,225,0.02)",
              } as React.CSSProperties}
            >
              <span style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600, fontSize: "15px",
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#F0EBE1",
                position: "relative", zIndex: 2,
              }}>
                Get AI Built For You
              </span>
            </MagneticButton>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.7, ease: EASE }}
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

        {/* ── RIGHT: Spline robot column. The sized frame is ALWAYS rendered
            (height reserved unconditionally) so mounting the robot never
            shifts layout. A static rust radial glow acts as the poster while
            the scene loads - and is the permanent stand-in under reduced
            motion. The scene itself still mounts after the intro settles so
            its heavy runtime doesn't stall the headline reveal. ── */}
        <motion.div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: "relative",
            // Extra headroom so the robot's idle float never clips off the top
            height: "clamp(480px, 62vw, 860px)",
            marginRight: "-8vw",
            // Sanctioned hero parallax: column drifts up slower than copy.
            y: prefersReducedMotion ? 0 : splineY,
          }}
        >
          {/* Static rust radial glow - loading poster / reduced-motion
              stand-in. Never animated. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 55% at 57% 45%, rgba(192,82,43,0.1), transparent 65%)",
              pointerEvents: "none",
            }}
          />

          {isDesktop && robotReady && !prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ position: "absolute", inset: 0 }}
            >
              {/* Masked layer - soft-edged window onto the 3D scene. The
                  radial mask fades the canvas (including the bottom-right
                  "Built with Spline" watermark baked into the pixels) to
                  full transparency at the edges. */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  WebkitMaskImage:
                    "radial-gradient(ellipse 80% 84% at 57% 45%, black 40%, transparent 72%)",
                  maskImage:
                    "radial-gradient(ellipse 80% 84% at 57% 45%, black 40%, transparent 72%)",
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
                    // never fires - this stops the robot from following the mouse
                    // AND from swinging out of position while Lenis smooth-scrolls
                    // the canvas under a stationary cursor. (Decorative only.)
                    pointerEvents: "none",
                  }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.7, ease: EASE }}
        className="absolute bottom-8 left-[max(40px,4vw)] z-[3] pointer-events-none hidden lg:flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <motion.div
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, rgba(192,82,43,0.5))" }}
        />
        <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(192,82,43,0.5)" }} />
      </motion.div>

    </section>
  );
}
