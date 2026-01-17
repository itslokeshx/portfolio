"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BootSequenceProps {
  onComplete: () => void
}

const BIOS_LINES = [
  "BIOS DATE 01/15/2026 14:22:55 VER 1.0.2",
  "CPU: QUANTUM CORE X-9 128-CORE PROCESSOR",
  "DETECTING PRIMARY MASTER ... NEURAL_LINK_V2",
  "DETECTING PRIMARY SLAVE  ... MEMORY_BANK_01",
  "CHECKING NVRAM .................... UPDATE OK",
  "INITIALIZING BOOT SEQUENCE ............ DONE",
  "LOADING KERNEL MODULES ................ DONE",
  "VERIFYING SYSTEM INTEGRITY ............ 100%",
  "ESTABLISHING SECURE CONNECTION ........ WAIT"
]

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"BIOS" | "NEURAL" | "CONSTRUCT" | "COMPLETE">("BIOS")
  const [biosOutput, setBiosOutput] = useState<string[]>([])

  // BIOS Sequence (0s - 1.5s)
  useEffect(() => {
    let lineIndex = 0
    const interval = setInterval(() => {
      if (lineIndex < BIOS_LINES.length) {
        setBiosOutput(prev => [...prev, BIOS_LINES[lineIndex]])
        lineIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => setPhase("NEURAL"), 200)
      }
    }, 120) // Fast scrolling
    return () => clearInterval(interval)
  }, [])

  // Neural Phase (1.5s - 3s)
  useEffect(() => {
    if (phase === "NEURAL") {
      setTimeout(() => setPhase("CONSTRUCT"), 1500)
    }
  }, [phase])

  // Construction Phase (3s - 4.5s)
  useEffect(() => {
    if (phase === "CONSTRUCT") {
      setTimeout(() => {
        setPhase("COMPLETE")
        onComplete()
      }, 1500)
    }
  }, [phase, onComplete])

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

        {/* PHASE 1: BIOS TEXT */}
        {phase === "BIOS" && (
          <div className="absolute inset-0 p-8 flex flex-col justify-end pb-20 md:justify-start md:pt-20">
            {biosOutput.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs md:text-sm text-gray-500 font-mono leading-tight"
              >
                {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="w-2 h-4 bg-gray-500 mt-2"
            />
          </div>
        )}

        {/* PHASE 2: NEURAL LINK (Lock on) */}
        {phase === "NEURAL" && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Spinner/Target */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 border-2 border-cyan/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 border-2 border-t-cyan border-r-cyan border-b-transparent border-l-transparent rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan rounded-full animate-ping" />
              </div>
            </div>
            <div className="text-cyan tracking-widest text-sm animate-pulse">ESTABLISHING LINK...</div>
          </motion.div>
        )}

        {/* PHASE 3: CONSTRUCT (The Magic Move) */}
        {(phase === "CONSTRUCT" || phase === "COMPLETE") && (
          <div className="absolute inset-0 pointer-events-none">
            {/* The "CONNECTED" Text Moving to Top-Left */}
            <motion.div
              layoutId="connected-status"
              initial={{ top: "50%", left: "50%", x: "-50%", y: "-50%", scale: 2 }}
              animate={{ top: "28px", left: "64px", x: "0%", y: "0%", scale: 1 }} // Matches navbar position estimate
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute flex items-center gap-3 z-50 fixed"
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

            {/* Wireframe Scanning Effect */}
            <motion.div
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 border-b-2 border-cyan/20 bg-cyan/5 z-0"
            />
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  )
}
