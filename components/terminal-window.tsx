"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Cpu, Wifi, Disc, ChevronRight } from "lucide-react"

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
    id: string | number
    message: string | React.ReactNode
    level?: 'info' | 'success' | 'warning' | 'error' | 'system'
    timestamp?: string
    isCommand?: boolean
    color?: string
}



const COMMANDS = {
    help: "Show available commands",
    whoami: "System identity",
    status: "Runtime state",
    focus: "Current direction",
    logs: "Recent activity",
    thought: "System reflection",
    clear: "Clear terminal",
    sudo: "Admin privilege (Hidden)"

} as const

type CommandType = keyof typeof COMMANDS

// Define the handle type for parent components
export interface TerminalHandles {
    addLog: (message: string, level?: LogEntry['level']) => void
}

// Typewriter Component
const Typewriter = ({ text, delay = 0, speed = 5, onComplete }: { text: string, delay?: number, speed?: number, onComplete?: () => void }) => {
    const [displayText, setDisplayText] = useState("")
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true)
        }, delay)
        return () => clearTimeout(startTimeout)
    }, [delay])

    useEffect(() => {
        if (!started) return

        let i = 0
        const interval = setInterval(() => {
            if (i >= text.length) {
                clearInterval(interval)
                setDisplayText(text) // Ensure full text is shown
                onComplete?.()
                return
            }
            setDisplayText(text.substring(0, i + 1))
            i++
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed, started, onComplete])

    return <span>{displayText}</span>
}

export const TerminalWindow = forwardRef<TerminalHandles>((props, ref) => {
    const [history, setHistory] = useState<LogEntry[]>([])
    const [input, setInput] = useState("")
    const [isBooting, setIsBooting] = useState(true)

    // Placeholder Typing Logic
    const [placeholderText, setPlaceholderText] = useState("")
    const [placeholderIndex, setPlaceholderIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [charIndex, setCharIndex] = useState(0)

    const placeholderPrompts = [
        "type 'help' to get started",
        "try 'whoami' to know more",
        "check 'status' or 'focus'",
        "run 'thought' for insight"
    ]

    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)


    // Helper for correct 24h local time format (HH:MM:SS)
    const getLocalTime = (date: Date = new Date()) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    // Initial Boot Sequence
    useEffect(() => {
        const now = new Date()

        const bootLogs: LogEntry[] = [
            { id: 'boot-1', timestamp: getLocalTime(now), level: 'system', message: "INITIALIZING NEURAL INTERFACE...", color: "text-cyan-400" },
            { id: 'boot-2', timestamp: getLocalTime(new Date(now.getTime() + 400)), level: 'info', message: "LOADING CORE MODULES...", color: "text-blue-400" },
            { id: 'boot-3', timestamp: getLocalTime(new Date(now.getTime() + 800)), level: 'warning', message: "ESTABLISHING SECURE CONNECTION...", color: "text-yellow-400" },
            { id: 'boot-4', timestamp: getLocalTime(new Date(now.getTime() + 1200)), level: 'success', message: "ACCESS GRANTED", color: "text-green-400" }
        ]

        let timeouts: NodeJS.Timeout[] = []

        bootLogs.forEach((log, index) => {
            const timeout = setTimeout(() => {
                setHistory(prev => [...prev, log])
                if (index === bootLogs.length - 1) {
                    setIsBooting(false)
                }
            }, 400 * (index + 1))
            timeouts.push(timeout)
        })

        return () => timeouts.forEach(clearTimeout)
    }, [])

    // Placeholder Animation Effect
    useEffect(() => {
        if (isBooting) return

        const currentPrompt = placeholderPrompts[placeholderIndex]

        let timeout: NodeJS.Timeout

        if (isDeleting) {
            timeout = setTimeout(() => {
                setPlaceholderText(currentPrompt.substring(0, charIndex - 1))
                setCharIndex(prev => prev - 1)
            }, 50) // Deleting speed
        } else {
            timeout = setTimeout(() => {
                setPlaceholderText(currentPrompt.substring(0, charIndex + 1))
                setCharIndex(prev => prev + 1)
            }, 100) // Typing speed
        }

        if (!isDeleting && charIndex === currentPrompt.length) {
            // Finished typing, wait before deleting
            timeout = setTimeout(() => {
                setIsDeleting(true)
            }, 2000)
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next prompt
            setIsDeleting(false)
            setPlaceholderIndex(prev => (prev + 1) % placeholderPrompts.length)
        }

        return () => clearTimeout(timeout)
    }, [charIndex, isDeleting, placeholderIndex, isBooting])

    // Scroll to bottom on history update - STRICTLY INTERNAL SCROLL
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [history])

    // Focus input on click
    const handleContainerClick = () => {
        inputRef.current?.focus()
    }

    // Expose addLog to parent
    useImperativeHandle(ref, () => ({
        addLog: (message: string, level: LogEntry['level'] = 'info') => {
            // Message color logic (distinct from level color)
            let color = "text-gray-300"
            if (level === 'error') color = "text-red-500"
            else if (level === 'success') color = "text-green-400"
            else if (level === 'warning') color = "text-yellow-400"
            else if (level === 'system') color = "text-cyan-400"
            else if (level === 'info') color = "text-gray-400"

            const newLog = {
                id: Date.now(),
                timestamp: getLocalTime(),
                level,
                message,
                color
            }

            setHistory(prev => {
                const lastLog = prev[prev.length - 1]
                if (lastLog && lastLog.message === message && lastLog.level === level) {
                    return [...prev.slice(0, -1), newLog]
                }
                return [...prev, newLog]
            })
        }
    }))

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase()

        // Add command to history
        setHistory(prev => [...prev, {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            message: <span className="flex items-center gap-2"><span className="text-green-400">➜</span> <span className="text-white">{cmd}</span></span>,
            isCommand: true
        }])

        switch (cleanCmd) {
            case "help":
                addResponse([
                    <Typewriter key="h1" text="available commands:" speed={5} />,
                    "",
                    <div key="help-grid" className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <span className="text-cyan-400"><Typewriter text="whoami" delay={50} speed={10} /></span><span className="text-gray-400">→ <Typewriter text="system identity" delay={60} speed={5} /></span>
                        <span className="text-cyan-400"><Typewriter text="status" delay={100} speed={10} /></span><span className="text-gray-400">→ <Typewriter text="runtime state" delay={110} speed={5} /></span>
                        <span className="text-cyan-400"><Typewriter text="focus" delay={150} speed={10} /></span><span className="text-gray-400">→ <Typewriter text="current direction" delay={160} speed={5} /></span>
                        <span className="text-cyan-400"><Typewriter text="logs" delay={200} speed={10} /></span><span className="text-gray-400">→ <Typewriter text="recent activity" delay={210} speed={5} /></span>
                        <span className="text-cyan-400"><Typewriter text="thought" delay={250} speed={10} /></span><span className="text-gray-400">→ <Typewriter text="system reflection" delay={260} speed={5} /></span>
                        <span className="text-cyan-400"><Typewriter text="clear" delay={300} speed={10} /></span><span className="text-gray-400">→ <Typewriter text="clear terminal" delay={310} speed={5} /></span>
                    </div>
                ])
                break

            case "whoami":
                addResponse([
                    <div key="whoami" className="flex flex-col gap-1">
                        <span className="text-white font-bold"><Typewriter text="lokesh@workspace" speed={5} /></span>
                        <span className="text-gray-300"><Typewriter text="Web developer" delay={50} speed={5} /></span>
                        <span className="text-gray-400 italic"><Typewriter text="learning by building real systems" delay={100} speed={5} /></span>
                        <br />
                        {/* <div className="flex flex-col gap-1 pl-2 border-l-2 border-cyan-500/30">
                            <span className="flex items-center gap-2 text-green-400">✔ <span className="text-gray-300"><Typewriter text="Personal" delay={150} speed={5} /></span></span>
                            <span className="flex items-center gap-2 text-green-400">✔ <span className="text-gray-300"><Typewriter text="Grounded" delay={200} speed={5} /></span></span>
                            <span className="flex items-center gap-2 text-green-400">✔ <span className="text-gray-300"><Typewriter text="No ego" delay={250} speed={5} /></span></span>
                            <span className="flex items-center gap-2 text-green-400">✔ <span className="text-gray-300"><Typewriter text="Very jury-safe" delay={300} speed={5} /></span></span>
                        </div> */}
                    </div>
                ])
                break

            case "status":
                addResponse([
                    <div key="status" className="flex flex-col gap-1">
                        <div><span className="text-cyan-400">SYSTEM:</span>   <span className="text-green-400"><Typewriter text="ONLINE" delay={50} speed={10} /></span></div>
                        <div><span className="text-cyan-400">WORKFLOW:</span> <span className="text-yellow-400"><Typewriter text="ACTIVE" delay={100} speed={10} /></span></div>
                        <div><span className="text-cyan-400">STATE:</span>    <span className="text-purple-400"><Typewriter text="EVOLVING" delay={150} speed={10} /></span></div>
                    </div>
                ])
                break

            case "focus":
                addResponse([
                    <div key="focus" className="flex flex-col gap-1">
                        <span className="text-gray-300 underline underline-offset-4 decoration-cyan-500/30 mb-2"><Typewriter text="current focus:" speed={5} /></span>
                        <span className="flex items-center gap-2"><span className="text-cyan-400">→</span> <Typewriter text="building usable products" delay={50} speed={5} /></span>
                        <span className="flex items-center gap-2"><span className="text-cyan-400">→</span> <Typewriter text="strengthening fundamentals" delay={100} speed={5} /></span>
                        <span className="flex items-center gap-2"><span className="text-cyan-400">→</span> <Typewriter text="refining interaction details" delay={150} speed={5} /></span>
                    </div>
                ])
                break

            case "logs":
                addResponse([
                    <div key="logs" className="flex flex-col gap-1 font-mono text-xs">
                        <span className="flex gap-2"><span className="text-cyan-400">[INFO]</span> <span className="text-gray-400"><Typewriter text="iterating on product ideas" delay={0} speed={5} /></span></span>
                        <span className="flex gap-2"><span className="text-cyan-400">[INFO]</span> <span className="text-gray-400"><Typewriter text="refining system design" delay={50} speed={5} /></span></span>
                        <span className="flex gap-2"><span className="text-cyan-400">[INFO]</span> <span className="text-gray-400"><Typewriter text="learning through implementation" delay={100} speed={5} /></span></span>
                    </div>
                ])
                break

            case "thought":
                const thoughts = [
                    "• clarity comes from building",
                    "• small systems teach big lessons",
                    "• progress compounds quietly",
                    "• simplicity reveals intent",
                    "• real work exposes gaps"
                ]
                const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)]
                addResponse([
                    <span key="thought" className="text-emerald-300 italic"><Typewriter text={randomThought} speed={15} /></span>
                ])
                break

            case "sudo":
                addResponse([
                    <div key="sudo" className="text-red-400 flex flex-col">
                        <span><Typewriter text="permission denied." speed={20} /></span>
                        <span className="text-gray-400"><Typewriter text="focus over shortcuts." delay={200} speed={20} /></span>
                    </div>
                ])
                break

            case "clear":
                setHistory([])
                break

            default:
                if (cleanCmd !== "") {
                    addResponse([`Command not found: ${cleanCmd}. Type 'help' for options.`])
                }
                break
        }
        setInput("")
    }

    const addResponse = (lines: (string | React.ReactNode)[]) => {
        const newLogs = lines.map((line) => {
            return {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                message: line,
                color: "text-gray-300"
            }
        })
        setHistory(prev => [...prev, ...newLogs])
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input)
        }
    }

    // Helper to get level color (matches original specific colors)
    const getLevelColor = (level?: string) => {
        switch (level) {
            case 'info': return 'text-[#61afef]'
            case 'warning': return 'text-[#e5c07b]'
            case 'success': return 'text-[#98c379]'
            case 'error': return 'text-red-500'
            case 'system': return 'text-[#c678dd]'
            default: return 'text-gray-500'
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[550px] relative font-mono text-xs sm:text-sm leading-relaxed"
        >
            {/* Glow backing */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#56b6c2]/20 to-[#c678dd]/20 rounded-xl blur-xl opacity-20" />

            {/* Main Window */}
            <div
                ref={containerRef}
                onClick={handleContainerClick}
                className="relative bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/5 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[280px] sm:h-[360px]"
            >
                {/* Header */}
                <div className="h-8 bg-[#151515] border-b border-white/5 flex items-center justify-between px-4 select-none shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium tracking-wider opacity-60">
                        <Terminal className="w-3 h-3" />
                        <span>root@loki:~/welcome</span>
                    </div>
                    <div className="w-10" />
                </div>

                {/* Content */}
                <div
                    ref={scrollRef}
                    className="p-3 sm:p-6 flex-1 overflow-auto relative custom-scrollbar scroll-smooth"
                >
                    {/* Background Noise */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none fixed" />

                    {/* Boot ASCII Art - ALWAYS VISIBLE - PRESERVE WHITESPACE */}
                    <pre className="font-bold text-[5px] sm:text-[10px] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-[#56b6c2] to-[#61afef] self-start select-none mb-4 sm:mb-6 whitespace-pre font-mono">
                        {ASCII_ART}
                    </pre>

                    {/* Standard Output Mode */}
                    <div className="space-y-1.5">
                        <AnimatePresence mode="popLayout">
                            {history.map((log) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    layout
                                    className="flex flex-row items-baseline gap-2 text-gray-400 font-medium w-full whitespace-pre-wrap break-words leading-tight"
                                >
                                    {!log.isCommand && (
                                        <>
                                            {log.timestamp && <span className="text-gray-600 shrink-0 select-none">[{log.timestamp}]</span>}
                                            {log.level && (
                                                <span className={`shrink-0 min-w-[3.5rem] select-none ${getLevelColor(log.level)}`}>[{log.level}]</span>
                                            )}
                                        </>
                                    )}
                                    <span className={log.isCommand ? "" : log.color || "text-gray-300"}>
                                        {log.message}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Input Line */}
                        {!isBooting && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 pt-2 pb-1 group relative"
                            >
                                {/* Active Line Highlight - Pulsing */}
                                <motion.div
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -inset-x-2 inset-y-0 bg-cyan-500/5 -z-10 rounded"
                                />

                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-[#98c379]"
                                >
                                    ➜
                                </motion.span>
                                <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
                                    <span className="text-[#56b6c2] hidden sm:inline">root@loki</span>
                                    <span className="text-gray-500 hidden sm:inline">:</span>
                                    <span className="text-[#61afef] hidden sm:inline">~</span>
                                    <span className="text-gray-400">$</span>
                                </div>

                                <div className="relative flex-1">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="w-full bg-transparent border-none outline-none text-gray-200 placeholder:text-cyan-400/40 font-mono caret-cyan-400 text-sm"
                                        autoFocus
                                        autoComplete="off"
                                        spellCheck="false"
                                        placeholder={placeholderText}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>
                    <div />
                </div>

                {/* Footer */}
                <div className="h-7 bg-[#111111] border-t border-white/5 flex items-center justify-between px-3 text-[9px] sm:text-[10px] text-gray-500 font-mono shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <Disc className={`w-3 h-3 ${isBooting ? 'animate-spin' : ''}`} />
                            <span>STATUS: READY</span>
                        </div>
                        <div className="flex items-center gap-1.5 hidden sm:flex">
                            <Cpu className="w-3 h-3" />
                            <span>MEM: {history.length * 2}KB</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#98c379]">
                        <Wifi className="w-3 h-3" />
                        <span>ONLINE</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
})
TerminalWindow.displayName = "TerminalWindow"
