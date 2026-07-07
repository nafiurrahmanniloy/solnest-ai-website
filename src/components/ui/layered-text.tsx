"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import type React from "react"

interface LayeredTextProps {
  lines?: Array<{ top: string; bottom: string }>
  fontSize?: string
  fontSizeMd?: string
  lineHeight?: number
  lineHeightMd?: number
  className?: string
}

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "INFINITE" },
    { top: "INFINITE", bottom: "PROGRESS" },
    { top: "PROGRESS", bottom: "INNOVATION" },
    { top: "INNOVATION", bottom: "FUTURE" },
    { top: "FUTURE", bottom: "DREAMS" },
    { top: "DREAMS", bottom: "ACHIEVEMENT" },
    { top: "ACHIEVEMENT", bottom: "\u00A0" },
  ],
  fontSize = "72px",
  fontSizeMd = "36px",
  lineHeight = 60,
  lineHeightMd = 35,
  className = "",
}: LayeredTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()
  const listRef = useRef<HTMLUListElement>(null)
  const quickToX = useRef<gsap.QuickToFunc>()
  const quickToY = useRef<gsap.QuickToFunc>()
  const quickToGlow = useRef<gsap.QuickToFunc>()
  const reducedMotionRef = useRef(false)

  const calculateTranslateX = (index: number) => {
    const baseOffset = 35
    const baseOffsetMd = 20
    const centerIndex = Math.floor(lines.length / 2)
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const paragraphs = container.querySelectorAll("p")

    const yVal = window.innerWidth >= 768 ? -lineHeight : -lineHeightMd

    timelineRef.current = gsap.timeline({ repeat: -1, repeatDelay: 3 })

    // Hold initial state
    timelineRef.current.to({}, { duration: 2 })

    // Shift up to reveal next word (staggered cascade)
    timelineRef.current.to(paragraphs, {
      y: yVal,
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.06,
    })

    // Hold the shifted state
    timelineRef.current.to({}, { duration: 3 })

    // Shift back down (staggered cascade)
    timelineRef.current.to(paragraphs, {
      y: 0,
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.06,
    })

    return () => {
      timelineRef.current?.kill()
    }
  }, [lines, lineHeight, lineHeightMd])

  // Pure enhancement: subtle mouse-driven tilt + rust glow on hover.
  // Runs independently of the cascade timeline above (different targets:
  // the <ul> wrapper for tilt, the container for glow), so it can never
  // interfere with the infinite word-cycling animation.
  useEffect(() => {
    const container = containerRef.current
    const list = listRef.current
    if (!container || !list) return

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = mql.matches
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
      if (e.matches) {
        gsap.to(list, { rotateX: 0, rotateY: 0, duration: 0.3, overwrite: true })
        gsap.to(container, { "--layered-glow": 0, duration: 0.3, overwrite: true } as gsap.TweenVars)
      }
    }
    mql.addEventListener("change", handleMotionChange)

    gsap.set(list, { transformPerspective: 800, transformStyle: "preserve3d" })

    quickToX.current = gsap.quickTo(list, "rotateX", { duration: 0.5, ease: "power3.out" })
    quickToY.current = gsap.quickTo(list, "rotateY", { duration: 0.5, ease: "power3.out" })
    quickToGlow.current = gsap.quickTo(container, "--layered-glow", { duration: 0.4, ease: "power2.out" })

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotionRef.current) return
      const rect = container.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      const maxTilt = 4
      quickToY.current?.(relX * maxTilt * 2)
      quickToX.current?.(-relY * maxTilt)
    }

    const handleMouseEnter = () => {
      if (reducedMotionRef.current) return
      quickToGlow.current?.(1)
    }

    const handleMouseLeave = () => {
      quickToX.current?.(0)
      quickToY.current?.(0)
      quickToGlow.current?.(0)
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      mql.removeEventListener("change", handleMotionChange)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto py-24 font-sans font-black tracking-[-2px] uppercase antialiased cursor-pointer ${className}`}
      style={
        {
          fontSize,
          "--md-font-size": fontSizeMd,
          "--layered-glow": 0,
        } as React.CSSProperties
      }
    >
      {/* Rust glow layer, faded in on hover via GSAP-driven --layered-glow (opacity only, GPU-cheap) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: "var(--layered-glow)",
          filter: "blur(28px)",
          background:
            "radial-gradient(ellipse at center, rgba(192,82,43,0.35) 0%, rgba(192,82,43,0) 70%)",
          willChange: "opacity",
        }}
      />
      <ul
        ref={listRef}
        className="relative list-none p-0 m-0 flex flex-col items-center"
        style={{ willChange: "transform" }}
      >
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index)
          return (
            <li
              key={index}
              className="overflow-hidden relative"
              style={
                {
                  height: `${lineHeight}px`,
                  transform: `translateX(${translateX.desktop}px) skew(${index % 2 === 0 ? "60deg, -30deg" : "0deg, -30deg"}) scaleY(${index % 2 === 0 ? "0.66667" : "1.33333"})`,
                  "--md-height": `${lineHeightMd}px`,
                  "--md-translateX": `${translateX.mobile}px`,
                } as React.CSSProperties
              }
            >
              <p
                className="px-[15px] align-top whitespace-nowrap m-0"
                style={{
                  height: `${lineHeight}px`,
                  lineHeight: `${lineHeight - 5}px`,
                }}
              >
                {line.top}
              </p>
              <p
                className="px-[15px] align-top whitespace-nowrap m-0"
                style={{
                  height: `${lineHeight}px`,
                  lineHeight: `${lineHeight - 5}px`,
                }}
              >
                {line.bottom}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
