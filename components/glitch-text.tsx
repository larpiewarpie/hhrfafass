"use client"

import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.span
        className="relative z-10 text-white font-bold"
        style={{ textShadow: "0 0 20px rgba(135,206,250,0.8)" }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-[#87cefa] font-bold"
        animate={{
          x: [-2, 2, -2],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 0.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-[#5fa8d3] font-bold"
        animate={{
          x: [2, -2, 2],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 0.3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        {text}
      </motion.span>
    </div>
  )
}
