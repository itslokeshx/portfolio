"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const ASCII_LOGO = `
██╗      ██████╗ ██╗  ██╗███████╗███████╗██╗  ██╗
██║     ██╔═══██╗██║ ██╔╝██╔════╝██╔════╝██║  ██║
██║     ██║   ██║█████╔╝ █████╗  ███████╗███████║
██║     ██║   ██║██╔═██╗ ██╔══╝  ╚════██║██╔══██║
███████╗╚██████╔╝██║  ██╗███████╗███████║██║  ██║
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝`

const TERMINAL_STATS = [
    "> workspace: active",
    "> modules loaded: projects, skills, archive",
    "> system state: learning",
    "> last update: today"
]

export function TerminalWindow() {
    const [typedStats, setTypedStats] = useState<string[]>([])
    const [currentStatIndex, setCurrentStatIndex] = useState(0)
    const [currentText, setCurrentText] = useState("")
    const [showCursor, setShowCursor] = useState(true)

    // Typing effect for stats
    useEffect(() => {
        if (currentStatIndex >= TERMINAL_STATS.length) return

        const fullText = TERMINAL_STATS[currentStatIndex]
        let charIndex = 0

        const typingInterval = setInterval(() => {
            if (charIndex <= fullText.length) {
                setCurrentText(fullText.slice(0, charIndex))
                charIndex++
            } else {
                clearInterval(typingInterval)
                setTypedStats(prev => [...prev, fullText])
                setTimeout(() => {
                    setCurrentStatIndex(prev => prev + 1)
                    setCurrentText("")
                }, 300)
            }
        }, 30)

        return () => clearInterval(typingInterval)
    }, [currentStatIndex])

    // Cursor blink
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 500)

        return () => clearInterval(blinkInterval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full max-w-[550px] glass-strong rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,240,255,0.1)]"
        >
            {/* Title Bar */}
            <div className="h-10 bg-titanium/90 border-b border-cyan/15 flex items-center px-4 relative">
                {/* macOS Dots */}
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                {/* Title */}
                <div className="absolute left-1/2 -translate-x-1/2 text-carbon text-sm font-mono">
                    terminal://lokesh
                </div>
            </div>

            {/* Terminal Content */}
            <div className="p-8 relative">
                {/* ASCII Logo */}
                <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="bg-gradient-to-r from-cyan to-blue-600 bg-clip-text text-transparent font-bold font-mono text-[10px] sm:text-xs leading-[1.1] text-center mb-6 whitespace-pre"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                >
                    {ASCII_LOGO}
                </motion.pre>

                {/* Terminal Stats */}
                <div className="font-mono text-sm text-cyan space-y-2">
                    {/* Already typed stats */}
                    {typedStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="leading-relaxed"
                        >
                            {stat}
                        </motion.div>
                    ))}

                    {/* Currently typing stat */}
                    {currentStatIndex < TERMINAL_STATS.length && (
                        <div className="leading-relaxed flex items-center">
                            <span>{currentText}</span>
                            {showCursor && (
                                <span className="inline-block w-2 h-4 bg-cyan ml-1 animate-pulse" />
                            )}
                        </div>
                    )}
                </div>

                {/* Version Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 border border-cyan/20 bg-titanium/80 rounded-xl text-carbon text-xs font-mono">
                    v0.1.0
                </div>
            </div>
        </motion.div>
    )
}
