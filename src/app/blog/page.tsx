import type { Metadata } from "next";
import Nav from "@/components/solnest/Nav";
import Footer from "@/components/solnest/Footer";

export const metadata: Metadata = {
  title: "Blog - AI for Operators",
  description:
    "Guides and breakdowns from Solnest AI: AI automation for short-term rentals, real estate, med spas, and local businesses.",
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
};

const posts = [
  {
    href: "/blog/best-ai-automation-agencies-short-term-rentals-2026",
    eyebrow: "Guide · Short-Term Rentals",
    title: "The 7 best AI automation agencies & tools for short-term rentals.",
    description:
      "Done-for-you agencies vs self-serve tools - Solnest AI, Hospitable, Conduit, PriceLabs, Nowistay, Besty, and Jurny, compared honestly for every portfolio size.",
    date: "July 10, 2026",
  },
];

export default function BlogIndexPage() {
  return (
    <main style={{ background: "#0D0D0B", minHeight: "100vh" }}>
      <Nav />

      <section
        style={{
          padding: "140px 24px 48px",
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
          The Logbook
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
          Guides for operators{" "}
          <span style={{ fontStyle: "italic", color: "#C0522B" }}>
            putting AI to work.
          </span>
        </h1>
      </section>

      <section style={{ maxWidth: "880px", margin: "0 auto", padding: "0 24px 120px" }}>
        {posts.map((post) => (
          <a
            key={post.href}
            href={post.href}
            style={{
              display: "block",
              textDecoration: "none",
              border: "1px solid rgba(192,82,43,0.18)",
              borderRadius: "2px",
              padding: "28px 30px",
              background: "#0F0F0D",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(192,82,43,0.85)",
                marginBottom: "12px",
              }}
            >
              {post.eyebrow} · {post.date}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(24px, 2.4vw, 36px)",
                lineHeight: 1.15,
                color: "#F0EBE1",
                margin: "0 0 12px",
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: 1.65,
                color: "rgba(212,204,184,0.6)",
                margin: 0,
              }}
            >
              {post.description}
            </p>
            <div
              style={{
                marginTop: "16px",
                fontFamily: "var(--font-condensed)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#C0522B",
              }}
            >
              Read the guide →
            </div>
          </a>
        ))}
      </section>

      <Footer />
    </main>
  );
}
