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
						fontSize: '11px', letterSpacing: '0.24em',
						textTransform: 'uppercase', color: '#C0522B',
					}}>
						With Solnest AI
					</span>
				</motion.div>

				{/* Headline */}
				<motion.h3
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
					You slept 8 hours.{' '}
					<span style={{ fontStyle: 'italic', color: '#E86A3A' }}>Your AI didn&apos;t.</span>
				</motion.h3>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: '-40px' }}
					transition={{ duration: 0.5, delay: 0.1 }}
					style={{
						fontFamily: 'var(--font-body)', fontWeight: 300,
						fontSize: 'clamp(12px, 0.85vw, 13px)', lineHeight: 1.7,
						color: 'rgba(212,204,184,0.65)', marginBottom: '14px',
					}}
				>
					3 leads booked. 12 follow-ups sent. 1 review replied to. All before your alarm went off.
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

				{/* TIME + MONEY, stacked vertically, full height */}
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
							fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase',
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
								color: '#E86A3A',
								textShadow: '0 0 40px rgba(232,106,58,0.5), 0 0 80px rgba(232,106,58,0.25)',
							}}
						>
							21hrs
						</motion.span>
						<span style={{
							fontFamily: 'var(--font-body)', fontWeight: 300,
							fontSize: 'clamp(12px, 0.78vw, 12.5px)', lineHeight: 1.6,
							color: 'rgba(212,204,184,0.6)', marginTop: '5px', display: 'block',
						}}>
							Per week reclaimed, guest messages, pricing updates, and scheduling run themselves.
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
							fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase',
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
								color: '#D4B84E',
								textShadow: '0 0 40px rgba(212,184,78,0.5), 0 0 80px rgba(212,184,78,0.22)',
							}}
						>
							+$2,400
						</motion.span>
						<span style={{
							fontFamily: 'var(--font-body)', fontWeight: 300,
							fontSize: 'clamp(12px, 0.78vw, 12.5px)', lineHeight: 1.6,
							color: 'rgba(212,204,184,0.6)', marginTop: '5px', display: 'block',
						}}>
							Extra per month, dynamic pricing, instant lead capture, zero missed bookings.
						</span>
					</motion.div>
				</div>

				{/* CTA */}
				<motion.a
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.45 }}
					href="#how"
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
					Stop doing it all yourself →
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
						fontSize: '11px', letterSpacing: '0.24em',
						textTransform: 'uppercase', color: 'rgba(200,120,100,0.7)',
					}}>
						Without AI
					</span>
				</div>

				{/* Headline */}
				<h3
					style={{
						fontFamily: 'var(--font-display)', fontWeight: 300,
						fontSize: 'clamp(18px, 1.9vw, 34px)',
						lineHeight: 1.1, color: 'rgba(210,195,180,0.72)',
						letterSpacing: '-0.02em', marginBottom: '8px',
					}}
				>
					Your business runs{' '}
					<span style={{ fontStyle: 'italic', color: 'rgba(232,140,120,0.9)' }}>only when you do.</span>
				</h3>

				<p style={{
					fontFamily: 'var(--font-body)', fontWeight: 300,
					fontSize: 'clamp(12px, 0.85vw, 13px)', lineHeight: 1.7,
					color: 'rgba(180,170,155,0.55)', marginBottom: '14px',
				}}>
					Missed calls at 2am. Leads going cold. Reviews unanswered for days.
				</p>

				{/* Separator */}
				<div style={{
					height: '1px',
					background: 'linear-gradient(to right, rgba(180,70,60,0.22), transparent)',
					marginBottom: '18px',
				}} />

				{/* TIME + MONEY, stacked vertically */}
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
							fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase',
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
							fontSize: 'clamp(12px, 0.78vw, 12.5px)', lineHeight: 1.6,
							color: 'rgba(180,170,155,0.52)', marginTop: '5px', display: 'block',
						}}>
							Per week burned, copy-pasting messages, manually adjusting prices, chasing guests.
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
							fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase',
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
							fontSize: 'clamp(12px, 0.78vw, 12.5px)', lineHeight: 1.6,
							color: 'rgba(180,170,155,0.52)', marginTop: '5px', display: 'block',
						}}>
							Leaked every month, underpriced nights, lost leads, guests who booked your competitor instead.
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
						fontSize: 'clamp(12px, 0.85vw, 13px)', fontStyle: 'italic',
						color: '#E8C9B8',
						lineHeight: 1.7,
						marginTop: '18px',
						padding: '8px 12px',
						background: 'rgba(200,80,60,0.08)',
						borderLeft: '2px solid rgba(200,100,80,0.45)',
						borderRadius: '2px',
					}}
				>
					Every hour you spend on tasks AI could handle is an hour your competitor&apos;s AI is working for them.{' '}
					<span style={{ color: '#E86A3A', fontWeight: 500, fontStyle: 'normal' }}>That gap compounds daily.</span>
				</motion.p>
			</div>
		</div>
	)
}

