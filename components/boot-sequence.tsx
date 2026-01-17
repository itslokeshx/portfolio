"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"LOADING" | "RESOLVED" | "COMPLETE">("LOADING")
  const [text, setText] = useState("ESTABLISHING SECURE HANDSHAKE")

  // Sequence Timing (4.0s Total Strict)
  useEffect(() => {
    // 0s: Start Loading (handled by CSS animation)

    // 2.0s: Change Text
    const timer1 = setTimeout(() => setText("AUTHENTICATING IDENTITY"), 2000)

    // 4.0s: Finish Loading -> Show RESOLVED
    const timer2 = setTimeout(() => setPhase("RESOLVED"), 4000)

    // 4.5s: Handoff
    const timer3 = setTimeout(() => {
      setPhase("COMPLETE")
      onComplete()
    }, 4500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
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
        {/* Background Grid - Hidden during loader for pure minimal look, or very subtle */}
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
              <div className="flex items-center gap-3 text-sm md:text-base font-medium tracking-wider mb-4 h-6">
                <span className="text-cyan/70">{">"}</span>
                <span className="text-white/90">
                  {text}
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-4 bg-cyan"
                />
              </div>

              {/* Minimal Progress Line - Constant 4s Progress */}
              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-cyan shadow-[0_0_15px_rgba(0,240,255,0.6)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 4,
                    ease: "linear"
                  }}
                />
              </div>

              <div className="flex justify-between w-full mt-2 text-[10px] text-white/30 font-mono">
                <span>SYS.KEY: 0x8F4A</span>
                <span>PROCESSING...</span>
              </div>
            </div>
          )}

          {/* RESOLVED STATE ([ CONNECTED ]) */}
          {(phase === "RESOLVED" || phase === "COMPLETE") && (
            <motion.div
              layoutId="connected-status"
              initial={{ scale: 0.9, opacity: 0, letterSpacing: "1em" }}
              animate={
                phase === "RESOLVED"
                  ? { scale: 1, opacity: 1, letterSpacing: "0.2em", x: 0, y: 0 } // Centered
                  : { top: "28px", left: "64px", x: 0, y: 0, scale: 0.8, letterSpacing: "0.1em", position: "fixed", transformOrigin: "top left" } // Moves to nav
              }
              transition={{
                duration: phase === "RESOLVED" ? 0.3 : 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex items-center gap-3 z-50 absolute"
              style={phase === "RESOLVED" ? {} : { x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            >
              <span className="text-cyan font-bold text-lg md:text-xl font-mono">
                [ <span className="shadow-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">CONNECTED</span> ]
              </span>
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
