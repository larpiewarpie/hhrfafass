"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Song {
  id: number
  title: string
  artist: string
  url: string
  duration?: number
}

const playlist: Song[] = [
  {
    id: 1,
    title: "HELLRAISER (feat. OsamaSon)",
    artist: "Che",
    url: "/music/hellraiser.mp3"
  },
  {
    id: 2,
    title: "DOE DEER",
    artist: "Che",
    url: "/music/DoeDeer.mp3"
  },
  {
    id: 3,
    title: "Down2Earth",
    artist: "Ken Carson",
    url: "/music/dte.mp3"
  }
]

export function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentSong = playlist[currentSongIndex]

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
    }
  }, [volume])

  // Handle play/pause
  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {})
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  // Handle next song
  const nextSong = useCallback(() => {
    const nextIndex = (currentSongIndex + 1) % playlist.length
    setCurrentSongIndex(nextIndex)
    if (audioRef.current) {
      audioRef.current.src = playlist[nextIndex].url
      if (isPlaying) {
        audioRef.current.play().catch(() => {})
      }
    }
  }, [currentSongIndex, isPlaying])

  // Handle previous song
  const prevSong = useCallback(() => {
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1
    setCurrentSongIndex(prevIndex)
    if (audioRef.current) {
      audioRef.current.src = playlist[prevIndex].url
      if (isPlaying) {
        audioRef.current.play().catch(() => {})
      }
    }
  }, [currentSongIndex, isPlaying])

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }, [])

  // Handle time update
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration || 0)
    }
  }, [])

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={nextSong}
      />
      
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 2.5, type: "spring", bounce: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Enhanced Toggle Button */}
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mb-3 w-14 h-14 bg-gradient-to-br from-[#87cefa]/20 via-[#87cefa]/30 to-[#87cefa]/20 backdrop-blur-xl border border-[#87cefa]/40 rounded-full text-[#87cefa] hover:bg-[#87cefa]/40 transition-all duration-300 shadow-[0_0_20px_rgba(135,206,250,0.3)] relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: isVisible ? 180 : 0 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isVisible ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            )}
          </motion.div>
        </motion.button>

        {/* Enhanced Player Panel */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="relative bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-xl border border-[#87cefa]/40 rounded-2xl p-6 w-96 shadow-[0_0_40px_rgba(135,206,250,0.4)] overflow-hidden"
            >
              
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#87cefa]/50 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#87cefa]/50 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#87cefa]/50 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#87cefa]/50 rounded-br-lg" />
              {/* Enhanced Song Info */}
              <div className="mb-6 relative z-10">
                <h3 className="text-white text-lg font-bold truncate mb-1">
                  {currentSong.title}
                </h3>
                <p className="text-gray-300 text-sm truncate mb-2">{currentSong.artist}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[#87cefa] text-xs font-mono">
                    {formatTime(currentTime)}
                  </p>
                  <p className="text-gray-500 text-xs font-mono">
                    {formatTime(duration)}
                  </p>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="mb-6 relative z-10">
                <div className="w-full bg-gray-800/50 rounded-full h-2 mb-3 relative overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-[#87cefa] to-[#87cefa]/70 h-2 rounded-full relative"
                    style={{
                      width: duration ? `${(currentTime / duration) * 100}%` : '0%'
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="absolute right-0 top-0 w-3 h-3 bg-[#87cefa] rounded-full -translate-y-0.5" />
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Controls */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <motion.button
                  onClick={prevSong}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-br from-[#87cefa]/20 to-[#87cefa]/10 border border-[#87cefa]/40 rounded-full flex items-center justify-center text-[#87cefa] hover:bg-[#87cefa]/30 transition-all duration-300 shadow-lg"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </motion.button>

                <motion.button
                  onClick={togglePlayPause}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-14 h-14 bg-gradient-to-br from-[#87cefa]/40 to-[#87cefa]/20 border border-[#87cefa]/60 rounded-full flex items-center justify-center text-white hover:bg-[#87cefa]/50 transition-all duration-300 ${isPlaying ? 'shadow-[0_0_25px_rgba(135,206,250,0.5)]' : 'shadow-xl'}`}
                >
                  {isPlaying ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </motion.button>

                <motion.button
                  onClick={nextSong}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gradient-to-br from-[#87cefa]/20 to-[#87cefa]/10 border border-[#87cefa]/40 rounded-full flex items-center justify-center text-[#87cefa] hover:bg-[#87cefa]/30 transition-all duration-300 shadow-lg"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </motion.button>
              </div>

              {/* Enhanced Volume Control */}
              <div className="flex items-center gap-3 relative z-10">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#87cefa]"
                >
                  <path
                    d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-800/50 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-[#87cefa] text-xs w-8 font-mono font-bold">{Math.round(volume * 100)}</span>
              </div>

              {/* Enhanced Playlist Indicator */}
              <div className="mt-4 flex justify-center gap-2 relative z-10">
                {playlist.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                      index === currentSongIndex 
                        ? 'bg-[#87cefa] shadow-[0_0_15px_rgba(135,206,250,0.6)]'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setCurrentSongIndex(index)
                      if (audioRef.current) {
                        audioRef.current.src = playlist[index].url
                        if (isPlaying) {
                          audioRef.current.play().catch(() => {})
                        }
                      }
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #87cefa;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #87cefa;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  )
}
