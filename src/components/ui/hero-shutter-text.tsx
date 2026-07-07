"use client";

import React from "react";

interface ShutterTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Base delay before the first character animates (seconds) */
  delay?: number;
  /** Per-character stagger (seconds). Default 0.032 */
  stagger?: number;
}

/**
 * ShutterText - per-character reveal with three brand-colored slices
 * that shutter across each letter before snapping to the final colour.
 *
 * Implemented with pure CSS animations (no framer-motion): the headline has
 * ~45 characters and framer-motion was mounting 4 JS-driven motion components
 * per character (~180 total), whose mount + per-frame style updates ran on the
 * main thread and stuttered the intro. CSS keyframes on transform/opacity run
 * on the compositor, so the reveal is effectively free and starts smoothly.
 *
 * Slice palette (Solnest brand):
 *   top    → rust   #C0522B  (slides left → right)
 *   middle → cream  #F0EBE1  (slides right → left)
 *   bottom → gold   #C9A84C  (slides left → right)
 */
export function ShutterText({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.032,
}: ShutterTextProps) {
  const chars = text.split("");

  return (
    <span className={className} style={style}>
      {/* Clean, machine-readable copy for SEO + screen readers. The animated
          glyphs below stack 4 spans per character (main + 3 colour slices), so
          their combined textContent is garbled ("WWWWaaaa..."); this sr-only
          layer carries the real sentence and the decorative layer is aria-hidden. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap items-center">
      {chars.map((char, i) => {
        const charDelay = delay + i * stagger;
        const isSpace = char === " ";
        const glyph = isSpace ? " " : char;

        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              // Extra bottom padding so descenders (y, g, p) aren't clipped
              paddingBottom: "0.14em",
              marginBottom: "-0.14em",
              letterSpacing: "inherit",
            }}
            aria-hidden="true"
          >
            {/* ── Main character - transform + opacity reveal ── */}
            <span
              className="shutter-char"
              style={{
                display: "block",
                animationDelay: `${charDelay + 0.18}s`,
                willChange: "transform, opacity",
              }}
            >
              {glyph}
            </span>

            {/* ── Top slice (0–35%) - rust, left → right ── */}
            <span
              className="shutter-slice"
              style={{
                position: "absolute", inset: 0,
                clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                color: "#C0522B",
                pointerEvents: "none", zIndex: 10,
                animationName: "shutterSliceR",
                animationDelay: `${charDelay}s`,
                willChange: "transform, opacity",
              }}
              aria-hidden="true"
            >
              {glyph}
            </span>

            {/* ── Middle slice (35–65%) - cream, right → left ── */}
            <span
              className="shutter-slice"
              style={{
                position: "absolute", inset: 0,
                clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                color: "#F0EBE1",
                pointerEvents: "none", zIndex: 10,
                animationName: "shutterSliceL",
                animationDelay: `${charDelay + 0.08}s`,
                willChange: "transform, opacity",
              }}
              aria-hidden="true"
            >
              {glyph}
            </span>

            {/* ── Bottom slice (65–100%) - gold, left → right ── */}
            <span
              className="shutter-slice"
              style={{
                position: "absolute", inset: 0,
                clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                color: "#C9A84C",
                pointerEvents: "none", zIndex: 10,
                animationName: "shutterSliceR",
                animationDelay: `${charDelay + 0.16}s`,
                willChange: "transform, opacity",
              }}
              aria-hidden="true"
            >
              {glyph}
            </span>
          </span>
        );
      })}
      </span>
    </span>
  );
}
