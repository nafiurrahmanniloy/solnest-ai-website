"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -25,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  }),
};

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            custom={i}
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
                rotateX: -25,
              },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  delay: delay + i * stagger,
                  duration: 0.7,
                  ease: [0.215, 0.61, 0.355, 1.0],
                },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}

export function WordRevealInView({
  text,
  className,
  delay = 0,
  stagger = 0.08,
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
                rotateX: -25,
              },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  delay: delay + i * stagger,
                  duration: 0.7,
                  ease: [0.215, 0.61, 0.355, 1.0],
                },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
