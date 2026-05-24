'use client'

import { motion } from 'framer-motion'

const integrations = [
  { name: 'Airbnb', highlight: true },
  { name: 'VRBO', highlight: true },
  { name: 'Booking.com', highlight: true },
  { name: 'Guesty', highlight: false },
  { name: 'Hospitable', highlight: false },
  { name: 'PriceLabs', highlight: false },
  { name: 'Twilio', highlight: false },
  { name: 'Make.com', highlight: false },
  { name: 'n8n', highlight: false },
  { name: 'Airtable', highlight: false },
  { name: 'Claude AI', highlight: true },
  { name: 'Vapi', highlight: false },
  { name: 'Cal.com', highlight: false },
  { name: 'Stripe', highlight: false },
]

function LogoCard({ name, highlight }: { name: string; highlight: boolean }) {
  return (
    <div
      className="flex-shrink-0"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px clamp(22px, 2.4vw, 40px)',
        margin: '0 6px',
        background: highlight
          ? 'rgba(192,82,43,0.06)'
          : 'rgba(212,204,184,0.02)',
        border: highlight
          ? '1px solid rgba(192,82,43,0.22)'
          : '1px solid rgba(212,204,184,0.06)',
        borderRadius: '10px',
        whiteSpace: 'nowrap' as const,
        transition: 'border-color 0.3s ease, background 0.3s ease',
      }}
    >
      {/* Dot indicator */}
      {highlight && (
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#C0522B',
            boxShadow: '0 0 8px rgba(192,82,43,0.5)',
            marginRight: '10px',
            flexShrink: 0,
          }}
        />
      )}
      <span
        style={{
          fontFamily: 'var(--font-condensed)',
          fontWeight: highlight ? 700 : 500,
          fontSize: 'clamp(13px, 1vw, 17px)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: highlight ? '#C0522B' : 'rgba(212,204,184,0.35)',
        }}
      >
        {name}
      </span>
    </div>
  )
}

function MarqueeRow({ direction = 'left', speed = '50s' }: { direction?: 'left' | 'right'; speed?: string }) {
  const items = [...integrations, ...integrations]

  return (
    <div
      className="marquee-row overflow-hidden"
      style={{ width: '100%', position: 'relative' }}
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: 'clamp(60px, 10vw, 160px)',
          background: 'linear-gradient(to right, #0D0D0B, transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{
          width: 'clamp(60px, 10vw, 160px)',
          background: 'linear-gradient(to left, #0D0D0B, transparent)',
        }}
      />

      <div
        className={direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          animationDuration: speed,
        }}
      >
        {items.map((item, i) => (
          <LogoCard key={`${item.name}-${i}`} name={item.name} highlight={item.highlight} />
        ))}
      </div>
    </div>
  )
}

export function IntegrationStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#0D0D0B',
        paddingTop: 'clamp(56px, 6vw, 96px)',
        paddingBottom: 'clamp(56px, 6vw, 96px)',
      }}
    >
      {/* Ambient glow behind the marquee */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '20%', left: '30%',
          width: '40%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(192,82,43,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Top separator */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '5%',
          right: '5%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(192,82,43,0.20) 30%, rgba(201,168,76,0.10) 50%, rgba(192,82,43,0.20) 70%, transparent)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65 }}
        className="text-center mb-12"
        style={{ padding: '0 24px' }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-5"
          style={{
            background: 'rgba(192,82,43,0.07)',
            border: '1px solid rgba(192,82,43,0.20)',
            padding: '5px 14px',
          }}
        >
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C0522B' }} />
          <span style={{
            fontFamily: 'var(--font-condensed)', fontWeight: 600,
            fontSize: '10px', letterSpacing: '0.26em',
            textTransform: 'uppercase', color: '#C0522B',
          }}>
            Works with your stack
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.2vw, 56px)',
            color: '#F0EBE1',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Plugs into what you{' '}
          <span style={{ fontStyle: 'italic', color: '#C0522B' }}>already use.</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(13px, 0.85vw, 16px)',
            color: 'rgba(212,204,184,0.40)',
            marginTop: '14px',
            lineHeight: 1.7,
          }}
        >
          No rip-and-replace. Solnest AI plugs directly into the tools you already run on.
        </p>
      </motion.div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.8, delay: 0.12 }}
        className="flex flex-col gap-5"
      >
        <MarqueeRow direction="left" speed="48s" />
        <MarqueeRow direction="right" speed="54s" />
      </motion.div>

      {/* Bottom separator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          right: '5%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(192,82,43,0.20) 30%, rgba(201,168,76,0.10) 50%, rgba(192,82,43,0.20) 70%, transparent)',
        }}
      />
    </section>
  )
}
