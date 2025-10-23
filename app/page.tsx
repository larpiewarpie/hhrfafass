"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MatrixRain } from "@/components/matrix-rain"
import { GlitchText } from "@/components/glitch-text"
import { ProfileCard } from "@/components/profile-card"
import { FloatingParticles } from "@/components/floating-particles"
import { MusicPlayer } from "@/components/music-player"

export default function Home() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://files.catbox.moe/ztoa4s.gif')" }}
      />

      <div className="fixed inset-0 z-0">
        <MatrixRain />
        <FloatingParticles />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#87cefa]/10 to-black/90" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(135,206,250,0.03)_50%)] bg-[length:100%_4px] animate-scan" />

      {/* Click to Enter Overlay */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer"
            onClick={() => setEntered(true)}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <GlitchText text="Click to enter" className="text-4xl md:text-6xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Notification Banner */}
      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1, type: "spring", bounce: 0.4 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30"
          >
              <div className="relative bg-gradient-to-r from-black/90 via-black/80 to-black/90 backdrop-blur-xl border border-[#87cefa]/40 rounded-xl px-8 py-4 overflow-hidden shadow-[0_0_30px_rgba(135,206,250,0.3)]"
              >
              
              <a
                href="https://t.me/csintx_x"
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-[#87cefa] text-sm font-bold hover:text-white transition-all duration-300 flex items-center gap-3 group"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#87cefa] group-hover:text-white transition-colors duration-300"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
                
                <span className="bg-gradient-to-r from-[#87cefa] via-white to-[#ff6b6b] bg-clip-text text-transparent font-extrabold text-base tracking-wider">
                  JOIN t.me/csintx_x
                </span>
                
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#87cefa] group-hover:text-white transition-colors duration-300"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              </a>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-12"
      >
        {/* Logo Container */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-[#87cefa]/40 animate-pulse" />
            <div className="absolute inset-0 blur-2xl bg-[#87cefa]/30" />
            <h1
              className="relative text-6xl md:text-8xl font-bold text-white drop-shadow-[0_0_40px_rgba(135,206,250,1)] animate-pulse"
            >
              doxxing.cc
            </h1>
          </div>
        </motion.div>

        {/* Profile Cards */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mb-12"
        >
          <ProfileCard
            name="Eljefe"
            role="Developer @ csint.ing"
            color="#87cefa"
            image="https://files.catbox.moe/s4lglu.jpg"
            socials={[{ name: "Telegram", url: "https://t.me/tearsrushing", icon: "TG" }]}
            delay={1.5}
          />
          <ProfileCard
            name="B26"
            role="Manager @ csint.ing"
            color="#87cefa"
            image="https://files.catbox.moe/g8xp96.png"
            socials={[{ name: "Telegram", url: "https://t.me/bandobaby_i", icon: "TG" }]}
            delay={1.7}
          />
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-center text-gray-400 text-xs md:text-sm max-w-2xl space-y-4"
        >
          <p className="border-t border-[#87cefa]/30 pt-4">These are our only socials, beware of impersonators.</p>

          <div className="space-y-2">
            <p>The current active domains are:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["doxxing.cc"].map((domain) => (
                <motion.a
                  key={domain}
                  href={`https://${domain}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 border border-[#87cefa]/30 rounded hover:border-[#87cefa] hover:bg-[#87cefa]/10 hover:shadow-[0_0_30px_rgba(135,206,250,0.5)] transition-all duration-300"
                >
                  {domain}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Music Player */}
      {entered && <MusicPlayer />}
    </div>
  )
}
