"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

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
 * ShutterText — per-character reveal with three brand-colored slices
 * that shutter across each letter before snapping to the final colour.
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
    <span
      className={cn("inline-flex flex-wrap items-center", className)}
      style={style}
      aria-label={text}
    >
      {chars.map((char, i) => {
        const charDelay = delay + i * stagger;
        const isSpace = char === " ";

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
              // Tighten horizontal gaps between chars
              letterSpacing: "inherit",
            }}
            aria-hidden="true"
          >
            {/* ── Main character — blur-in reveal ── */}
            <motion.span
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: charDelay + 0.18, duration: 0.65 }}
              style={{ display: "block" }}
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>

            {/* ── Top slice (0–35%) — rust, left → right ── */}
            <motion.span
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: charDelay, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: 0,
                clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                color: "#C0522B",
                pointerEvents: "none", zIndex: 10,
              }}
              aria-hidden="true"
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>

            {/* ── Middle slice (35–65%) — cream, right → left ── */}
            <motion.span
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: charDelay + 0.08, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: 0,
                clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                color: "#F0EBE1",
                pointerEvents: "none", zIndex: 10,
              }}
              aria-hidden="true"
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>

            {/* ── Bottom slice (65–100%) — gold, left → right ── */}
            <motion.span
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: charDelay + 0.16, ease: "easeInOut" }}
              style={{
                position: "absolute", inset: 0,
                clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                color: "#C9A84C",
                pointerEvents: "none", zIndex: 10,
              }}
              aria-hidden="true"
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
