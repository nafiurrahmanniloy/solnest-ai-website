'use client'

import { useEffect, useRef, useCallback } from 'react'
import type { ReactNode, CSSProperties } from 'react'

// Electric arc configuration
export const ELECTRIC_CONFIG = {
	timeClampSec: 0.05,
	svg: {
		strokes: {
			outer: { width: 4, color: 'rgba(192,82,43,0.55)' },
			mid: { width: 2.5, color: 'rgba(240,200,120,0.6)' },
			core: { width: 1.4, opacity: 1, color: 'rgba(255,245,230,0.95)' },
		},
		glowBlur: 1.2,
	},
	speeds: [-1.8, 0.6, 1.3],
	shimmer: { speed: 6.0, freq: 12.0, amp: 0.55 },
	segments: 48,
	freqs: [0.9, 3.2, 5.1],
	easeStiffness: 6,
	centerPos: 55,
	clipOffset: 4,
	amps: [0.7, -1.4, 0.9],
} as const

interface LightningSplitProps {
	leftComponent?: ReactNode
	rightComponent?: ReactNode
}

// WebGL Shader Canvas - glow effect on the divider line
function ShaderCanvas({ className = '' }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const rafRef = useRef<number>(0)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true })
		if (!gl) return

		const vert = `
      attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
    `
		const frag = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0,59.4,15.0)));
        vec3 r;
        r.z = fract(512.0*j); j *= .125;
        r.x = fract(512.0*j); j *= .125;
        r.y = fract(512.0*j);
        return r - 0.5;
      }
      const float F3 = 0.3333333;
      const float G3 = 0.1666667;
      float simplex3d(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x,x); w.y = dot(x1,x1); w.z = dot(x2,x2); w.w = dot(x3,x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w; w *= w; d *= w;
        return dot(d, vec4(52.0));
      }
      float noise(vec3 m) {
        return 0.5333333*simplex3d(m) + 0.2666667*simplex3d(2.0*m)
             + 0.1333333*simplex3d(4.0*m) + 0.0666667*simplex3d(8.0*m);
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0;
        vec2 p = gl_FragCoord.xy / iResolution.x;
        float intensity = noise(vec3(p * 12.0 + 12.0, iTime * 0.25));
        float t = clamp((uv.x * -uv.x * 0.16) + 0.15, 0.0, 1.0);
        float y = abs(intensity * -t + uv.y);
        float g = pow(y, 0.14);
        vec3 col = vec3(2.0, 2.1, 2.3) * (1.0 - g);
        col = col * col * col;
        vec4 fragColor;
        fragColor.rgb = col;
        fragColor.w = dot(col, vec3(0.299, 0.587, 0.114));
        gl_FragColor = fragColor;
      }
    `

		function mkShader(type: number, src: string) {
			const s = gl!.createShader(type)!
			gl!.shaderSource(s, src)
			gl!.compileShader(s)
			return gl!.getShaderParameter(s, gl!.COMPILE_STATUS) ? s : null
		}

		const vs = mkShader(gl.VERTEX_SHADER, vert)
		const fs = mkShader(gl.FRAGMENT_SHADER, frag)
		if (!vs || !fs) return

		const prog = gl.createProgram()!
		gl.attachShader(prog, vs)
		gl.attachShader(prog, fs)
		gl.linkProgram(prog)
		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return

		const posAttr = gl.getAttribLocation(prog, 'a_position')
		const timeU = gl.getUniformLocation(prog, 'iTime')
		const resU = gl.getUniformLocation(prog, 'iResolution')

		const buf = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, buf)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)

		function render(t: number) {
			if (!canvas || !gl) return
			if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
				canvas.width = canvas.clientWidth
				canvas.height = canvas.clientHeight
			}
			gl.viewport(0, 0, canvas.width, canvas.height)
			gl.clearColor(0, 0, 0, 0)
			gl.clear(gl.COLOR_BUFFER_BIT)
			gl.enable(gl.BLEND)
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
			gl.useProgram(prog)
			gl.enableVertexAttribArray(posAttr)
			gl.bindBuffer(gl.ARRAY_BUFFER, buf)
			gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)
			gl.uniform1f(timeU, t * 0.001)
			gl.uniform2f(resU, canvas.width, canvas.height)
			gl.drawArrays(gl.TRIANGLES, 0, 6)
			rafRef.current = requestAnimationFrame(render)
		}

		rafRef.current = requestAnimationFrame(render)
		return () => cancelAnimationFrame(rafRef.current)
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className={`${className} pointer-events-none bg-transparent`}
			style={{ display: 'block' }}
		/>
	)
}

export function LightningSplit({ leftComponent, rightComponent }: LightningSplitProps) {
	const rootRef = useRef<HTMLDivElement>(null)
	const leftClipRef = useRef<HTMLDivElement>(null)
	const svgOuterRef = useRef<SVGPolylineElement>(null)
	const svgMidRef = useRef<SVGPolylineElement>(null)
	const svgCoreRef = useRef<SVGPolylineElement>(null)
	const shaderWrapRef = useRef<HTMLDivElement>(null)
	const timeRef = useRef(0)
	const sizeRef = useRef({ width: 1920, height: 1080 })

	const clamp = (v: number) => Math.max(0, Math.min(100, v))

	const tick = useCallback(() => {
		const now = performance.now()
		const dt = Math.min(ELECTRIC_CONFIG.timeClampSec, 0.016)
		timeRef.current += dt
		const time = timeRef.current

		const pos = ELECTRIC_CONFIG.centerPos
		const topX = clamp(pos)
		const bottomX = clamp(pos - ELECTRIC_CONFIG.clipOffset)

		const pts: string[] = []
		const clipPts: string[] = []
		for (let i = 0; i <= ELECTRIC_CONFIG.segments; i++) {
			const tNorm = i / ELECTRIC_CONFIG.segments
			const y = tNorm * 100
			const base = topX * (1 - tNorm) + bottomX * tNorm
			let off = 0
			for (let k = 0; k < ELECTRIC_CONFIG.amps.length; k++) {
				off +=
					ELECTRIC_CONFIG.amps[k] *
					Math.sin(2 * Math.PI * (ELECTRIC_CONFIG.freqs[k] * tNorm + ELECTRIC_CONFIG.speeds[k] * time) + k * 1.3)
			}
			off +=
				ELECTRIC_CONFIG.shimmer.amp *
				Math.sin(2 * Math.PI * (ELECTRIC_CONFIG.shimmer.freq * tNorm + ELECTRIC_CONFIG.shimmer.speed * time))
			const x = clamp(base + off)
			pts.push(`${x},${y}`)
			clipPts.push(`${x}% ${y}%`)
		}

		const polyPointsStr = pts.join(' ')
		const clipPolygonStr = `polygon(0% 0%, ${clipPts.join(', ')}, 0% 100%)`

		// Direct DOM updates - no React re-render
		if (leftClipRef.current) {
			leftClipRef.current.style.clipPath = clipPolygonStr
			;(leftClipRef.current.style as CSSProperties & { WebkitClipPath?: string }).WebkitClipPath = clipPolygonStr
		}
		if (svgOuterRef.current) svgOuterRef.current.setAttribute('points', polyPointsStr)
		if (svgMidRef.current) svgMidRef.current.setAttribute('points', polyPointsStr)
		if (svgCoreRef.current) svgCoreRef.current.setAttribute('points', polyPointsStr)

		// Update shader position
		if (shaderWrapRef.current) {
			const { width, height } = sizeRef.current
			const x1 = (pos / 100) * width
			const x2 = ((pos - ELECTRIC_CONFIG.clipOffset) / 100) * width
			const angle = Math.atan2(height, x2 - x1) * (180 / Math.PI)
			shaderWrapRef.current.style.left = `${x1}px`
			shaderWrapRef.current.style.transform = `rotate(${angle}deg)`
		}

		requestAnimationFrame(tick)
	}, [])

	useEffect(() => {
		const update = () => {
			if (rootRef.current) {
				sizeRef.current = {
					width: rootRef.current.offsetWidth,
					height: rootRef.current.offsetHeight,
				}
			}
		}
		update()
		const ro = new ResizeObserver(update)
		if (rootRef.current) ro.observe(rootRef.current)

		const raf = requestAnimationFrame(tick)
		return () => {
			ro.disconnect()
			cancelAnimationFrame(raf)
		}
	}, [tick])

	// Compute initial shader position
	const pos = ELECTRIC_CONFIG.centerPos
	const x1 = (pos / 100) * sizeRef.current.width
	const x2 = ((pos - ELECTRIC_CONFIG.clipOffset) / 100) * sizeRef.current.width
	const angle = Math.atan2(sizeRef.current.height, x2 - x1) * (180 / Math.PI)
	const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(sizeRef.current.height, 2))

	return (
		<div ref={rootRef} className="relative h-full w-full overflow-hidden select-none">
			{/* Right panel - WITHOUT AI - always visible base layer */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="h-full w-full">{rightComponent}</div>
			</div>

			{/* Left panel - WITH AI - clipped by the animated lightning edge */}
			<div ref={leftClipRef} className="absolute inset-0 overflow-hidden">
				<div className="h-full w-full">{leftComponent}</div>
			</div>

			{/* SVG electric arc */}
			<svg
				className="pointer-events-none absolute inset-0 z-30 select-none"
				width="100%"
				height="100%"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
			>
				<defs>
					<filter id="elec-glow" x="-80%" y="-10%" width="260%" height="120%">
						<feGaussianBlur stdDeviation={ELECTRIC_CONFIG.svg.glowBlur} result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<filter id="elec-strong-glow" x="-100%" y="-20%" width="300%" height="140%">
						<feGaussianBlur stdDeviation={2.5} result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				<polyline
					ref={svgOuterRef}
					points=""
					fill="none"
					stroke={ELECTRIC_CONFIG.svg.strokes.outer.color}
					strokeWidth={ELECTRIC_CONFIG.svg.strokes.outer.width}
					vectorEffect="non-scaling-stroke"
					filter="url(#elec-strong-glow)"
				/>
				<polyline
					ref={svgMidRef}
					points=""
					fill="none"
					stroke={ELECTRIC_CONFIG.svg.strokes.mid.color}
					strokeWidth={ELECTRIC_CONFIG.svg.strokes.mid.width}
					vectorEffect="non-scaling-stroke"
					filter="url(#elec-glow)"
				/>
				<polyline
					ref={svgCoreRef}
					points=""
					fill="none"
					stroke={ELECTRIC_CONFIG.svg.strokes.core.color}
					strokeOpacity={ELECTRIC_CONFIG.svg.strokes.core.opacity}
					strokeWidth={ELECTRIC_CONFIG.svg.strokes.core.width}
					vectorEffect="non-scaling-stroke"
				/>
			</svg>

			{/* Shader glow overlay along the divider line */}
			<div
				ref={shaderWrapRef}
				className="pointer-events-none absolute z-20 select-none"
				style={{
					top: 0,
					left: x1,
					width: `${lineLength}px`,
					transformOrigin: 'left top',
					transform: `rotate(${angle}deg)`,
					userSelect: 'none',
				}}
			>
				<div className="h-8 w-[120vw] -translate-x-16">
					<div className="pointer-events-none relative h-screen w-screen opacity-80">
						<div className="pointer-events-none absolute inset-0 z-20 h-screen w-[100vw] translate-x-[10%] -translate-y-[48%] scale-150 lg:w-screen lg:translate-x-0">
							<ShaderCanvas className="h-[100vh] w-[200vw]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
