"use client"
import React, { useEffect, useState, useRef, memo } from 'react';

// --- Type Definitions ---
type IconType = 'claude' | 'twilio' | 'makecom' | 'n8n' | 'airtable' | 'vapi' | 'zapier' | 'openai' | 'slack' | 'stripe' | 'github' | 'vercel' | 'resend';

type GlowColor = 'rust' | 'gold';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- SVG Icon Components (AI tools) ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  claude: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#C0522B"/>
      </svg>
    ),
    color: '#C0522B'
  },
  twilio: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C5.381 0 0 5.381 0 12s5.381 12 12 12 12-5.381 12-12S18.619 0 12 0zm0 20.756c-4.831 0-8.756-3.925-8.756-8.756S7.169 3.244 12 3.244s8.756 3.925 8.756 8.756-3.925 8.756-8.756 8.756zm3.66-11.427c0 1.012-.82 1.833-1.833 1.833s-1.833-.82-1.833-1.833.82-1.833 1.833-1.833 1.833.82 1.833 1.833zm0 5.342c0 1.012-.82 1.833-1.833 1.833s-1.833-.82-1.833-1.833.82-1.833 1.833-1.833 1.833.82 1.833 1.833zm-5.342 0c0 1.012-.82 1.833-1.833 1.833S6.652 15.683 6.652 14.671s.82-1.833 1.833-1.833 1.833.82 1.833 1.833zm0-5.342c0 1.012-.82 1.833-1.833 1.833S6.652 10.341 6.652 9.329s.82-1.833 1.833-1.833 1.833.82 1.833 1.833z" fill="#F22F46"/>
      </svg>
    ),
    color: '#F22F46'
  },
  makecom: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="12" r="10" stroke="#6D00CC" strokeWidth="1.5" fill="none"/>
        <path d="M8 12l2.5 2.5L16 9" stroke="#6D00CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#6D00CC'
  },
  n8n: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="3" y="8" width="5" height="8" rx="1" fill="#EA4B71"/>
        <rect x="10" y="5" width="5" height="14" rx="1" fill="#EA4B71" opacity="0.7"/>
        <rect x="17" y="8" width="5" height="8" rx="1" fill="#EA4B71" opacity="0.5"/>
      </svg>
    ),
    color: '#EA4B71'
  },
  airtable: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.52 2.309l-8.36 3.156c-.33.124-.33.592 0 .717l8.36 3.156c.296.112.628.112.924 0l8.36-3.156c.33-.125.33-.593 0-.717l-8.36-3.156a1.067 1.067 0 0 0-.924 0z" fill="#FCB400"/>
        <path d="M12.68 11.397V21.09c0 .37.376.622.72.483l8.75-3.474c.222-.088.37-.302.37-.54V7.866c0-.37-.376-.622-.72-.483l-8.75 3.474a.573.573 0 0 0-.37.54z" fill="#18BFFF"/>
        <path d="M11.28 11.397V21.09c0 .37-.376.622-.72.483L1.81 18.1a.573.573 0 0 1-.37-.54V7.866c0-.37.376-.622.72-.483l8.75 3.474c.222.088.37.302.37.54z" fill="#F82B60"/>
      </svg>
    ),
    color: '#FCB400'
  },
  vapi: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none" stroke="#5CFFC9" strokeWidth="1.5"/>
        <path d="M9 9l3 6 3-6" stroke="#5CFFC9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#5CFFC9'
  },
  zapier: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M15.478 7.889H8.522l-2.7 4.667 2.7 4.667h6.956l2.7-4.667-2.7-4.667zm-3.478 7a2.333 2.333 0 1 1 0-4.667 2.333 2.333 0 0 1 0 4.667z" fill="#FF4A00"/>
      </svg>
    ),
    color: '#FF4A00'
  },
  openai: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/>
      </svg>
    ),
    color: '#10A37F'
  },
  slack: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
      </svg>
    ),
    color: '#E01E5A'
  },
  stripe: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.475 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.71 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.587-7.305z" fill="#635BFF"/>
      </svg>
    ),
    color: '#635BFF'
  },
  github: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.42-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#ffffff"/>
      </svg>
    ),
    color: '#ffffff'
  },
  vercel: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 1L24 22H0L12 1z" fill="#ffffff"/>
      </svg>
    ),
    color: '#ffffff'
  },
  resend: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="2" y="4" width="20" height="16" rx="2.5" stroke="#C9A84C" strokeWidth="1.5"/>
        <path d="M3 6.5l9 6.5 9-6.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#C9A84C'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit (4 icons)
  { id: 'claude', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'claude', phaseShift: 0, glowColor: 'rust', label: 'Claude AI' },
  { id: 'openai', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'openai', phaseShift: Math.PI / 2, glowColor: 'rust', label: 'OpenAI' },
  { id: 'twilio', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'twilio', phaseShift: Math.PI, glowColor: 'rust', label: 'Twilio' },
  { id: 'makecom', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'makecom', phaseShift: (3 * Math.PI) / 2, glowColor: 'rust', label: 'Make.com' },
  // Outer Orbit (5 icons)
  { id: 'n8n', orbitRadius: 155, size: 42, speed: -0.5, iconType: 'n8n', phaseShift: 0, glowColor: 'gold', label: 'n8n' },
  { id: 'airtable', orbitRadius: 155, size: 38, speed: -0.5, iconType: 'airtable', phaseShift: (2 * Math.PI) / 5, glowColor: 'gold', label: 'Airtable' },
  { id: 'vapi', orbitRadius: 155, size: 38, speed: -0.5, iconType: 'vapi', phaseShift: (4 * Math.PI) / 5, glowColor: 'gold', label: 'Vapi' },
  { id: 'zapier', orbitRadius: 155, size: 36, speed: -0.5, iconType: 'zapier', phaseShift: (6 * Math.PI) / 5, glowColor: 'gold', label: 'Zapier' },
  { id: 'slack', orbitRadius: 155, size: 36, speed: -0.5, iconType: 'slack', phaseShift: (8 * Math.PI) / 5, glowColor: 'gold', label: 'Slack' },
  // Outermost Orbit (4 icons) - real infra/tooling stack
  { id: 'stripe', orbitRadius: 215, size: 40, speed: 0.32, iconType: 'stripe', phaseShift: 0, glowColor: 'gold', label: 'Stripe' },
  { id: 'github', orbitRadius: 215, size: 38, speed: 0.32, iconType: 'github', phaseShift: Math.PI / 2, glowColor: 'gold', label: 'GitHub' },
  { id: 'vercel', orbitRadius: 215, size: 38, speed: 0.32, iconType: 'vercel', phaseShift: Math.PI, glowColor: 'gold', label: 'Vercel' },
  { id: 'resend', orbitRadius: 215, size: 38, speed: 0.32, iconType: 'resend', phaseShift: (3 * Math.PI) / 2, glowColor: 'gold', label: 'Resend' },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  // Round to 3 decimals: Math.cos/sin aren't bit-identical across JS engines,
  // so the full-precision value differs between Node (SSR) and the browser
  // (client) and triggers a React hydration mismatch on the initial render.
  const x = Math.round(Math.cos(angle) * orbitRadius * 1e3) / 1e3;
  const y = Math.round(Math.sin(angle) * orbitRadius * 1e3) / 1e3;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          background: 'rgba(15,15,13,0.9)',
          border: '1px solid rgba(192,82,43,0.25)',
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded whitespace-nowrap pointer-events-none"
            style={{
              background: 'rgba(13,13,11,0.95)',
              border: '1px solid rgba(192,82,43,0.3)',
              fontFamily: 'var(--font-condensed)',
              fontWeight: 600,
              fontSize: '9px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(240,235,225,0.8)',
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'rust', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    rust: {
      primary: 'rgba(192, 82, 43, 0.25)',
      secondary: 'rgba(192, 82, 43, 0.1)',
      border: 'rgba(192, 82, 43, 0.2)'
    },
    gold: {
      primary: 'rgba(201, 168, 76, 0.2)',
      secondary: 'rgba(201, 168, 76, 0.08)',
      border: 'rgba(201, 168, 76, 0.15)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.rust;
  // Outermost ring (r=215) breathes slower and a touch deeper for a distinct gold glow
  const isOutermost = radius >= 200;
  const breatheDuration = isOutermost ? 7 : 5;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none orbit-breathe"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${breatheDuration}s`,
        willChange: 'transform, opacity',
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: isOutermost
            ? `0 0 55px ${colors.primary}, inset 0 0 55px ${colors.secondary}`
            : `0 0 40px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main Component ---
export default function OrbitingSkills() {
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    if (isPaused) return;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (!visibleRef.current) {
        lastTime = currentTime;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      timeRef.current += deltaTime;
      setTime(timeRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 90, glowColor: 'rust', delay: 0 },
    { radius: 155, glowColor: 'gold', delay: 1.5 },
    { radius: 215, glowColor: 'gold', delay: 0.75 }
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: '460px', height: '460px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes orbit-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.025);
            opacity: 1;
          }
        }
        @keyframes core-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }
        .orbit-breathe {
          animation-name: orbit-breathe;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .core-pulse {
          animation: core-pulse 3.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-breathe,
          .core-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* Central icon */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full core-pulse"
        style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, rgba(192,82,43,0.2), rgba(13,13,11,0.95))',
          border: '1px solid rgba(192,82,43,0.35)',
          boxShadow: '0 0 40px rgba(192,82,43,0.15)',
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: 'rgba(192,82,43,0.12)', filter: 'blur(12px)' }} />
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0522B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>

      {orbitConfigs.map((config) => (
        <GlowingOrbitPath
          key={`path-${config.radius}`}
          radius={config.radius}
          glowColor={config.glowColor}
          animationDelay={config.delay}
        />
      ))}

      {skillsConfig.map((config) => {
        const angle = time * config.speed + (config.phaseShift || 0);
        return (
          <OrbitingSkill
            key={config.id}
            config={config}
            angle={angle}
          />
        );
      })}
    </div>
  );
}
