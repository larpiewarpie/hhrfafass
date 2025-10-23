"use client"

import { motion } from "framer-motion"

interface Social {
  name: string
  url: string
  icon: string
}

interface ProfileCardProps {
  name: string
  role: string
  color: string
  image: string
  socials: Social[]
  delay: number
}

export function ProfileCard({ name, role, color, image, socials, delay }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative flex-1 group"
    >
      <div
        className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"
        style={{ background: `linear-gradient(45deg, ${color}, ${color}80, transparent)` }}
      />

      {/* Card */}
      <div className="relative bg-black/70 backdrop-blur-md border border-[#87cefa]/30 rounded-lg p-6 hover:border-[#87cefa]/50 hover:shadow-[0_0_40px_rgba(135,206,250,0.3)] transition-all duration-300">
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg"
          style={{ borderColor: color }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg"
          style={{ borderColor: color }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg"
          style={{ borderColor: color }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg"
          style={{ borderColor: color }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
        />

        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-60"
              style={{ background: color }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <img
              src={image || "/placeholder.svg"}
              alt={`${name} profile`}
              className="relative w-28 h-28 rounded-full border-2 object-cover shadow-[0_0_30px_rgba(135,206,250,0.6)]"
              style={{ borderColor: color }}
            />
          </motion.div>

          {/* Name */}
          <div>
            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
              <motion.span
                style={{ color }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                •
              </motion.span>
              <span className="text-white drop-shadow-[0_0_10px_rgba(135,206,250,0.5)]">{name}</span>
            </h3>
            <p className="text-gray-400 text-sm mt-2">{role}</p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#87cefa]/50 to-transparent" />

          {/* Socials */}
          <div>
            <p className="text-gray-500 text-xs mb-3">--Socials--</p>
            <div className="flex gap-3 justify-center">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, rotate: 10, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg border border-[#87cefa]/50 hover:border-[#87cefa] flex items-center justify-center text-xs font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(135,206,250,0.6)]"
                  style={{
                    background: `linear-gradient(135deg, ${color}30, transparent)`,
                  }}
                >
                  {social.icon === "TG" ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-[#87cefa]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  ) : (
                    social.icon
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
