"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className,
  style,
  strength = 0.3,
  href,
  onClick,
  target,
  rel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);

  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const innerX = useSpring(0, springConfig);
  const innerY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
    innerX.set(-deltaX * 0.4);
    innerY.set(-deltaY * 0.4);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const innerContent = (
    <motion.span
      style={{ x: innerX, y: innerY }}
      className="relative z-10 flex items-center justify-center w-full"
    >
      {children}
    </motion.span>
  );

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0D0D0B]";

  if (href) {
    return (
      <motion.div
        ref={ref}
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="inline-flex"
      >
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={cn("relative group overflow-hidden inline-flex", focusRing, className)}
          style={style}
        >
          {innerContent}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="inline-flex"
    >
      <button
        type={type}
        onClick={onClick}
        className={cn("relative group overflow-hidden inline-flex", focusRing, className)}
        style={style}
      >
        {innerContent}
      </button>
    </motion.div>
  );
}
