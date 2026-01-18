"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Terminal, Cpu, Zap, Wifi, Disc } from "lucide-react"

// --- Configuration ---
const ASCII_ART = `
██╗      ██████╗ ██╗  ██╗███████╗███████╗██╗  ██╗
██║     ██╔═══██╗██║ ██╔╝██╔════╝██╔════╝██║  ██║
██║     ██║   ██║█████╔╝ █████╗  ███████╗███████║
██║     ██║   ██║██╔═██╗ ██╔══╝  ╚════██║██╔══██║
███████╗╚██████╔╝██║  ██╗███████╗███████║██║  ██║
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
`

interface LogEntry {
    id: number
    timestamp: string
    level: 'INFO' | 'WARN' | 'SUCCESS' | 'SYSTEM'
    message: string
    color: string
}

const BOOT_LOGS: LogEntry[] = [
    { id: 1, timestamp: "10:24:01", level: 'SYSTEM', message: "initializing workspace", color: "text-cyan-400" },
    { id: 2, timestamp: "10:24:02", level: 'INFO', message: "loading projects & skills", color: "text-gray-400" },
    { id: 3, timestamp: "10:24:03", level: 'WARN', message: "preparing interactive modules", color: "text-cyan-400/80" }, // Subtler cyan
    { id: 4, timestamp: "10:24:05", level: 'SUCCESS', message: "system_ready. waiting for user input.", color: "text-green-400" } // Keep green for success only
]

// --- Hooks ---

// Smooth, variable-speed typewriter effect
const useSmoothTypewriter = (text: string, speed = 10) => {
    const [displayedText, setDisplayedText] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    const index = useRef(0)

    useEffect(() => {
        // Reset state for clean start (handles Strict Mode and prop changes)
        index.current = 0
        setDisplayedText("")
        setIsComplete(false)

        let timeoutId: NodeJS.Timeout

        const type = () => {
            if (index.current < text.length) {
                index.current++
                setDisplayedText(text.slice(0, index.current))

                const variableSpeed = speed + (Math.random() * 15 - 5)
                timeoutId = setTimeout(type, variableSpeed)
            } else {
                setIsComplete(true)
            }
        }

        timeoutId = setTimeout(type, 100)
        return () => clearTimeout(timeoutId)
    }, [text, speed])

    return { displayedText, isComplete }
}

export function TerminalWindow() {
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [currentStepId, setCurrentStepId] = useState(1)

    // Sequence Logic
    useEffect(() => {
        if (currentStepId > BOOT_LOGS.length) return

        const timeout = setTimeout(() => {
            setLogs(prev => [...prev, BOOT_LOGS[currentStepId - 1]])
            setCurrentStepId(prev => prev + 1)
        }, 800) // Delay between logs

        return () => clearTimeout(timeout)
    }, [currentStepId])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[550px] relative font-mono text-xs sm:text-sm leading-relaxed"
        >
            {/* Glow backing - refined neon */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#56b6c2]/20 to-[#c678dd]/20 rounded-xl blur-xl opacity-20" />

            {/* Main Window Container - High fidelity dark theme */}
            <div className="relative bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/5 rounded-lg overflow-hidden shadow-2xl flex flex-col min-h-[360px]">

                {/* Header - Minimalist */}
                <div className="h-8 bg-[#151515] border-b border-white/5 flex items-center justify-between px-4 select-none">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium tracking-wider opacity-60">
                        <Terminal className="w-3 h-3" />
                        <span>root@loki:~/welcome home</span>
                    </div>

                    <div className="w-10" />
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col gap-1 overflow-hidden relative">

                    {/* Retro Scanline - subtle texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />

                    {/* ASCII Art - The Classic */}
                    <motion.pre
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="font-bold text-[8px] sm:text-[10px] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-[#56b6c2] to-[#61afef] self-start select-none mb-6"
                    >
                        {ASCII_ART}
                    </motion.pre>

                    {/* Logs */}
                    <div className="space-y-1.5 font-mono text-[11px] sm:text-xs">
                        {logs.map((log) => (
                            <LogLine key={log.id} log={log} />
                        ))}
                    </div>

                    {/* Shell Prompt - Ready State */}
                    {currentStepId > BOOT_LOGS.length && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 pt-4 text-xs sm:text-sm"
                        >
                            <span className="text-[#98c379]">➜</span>
                            <span className="text-[#56b6c2]">root@loki</span>
                            <span className="text-gray-500">:</span>
                            <span className="text-[#61afef]">~</span>
                            <span className="text-gray-400">$</span>
                            <span className="w-2 h-4 bg-[#56b6c2]/80 animate-pulse block ml-1" />
                        </motion.div>
                    )}
                </div>

                {/* Footer Stats - Authentic Vibe */}
                <div className="h-7 bg-[#111111] border-t border-white/5 flex items-center justify-between px-3 text-[9px] sm:text-[10px] text-gray-500 font-mono">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                            <Disc className="w-3 h-3" />
                            <span>MAIN: STABLE</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                            <Cpu className="w-3 h-3" />
                            <span>CPU: 14%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#98c379]">
                        <Wifi className="w-3 h-3" />
                        <span>ONLINE // 24ms</span>
                    </div>
                </div>

            </div>
        </motion.div>
    )
}

function LogLine({ log }: { log: LogEntry }) {
    const { displayedText, isComplete } = useSmoothTypewriter(log.message, 5)

    return (
        <div className="flex flex-row items-center gap-2 text-gray-400 font-medium w-full">
            <span className="text-gray-600 shrink-0 whitespace-nowrap">[{log.timestamp}]</span>
            <span className={`shrink-0 min-w-[3.5rem] whitespace-nowrap ${log.level === 'INFO' ? 'text-[#61afef]' :
                log.level === 'WARN' ? 'text-[#e5c07b]' :
                    log.level === 'SUCCESS' ? 'text-[#98c379]' : 'text-[#c678dd]'
                }`}>[{log.level}]</span>
            <span className={`${isComplete ? log.color : 'text-gray-300'} break-words leading-tight`}>
                {displayedText}
            </span>
        </div>
    )
}
