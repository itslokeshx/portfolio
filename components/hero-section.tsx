"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Twitter, Linkedin } from "lucide-react"
import { TerminalWindow } from "./terminal-window"

// Smooth Typewriter Component
const SmoothText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let interval: NodeJS.Timeout

    const startDelay = setTimeout(() => {
      setShowCursor(true)
      let currentIndex = 0

      interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsComplete(true)
          setShowCursor(false) // Remove cursor after finished
        }
      }, 50) // Smooth typing speed

    }, delay)

    return () => {
      clearTimeout(startDelay)
      clearInterval(interval)
    }
  }, [text, delay])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="inline-block w-[3px] h-[1em] bg-cyan ml-1 align-middle animate-pulse" />
      )}
    </span>
  )
}


export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#050505] flex flex-col justify-center">
      {/* Background Grid - Seamless continuation */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Radial gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-titanium/50 via-transparent to-transparent pointer-events-none" />

      {/* Navigation Bar */}
      <motion.nav
        initial={{ borderBottomColor: "rgba(255,255,255,0)" }}
        animate={{ borderBottomColor: "rgba(255,255,255,0.05)" }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#050505]/80 backdrop-blur-md"
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">

          {/* Left: Connected Status (Target for Loader Transition) */}
          <div className="flex items-center gap-4 pl-4 pt-1">
            {/* Note: The loader "CONNECTED" text flies to roughly this position (top: 28px, left: 64px) */}
            {/* We fade this in slightly later to ensure smooth handoff if using layoutId across components isn't perfect, 
                 OR we use the same visual style so it matches perfectly. */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }} // Wait for loader element to arrive/fade
              className="flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded border border-cyan/50 bg-cyan/5 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                <span className="text-cyan font-mono font-bold text-sm">{"{ }"}</span>
              </div>

              <div className="flex flex-col leading-none">
                <div className="flex items-center gap-2">
                  <motion.span layoutId="connected-text" className="text-cyan font-bold tracking-[0.2em] text-sm drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] inline-block">CONNECTED</motion.span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
                </div>
                <span className="text-carbon text-[10px] font-mono tracking-wider mt-1">DEV.SYS.01</span>
              </div>
            </motion.div>
          </div>

          {/* Center Links - "Constructing" in */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {["HOME", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                href={`#${item.toLowerCase()}`}
                className="text-[11px] font-medium text-gray-400 hover:text-cyan tracking-[0.2em] transition-colors duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Right Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <button className="flex items-center gap-2 px-5 py-2 border border-cyan/30 rounded text-cyan text-[11px] tracking-widest font-medium hover:bg-cyan/10 transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              INIT RESUME
              <div className="w-1.5 h-1.5 rounded-full bg-cyan/50" />
            </button>
          </motion.div>

        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-20 pt-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-carbon text-[11px] font-mono uppercase tracking-[0.2em]"
            >
              <SmoothText text="LOKESH — A DEVELOPER IN PROGRESS" delay={1500} />
            </motion.div>

            <div className="space-y-2 min-h-[160px]"> {/* Min height to prevent shift */}
              {/* Smooth Reveal Titles */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-mist leading-[1.1] tracking-tight">
                <SmoothText text="I learn software" delay={2500} />
              </h1>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-cyan via-plasma to-cyan bg-clip-text text-transparent leading-[1.1] tracking-tight"
                style={{ textShadow: "0 0 30px rgba(0, 240, 255, 0.4)" }}
              >
                <SmoothText text="by building real things." delay={3500} />
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="text-carbon text-lg leading-relaxed max-w-[500px]"
            >
              This site is a living workspace where ideas move from rough experiments to usable systems. Some work, some don't—but everything teaches me something. Explore my evolution from code to product.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group px-8 py-3.5 border-2 border-cyan bg-transparent text-cyan rounded-md font-medium text-[15px] hover:bg-cyan hover:text-void transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                see my work →
              </button>
              <button className="px-8 py-3.5 border border-cyan/30 bg-transparent text-mist rounded-md font-medium text-[15px] hover:border-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300">
                how this site works
              </button>
            </motion.div>
          </div>

          {/* Right Column - Terminal Appearance */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5, ease: "circOut" }}
              className="origin-center"
            >
              <TerminalWindow />
            </motion.div>
          </div>

        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span className="text-[10px] font-mono text-cyan/40 tracking-[0.3em] uppercase">Scroll to Initialize</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-cyan/40 w-4 h-4" />
        </motion.div>
      </motion.div>

    </section >
  )
}
