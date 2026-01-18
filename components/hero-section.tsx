"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Twitter, Linkedin, ArrowRight } from "lucide-react"
import { TerminalWindow, TerminalHandles } from "./terminal-window"

// Smooth Typewriter Component
// Rotating Typewriter Component
const RotatingText = ({ texts, className = "" }: { texts: string[], className?: string }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(50)

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex]

      setDisplayText(current => {
        if (isDeleting) {
          return fullText.substring(0, current.length - 1)
        } else {
          return fullText.substring(0, current.length + 1)
        }
      })

      // Speed Logic
      if (!isDeleting && displayText === fullText) {
        // Finished typing, pause before deleting
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayText === "") {
        // Finished deleting, move to next text
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }

      setTypingSpeed(isDeleting ? 30 : 50)
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentTextIndex, texts, typingSpeed])

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-cyan/80 ml-1 align-middle animate-pulse" />
    </span>
  )
}


export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<TerminalHandles>(null)

  const handleResumeClick = () => {
    terminalRef.current?.addLog("resume not ready — building projects", "WARN")
  }

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#050505] flex flex-col justify-center">
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
        transition={{ duration: 0.5, delay: 0.2 }}
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
              transition={{ delay: 0.1, duration: 0.3 }} // Fast load
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
                transition={{ duration: 0.3, delay: 0.2 + (i * 0.05) }}
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
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <button
              onClick={handleResumeClick}
              className="flex items-center gap-2 px-5 py-2 border border-cyan/30 rounded text-cyan text-[11px] tracking-widest font-medium hover:bg-cyan/10 transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              INIT RESUME
              <div className="w-1.5 h-1.5 rounded-full bg-cyan/50" />
            </button>
          </motion.div>

        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-20 pt-20">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-center min-h-[calc(100vh-80px)]">

          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-8 relative z-20 pl-4 lg:pl-0 order-2 lg:order-1">

            {/* Header Group */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan/10 border border-cyan/20 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  <span className="text-cyan text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase">
                    System Online
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-2 min-h-[50px] leading-none"
              >
                {/* Refined "Man Made" Colors - Electric Blue & Clean White */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 tracking-tight">
                  I learn code
                </h1>
                <div className="relative inline-block">
                  {/* Subtle Electric Blue Glow only */}
                  <div className="absolute -inset-1 bg-blue-500/20 blur-xl opacity-40" />
                  <h1
                    className="relative text-[26px] sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight whitespace-normal sm:whitespace-nowrap"
                    style={{ textShadow: "0 0 30px rgba(0, 200, 255, 0.2)" }}
                  >
                    <RotatingText
                      texts={[
                        "by building real things.",
                        "by solving real problems.",
                        "by learning through failure.",
                        "by refining what works."
                      ]}
                    />
                  </h1>
                </div>
              </motion.div>
            </div>

            {/* Description - Consistent constrained width for readability */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-gray-400 text-[15px] sm:text-[17px] leading-relaxed max-w-[480px] font-light space-y-5"
            >
              <div>
                <p>This site is a living workspace.</p>
                <p className="mt-1">
                  Ideas start as experiments and evolve into usable systems.
                </p>
                <p className="mt-1">
                  Some succeed. Some fail.
                </p>
              </div>
              <p className="text-cyan/80 font-mono text-xs tracking-wide">Every build leaves me better than before.</p>
            </motion.div>

          </div>

          {/* Right Column - Terminal Appearance */}
          <div className="flex justify-center lg:justify-end items-center h-full order-1 lg:order-2">
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "circOut" }}
              className="origin-center w-full max-w-xl"
            >
              <TerminalWindow ref={terminalRef} />
            </motion.div>
          </div>

        </div>
      </div>



      {/* Smooth Transition Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-20" />

    </section >
  )
}