// ─── Section ──────────────────────────────────────────────────────────────────

// ─── Mobile comparison card ─────────────────────────────────────────────────

function MobileComparisonCard({ type }: { type: 'with' | 'without' }) {
	const isWith = type === 'with'
	return (
		<div style={{
			background: isWith ? '#0D0D0B' : '#0A0A08',
			border: `1px solid ${isWith ? 'rgba(192,82,43,0.25)' : 'rgba(180,70,60,0.15)'}`,
			padding: '24px 20px',
		}}>
			<div className="flex items-center gap-2 mb-4">
				<div style={{
					width: '6px', height: '6px', borderRadius: '50%',
					background: isWith ? '#C0522B' : 'rgba(180,70,60,0.45)',
					boxShadow: isWith ? '0 0 8px rgba(192,82,43,0.6)' : 'none',
				}} />
				<span style={{
					fontFamily: 'var(--font-condensed)', fontWeight: 600,
					fontSize: '10px', letterSpacing: '0.24em',
					textTransform: 'uppercase',
					color: isWith ? '#C0522B' : 'rgba(200,120,100,0.7)',
				}}>
					{isWith ? 'With Solnest AI' : 'Without AI'}
				</span>
			</div>

			<h3 style={{
				fontFamily: 'var(--font-display)', fontWeight: 300,
				fontSize: '22px', lineHeight: 1.15,
				color: isWith ? '#F0EBE1' : 'rgba(210,195,180,0.72)',
				marginBottom: '12px',
			}}>
				{isWith
					? <>You slept 8 hours. <span style={{ fontStyle: 'italic', color: '#E86A3A' }}>Your AI didn&apos;t.</span></>
					: <>Your business runs <span style={{ fontStyle: 'italic', color: 'rgba(232,140,120,0.9)' }}>only when you do.</span></>
				}
			</h3>

			<div className="flex gap-6 mt-4">
				<div>
					<span style={{
						fontFamily: 'var(--font-condensed)', fontWeight: 600,
						fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
						color: isWith ? 'rgba(192,82,43,0.65)' : 'rgba(200,120,100,0.55)',
						display: 'block', marginBottom: '4px',
					}}>
						{isWith ? 'Time Saved' : 'Time Lost'}
					</span>
					<span style={{
						fontFamily: 'var(--font-display)', fontWeight: 300,
						fontSize: '32px', lineHeight: 1, letterSpacing: '-0.04em',
						color: isWith ? '#C0522B' : 'rgba(200,120,100,0.42)',
						textShadow: isWith ? '0 0 30px rgba(192,82,43,0.4)' : 'none',
					}}>
						21hrs
					</span>
				</div>
				<div>
					<span style={{
						fontFamily: 'var(--font-condensed)', fontWeight: 600,
						fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
						color: isWith ? 'rgba(201,168,76,0.65)' : 'rgba(200,120,100,0.55)',
						display: 'block', marginBottom: '4px',
					}}>
						{isWith ? 'Revenue Impact' : 'Revenue Leaked'}
					</span>
					<span style={{
						fontFamily: 'var(--font-display)', fontWeight: 300,
						fontSize: '32px', lineHeight: 1, letterSpacing: '-0.04em',
						color: isWith ? '#C9A84C' : 'rgba(200,120,100,0.42)',
						textShadow: isWith ? '0 0 30px rgba(201,168,76,0.4)' : 'none',
						textDecoration: isWith ? 'none' : 'line-through',
					}}>
						{isWith ? '+$2,400' : '-$2,400'}
					</span>
				</div>
			</div>
		</div>
	)
}

// ─── "What we automate" strip ──────────────────────────────────────────────

const AUTOMATION_ITEMS = [
	{
		title: 'Lead capture & response',
		description: 'Every inquiry scored and answered in minutes.',
	},
	{
		title: 'Guest & customer messaging',
		description: '24/7 replies in your voice, across channels.',
	},
	{
		title: 'Pricing & data analysis',
		description: 'AI that turns raw numbers into decisions.',
	},
	{
		title: 'Back-office automation',
		description: 'Scheduling, follow-ups, and reporting on autopilot.',
	},
]

