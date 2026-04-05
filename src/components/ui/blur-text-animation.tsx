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
      return {
        text: word,
        duration: 1.8 + Math.cos(i * 0.3) * 0.25,
        delay: i * 0.055 + Math.pow(progress, 0.75) * 0.4 + (Math.random() - 0.5) * 0.04,
        blur: 10 + Math.floor(Math.random() * 7),
        scale: 0.92 + Math.sin(i * 0.2) * 0.05,
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
