"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BOOT_STAGES = [
  { phase: "INIT", messages: ["INITIALIZING NEURAL INTERFACE...", "ESTABLISHING SECURE CONNECTION...", "LOADING QUANTUM CORE..."] },
  { phase: "SCAN", messages: ["SCANNING SYSTEM ARCHITECTURE...", "DETECTING HARDWARE CAPABILITIES...", "OPTIMIZING RENDER PIPELINE..."] },
  { phase: "LOAD", messages: ["LOADING VISUAL ASSETS...", "COMPILING SHADER PROGRAMS...", "INITIALIZING PARTICLE SYSTEMS..."] },
  { phase: "FINAL", messages: ["CALIBRATING DISPLAY MATRIX...", "SYNCHRONIZING TIMELINES...", "READY TO DEPLOY..."] },
]

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [showLogo, setShowLogo] = useState(false)
  const [particles, setParticles] = useState<Array<{ x: number; y: number; delay: number }>>([])
  const [matrixChars, setMatrixChars] = useState<Array<{ char: string; x: number; y: number; speed: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate matrix rain characters
  useEffect(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテト".split("")
    const columns = 40
    const newMatrixChars = Array.from({ length: columns }, (_, i) => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      x: (i / columns) * 100,
      y: Math.random() * -50,
      speed: 0.5 + Math.random() * 1.5,
    }))
    setMatrixChars(newMatrixChars)
  }, [])

  // Animate matrix rain
  useEffect(() => {
    const interval = setInterval(() => {
      setMatrixChars((prev) =>
        prev.map((char) => ({
          ...char,
          y: char.y > 110 ? -10 : char.y + char.speed,
          char: Math.random() > 0.98 ? "01アイウエオカキクケコサシスセソタチツテト".split("")[Math.floor(Math.random() * 20)] : char.char,
        })),
      )
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Generate particles for logo assembly
  useEffect(() => {
    if (progress > 60) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        x: 50 + (Math.random() - 0.5) * 60,
        y: 50 + (Math.random() - 0.5) * 60,
        delay: i * 0.02,
      }))
      setParticles(newParticles)
      setShowLogo(true)
    }
  }, [progress])

  // Typewriter effect for messages
  const typeMessage = useCallback((message: string) => {
    let charIndex = 0
    setDisplayedText("")

    const typeInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setDisplayedText(message.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, 20)

    return () => clearInterval(typeInterval)
  }, [])

  // Progress and stage management
  useEffect(() => {
    const duration = 5000 // 5 seconds total
    const startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      // Update stage based on progress
      const newStage = Math.floor((newProgress / 100) * BOOT_STAGES.length)
      if (newStage !== stage && newStage < BOOT_STAGES.length) {
        setStage(newStage)
        setMessageIndex(0)
      }

      if (newProgress >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          onComplete()
        }, 1000)
      }
    }, 16)

    return () => clearInterval(progressInterval)
  }, [onComplete])

  // Message cycling within stage
  useEffect(() => {
    if (stage < BOOT_STAGES.length) {
      const messages = BOOT_STAGES[stage].messages
      const cleanup = typeMessage(messages[messageIndex])

      const messageTimer = setTimeout(() => {
        if (messageIndex < messages.length - 1) {
          setMessageIndex((prev) => prev + 1)
        }
      }, 1200)

      return () => {
        cleanup()
        clearTimeout(messageTimer)
      }
    }
  }, [stage, messageIndex, typeMessage])

  // Canvas background effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrame: number

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Animated grid
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.05 + Math.sin(Date.now() / 1000) * 0.02})`
      ctx.lineWidth = 1

      const gridSize = 50
      const offset = (Date.now() / 50) % gridSize

      for (let x = -offset; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = -offset; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      animationFrame = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Animated grid background */}
        <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />

        {/* Matrix rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {matrixChars.slice(0, 20).map((char, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-cyan text-xs"
              style={{
                left: `${char.x}%`,
                top: `${char.y}%`,
              }}
            >
              {char.char}
            </motion.div>
          ))}
        </div>

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.03) 2px, rgba(0, 240, 255, 0.03) 4px)",
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-4">
          {/* Logo assembly animation */}
          {showLogo && (
            <motion.div
              className="mb-6 relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Particles converging to form logo */}
              {particles.slice(0, 30).map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-cyan rounded-full"
                  initial={{ x: particle.x * 2, y: particle.y * 2, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: [0, 1, 0] }}
                  transition={{ delay: particle.delay, duration: 1 }}
                  style={{ boxShadow: "0 0 8px rgba(0, 240, 255, 0.6)" }}
                />
              ))}

              {/* Main logo */}
              <motion.div
                className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan via-violet to-plasma"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(0, 240, 255, 0.5)",
                    "0 0 30px rgba(0, 240, 255, 0.8)",
                    "0 0 20px rgba(0, 240, 255, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {"</>"}
              </motion.div>

              {/* Orbital rings */}
              <motion.div
                className="absolute inset-0 border border-cyan/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ width: "140%", height: "140%", left: "-20%", top: "-20%" }}
              />
            </motion.div>
          )}

          {/* Progress bar with glow */}
          <div className="w-full max-w-md mb-6">
            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden border border-cyan/20">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan via-violet to-plasma"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-lg"
                style={{
                  background: `linear-gradient(to right, rgba(0, 240, 255, 0.4) 0%, rgba(0, 240, 255, 0.4) ${progress}%, transparent ${progress}%)`,
                }}
              />
            </div>

            {/* Progress percentage */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs font-mono text-cyan/50 uppercase tracking-wider">
                {stage < BOOT_STAGES.length ? BOOT_STAGES[stage].phase : "COMPLETE"}
              </span>
              <motion.span
                className="text-sm font-mono font-bold text-cyan"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>
          </div>

          {/* Terminal messages - compact */}
          <div className="w-full max-w-md">
            <div className="bg-black/30 border border-cyan/20 rounded-lg p-4 backdrop-blur-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-cyan/10">
                <div className="w-2 h-2 rounded-full bg-red-500/60" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <div className="w-2 h-2 rounded-full bg-green-500/60" />
                <span className="ml-2 text-[10px] font-mono text-cyan/50">system.boot</span>
              </div>

              {/* Messages - show only current stage */}
              <div className="font-mono text-xs space-y-1.5 min-h-[80px]">
                {/* Show last 2 completed messages */}
                {stage > 0 && BOOT_STAGES[stage - 1] && (
                  <>
                    {BOOT_STAGES[stage - 1].messages.slice(-2).map((msg, idx) => (
                      <motion.div
                        key={`prev-${idx}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className="text-cyan/30 flex items-center gap-2"
                      >
                        <span className="text-green-500/50">✓</span>
                        <span className="truncate">{msg}</span>
                      </motion.div>
                    ))}
                  </>
                )}

                {/* Current typing message */}
                {stage < BOOT_STAGES.length && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-cyan flex items-center gap-2"
                  >
                    <motion.span
                      className="text-cyan"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ▸
                    </motion.span>
                    <span className="truncate">{displayedText}</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-1.5 h-3 bg-cyan ml-1 flex-shrink-0"
                    />
                  </motion.div>
                )}
              </div>

              {/* System stats - compact */}
              <div className="mt-3 pt-3 border-t border-cyan/10 grid grid-cols-3 gap-3 text-[10px] font-mono">
                <div>
                  <div className="text-mist/30 mb-0.5">CPU</div>
                  <motion.div
                    className="text-cyan text-xs"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {Math.min(Math.round(progress * 0.8), 80)}%
                  </motion.div>
                </div>
                <div>
                  <div className="text-mist/30 mb-0.5">MEM</div>
                  <motion.div
                    className="text-violet text-xs"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.3, repeat: Infinity }}
                  >
                    {Math.min(Math.round(progress * 0.6), 60)}%
                  </motion.div>
                </div>
                <div>
                  <div className="text-mist/30 mb-0.5">GPU</div>
                  <motion.div
                    className="text-plasma text-xs"
                    animate={{ opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.7, repeat: Infinity }}
                  >
                    {Math.min(Math.round(progress * 0.9), 90)}%
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom hint */}
          {progress > 85 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <motion.p
                className="text-xs font-mono text-cyan/40"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Launching...
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Vignette effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
