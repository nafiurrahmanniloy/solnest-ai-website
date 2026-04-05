'use client'

import { motion } from 'framer-motion'
import { LightningSplit } from '@/components/ui/lightning-split'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'

// ─── Left panel: WITH AI ──────────────────────────────────────────────────────

function WithAIPanel() {
	return (
		<div
			className="relative flex h-full w-full flex-col"
			style={{
				background: '#0D0D0B',
				paddingTop: '5%',
				paddingBottom: '5%',
				paddingLeft: 'clamp(20px, 4.5%, 64px)',
				paddingRight: '52%',
			}}
		>
			{/* Warm ambient glow */}
			<div className="pointer-events-none absolute" style={{
				top: '-5%', left: '-8%',
				width: '60%', height: '70%',
				background: 'radial-gradient(ellipse, rgba(192,82,43,0.18) 0%, transparent 65%)',
				filter: 'blur(65px)',
			}} />
			<div className="pointer-events-none absolute" style={{
				bottom: '0%', left: '10%',
				width: '40%', height: '45%',
				background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 65%)',
				filter: 'blur(55px)',
			}} />

			<div className="relative z-10 flex flex-col h-full">
				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-40px' }}
					transition={{ duration: 0.5 }}
					className="mb-5 inline-flex items-center gap-2"
					style={{
						background: 'rgba(192,82,43,0.10)',
						border: '1px solid rgba(192,82,43,0.30)',
						padding: '5px 13px',
						width: 'fit-content',
						borderRadius: '2px',
					}}
				>
					<div className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C0522B', boxShadow: '0 0 8px rgba(192,82,43,0.6)' }} />
					<span style={{
						fontFamily: 'var(--font-condensed)', fontWeight: 600,
						fontSize: '9px', letterSpacing: '0.24em',
						textTransform: 'uppercase', color: '#C0522B',
					}}>
						With Solnest AI
					</span>
				</motion.div>

				{/* Headline */}
				<motion.h2
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-40px' }}
					transition={{ duration: 0.6, delay: 0.06 }}
					style={{
						fontFamily: 'var(--font-display)', fontWeight: 300,
						fontSize: 'clamp(18px, 1.9vw, 34px)',
						lineHeight: 1.1, color: '#F0EBE1',
						letterSpacing: '-0.02em', marginBottom: '8px',
					}}
				>
					You wake up.{' '}
					<span style={{ fontStyle: 'italic', color: '#C0522B' }}>It&apos;s already done.</span>
				</motion.h2>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: '-40px' }}
					transition={{ duration: 0.5, delay: 0.1 }}
					style={{
						fontFamily: 'var(--font-body)', fontWeight: 300,
						fontSize: 'clamp(10.5px, 0.72vw, 13px)', lineHeight: 1.7,
						color: 'rgba(212,204,184,0.65)', marginBottom: '14px',
					}}
				>
					Guests booked. Prices optimized. Reviews responded to. All while you slept.
				</motion.p>

				{/* Separator */}
				<motion.div
					initial={{ scaleX: 0, opacity: 0 }}
					whileInView={{ scaleX: 1, opacity: 1 }}
					viewport={{ once: true, margin: '-40px' }}
					transition={{ duration: 0.75, delay: 0.14 }}
					style={{
						height: '1px',
						background: 'linear-gradient(to right, rgba(192,82,43,0.5), rgba(201,168,76,0.25), transparent)',
						transformOrigin: 'left',
						marginBottom: '18px',
					}}
				/>

				{/* TIME + MONEY — stacked vertically, full height */}
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0', minHeight: 0 }}>

					{/* TIME block */}
					<motion.div
						initial={{ opacity: 0, y: 22 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-40px' }}
						transition={{ duration: 0.6, delay: 0.16, ease: [0.215, 0.61, 0.355, 1.0] }}
						style={{
							flex: 1,
							display: 'flex', flexDirection: 'column', justifyContent: 'center',
							paddingBottom: '12px',
							borderBottom: '1px solid rgba(192,82,43,0.12)',
						}}
					>
						<span style={{
							fontFamily: 'var(--font-condensed)', fontWeight: 600,
							fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase',
							color: 'rgba(192,82,43,0.65)', marginBottom: '6px', display: 'block',
						}}>
							Time Saved
						</span>
						<motion.span
							initial={{ opacity: 0, scale: 0.88 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
							style={{
								display: 'block',
								fontFamily: 'var(--font-display)', fontWeight: 300,
								fontSize: 'clamp(38px, 4vw, 74px)',
								lineHeight: 1, letterSpacing: '-0.04em',
								color: '#C0522B',
								textShadow: '0 0 40px rgba(192,82,43,0.5), 0 0 80px rgba(192,82,43,0.2)',
							}}
						>
							21hrs
						</motion.span>
						<span style={{
							fontFamily: 'var(--font-body)', fontWeight: 300,
							fontSize: 'clamp(10.5px, 0.68vw, 12.5px)', lineHeight: 1.6,
							color: 'rgba(212,204,184,0.6)', marginTop: '5px', display: 'block',
						}}>
							Per week — no more answering the same 47 guest messages manually.
						</span>
					</motion.div>

					{/* MONEY block */}
					<motion.div
						initial={{ opacity: 0, y: 22 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-40px' }}
						transition={{ duration: 0.6, delay: 0.28, ease: [0.215, 0.61, 0.355, 1.0] }}
						style={{
							flex: 1,
							display: 'flex', flexDirection: 'column', justifyContent: 'center',
							paddingTop: '12px',
						}}
					>
						<span style={{
							fontFamily: 'var(--font-condensed)', fontWeight: 600,
							fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase',
							color: 'rgba(201,168,76,0.65)', marginBottom: '6px', display: 'block',
						}}>
							Revenue Impact
						</span>
						<motion.span
							initial={{ opacity: 0, scale: 0.88 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.34, ease: [0.34, 1.56, 0.64, 1] }}
							style={{
								display: 'block',
								fontFamily: 'var(--font-display)', fontWeight: 300,
								fontSize: 'clamp(38px, 4vw, 74px)',
								lineHeight: 1, letterSpacing: '-0.04em',
								color: '#C9A84C',
								textShadow: '0 0 40px rgba(201,168,76,0.45), 0 0 80px rgba(201,168,76,0.18)',
							}}
						>
							+$2,400
						</motion.span>
						<span style={{
							fontFamily: 'var(--font-body)', fontWeight: 300,
							fontSize: 'clamp(10.5px, 0.68vw, 12.5px)', lineHeight: 1.6,
							color: 'rgba(212,204,184,0.6)', marginTop: '5px', display: 'block',
						}}>
							Extra per month — AI pricing captures every demand spike you&apos;d miss.
						</span>
					</motion.div>
				</div>

				{/* CTA */}
				<motion.a
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.45 }}
					href="https://skool.com/solnest-ai"
					target="_blank"
					rel="noopener noreferrer"
					className="group"
					style={{
						display: 'inline-flex', alignItems: 'center', gap: '8px',
						fontFamily: 'var(--font-condensed)', fontWeight: 600,
						fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
						color: '#C0522B', textDecoration: 'none',
						borderBottom: '1px solid rgba(192,82,43,0.35)', paddingBottom: '3px',
						marginTop: '18px', width: 'fit-content',
						transition: 'border-color 0.3s',
					}}
				>
					Stop working inside your business →
				</motion.a>
			</div>
		</div>
	)
}

// ─── Right panel: WITHOUT AI ──────────────────────────────────────────────────

function WithoutAIPanel() {
	return (
		<div
			className="relative flex h-full w-full flex-col"
			style={{
				background: '#0A0A08',
				paddingTop: '5%',
				paddingBottom: '5%',
				paddingLeft: '57%',
				paddingRight: 'clamp(20px, 4.5%, 64px)',
			}}
		>
			{/* Cold muted glow */}
			<div className="pointer-events-none absolute" style={{
				top: '5%', right: '0%',
				width: '50%', height: '60%',
				background: 'radial-gradient(ellipse, rgba(120,60,60,0.06) 0%, transparent 65%)',
				filter: 'blur(55px)',
			}} />

			<div className="relative z-10 flex flex-col h-full">
				{/* Badge */}
				<div
					className="mb-5 inline-flex items-center gap-2"
					style={{
						background: 'rgba(180,70,60,0.06)',
						border: '1px solid rgba(180,70,60,0.18)',
						padding: '5px 13px',
						width: 'fit-content',
						borderRadius: '2px',
					}}
				>
					<div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(180,70,60,0.45)' }} />
					<span style={{
						fontFamily: 'var(--font-condensed)', fontWeight: 600,
						fontSize: '9px', letterSpacing: '0.24em',
						textTransform: 'uppercase', color: 'rgba(200,120,100,0.7)',
					}}>
						Without AI
					</span>
				</div>

				{/* Headline */}
				<h2
					style={{
						fontFamily: 'var(--font-display)', fontWeight: 300,
						fontSize: 'clamp(18px, 1.9vw, 34px)',
						lineHeight: 1.1, color: 'rgba(210,195,180,0.72)',
						letterSpacing: '-0.02em', marginBottom: '8px',
					}}
				>
					You <span style={{ fontStyle: 'italic', color: 'rgba(200,120,100,0.55)' }}>are</span> the bottleneck.
				</h2>

				<p style={{
					fontFamily: 'var(--font-body)', fontWeight: 300,
					fontSize: 'clamp(10.5px, 0.72vw, 13px)', lineHeight: 1.7,
					color: 'rgba(180,170,155,0.55)', marginBottom: '14px',
				}}>
					Every booking, every message, every pricing change — waiting on you.
				</p>

				{/* Separator */}
				<div style={{
					height: '1px',
					background: 'linear-gradient(to right, rgba(180,70,60,0.22), transparent)',
					marginBottom: '18px',
				}} />

				{/* TIME + MONEY — stacked vertically */}
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0', minHeight: 0 }}>

					{/* TIME block */}
					<motion.div
						initial={{ opacity: 0, x: 18 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-40px' }}
						transition={{ duration: 0.6, delay: 0.16, ease: [0.215, 0.61, 0.355, 1.0] }}
						style={{
							flex: 1,
							display: 'flex', flexDirection: 'column', justifyContent: 'center',
							paddingBottom: '12px',
							borderBottom: '1px solid rgba(180,70,60,0.1)',
						}}
					>
						<span style={{
							fontFamily: 'var(--font-condensed)', fontWeight: 600,
							fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase',
							color: 'rgba(200,120,100,0.55)', marginBottom: '6px', display: 'block',
						}}>
							Time Lost
						</span>
						<motion.span
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.75, delay: 0.22 }}
							style={{
								display: 'block',
								fontFamily: 'var(--font-display)', fontWeight: 300,
								fontSize: 'clamp(38px, 4vw, 74px)',
								lineHeight: 1, letterSpacing: '-0.04em',
								color: 'rgba(200,120,100,0.42)',
							}}
						>
							21hrs
						</motion.span>
						<span style={{
							fontFamily: 'var(--font-body)', fontWeight: 300,
							fontSize: 'clamp(10.5px, 0.68vw, 12.5px)', lineHeight: 1.6,
							color: 'rgba(180,170,155,0.52)', marginTop: '5px', display: 'block',
						}}>
							Per week — copy-pasting replies, adjusting calendars, chasing reviews.
						</span>
					</motion.div>

					{/* MONEY block */}
					<motion.div
						initial={{ opacity: 0, x: 18 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: '-40px' }}
						transition={{ duration: 0.6, delay: 0.28, ease: [0.215, 0.61, 0.355, 1.0] }}
						style={{
							flex: 1,
							display: 'flex', flexDirection: 'column', justifyContent: 'center',
							paddingTop: '12px',
						}}
					>
						<span style={{
							fontFamily: 'var(--font-condensed)', fontWeight: 600,
							fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase',
							color: 'rgba(200,120,100,0.55)', marginBottom: '6px', display: 'block',
						}}>
							Revenue Leaked
						</span>
						<motion.span
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.75, delay: 0.34 }}
							style={{
								display: 'block',
								fontFamily: 'var(--font-display)', fontWeight: 300,
								fontSize: 'clamp(38px, 4vw, 74px)',
								lineHeight: 1, letterSpacing: '-0.04em',
								color: 'rgba(200,120,100,0.42)',
								textDecoration: 'line-through',
								textDecorationColor: 'rgba(200,80,60,0.35)',
								textDecorationThickness: '2px',
							}}
						>
							-$2,400
						</motion.span>
						<span style={{
							fontFamily: 'var(--font-body)', fontWeight: 300,
							fontSize: 'clamp(10.5px, 0.68vw, 12.5px)', lineHeight: 1.6,
							color: 'rgba(180,170,155,0.52)', marginTop: '5px', display: 'block',
						}}>
							Gone every month — you can&apos;t reprice at 2am when demand spikes.
						</span>
					</motion.div>
				</div>

				{/* Footer note */}
				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					style={{
						fontFamily: 'var(--font-body)', fontWeight: 400,
						fontSize: 'clamp(10.5px, 0.72vw, 13px)', fontStyle: 'italic',
						color: '#E8C9B8',
						lineHeight: 1.7,
						marginTop: '18px',
						padding: '8px 12px',
						background: 'rgba(200,80,60,0.08)',
						borderLeft: '2px solid rgba(200,100,80,0.45)',
						borderRadius: '2px',
					}}
				>
					This is what most hosts accept as &quot;normal.&quot;{' '}
					<span style={{ color: '#C0522B', fontWeight: 500, fontStyle: 'normal' }}>It doesn&apos;t have to be.</span>
				</motion.p>
			</div>
		</div>
	)
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function VDIvsVWASection() {
	return (
		<section className="relative w-full overflow-hidden" style={{ background: '#0D0D0B' }}>
			<ContainerScroll
				titleComponent={
					<div className="flex flex-col items-center px-6 pt-10 pb-2">
						<div
							className="mb-5 inline-flex items-center gap-2"
							style={{
								background: 'rgba(192,82,43,0.07)',
								border: '1px solid rgba(192,82,43,0.18)',
								padding: '5px 14px',
							}}
						>
							<div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C0522B' }} />
							<span style={{
								fontFamily: 'var(--font-condensed)', fontWeight: 600,
								fontSize: '11px', letterSpacing: '0.24em',
								textTransform: 'uppercase', color: '#C0522B',
							}}>
								Your Airbnb Right Now
							</span>
						</div>

						<h2
							className="text-center mb-4"
							style={{
								fontFamily: 'var(--font-display)', fontWeight: 300,
								fontSize: 'clamp(41px, 6vw, 106px)',
								lineHeight: 1.04, color: '#F0EBE1',
								letterSpacing: '-0.03em',
							}}
						>
							Still doing it{' '}
							<span style={{ fontStyle: 'italic', color: '#C0522B' }}>all yourself?</span>
						</h2>

						<p
							className="text-center mb-6"
							style={{
								fontFamily: 'var(--font-body)', fontWeight: 300,
								fontSize: 'clamp(16px, 1.02vw, 19px)', lineHeight: 1.75,
								color: 'rgba(212,204,184,0.52)', maxWidth: '580px',
							}}
						>
							The hosts scaling to 6 figures aren&apos;t working harder. They&apos;re running AI that never sleeps, never forgets, and never underprices.
						</p>

						<div style={{
							height: '1px',
							width: '100%', maxWidth: '560px',
							background: 'linear-gradient(to right, transparent, rgba(192,82,43,0.2) 35%, rgba(201,168,76,0.12) 50%, rgba(192,82,43,0.08) 65%, transparent)',
						}} />
					</div>
				}
			>
				<div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
					<LightningSplit
						leftComponent={<WithAIPanel />}
						rightComponent={<WithoutAIPanel />}
					/>
					{/* Half-labels */}
					<div className="pointer-events-none absolute bottom-4 z-40 w-full flex justify-between px-[3.5%]">
						<span style={{
							fontFamily: 'var(--font-condensed)', fontWeight: 600,
							fontSize: '10px', letterSpacing: '0.22em',
							textTransform: 'uppercase', color: 'rgba(192,82,43,0.45)',
						}}>
							← With AI
						</span>
						<span style={{
							fontFamily: 'var(--font-condensed)', fontWeight: 600,
							fontSize: '10px', letterSpacing: '0.22em',
							textTransform: 'uppercase', color: 'rgba(200,120,100,0.4)',
						}}>
							Without AI →
						</span>
					</div>
				</div>
			</ContainerScroll>
		</section>
	)
}
