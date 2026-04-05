"use client";

import { Suspense, lazy, useEffect, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  src: string;
  previewImage?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SplineScene({
  src,
  previewImage = "/robot-preview.png",
  className,
  style,
}: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Defer Spline loading until browser is idle
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setShouldLoad(true), { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={className} style={{ ...style, position: "relative" }}>
      {/* Static preview — shows instantly, fades out when 3D loads */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `#0D0D0B url(${previewImage}) center center / contain no-repeat`,
          zIndex: 2,
          transition: "opacity 0.8s ease",
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? "none" : "auto",
        }}
      />

      {/* 3D scene — loads when idle */}
      {shouldLoad && (
        <Suspense fallback={null}>
          <Spline
            scene={src}
            style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
            onLoad={() => setLoaded(true)}
          />
        </Suspense>
      )}
    </div>
  );
}
