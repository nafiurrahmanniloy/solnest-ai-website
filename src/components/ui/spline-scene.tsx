"use client";

import { Component, Suspense, lazy, useState, type ReactNode } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * react-spline re-throws a hard scene-load failure during render (`if (i) throw i`).
 * Without a boundary that throw bubbles to the route segment and can blank the hero.
 * The robot is decorative, so we swallow it and keep the ambient placeholder glow.
 *
 * Note: this does NOT silence the runtime's internal "Missing property" console
 * warning - that's a broken interaction baked into robot.splinecode and only goes
 * away by re-exporting the scene from the Spline editor. This boundary only stops a
 * *hard* load failure from taking the hero down with it.
 */
class SplineErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function SplineScene({
  src,
  className,
  style,
}: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className} style={{ ...style, position: "relative" }}>
      {/* Ambient placeholder glow - fades when 3D loads, and stays if it fails */}
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

      {/* 3D scene - loads immediately; never allowed to crash the hero */}
      <SplineErrorBoundary>
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
      </SplineErrorBoundary>
    </div>
  );
}
