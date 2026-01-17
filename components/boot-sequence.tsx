"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface BootSequenceProps {
  onComplete: () => void
}

const TypewriterText = ({ text, isNew }: { text: string; isNew: boolean }) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!isNew) {
      setDisplayedText(text)
      return
    }

    setDisplayedText("")
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [text, isNew])

  return (
    <span className="text-white/90">
      {displayedText}
    </span>
  )
}

interface LogLine {
  id: number;
  text: string;
  isNew: boolean;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<LogLine[]>([])
  const [phase, setPhase] = useState<"LOADING" | "COMPLETE">("LOADING")

  // CRT Scanline Effect Component
  const ScanlineOverlay = () => (
    <div className="absolute inset-0 pointer-events-none z-[20] overflow-hidden">
      {/* Scan moving line */}
      <motion.div
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-cyan/5 to-transparent opacity-30"
      />
      {/* Static noise grain (simulated with bg image or subtle varying opacity grid) */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
    </div>
  )

  useEffect(() => {
    let lineCounter = 0;
    const addLine = (text: string) => {
      lineCounter++;
      const newLine: LogLine = { id: lineCounter, text, isNew: true }

      setLines(prev => {
        const oldLines = prev.map(l => ({ ...l, isNew: false }))
        const newLines = [...oldLines, newLine]
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

    // 3s: Line 4
    const timer3 = setTimeout(() => addLine("AUTHENTICATING IDENTITY"), 3000)

    // 4s: Line 5 (Connected)
    const timer4 = setTimeout(() => addLine("[ CONNECTED ]"), 4000)

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

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-[#050505] overflow-hidden flex flex-col items-center justify-center font-mono"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ScanlineOverlay />

        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />

        {/* CONTAINER */}
        <div className="relative w-full max-w-[600px] flex flex-col items-center justify-center gap-6 z-30">

          {/* TERMINAL OUTPUT AREA */}
          <div className="w-full flex flex-col items-start px-12 md:px-0 min-h-[120px] justify-end">
            <AnimatePresence mode="popLayout" initial={false}>
              {lines.map((line, i) => {
                const isLast = i === lines.length - 1
                const isConnectedLine = line.text === "[ CONNECTED ]"

                return (
                  <motion.div
                    key={line.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isConnectedLine ? 1 : 1 - (lines.length - 1 - i) * 0.3, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-3 text-sm md:text-base font-medium tracking-wider h-8 w-full ${isConnectedLine ? 'justify-center mt-4' : ''}`}
                    style={{ position: isConnectedLine ? 'relative' : 'static', zIndex: isConnectedLine ? 50 : 1 }}
                  >
                    {!isConnectedLine && (
                      <>
                        <span className="text-cyan/70">{">"}</span>
                        <TypewriterText text={line.text} isNew={line.isNew} />
                        {isLast && (
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="w-2 h-4 bg-cyan"
                          />
                        )}
                      </>
                    )}

                    {isConnectedLine && (
                      // SPLIT LAYOUT: Brackets fade out, Text moves
                      <div className="flex items-center gap-3">
                        <span className="text-cyan font-bold text-sm md:text-base font-mono tracking-widest flex items-center gap-3">
                          <motion.span
                            animate={phase === "COMPLETE" ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            [
                          </motion.span>

                          {/* THE HERO: CONNECTED TEXT */}
                          <motion.span
                            layoutId="connected-text"
                            className="shadow-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] inline-block"
                            // Override exit so it persists for the move
                            exit={{ opacity: 1, transition: { duration: 0.01 } }}
                          >
                            CONNECTED
                          </motion.span>

                          <motion.span
                            animate={phase === "COMPLETE" ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            ]
                          </motion.span>
                        </span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* PROGRESS LINE - Fades out on complete */}
          <AnimatePresence>
            {phase !== "COMPLETE" && (
              <motion.div
                className="w-full px-12 md:px-0"
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-[4px] bg-white/10 relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-cyan shadow-[0_0_20px_rgba(0,240,255,0.6)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 5,
                      ease: "linear"
                    }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[100px] h-[6px] bg-gradient-to-r from-transparent to-white blur-[2px]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[20px] h-[8px] bg-white blur-[4px] rounded-full" />
                  </motion.div>
                </div>

                <div className="flex justify-between w-full mt-2 text-[10px] text-white/30 font-mono">
                  <span>SYS.KEY: 0x8F4A</span>
                  <span>PROCESSING...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
