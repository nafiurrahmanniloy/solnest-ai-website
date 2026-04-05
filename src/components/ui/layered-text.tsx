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

  return (
    <div
      ref={containerRef}
      className={`mx-auto py-24 font-sans font-black tracking-[-2px] uppercase antialiased cursor-pointer ${className}`}
      style={{ fontSize, "--md-font-size": fontSizeMd } as React.CSSProperties}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center">
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
