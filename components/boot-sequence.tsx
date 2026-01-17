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
    setDisplayedText("")
    let i = 0
    // Slightly faster typing for multi-line to ensure completion before next line
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [text])

  return (
    <span className="text-white/90">
      {displayedText}
    </span>
  )
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([])
  const [phase, setPhase] = useState<"LOADING" | "COMPLETE">("LOADING")

  // Sequence Timing (5.0s Strict)
  useEffect(() => {
    // Helper to add line safely
    const addLine = (newLine: string) => {
      setLines(prev => {
        // Keep max 3 lines (simulating scroll)
        // If we have 3, remove top one to make room
        const newLines = [...prev, newLine]
        if (newLines.length > 3) {
          return newLines.slice(newLines.length - 3)
        }
        return newLines
      })
    }

    // 0s: Line 1
    addLine("INITIALIZING SYSTEM HANDSHAKE")

    // 1s: Line 2
    const timer1 = setTimeout(() => addLine("VERIFYING ENCRYPTED PROTOCOLS"), 1000)

    // 2s: Line 3
    const timer2 = setTimeout(() => addLine("ACQUIRING NEURAL TARGET"), 2000)

    // 3s: Line 4 (Scrolls out Line 1)
    const timer3 = setTimeout(() => addLine("AUTHENTICATING IDENTITY"), 3000)

    // 4s: Line 5 (The Connection) - This will be handled specially in visually
    const timer4 = setTimeout(() => {
      setLines(prev => {
        // We want ONLY the final connection line or clear the rest for cleaner look?
        // User said "3 goes for 2nd place then that connected...". 
        // Let's just push it normally so it sits at the bottom of the stack or replace?
        // "3rd then when 4rd comes 1 disapper then 5 th is connected so 3 goes for 2nd place"
        // Implies scrolling behavior continues.
        const newLines = [...prev, "[ CONNECTED ]"]
        if (newLines.length > 3) {
          return newLines.slice(newLines.length - 3)
        }
        return newLines
      })
    }, 4000)

    // 5s: Handoff
    const timer5 = setTimeout(() => {
      setPhase("COMPLETE")
      onComplete()
    }, 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [onComplete])

  // Current active line index (approximate for visuals)
  const isConnected = lines.includes("[ CONNECTED ]")

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

          {/* TERMINAL OUTPUT AREA */}
          <div className="w-full flex flex-col items-start px-12 md:px-0 min-h-[100px] justify-end">
            <AnimatePresence mode="popLayout">
              {lines.map((text, i) => {
                const isLast = i === lines.length - 1
                const isConnectedLine = text === "[ CONNECTED ]"

                return (
                  <motion.div
                    key={`${text}-${i}`} // Unique key for scroll animation
                    layout // Animate layout changes (scrolling up)
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isConnectedLine ? 1 : 1 - (lines.length - 1 - i) * 0.3, y: 0 }} // Fade older lines slightly
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-3 text-sm md:text-base font-medium tracking-wider h-8 w-full ${isConnectedLine ? 'justify-center mt-4' : ''}`}
                  >
                    {/* Standard Line */}
                    {!isConnectedLine && (
                      <>
                        <span className="text-cyan/70">{">"}</span>
                        <TypewriterText text={text} />
                        {/* Cursor only on latest line */}
                        {isLast && (
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="w-2 h-4 bg-cyan"
                          />
                        )}
                      </>
                    )}

                    {/* Special Connected Line (Wait for Handshake Phase) */}
                    {isConnectedLine && phase !== "COMPLETE" && (
                      <motion.div
                        layoutId="connected-status"
                        className="flex items-center gap-3"
                      >
                        <span className="text-cyan font-bold text-sm md:text-base font-mono tracking-widest">
                          [ <span className="shadow-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">CONNECTED</span> ]
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* PROGRESS LINE */}
          <div className="w-full px-12 md:px-0">
            <div className="w-full h-[4px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-cyan shadow-[0_0_20px_rgba(0,240,255,0.6)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 5, // 5 Seconds Strict
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
