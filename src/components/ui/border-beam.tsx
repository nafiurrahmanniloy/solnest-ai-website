"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  className?: string;
}

export function BorderBeam({
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = "#C0522B",
  colorTo = "#C9A84C",
  delay = 0,
  className,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{ borderRadius: "inherit" }}
    >
      {/* Animated gradient top border sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${borderWidth}px`,
          background: `linear-gradient(90deg, transparent 0%, ${colorFrom} 40%, ${colorTo} 60%, transparent 100%)`,
          animation: `borderBeamSweep ${duration}s ${delay}s linear infinite`,
        }}
      />
      {/* Animated gradient right border sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: `${borderWidth}px`,
          background: `linear-gradient(180deg, transparent 0%, ${colorFrom} 40%, ${colorTo} 60%, transparent 100%)`,
          animation: `borderBeamSweepV ${duration}s ${delay + duration * 0.25}s linear infinite`,
        }}
      />
      {/* Animated gradient bottom border sweep */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: `${borderWidth}px`,
          background: `linear-gradient(270deg, transparent 0%, ${colorFrom} 40%, ${colorTo} 60%, transparent 100%)`,
          animation: `borderBeamSweep ${duration}s ${delay + duration * 0.5}s linear infinite`,
        }}
      />
      {/* Animated gradient left border sweep */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: `${borderWidth}px`,
          background: `linear-gradient(0deg, transparent 0%, ${colorFrom} 40%, ${colorTo} 60%, transparent 100%)`,
          animation: `borderBeamSweepV ${duration}s ${delay + duration * 0.75}s linear infinite`,
        }}
      />

      <style>{`
        @keyframes borderBeamSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes borderBeamSweepV {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
