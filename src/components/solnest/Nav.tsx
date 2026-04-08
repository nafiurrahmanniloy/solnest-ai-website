"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work With Ryan", href: "#services" },
  ];

  return (
    <>
      {/* ── Floating nav pill ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1.0] }}
        className="fixed z-50 left-0 right-0 flex justify-center pointer-events-none"
        style={{
          top: scrolled ? "16px" : "24px",
          transition: "top 0.4s cubic-bezier(0.215,0.61,0.355,1)",
        }}
      >
        <motion.nav
          animate={{
            maxWidth: scrolled ? "860px" : "1200px",
            paddingLeft: scrolled ? "24px" : "32px",
            paddingRight: scrolled ? "24px" : "32px",
          }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] }}
          className="pointer-events-auto w-full mx-4 md:mx-6"
          style={{
            height: scrolled ? "60px" : "74px",
            transition: "height 0.4s cubic-bezier(0.215,0.61,0.355,1)",
            background: scrolled
              ? "rgba(13,13,11,0.88)"
              : "rgba(13,13,11,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid rgba(192,82,43,0.25)"
              : "1px solid rgba(240,235,225,0.08)",
            borderRadius: "9999px",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(192,82,43,0.1) inset"
              : "0 4px 24px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <img
              src="/solnest-logo.png"
              alt="Solnest AI"
              style={{
                height: scrolled ? "36px" : "46px",
                width: "auto",
                transition: "height 0.4s cubic-bezier(0.215,0.61,0.355,1)",
                filter: "drop-shadow(0 0 10px rgba(192,82,43,0.25))",
              }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={"external" in link && link.external ? "_blank" : undefined}
                rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                className="group relative"
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 500,
                  fontSize: "14px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(212,204,184,0.75)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#F0EBE1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,204,184,0.75)";
                }}
              >
                {link.label}
                {/* Underline slide */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    right: "100%",
                    height: "1px",
                    background: "#C0522B",
                    transition: "right 0.25s ease",
                  }}
                  className="group-hover:right-0"
                />
              </a>
            ))}

            {/* CTA pill button */}
            <MagneticButton
              href="https://skool.com/solnest-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-rust text-cream overflow-hidden"
              style={{
                padding: "11px 26px",
                borderRadius: "9999px",
                boxShadow: "0 0 20px rgba(192,82,43,0.25)",
              } as React.CSSProperties}
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                  zIndex: 1,
                  transition: "transform 0.5s ease",
                  borderRadius: "9999px",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  position: "relative",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
              >
                Join the Community
              </span>
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] bg-cream origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] bg-cream origin-center"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block w-5 h-[1.5px] bg-cream origin-center"
            />
          </button>
        </motion.nav>
      </motion.div>

      {/* ── Mobile dropdown — full screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="fixed inset-x-4 top-[86px] z-40 md:hidden rounded-2xl overflow-hidden"
            style={{
              background: "rgba(13,13,11,0.97)",
              border: "1px solid rgba(192,82,43,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex flex-col p-5 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={"external" in link && link.external ? "_blank" : undefined}
                  rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.28 }}
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 border-b border-[#C0522B]/10 last:border-0"
                  style={{
                    fontFamily: "var(--font-condensed)",
                    fontWeight: 500,
                    fontSize: "14px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(212,204,184,0.8)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://skool.com/solnest-ai"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.28 }}
                onClick={() => setMobileOpen(false)}
                className="mt-3 text-center py-3.5 rounded-full bg-rust text-cream"
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "12px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(192,82,43,0.25)",
                }}
              >
                Join the Community
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
