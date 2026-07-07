import type { ReactNode } from "react";
import LegalToc from "./LegalToc";

type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

/**
 * LegalPageShell
 * --------------
 * Brand-styled chrome for /privacy-policy and /terms-of-service.
 *
 *   • Editorial hero: eyebrow, title, summary, gradient divider, last-updated stamp
 *   • Two-column body (desktop): sticky numbered TOC + numbered sections
 *   • Single column on mobile (TOC hidden - sections are short enough to scan)
 *   • Custom rust bullet treatment + gold underlined links inside section bodies
 *   • Branded contact card at the foot of the page
 *
 * Pure server component except for the TOC, which is a small client island
 * for scroll-spy.
 */
export default function LegalPageShell({
  eyebrow,
  title,
  lastUpdated,
  summary,
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  summary?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "140px 24px 56px",
          maxWidth: "880px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "#C0522B",
            marginBottom: "20px",
          }}
        >
          {eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(42px, 6.8vw, 84px)",
            lineHeight: 1.04,
            color: "#F0EBE1",
            margin: "0 0 24px",
            letterSpacing: "-0.018em",
          }}
        >
          {title}
        </h1>
        {summary && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(16px, 1.35vw, 19px)",
              lineHeight: 1.75,
              color: "rgba(212,204,184,0.7)",
              maxWidth: "640px",
              margin: "0 auto 36px",
            }}
          >
            {summary}
          </p>
        )}
        <div
          aria-hidden="true"
          style={{
            width: "140px",
            height: "1px",
            margin: "0 auto 18px",
            background:
              "linear-gradient(to right, transparent, rgba(192,82,43,0.55), rgba(201,168,76,0.35), transparent)",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(212,204,184,0.45)",
          }}
        >
          Last updated · {lastUpdated}
        </div>
      </section>

      {/* ── Body grid: TOC + content ────────────────────────────── */}
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "20px 24px 60px",
        }}
      >
        <div className="legal-grid">
          {/* Sticky TOC (desktop only) */}
          <aside className="legal-sidebar">
            <LegalToc
              sections={sections.map(({ id, title }) => ({ id, title }))}
            />
          </aside>

          {/* Section content */}
          <article>
            {sections.map((s, i) => {
              const num = String(i + 1).padStart(2, "0");
              const isLast = i === sections.length - 1;
              return (
                <section
                  key={s.id}
                  id={s.id}
                  style={{
                    scrollMarginTop: "100px",
                    paddingBottom: isLast ? "0" : "48px",
                    marginBottom: isLast ? "0" : "48px",
                    borderBottom: isLast
                      ? "none"
                      : "1px solid rgba(192,82,43,0.08)",
                  }}
                >
                  <header
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      alignItems: "baseline",
                      columnGap: "22px",
                      marginBottom: "22px",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 300,
                        fontStyle: "italic",
                        fontSize: "clamp(30px, 3.6vw, 44px)",
                        color: "rgba(192,82,43,0.55)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {num}
                    </span>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        fontSize: "clamp(24px, 2.6vw, 32px)",
                        color: "#F0EBE1",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h2>
                  </header>
                  <div className="legal-prose">{s.body}</div>
                </section>
              );
            })}
          </article>
        </div>

        <ContactCard />
      </section>

      {/* Scoped styles - kept inside the shell so they ship/teardown with it. */}
      <style>{`
        .legal-grid {
          display: grid;
          gap: 48px;
          grid-template-columns: 1fr;
        }
        .legal-sidebar { display: none; }
        @media (min-width: 1024px) {
          .legal-grid {
            grid-template-columns: 240px 1fr;
            gap: 72px;
          }
          .legal-sidebar { display: block; }
        }

        .legal-prose {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 16px;
          line-height: 1.85;
          color: rgba(212,204,184,0.78);
        }
        .legal-prose p { margin: 0 0 16px; }
        .legal-prose p:last-child { margin-bottom: 0; }
        .legal-prose ul {
          list-style: none;
          padding: 0;
          margin: 14px 0 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .legal-prose ul li {
          position: relative;
          padding-left: 22px;
        }
        .legal-prose ul li::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 13px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C0522B;
          opacity: 0.75;
        }
        .legal-prose a {
          color: #C9A84C;
          text-decoration: underline;
          text-decoration-color: rgba(201,168,76,0.35);
          text-underline-offset: 3px;
          transition: text-decoration-color 0.2s ease, color 0.2s ease;
        }
        .legal-prose a:hover {
          color: #F0EBE1;
          text-decoration-color: rgba(201,168,76,0.9);
        }
        .legal-prose strong {
          color: rgba(240,235,225,0.95);
          font-weight: 500;
        }
      `}</style>
    </>
  );
}

function ContactCard() {
  return (
    <div
      style={{
        maxWidth: "880px",
        margin: "96px auto 0",
        padding: "32px clamp(24px, 4vw, 40px)",
        background:
          "linear-gradient(135deg, rgba(192,82,43,0.07), rgba(201,168,76,0.03))",
        border: "1px solid rgba(192,82,43,0.22)",
        borderRadius: "16px",
        boxShadow: "0 0 60px rgba(192,82,43,0.06)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <div style={{ minWidth: "240px" }}>
        <div
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C0522B",
            marginBottom: "8px",
          }}
        >
          Questions?
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(20px, 1.9vw, 24px)",
            color: "#F0EBE1",
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: "-0.005em",
          }}
        >
          Talk to a human -{" "}
          <span style={{ fontStyle: "italic", color: "#C0522B" }}>
            we read every email.
          </span>
        </p>
      </div>
      <a
        href="mailto:hello@solnestai.com"
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 600,
          fontSize: "13px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#F0EBE1",
          background: "#C0522B",
          padding: "14px 26px",
          borderRadius: "10px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 0 24px rgba(192,82,43,0.35)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        hello@solnestai.com →
      </a>
    </div>
  );
}
