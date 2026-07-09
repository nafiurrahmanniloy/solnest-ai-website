"use client"
import React, { useEffect, useState, useRef, memo } from 'react';
import { RiClaudeFill, RiSupabaseFill, RiWhatsappFill } from '@remixicon/react';

// --- Type Definitions ---
type IconType = 'claude' | 'openai' | 'slack' | 'github' | 'guesty' | 'hostfully' | 'pricelabs' | 'airbnb' | 'airroi' | 'stripe' | 'supabase' | 'twilio' | 'vercel' | 'n8n' | 'make' | 'zapier' | 'airtable' | 'vapi' | 'whatsapp';

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
    component: () => <RiClaudeFill color="#D97757" className="w-full h-full" />,
    color: '#D97757'
  },
  supabase: {
    component: () => <RiSupabaseFill color="#3FCF8E" className="w-full h-full" />,
    color: '#3FCF8E'
  },
  whatsapp: {
    component: () => <RiWhatsappFill color="#25D366" className="w-full h-full" />,
    color: '#25D366'
  },
  n8n: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.5215 2.5215 0 0 0 14.5322 12a2.5215 2.5215 0 0 0 .8503-1.4126l.1037-.623a1.263 1.263 0 0 1 1.246-1.0554h2.8955c.2805 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.1311 2.5263-2.5263s-1.1311-2.5263-2.5263-2.5263z" fill="#EA4B71"/>
      </svg>
    ),
    color: '#EA4B71'
  },
  make: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z" fill="#B02DE9"/>
      </svg>
    ),
    color: '#B02DE9'
  },
  zapier: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M14.928 12.004a3.567 3.567 0 0 1-.312 1.464 3.567 3.567 0 0 1-1.464.312h-2.296a3.568 3.568 0 0 1-1.464-.312 3.567 3.567 0 0 1-.312-1.464v-.008a3.567 3.567 0 0 1 .312-1.464 3.566 3.566 0 0 1 1.464-.312h2.296c.52 0 1.014.111 1.464.312.2.45.311.945.312 1.464v.008zm8.75-1.596h-6.9l4.879-4.879a9.672 9.672 0 0 0-1.128-1.336 9.674 9.674 0 0 0-1.336-1.128L14.314 7.944v-6.9A9.672 9.672 0 0 0 12.71.908h-1.42a9.66 9.66 0 0 0-1.604.135v6.901L4.807 3.065A9.674 9.674 0 0 0 3.47 4.193a9.672 9.672 0 0 0-1.128 1.336l4.879 4.879h-6.9S.185 11.463.185 12.184v1.42c0 .721.135 1.604.135 1.604h6.901l-4.879 4.879c.336.472.712.918 1.128 1.336.418.416.864.792 1.336 1.128l4.879-4.879v6.9s.883.136 1.604.136h1.42c.721 0 1.604-.135 1.604-.135v-6.901l4.879 4.879a9.674 9.674 0 0 0 1.336-1.128 9.672 9.672 0 0 0 1.128-1.336l-4.879-4.879h6.9s.136-.883.136-1.604v-1.42c0-.721-.135-1.604-.135-1.604z" fill="#FF4F00"/>
      </svg>
    ),
    color: '#FF4F00'
  },
  airtable: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257z" fill="#FCB400"/>
        <path d="M23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596z" fill="#18BFFF"/>
        <path d="M.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z" fill="#F82B60"/>
      </svg>
    ),
    color: '#FCB400'
  },
  vapi: {
    component: () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/vapi.png" alt="Vapi" className="w-full h-full object-contain rounded-full" />
    ),
    color: '#5CFFC9'
  },
  airbnb: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z" fill="#FF5A5F"/>
      </svg>
    ),
    color: '#FF5A5F'
  },
  guesty: {
    component: () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/guesty.png" alt="Guesty" className="w-full h-full object-contain rounded-full" />
    ),
    color: '#4F44E0'
  },
  hostfully: {
    component: () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/hostfully.png" alt="Hostfully" className="w-full h-full object-contain rounded-full" />
    ),
    color: '#28B498'
  },
  pricelabs: {
    component: () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/pricelabs.png" alt="PriceLabs" className="w-full h-full object-contain rounded-full" />
    ),
    color: '#2D6BFF'
  },
  airroi: {
    component: () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/airroi.png" alt="AirROI" className="w-full h-full object-contain rounded-full" />
    ),
    color: '#C9A84C'
  },
  twilio: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C5.381 0 0 5.381 0 12s5.381 12 12 12 12-5.381 12-12S18.619 0 12 0zm0 20.756c-4.831 0-8.756-3.925-8.756-8.756S7.169 3.244 12 3.244s8.756 3.925 8.756 8.756-3.925 8.756-8.756 8.756zm3.66-11.427c0 1.012-.82 1.833-1.833 1.833s-1.833-.82-1.833-1.833.82-1.833 1.833-1.833 1.833.82 1.833 1.833zm0 5.342c0 1.012-.82 1.833-1.833 1.833s-1.833-.82-1.833-1.833.82-1.833 1.833-1.833 1.833.82 1.833 1.833zm-5.342 0c0 1.012-.82 1.833-1.833 1.833S6.652 15.683 6.652 14.671s.82-1.833 1.833-1.833 1.833.82 1.833 1.833zm0-5.342c0 1.012-.82 1.833-1.833 1.833S6.652 10.341 6.652 9.329s.82-1.833 1.833-1.833 1.833.82 1.833 1.833z" fill="#F22F46"/>
      </svg>
    ),
    color: '#F22F46'
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
  // Inner Orbit (4 icons) - the AI + comms core
  { id: 'claude', orbitRadius: 90, size: 38, speed: 0.8, iconType: 'claude', phaseShift: 0, glowColor: 'rust', label: 'Claude AI' },
  { id: 'openai', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'openai', phaseShift: Math.PI / 2, glowColor: 'rust', label: 'OpenAI' },
  { id: 'slack', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'slack', phaseShift: Math.PI, glowColor: 'rust', label: 'Slack' },
  { id: 'github', orbitRadius: 90, size: 36, speed: 0.8, iconType: 'github', phaseShift: (3 * Math.PI) / 2, glowColor: 'rust', label: 'GitHub' },
  // Middle Orbit (5 icons) - the STR stack
  { id: 'guesty', orbitRadius: 155, size: 42, speed: -0.5, iconType: 'guesty', phaseShift: 0, glowColor: 'gold', label: 'Guesty' },
  { id: 'hostfully', orbitRadius: 155, size: 40, speed: -0.5, iconType: 'hostfully', phaseShift: (2 * Math.PI) / 5, glowColor: 'gold', label: 'Hostfully' },
  { id: 'pricelabs', orbitRadius: 155, size: 40, speed: -0.5, iconType: 'pricelabs', phaseShift: (4 * Math.PI) / 5, glowColor: 'gold', label: 'PriceLabs' },
  { id: 'airbnb', orbitRadius: 155, size: 38, speed: -0.5, iconType: 'airbnb', phaseShift: (6 * Math.PI) / 5, glowColor: 'gold', label: 'Airbnb' },
  { id: 'airroi', orbitRadius: 155, size: 40, speed: -0.5, iconType: 'airroi', phaseShift: (8 * Math.PI) / 5, glowColor: 'gold', label: 'AirROI' },
  // Outermost Orbit (4 icons) - real infra/tooling stack
  { id: 'stripe', orbitRadius: 215, size: 40, speed: 0.32, iconType: 'stripe', phaseShift: 0, glowColor: 'gold', label: 'Stripe' },
  { id: 'supabase', orbitRadius: 215, size: 38, speed: 0.32, iconType: 'supabase', phaseShift: Math.PI / 2, glowColor: 'gold', label: 'Supabase' },
  { id: 'twilio', orbitRadius: 215, size: 38, speed: 0.32, iconType: 'twilio', phaseShift: Math.PI, glowColor: 'gold', label: 'Twilio' },
  { id: 'vercel', orbitRadius: 215, size: 36, speed: 0.32, iconType: 'vercel', phaseShift: (3 * Math.PI) / 2, glowColor: 'gold', label: 'Vercel' },
  // Fourth Orbit (6 icons) - the build/automation toolbox
  { id: 'n8n', orbitRadius: 275, size: 40, speed: -0.22, iconType: 'n8n', phaseShift: 0, glowColor: 'rust', label: 'n8n' },
  { id: 'make', orbitRadius: 275, size: 38, speed: -0.22, iconType: 'make', phaseShift: Math.PI / 3, glowColor: 'rust', label: 'Make.com' },
  { id: 'zapier', orbitRadius: 275, size: 38, speed: -0.22, iconType: 'zapier', phaseShift: (2 * Math.PI) / 3, glowColor: 'rust', label: 'Zapier' },
  { id: 'airtable', orbitRadius: 275, size: 38, speed: -0.22, iconType: 'airtable', phaseShift: Math.PI, glowColor: 'rust', label: 'Airtable' },
  { id: 'vapi', orbitRadius: 275, size: 40, speed: -0.22, iconType: 'vapi', phaseShift: (4 * Math.PI) / 3, glowColor: 'rust', label: 'Vapi' },
  { id: 'whatsapp', orbitRadius: 275, size: 38, speed: -0.22, iconType: 'whatsapp', phaseShift: (5 * Math.PI) / 3, glowColor: 'rust', label: 'WhatsApp' },
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
      className="absolute top-1/2 left-1/2"
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
    { radius: 215, glowColor: 'gold', delay: 0.75 },
    { radius: 275, glowColor: 'rust', delay: 2.2 }
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: '620px', height: '620px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes orbit-breathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.85;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.025);
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
