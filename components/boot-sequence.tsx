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
        transition={{ duration: 0.5, delay: 0.2 }} // Fade out background slower/later to allow text to move?
      // Actually, opacity: 0 on ROOT kills the layoutId child instantly unless layoutId is promoted.
      // Better strategy: Don't let the layoutId element be a child of an exiting AnimatePresence if possible, 
      // OR ensure the exit prop doesn't hide everything.
      // For now, removing exit prop on root might keep it around, but we need it gone.
      // The fix is actually in the PARENT (App) not unmounting this component abruptly?
      // If parent unmounts, this exit fires.
      >
        {/* Helper: To allow layoutId to persist, we rely on Framer Motion's shared element presence. 
            If the destination (Hero) is mounted when this unmounts, it works. 
            Trouble is if `opacity: 0` here applies to children. It does.
            We must override exit on the child.
        */}

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
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }} // This exit is for scrolling lines only
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
                      <motion.div
                        layoutId="connected-status"
                        // CRITICAL: We override exit here so it doesn't fade out with the parent, 
                        // but rather lets the layoutId take over to the new destination.
                        // Setting exit to empty object or opacity 1 can help.
                        exit={{ opacity: 1, transition: { duration: 0.01 } }}
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
          {/* This should fade out separately */}
          <motion.div
            className="w-full px-12 md:px-0"
            exit={{ opacity: 0 }}
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

        </div>

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
