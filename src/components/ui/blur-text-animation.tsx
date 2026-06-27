"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

interface WordData {
  text: string;
  duration: number;
  delay: number;
  blur: number;
  scale?: number;
}

interface BlurTextProps {
  text: string;
  /** Run once on mount (no loop). Default: false */
  once?: boolean;
  /** Delay between loops in ms. Default: 5000 */
  loopDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Deterministic pseudo-random in [0, 1) from an integer seed (mulberry32).
 *
 * Two rules keep this hydration-safe — every value below ends up in a word's
 * inline `style`, and any SSR-vs-client difference triggers a React hydration
 * mismatch (#418/#423/#425) that tears down the SSR hero and re-renders it on
 * the client, freezing the Framer Motion entry animations at opacity:0 (the
 * whole hero headline goes invisible):
 *   1. Never use Math.random() — useMemo re-runs on the client during
 *      hydration, so it would produce different markup than the server sent.
 *   2. Use only integer ops here (Math.imul / bitwise). Math.sin/cos/pow are
 *      NOT guaranteed bit-identical across JS engines, so Node (SSR) and the
 *      browser (client) can disagree in the last digit — enough to mismatch.
 * Anything derived from a transcendental (sin/cos/pow) below is rounded via
 * round4() for the same reason.
 */
function seededRandom(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Round to 4 decimals so cross-engine float differences never reach the DOM. */
const round4 = (n: number) => Math.round(n * 1e4) / 1e4;

/**
 * BlurText — drop-in inline text with cinematic blur-in animation.
 * Renders as a <span> so it sits naturally inside any parent element.
 */
export function BlurText({ text, once = false, loopDelay = 5000, className = "", style }: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const animTimer = useRef<ReturnType<typeof setTimeout>>();
  const loopTimer = useRef<ReturnType<typeof setTimeout>>();

  const words: WordData[] = useMemo(() => {
    return text.split(" ").map((word, i, arr) => {
      const progress = i / arr.length;
      const jitter = seededRandom(i + 1);
      const blurRand = seededRandom(i + 100);
      return {
        text: word,
        duration: round4(1.8 + Math.cos(i * 0.3) * 0.25),
        delay: round4(i * 0.055 + Math.pow(progress, 0.75) * 0.4 + (jitter - 0.5) * 0.04),
        blur: 10 + Math.floor(blurRand * 7),
        scale: round4(0.92 + Math.sin(i * 0.2) * 0.05),
      };
    });
  }, [text]);

  useEffect(() => {
    const run = () => {
      // Small mount delay so it doesn't fire before paint
      loopTimer.current = setTimeout(() => {
        setIsVisible(true);

        if (!once) {
          // Find when last word finishes, then hide + schedule next loop
          const maxEnd = Math.max(...words.map(w => w.delay + w.duration));
          animTimer.current = setTimeout(() => {
            setIsVisible(false);
            loopTimer.current = setTimeout(run, loopDelay);
          }, (maxEnd + 0.6) * 1000);
        }
      }, 120);
    };

    run();
    return () => {
      clearTimeout(animTimer.current);
      clearTimeout(loopTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block"
          style={{
            marginRight: "0.32em",
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? "blur(0px)" : `blur(${w.blur}px)`,
            transform: isVisible
              ? "translateY(0) scale(1)"
              : `translateY(16px) scale(${w.scale ?? 1})`,
            transition: `opacity ${w.duration}s, filter ${w.duration}s, transform ${w.duration}s`,
            transitionDelay: `${w.delay}s`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "filter, transform, opacity",
          }}
        >
          {w.text}
        </span>
      ))}
    </span>
  );
}
