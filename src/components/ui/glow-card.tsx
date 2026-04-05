"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(192,82,43,0.4)",
  borderRadius = "0",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setGlowStyle({
        background: `radial-gradient(400px circle at ${x}px ${y}px, ${glowColor}, transparent 65%)`,
      });
    },
    [glowColor]
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setGlowStyle({});
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("group relative overflow-hidden", className)}
      style={{ borderRadius }}
    >
      {/* Glow border overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          ...glowStyle,
          borderRadius,
        }}
      />

      {/* Border */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          border: `1px solid ${isHovered ? "rgba(192,82,43,0.3)" : "rgba(192,82,43,0.12)"}`,
          borderRadius,
          transition: "border-color 0.3s ease",
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] h-full"
        style={{
          background: "rgba(13,13,11,0.85)",
          borderRadius,
        }}
      >
        {children}
      </div>
    </div>
  );
}
