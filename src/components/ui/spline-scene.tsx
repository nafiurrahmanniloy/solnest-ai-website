"use client";

import { Suspense, lazy, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SplineScene({
  src,
  className,
  style,
}: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className} style={{ ...style, position: "relative" }}>
      {/* Ambient placeholder glow — fades when 3D loads */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 55% 45%, rgba(192,82,43,0.08) 0%, transparent 70%)",
          zIndex: 2,
          transition: "opacity 1s ease",
          opacity: loaded ? 0 : 1,
          pointerEvents: "none",
        }}
      />

      {/* 3D scene — loads immediately */}
      <Suspense fallback={null}>
        <Spline
          scene={src}
          style={{
            width: "100%", height: "100%",
            position: "absolute", inset: 0,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
          onLoad={() => setLoaded(true)}
        />
      </Suspense>
    </div>
  );
}
