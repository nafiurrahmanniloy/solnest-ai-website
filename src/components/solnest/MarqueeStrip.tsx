"use client";

import { Marquee } from "@/components/ui/marquee";

const agentCards = [
  { label: "Guest Communication", emoji: "💬", color: "#1A1210" },
  { label: "Revenue Intelligence", emoji: "📈", color: "#12181A" },
  { label: "PriceLabs Agent", emoji: "⚡", color: "#1A1612" },
  { label: "Calendar Sync AI", emoji: "📅", color: "#121A14" },
  { label: "Smart Pricing Engine", emoji: "🎯", color: "#1A1210" },
  { label: "Guest Screening Bot", emoji: "🔍", color: "#181218" },
  { label: "STR Analytics", emoji: "📊", color: "#121618" },
  { label: "Airbnb Auto-Responder", emoji: "🤖", color: "#1A1410" },
  { label: "Booking Optimizer", emoji: "🏆", color: "#121A12" },
  { label: "CRM Intelligence", emoji: "🧠", color: "#1A1014" },
];

const toolCards = [
  { label: "Make.com", emoji: "⚙️", color: "#181218" },
  { label: "n8n Workflows", emoji: "🔗", color: "#121418" },
  { label: "Claude AI", emoji: "✦", color: "#1A1210" },
  { label: "GPT-4 Agents", emoji: "🤖", color: "#12181A" },
  { label: "Zapier", emoji: "⚡", color: "#1A1612" },
  { label: "Notion Sync", emoji: "📝", color: "#121A14" },
  { label: "Airtable", emoji: "🗃️", color: "#1A1210" },
  { label: "WhatsApp Bot", emoji: "💬", color: "#121A12" },
  { label: "Twilio SMS", emoji: "📱", color: "#181218" },
  { label: "Email Agent", emoji: "📧", color: "#1A1014" },
];

function Card({ label, emoji, color }: { label: string; emoji: string; color: string }) {
  return (
    <div
      style={{
        background: color,
        border: "1px solid rgba(192,82,43,0.15)",
        borderRadius: "0px",
        width: "160px",
        flexShrink: 0,
        overflow: "hidden",
        transition: "border-color 0.3s ease",
      }}
      className="hover:border-[rgba(192,82,43,0.4)] cursor-default"
    >
      {/* Card visual area */}
      <div
        style={{
          height: "90px",
          background: `linear-gradient(135deg, rgba(192,82,43,0.08) 0%, transparent 70%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(192,82,43,0.1)",
          fontSize: "32px",
        }}
      >
        {emoji}
      </div>
      {/* Label */}
      <div style={{ padding: "10px 12px" }}>
        <p
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "9px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(212,204,184,0.6)",
            lineHeight: 1.3,
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: "#080807",
        borderTop: "1px solid rgba(192,82,43,0.1)",
        borderBottom: "1px solid rgba(192,82,43,0.1)",
        padding: "20px 0",
        overflow: "hidden",
      }}
    >
      <Marquee pauseOnHover speed={30} gap={12} repeat={4} className="[--duration:30s] [--gap:12px] mb-3">
        {agentCards.map((card) => (
          <Card key={card.label} {...card} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover speed={25} gap={12} repeat={4} className="[--duration:25s] [--gap:12px]">
        {toolCards.map((card) => (
          <Card key={card.label} {...card} />
        ))}
      </Marquee>
    </div>
  );
}
