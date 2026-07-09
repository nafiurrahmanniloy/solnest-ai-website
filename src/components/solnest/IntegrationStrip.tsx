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
  { name: 'QuickBooks', highlight: false },
  { name: 'Supabase', highlight: false },
  { name: 'Vercel', highlight: false },
  { name: 'GitHub', highlight: false },
]

function LogoCard({ name, highlight }: { name: string; highlight: boolean }) {
  return (
    <div
      className={`flex-shrink-0 integration-logo${highlight ? ' integration-logo--hi' : ''}`}
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
        borderRadius: '2px',
        whiteSpace: 'nowrap' as const,
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
          color: highlight ? '#C0522B' : 'rgba(212,204,184,0.55)',
        }}
      >
        {name}
      </span>
    </div>
  )
}

function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
    >
      {integrations.map((item) => (
        <LogoCard key={item.name} name={item.name} highlight={item.highlight} />
      ))}
    </div>
  )
}

function MarqueeRow({ direction = 'left', speed = '50s' }: { direction?: 'left' | 'right'; speed?: string }) {
  return (
    <div
      className="marquee-row overflow-hidden"
      style={{
        width: '100%',
        position: 'relative',
        // Edge fade
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div
        className={direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          animationDuration: speed,
        }}
      >
        <MarqueeGroup />
        {/* Duplicate track for the seamless loop — hidden from assistive tech */}
        <MarqueeGroup ariaHidden />
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
        paddingTop: 'var(--strip-pad, clamp(40px, 5vw, 80px))',
        paddingBottom: 'var(--strip-pad, clamp(40px, 5vw, 80px))',
      }}
    >
      <style>{`
        .integration-logo {
          opacity: 0.55;
          transition: opacity 0.25s cubic-bezier(0.215,0.61,0.355,1), border-color 0.25s cubic-bezier(0.215,0.61,0.355,1), background 0.25s cubic-bezier(0.215,0.61,0.355,1);
        }
        .integration-logo--hi { opacity: 0.9; }
        @media (hover: hover) and (pointer: fine) {
          .integration-logo:hover { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-row .animate-marquee,
          .marquee-row .animate-marquee-reverse { animation: none; }
        }
      `}</style>

      {/* Section accent glow: single static layer, gold */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,168,76,0.07), transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Top seam — single full-bleed hairline */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
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
            fontSize: 'var(--fs-display-lg, clamp(32px, 3.6vw, 64px))',
            color: '#F0EBE1',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            textWrap: 'balance',
          }}
        >
          Plugs into what you{' '}
          <span style={{ fontStyle: 'italic', color: '#C0522B' }}>already use.</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'var(--fs-body, clamp(14px, 0.95vw, 16px))',
            color: 'rgba(212,204,184,0.55)',
            marginTop: '14px',
            lineHeight: 1.6,
            textWrap: 'pretty',
          }}
        >
          No rip-and-replace. Solnest AI plugs directly into the tools you already run on.
        </p>
      </motion.div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px 0px -80px 0px' }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.215, 0.61, 0.355, 1] }}
        className="flex flex-col gap-5"
      >
        <MarqueeRow direction="left" speed="48s" />
        <MarqueeRow direction="right" speed="54s" />
      </motion.div>
    </section>
  )
}
