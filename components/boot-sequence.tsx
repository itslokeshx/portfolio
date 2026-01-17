"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BootSequenceProps {
  onComplete: () => void
}

// Typewriter Component for smooth text reveal
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    setDisplayedText("") // Reset on text change
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 30) // Speed: 30ms per char

    return () => clearInterval(interval)
  }, [text])

  return (
    <span className="text-white/90">
      {displayedText}
    </span>
  )
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"LOADING" | "RESOLVED" | "COMPLETE">("LOADING")
  const [text, setText] = useState("INITIALIZING SYSTEM HANDSHAKE")

  // Sequence Timing (4.0s Total Strict)
  useEffect(() => {
    // 0s: Start Loading
    // Stage 1 (0-1s): INITIALIZING...

    // Stage 2 (1.0s)
    const timer1 = setTimeout(() => setText("VERIFYING ENCRYPTED PROTOCOLS"), 1000)

    // Stage 3 (2.0s)
    const timer2 = setTimeout(() => setText("ACQUIRING NEURAL TARGET"), 2000)

    // Stage 4 (3.0s)
    const timer3 = setTimeout(() => setText("AUTHENTICATING IDENTITY"), 3000)

    // 4.0s: Finish Loading -> Show RESOLVED
    const timer4 = setTimeout(() => setPhase("RESOLVED"), 4000)

    // 4.5s: Handoff
    const timer5 = setTimeout(() => {
      setPhase("COMPLETE")
      onComplete()
    }, 4500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-mono"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* CONTAINER */}
        <div className="relative w-full max-w-[600px] flex flex-col items-center justify-center gap-6">

          {/* TEXT & LOADER LINE */}
          {(phase === "LOADING") && (
            <div className="w-full flex flex-col items-start px-12 md:px-0">
              <div className="flex items-center gap-3 text-sm md:text-base font-medium tracking-wider mb-4 h-6 min-h-[24px]">
                <span className="text-cyan/70">{">"}</span>

                {/* Typewriter Effect */}
                <TypewriterText text={text} />

                {/* Blinking Cursor */}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-4 bg-cyan"
                />
              </div>

              {/* Minimal Progress Line - Thicker (4px) */}
              <div className="w-full h-[4px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-cyan shadow-[0_0_20px_rgba(0,240,255,0.6)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 4,
                    ease: "linear"
                  }}
                >
                  {/* Glowing Leading Edge (Tip) */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[100px] h-[6px] bg-gradient-to-r from-transparent to-white blur-[2px]" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[20px] h-[8px] bg-white blur-[4px] rounded-full" />
                </motion.div>
              </div>

              <div className="flex justify-between w-full mt-2 text-[10px] text-white/30 font-mono">
                <span>SYS.KEY: 0x8F4A</span>
                <span>PROCESSING...</span>
              </div>
            </div>
          )}

          {/* RESOLVED STATE ([ CONNECTED ]) - Pixel Perfect Match */}
          {(phase === "RESOLVED" || phase === "COMPLETE") && (
            <motion.div
              layoutId="connected-status"
              initial={{ scale: 0.9, opacity: 0, letterSpacing: "1em" }}
              animate={
                phase === "RESOLVED"
                  ? { scale: 1, opacity: 1, letterSpacing: "0.1em", x: 0, y: 0 } // Centered
                  : { top: "28px", left: "64px", x: 0, y: 0, scale: 1, letterSpacing: "0.1em", position: "fixed", transformOrigin: "top left" } // Moves to nav
              }
              transition={{
                duration: phase === "RESOLVED" ? 0.3 : 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex items-center gap-3 z-50 absolute"
              style={phase === "RESOLVED" ? {} : { x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            >
              <div className="flex items-center gap-3">
                <span className="text-cyan font-bold text-sm md:text-base font-mono tracking-widest">
                  [ <span className="shadow-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">CONNECTED</span> ]
                </span>
              </div>
            </motion.div>
          )}

        </div>

        {/* Construction Line */}
        {(phase === "COMPLETE") && (
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 border-b border-cyan/10 bg-cyan/5 z-0 pointer-events-none"
          />
        )}

      </motion.div>
    </AnimatePresence>
  )
}
