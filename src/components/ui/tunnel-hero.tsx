"use client";

import * as THREE from "three";
import { useRef, useEffect, useCallback } from "react";

/* ─── shaders ─── */

const vertexShader = `void main(){ gl_Position = vec4(position, 1.0); }`;

const fragmentShader = `
uniform float iTime;
uniform vec3 iResolution;

#define TAU 6.2831853071795865
#define TUNNEL_LAYERS 56
#define RING_POINTS 128
#define POINT_SIZE 1.8
#define POINT_COLOR_A vec3(1.0)
#define POINT_COLOR_B vec3(0.7)
#define SPEED 0.7

float sq(float x){ return x*x; }

vec2 AngRep(vec2 uv, float angle){
  vec2 polar = vec2(atan(uv.y, uv.x), length(uv));
  polar.x = mod(polar.x + angle/2.0, angle) - angle/2.0;
  return polar.y * vec2(cos(polar.x), sin(polar.x));
}

float sdCircle(vec2 uv, float r){ return length(uv) - r; }

vec3 MixShape(float sd, vec3 fill, vec3 target){
  float blend = smoothstep(0.0, 1.0/iResolution.y, sd);
  return mix(fill, target, blend);
}

vec2 TunnelPath(float x){
  vec2 offs = vec2(
    0.2 * sin(TAU * x * 0.5) + 0.4 * sin(TAU * x * 0.2 + 0.3),
    0.3 * cos(TAU * x * 0.3) + 0.2 * cos(TAU * x * 0.1)
  );
  offs *= smoothstep(1.0, 4.0, x);
  return offs;
}

void main(){
  vec2 res = iResolution.xy / iResolution.y;
  vec2 uv = gl_FragCoord.xy / iResolution.y - res/2.0;
  vec3 color = vec3(0.0);
  float repAngle = TAU / float(RING_POINTS);
  float pointSize = POINT_SIZE / (2.0 * iResolution.y);
  float camZ = iTime * SPEED;
  vec2 camOffs = TunnelPath(camZ);

  for(int i = 1; i <= TUNNEL_LAYERS; i++){
    float pz = 1.0 - (float(i) / float(TUNNEL_LAYERS));
    pz -= mod(camZ, 4.0 / float(TUNNEL_LAYERS));
    vec2 offs = TunnelPath(camZ + pz) - camOffs;
    float ringRad = 0.15 * (1.0 / sq(pz * 0.8 + 0.4));
    if(abs(length(uv + offs) - ringRad) < pointSize * 1.5){
      vec2 aruv = AngRep(uv + offs, repAngle);
      float pdist = sdCircle(aruv - vec2(ringRad, 0), pointSize);
      vec3 ptColor = (mod(float(i/2), 2.0) == 0.0) ? POINT_COLOR_A : POINT_COLOR_B;
      float shade = (1.0 - pz);
      color = MixShape(pdist, ptColor * shade, color);
    }
  }

  gl_FragColor = vec4(color, 1.0);
}
`;

/* ─── three helpers ─── */

type ThreeContext = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  geometry: THREE.PlaneGeometry;
};

/**
 * Render the tunnel at a fraction of native resolution and let CSS upscale the
 * canvas back to 100%. The shader cost is per-pixel of the drawing buffer, so
 * rendering at 0.66x cuts the fragment work to ~44% - the dominant GPU cost of
 * the hero intro - and the softening is invisible behind the dark, 0.6-opacity
 * overlay. Antialiasing is off for the same reason (the upscale blurs edges).
 */
const RENDER_SCALE = 0.5;

function createThreeForCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): ThreeContext {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
  renderer.setPixelRatio(1);
  // updateStyle=false: shrink only the drawing buffer; the canvas CSS stays at
  // 100% (set inline below) so the small buffer is stretched to fill the hero.
  const bw = Math.max(1, Math.round(width * RENDER_SCALE));
  const bh = Math.max(1, Math.round(height * RENDER_SCALE));
  renderer.setSize(bw, bh, false);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(bw, bh, 1) },
    },
    vertexShader,
    fragmentShader,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return { renderer, scene, camera, material, mesh, geometry };
}

function disposeThree(ctx: ThreeContext) {
  try {
    ctx.scene.remove(ctx.mesh);
    ctx.mesh.geometry.dispose();
    ctx.material.dispose();
    ctx.renderer.dispose();
  } catch {
    // ignore disposal errors
  }
}

/* ─── TunnelBackground ─── */

/**
 * Renders the Three.js WebGL tunnel as a pure background canvas.
 * Position absolutely inside a `position: relative` container to fill it.
 * Opacity is intentionally reduced so foreground content stays readable.
 */
export default function TunnelBackground({ opacity = 0.55 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<ThreeContext | null>(null);
  const lastTimeRef = useRef<number>(0);
  const animRef = useRef<number | null>(null);
  const pausedRef = useRef<boolean>(false);
  const rafResizeRef = useRef<boolean>(false);

  const visibleRef = useRef<boolean>(true);

  const animate = useCallback((time: number) => {
    if (!ctxRef.current) return;
    animRef.current = requestAnimationFrame(animate);
    const timeSec = time * 0.001;
    if (pausedRef.current || !visibleRef.current) {
      lastTimeRef.current = timeSec;
      return;
    }
    const delta = timeSec - (lastTimeRef.current || timeSec);
    lastTimeRef.current = timeSec;
    // Render every frame for smooth motion. The shader is cheap now (half-res,
    // 56 layers), so 60fps is sustainable; capping the render rate made the
    // drift visibly choppy.
    ctxRef.current.material.uniforms.iTime.value += delta * 0.5;
    ctxRef.current.renderer.render(ctxRef.current.scene, ctxRef.current.camera);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const container = canvas.parentElement;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const ctx = createThreeForCanvas(canvas, width, height);
    ctxRef.current = ctx;

    const resizeObserver = new ResizeObserver(() => {
      if (!ctxRef.current || rafResizeRef.current) return;
      rafResizeRef.current = true;
      requestAnimationFrame(() => {
        rafResizeRef.current = false;
        if (!ctxRef.current || !container) return;
        // Fall back to the window size: the canvas's parent can report a
        // zero client size (absolutely-positioned children give it no
        // height), and setSize(w, 0) would make the background vanish.
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        if (w === 0 || h === 0) return;
        const bw = Math.max(1, Math.round(w * RENDER_SCALE));
        const bh = Math.max(1, Math.round(h * RENDER_SCALE));
        ctxRef.current.renderer.setPixelRatio(1);
        ctxRef.current.renderer.setSize(bw, bh, false);
        (ctxRef.current.material.uniforms.iResolution.value as THREE.Vector3).set(bw, bh, 1);
      });
    });
    resizeObserver.observe(container);

    const handleVisibility = () => {
      pausedRef.current = !!document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();

    const viewportObserver = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (canvas) viewportObserver.observe(canvas);

    animRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      viewportObserver.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (ctxRef.current) {
        disposeThree(ctxRef.current);
        ctxRef.current = null;
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}
