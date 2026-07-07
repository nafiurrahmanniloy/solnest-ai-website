"use client";

import { useEffect, useState } from "react";

type TocSection = { id: string; title: string };

/**
 * LegalToc
 * --------
 * Sticky table-of-contents for /privacy-policy and /terms-of-service.
 *
 * Uses a scroll listener (not IntersectionObserver) so it stays
 * accurate even when no section is inside the active band - e.g.
 * when scrolled past the last section or before the first. The
 * active section is whichever one's top has most recently crossed
 * the 20%-from-top trigger line.
 *
 * Plays well with Lenis: Lenis dispatches native scroll events, so
 * the standard `scroll` listener fires throughout its smooth
 * animations.
 */
export default function LegalToc({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    function recompute() {
      const triggerLine = window.innerHeight * 0.2;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - triggerLine <= 0) {
          current = s.id;
        } else {
          break; // Sections appear in document order; first miss = stop.
        }
      }
      setActiveId(current);
    }

    recompute();
    window.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
    };
  }, [sections]);

  return (
    <nav
      aria-label="On this page"
      style={{
        position: "sticky",
        top: "100px",
        maxHeight: "calc(100vh - 140px)",
        overflowY: "auto",
        paddingRight: "8px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "11px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "#C0522B",
          marginBottom: "22px",
        }}
      >
        On this page
      </div>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          borderLeft: "1px solid rgba(192,82,43,0.12)",
        }}
      >
        {sections.map((s, i) => {
          const num = String(i + 1).padStart(2, "0");
          const isActive = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => {
                  // Instant feedback - don't wait for the scroll
                  // listener to catch up to the click.
                  setActiveId(s.id);
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "26px 1fr",
                  alignItems: "baseline",
                  gap: "10px",
                  textDecoration: "none",
                  color: isActive
                    ? "#F0EBE1"
                    : "rgba(212,204,184,0.5)",
                  fontFamily: "var(--font-body)",
                  fontWeight: isActive ? 500 : 400,
                  fontSize: "14px",
                  lineHeight: 1.45,
                  paddingLeft: "14px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                  marginLeft: "-1px",
                  borderLeft: isActive
                    ? "1px solid #C0522B"
                    : "1px solid transparent",
                  transition:
                    "color 0.2s ease, border-color 0.2s ease, font-weight 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(240,235,225,0.85)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(212,204,184,0.5)";
                  }
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 600,
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: isActive
                      ? "#C0522B"
                      : "rgba(212,204,184,0.32)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {num}
                </span>
                <span>{s.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
