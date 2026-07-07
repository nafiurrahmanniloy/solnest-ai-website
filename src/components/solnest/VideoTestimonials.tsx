"use client";

import { motion } from "framer-motion";

// ─── Feature flag ─────────────────────────────────────────────────────────────
// Flip this to `true` once the first real testimonial video exists, then
// replace the placeholder entries in `testimonials` below with the real
// video URL (embed src or hosted .mp4) and the operator's name/business.
// Until then this component renders nothing so page.tsx can safely include
// it today without shipping an empty section live.
const SHOW_TESTIMONIALS = false;

// ─── Data ─────────────────────────────────────────────────────────────────────
// Placeholder slots - ready to populate. `videoUrl: null` renders the
// 16:9 placeholder frame; once you have a real embed/video URL, set it here
// and swap the placeholder <div> below for an <iframe> or <video> element.
const testimonials: {
  name: string;
  business: string;
  videoUrl: string | null;
}[] = [
  { name: "Operator Name", business: "Their STR business", videoUrl: null },
  { name: "Operator Name", business: "Their STR business", videoUrl: null },
  { name: "Operator Name", business: "Their STR business", videoUrl: null },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

// ─── Video card ───────────────────────────────────────────────────────────────

function TestimonialCard({ data }: { data: (typeof testimonials)[0] }) {
  return (
    <motion.div variants={item} className="flex flex-col">
      <div
        role="group"
        aria-label={`Video testimonial from ${data.name}, ${data.business}`}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "16 / 9",
          background: "rgba(240,235,225,0.03)",
          border: "1px solid rgba(240,235,225,0.1)",
        }}
      >
        {/*
          Placeholder frame - swap for an <iframe> (YouTube/Vimeo/Wistia embed)
          or a <video src={data.videoUrl} controls /> element once a real
          video URL is available.
        */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "1px solid rgba(192,82,43,0.35)",
              background: "rgba(192,82,43,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <path d="M1 1L15 9L1 17V1Z" fill="#C0522B" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="pt-5">
        <p
          style={{
            fontFamily: "var(--font-condensed)",
            fontWeight: 600,
            fontSize: "15px",
            letterSpacing: "0.06em",
            color: "#F0EBE1",
          }}
        >
          {data.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "13px",
            color: "rgba(212,204,184,0.5)",
            marginTop: "4px",
          }}
        >
          {data.business}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function VideoTestimonials() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0D0D0B" }}
      aria-labelledby="testimonials-heading"
    >
      {/* Top border */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(192,82,43,0.3) 30%, rgba(201,168,76,0.2) 60%, transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "50%",
          background: "radial-gradient(ellipse, rgba(192,82,43,0.06) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="text-center mb-14 md:mb-16"
        >
          <motion.div variants={item} className="mb-8 flex justify-center">
            <div
              className="inline-flex items-center gap-2"
              style={{
                background: "rgba(192,82,43,0.07)",
                border: "1px solid rgba(192,82,43,0.22)",
                padding: "6px 16px",
              }}
            >
              <div
                aria-hidden="true"
                style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#C0522B" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "#C0522B",
                }}
              >
                Testimonials
              </span>
            </div>
          </motion.div>

          <motion.h2
            id="testimonials-heading"
            variants={item}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(32px, 3.6vw, 60px)",
              lineHeight: 1.08,
              color: "#F0EBE1",
              letterSpacing: "-0.02em",
            }}
          >
            What operators are{" "}
            <span style={{ fontStyle: "italic", color: "#C0522B" }}>saying.</span>
          </motion.h2>
        </motion.div>

        {/* Video grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
          aria-label="Operator video testimonials"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} data={t} />
          ))}
        </motion.div>
      </div>

      {/* Bottom border */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(192,82,43,0.15) 50%, transparent)",
        }}
      />
    </section>
  );
}
