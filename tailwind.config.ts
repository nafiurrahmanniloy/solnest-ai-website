import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rust: "#C0522B",
        "rust-light": "#D4693E",
        "rust-dark": "#9A3E1F",
        cream: "#F0EBE1",
        "cream-dim": "#D4CCB8",
        charcoal: "#2C2C2A",
        "charcoal-mid": "#1A1A18",
        "black-site": "#0D0D0B",
        gold: "#C9A84C",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Barlow", "sans-serif"],
        condensed: ["Barlow Condensed", "sans-serif"],
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeUp: "fadeUp 0.9s ease forwards",
        breathe: "breathe 4s ease-in-out infinite",
        "marquee": "marquee var(--duration) linear infinite",
        "marquee-reverse": "marquee var(--duration) linear infinite reverse",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        "marquee": {
          "from": { transform: "translateX(0)" },
          "to": { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
