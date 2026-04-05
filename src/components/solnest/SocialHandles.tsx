"use client";

import { Button } from "@/components/ui/button";
import {
  RiInstagramLine,
  RiYoutubeLine,
  RiFacebookFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "@remixicon/react";

const handles = [
  {
    label: "Instagram",
    icon: RiInstagramLine,
    href: "https://instagram.com/solnestai",
  },
  {
    label: "YouTube",
    icon: RiYoutubeLine,
    href: "https://youtube.com/@solnestai",
  },
  {
    label: "LinkedIn",
    icon: RiLinkedinFill,
    href: "https://linkedin.com/company/solnestai",
  },
  {
    label: "X / Twitter",
    icon: RiTwitterXFill,
    href: "https://x.com/solnestai",
  },
  {
    label: "Facebook",
    icon: RiFacebookFill,
    href: "https://facebook.com/solnestai",
  },
];

export function SocialHandles() {
  return (
    <div className="flex items-center gap-3">
      {handles.map(({ label, icon: Icon, href }) => (
        <Button
          key={label}
          variant="outline"
          size="icon"
          aria-label={label}
          asChild
          style={{
            background: "transparent",
            border: "1px solid rgba(192,82,43,0.22)",
            color: "rgba(212,204,184,0.5)",
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            transition: "border-color 0.2s ease, color 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(192,82,43,0.6)";
            el.style.color = "#C0522B";
            el.style.background = "rgba(192,82,43,0.07)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(192,82,43,0.22)";
            el.style.color = "rgba(212,204,184,0.5)";
            el.style.background = "transparent";
          }}
        >
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Icon size={18} aria-hidden="true" />
          </a>
        </Button>
      ))}
    </div>
  );
}