function WhatWeAutomateStrip() {
	return (
		<div className="px-5 md:px-6 py-12 md:py-16" style={{ background: '#0D0D0B' }}>
			<div className="mx-auto" style={{ maxWidth: '1100px' }}>
				{/* Eyebrow */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-40px' }}
					transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] }}
					className="flex items-center gap-2 mb-6 md:mb-8 justify-center md:justify-start"
				>
					<div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A84C' }} />
					<span style={{
						fontFamily: 'var(--font-condensed)', fontWeight: 600,
						fontSize: '11px', letterSpacing: '0.24em',
						textTransform: 'uppercase', color: '#C9A84C',
					}}>
						What We Automate
					</span>
				</motion.div>

				{/* Chips row */}
				<div className="flex flex-wrap gap-3 md:gap-4">
					{AUTOMATION_ITEMS.map((item, i) => (
						<motion.div
							key={item.title}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-40px' }}
							transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.215, 0.61, 0.355, 1.0] }}
							className="flex-1"
							style={{
								minWidth: '220px',
								background: 'rgba(192,82,43,0.05)',
								border: '1px solid rgba(192,82,43,0.18)',
								borderRadius: '2px',
								padding: '16px 18px',
							}}
						>
							<h4 style={{
								fontFamily: 'var(--font-condensed)', fontWeight: 600,
								fontSize: '11.5px', letterSpacing: '0.06em',
								textTransform: 'uppercase', color: '#F0EBE1',
								marginBottom: '6px',
							}}>
								{item.title}
							</h4>
							<p style={{
								fontFamily: 'var(--font-body)', fontWeight: 300,
								fontSize: '12.5px', lineHeight: 1.6,
								color: 'rgba(212,204,184,0.55)',
							}}>
								{item.description}
							</p>
						</motion.div>
					))}
				</div>

				{/* Inline link */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: '-40px' }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-6 md:mt-8 text-center md:text-left"
				>
					<a
						href="#services"
						className="group inline-flex items-center gap-2"
						style={{
							fontFamily: 'var(--font-condensed)', fontWeight: 600,
							fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
							color: '#C0522B', textDecoration: 'none',
							borderBottom: '1px solid rgba(192,82,43,0.35)', paddingBottom: '3px',
						}}
					>
						See what we build →
					</a>
				</motion.div>
			</div>
		</div>
	)
}

// ─── Section ────────────────────────────────────────────────────────────────

export function VDIvsVWASection() {
	return (
		<section className="relative w-full overflow-hidden" style={{ background: '#0D0D0B' }}>

			{/* ── Mobile version ── */}
			<div className="md:hidden px-5 py-16">
				<div className="text-center mb-8">
					<div className="inline-flex items-center gap-2 mb-4" style={{
						background: 'rgba(192,82,43,0.07)',
						border: '1px solid rgba(192,82,43,0.18)',
						padding: '5px 14px',
					}}>
						<div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C0522B' }} />
						<span style={{
							fontFamily: 'var(--font-condensed)', fontWeight: 600,
							fontSize: '10px', letterSpacing: '0.24em',
							textTransform: 'uppercase', color: '#C0522B',
						}}>
							Your Business Right Now
						</span>
					</div>
					<h2 style={{
						fontFamily: 'var(--font-display)', fontWeight: 300,
						fontSize: '32px', lineHeight: 1.08, color: '#F0EBE1',
						letterSpacing: '-0.02em',
					}}>
						Still doing it{' '}
						<span style={{ fontStyle: 'italic', color: '#C0522B' }}>all yourself?</span>
					</h2>
				</div>
				<div className="flex flex-col gap-3">
					<MobileComparisonCard type="with" />
					<MobileComparisonCard type="without" />
				</div>
			</div>

			{/* ── Desktop version ── */}
			<div className="hidden md:block">
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
									Your Business Right Now
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
								While you&apos;re sleeping, your competitor&apos;s AI is answering leads, adjusting prices, and booking guests. The gap between &quot;doing it manually&quot; and &quot;running AI&quot; isn&apos;t closing, it&apos;s accelerating.
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
			</div>

			{/* ── What we automate strip (shared, mobile + desktop) ── */}
			<WhatWeAutomateStrip />
		</section>
	)
}
