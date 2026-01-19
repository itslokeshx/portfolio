"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Twitter, Linkedin, ArrowRight } from "lucide-react"
import { TerminalWindow, TerminalHandles } from "./terminal-window"
import { useIsMobile } from "@/hooks/use-mobile"

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
  const isMobile = useIsMobile()

  // Desktop: Text (1.8s) -> Terminal (2.4s)
  // Mobile: Terminal (1.8s) -> Text (2.2s)
  const startDelay = 0.8
  const textDelay = isMobile ? startDelay + 0.3 : startDelay
  const terminalDelay = isMobile ? startDelay : startDelay + 0.4

  const handleResumeClick = () => {
    terminalRef.current?.addLog("resume in progress —  building projects", "warning")
  }

  useEffect(() => {
    const handleResumeEvent = () => handleResumeClick()
    window.addEventListener("trigger-resume", handleResumeEvent)
    return () => window.removeEventListener("trigger-resume", handleResumeEvent)
  }, [])

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



      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-20 pt-[100px] md:pt-24 pb-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-20 items-center min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-80px)]">

          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-8 relative z-20 pl-4 lg:pl-0 order-2 lg:order-1">

            {/* Header Group */}
            <div className="space-y-6">
              <motion.div
                key={isMobile ? "mobile-text-1" : "desktop-text-1"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: textDelay, duration: 0.8 }} // Slow, smooth fade after hold
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan/50 animate-pulse shadow-[0_0_5px_rgba(0,240,255,0.4)]" />
                  <span className="text-gray-300 text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase">
                    System Online
                  </span>
                </div>
              </motion.div>

              <motion.div
                key={isMobile ? "mobile-text-2" : "desktop-text-2"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: textDelay + 0.2, duration: 0.8 }} // Following badge
                className="space-y-2 min-h-[50px] leading-none"
              >
                {/* Refined "Man Made" Colors - Electric Blue & Clean White */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/90 tracking-tight">
                  I learn code
                </h1>
                <div className="relative inline-block mt-1 sm:mt-0">
                  {/* Subtle Electric Blue Glow only */}
                  <div className="absolute -inset-1 bg-blue-500/20 blur-xl opacity-40" />
                  <h1
                    className="relative text-[28px] sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight whitespace-normal sm:whitespace-nowrap min-h-[40px] sm:min-h-auto"
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
              key={isMobile ? "mobile-text-3" : "desktop-text-3"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: textDelay + 0.4 }} // Description follows title
              className="text-gray-200 text-[15px] sm:text-[17px] leading-relaxed max-w-[480px] font-light space-y-5"
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
              <p className="text-cyan font-mono text-sm sm:text-[15px] tracking-wide drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">Every build leaves me better than before.</p>
            </motion.div>

          </div>

          {/* Right Column - Terminal Appearance */}
          <div className="flex justify-center lg:justify-end items-center h-full order-1 lg:order-2">
            <motion.div
              key={isMobile ? "mobile-term" : "desktop-term"}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: terminalDelay, ease: "circOut" }} // Terminal follows description
              className="origin-center w-full max-w-xl"
            >
              <TerminalWindow ref={terminalRef} />
            </motion.div>
          </div>

        </div>
      </div>



      {/* Smooth Transition Fade */}
      < div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-void via-void/40 to-transparent pointer-events-none z-5" />

    </section >
  )
}
