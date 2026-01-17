"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"INIT" | "SYNC" | "LOCKED" | "CONSTRUCT" | "COMPLETE">("INIT")

  // Sequence Timing (4.5s Total)
  useEffect(() => {
    // 0s - 1.5s: INIT (Core spins, Initializing System)
    const timer1 = setTimeout(() => setPhase("SYNC"), 1500)

    // 1.5s - 3.0s: SYNC (Intensify, Syncing Neural Network)
    const timer2 = setTimeout(() => setPhase("LOCKED"), 3000)

    // 3.0s - 3.5s: LOCKED (Stabilize on CONNECTED)
    const timer3 = setTimeout(() => setPhase("CONSTRUCT"), 3500)

    // 3.5s - 4.5s: CONSTRUCT (Move to Navbar)
    const timer4 = setTimeout(() => {
      setPhase("COMPLETE")
      onComplete()
    }, 4500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-mono"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Grid - Seamless Handoff */}
        <div
          className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Central Core Container */}
        <div className="relative flex flex-col items-center justify-center">

          {/* Spinning Core Visuals (Visible before Construction Phase) */}
          {(phase === "INIT" || phase === "SYNC") && (
            <div className="relative w-32 h-32 mb-8">
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 border border-cyan/20 rounded-full"
                animate={{ rotate: 360, scale: phase === "SYNC" ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Ring (Counter-rotate) */}
              <motion.div
                className="absolute inset-4 border-2 border-t-cyan/60 border-r-transparent border-b-cyan/60 border-l-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Core Particles */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: phase === "SYNC" ? [0.5, 1, 0.5] : 0.5 }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-cyan rounded-full blur-[2px]" />
              </motion.div>

              {/* Scanning Line */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/10 to-transparent"
                animate={{ top: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}

          {/* Text Status */}
          <div className="h-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {phase === "INIT" && (
                <motion.div
                  key="init"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="text-cyan/60 tracking-[0.3em] text-xs font-bold"
                >
                  INITIALIZING SYSTEM
                </motion.div>
              )}
              {phase === "SYNC" && (
                <motion.div
                  key="sync"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="text-cyan tracking-[0.3em] text-xs font-bold animate-pulse"
                >
                  SYNCING NEURAL NETWORK...
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FINAL TRANSITION ELEMENT */}
          {/* This is the element that physically travels to the navbar */}
          {(phase === "LOCKED" || phase === "CONSTRUCT" || phase === "COMPLETE") && (
            <motion.div
              layoutId="connected-status"
              initial={{ scale: 2, opacity: 0 }}
              animate={
                phase === "LOCKED"
                  ? { scale: 1.5, opacity: 1, x: 0, y: 0 }
                  : { top: "28px", left: "64px", x: 0, y: 0, scale: 1, position: "fixed", transformOrigin: "top left" }
              }
              transition={{
                duration: phase === "LOCKED" ? 0.3 : 1.0,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex items-center gap-3 z-50 absolute"
              style={phase === "LOCKED" ? {} : { x: "-50%", y: "-50%", left: "50%", top: "50%" }} // Centered initially
            >
              <motion.span
                className="text-cyan font-bold tracking-[0.2em] text-sm md:text-base drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
              >
                CONNECTED
              </motion.span>
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          )}
        </div>

        {/* Wireframe Scanning Effect (Construction Phase) */}
        {(phase === "CONSTRUCT" || phase === "COMPLETE") && (
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 border-b border-cyan/20 bg-cyan/5 z-0 pointer-events-none"
          />
        )}

      </motion.div>
    </AnimatePresence>
  )
}
