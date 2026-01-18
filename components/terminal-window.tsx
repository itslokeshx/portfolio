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
    id: number
    timestamp?: string
    level?: 'INFO' | 'WARN' | 'SUCCESS' | 'SYSTEM' | 'ERROR'
    message: string | React.ReactNode
    color?: string
    isCommand?: boolean // Trims timestamp/level for user commands
}



const COMMANDS = {
    help: "Show available commands",
    skills: "List technical skills",
    projects: "View key projects",
    about: "About me",
    contact: "Contact information",
    clear: "Clear terminal"
} as const

type CommandType = keyof typeof COMMANDS

// Define the handle type for parent components
export interface TerminalHandles {
    addLog: (message: string, level?: LogEntry['level']) => void
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
        "try 'projects' to see my work",
        "run 'skills' to view tech stack",
        "type 'contact' to say hello"
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
            { id: 1, timestamp: getLocalTime(now), level: 'SYSTEM', message: "initializing workspace", color: "text-cyan-400" },
            { id: 2, timestamp: getLocalTime(new Date(now.getTime() + 800)), level: 'INFO', message: "loading projects & skills", color: "text-gray-400" },
            { id: 3, timestamp: getLocalTime(new Date(now.getTime() + 1600)), level: 'WARN', message: "preparing interactive modules", color: "text-cyan-400/80" },
            { id: 4, timestamp: getLocalTime(new Date(now.getTime() + 2400)), level: 'SUCCESS', message: "system_ready.Explore!", color: "text-green-400" }
        ]

        let timeouts: NodeJS.Timeout[] = []

        bootLogs.forEach((log, index) => {
            const timeout = setTimeout(() => {
                setHistory(prev => [...prev, log])
                if (index === bootLogs.length - 1) {
                    setIsBooting(false)
                }
            }, 800 * (index + 1))
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
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [history])

    // Focus input on click
    const handleContainerClick = () => {
        inputRef.current?.focus()
    }

    // Expose addLog to parent
    useImperativeHandle(ref, () => ({
        addLog: (message: string, level: LogEntry['level'] = 'INFO') => {
            // Message color logic (distinct from level color)
            let color = "text-gray-300"
            if (level === 'ERROR') color = "text-red-500"
            else if (level === 'SUCCESS') color = "text-green-400"
            else if (level === 'WARN') color = "text-yellow-400"
            else if (level === 'SYSTEM') color = "text-cyan-400"
            else if (level === 'INFO') color = "text-gray-400"

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
            id: Date.now(),
            message: <span className="flex items-center gap-2"><span className="text-green-400">➜</span> <span className="text-white">{cmd}</span></span>,
            isCommand: true
        }])

        switch (cleanCmd) {
            case "help":
                addResponse([
                    "available commands:",
                    "  skills    - List technical skills",
                    "  projects  - View key projects",
                    "  about     - About me",
                    "  contact   - Contact information",
                    "  clear     - Clear terminal"
                ])
                break
            case "clear":
                setHistory([])
                break
            case "skills":
                addResponse([
                    <div key="s1">
                        <span className="text-cyan-400">Frontend     → </span>
                        <span>HTML · CSS · React · JavaScript</span>
                    </div>,
                    <div key="s2">
                        <span className="text-cyan-400">Backend      → </span>
                        <span>Node.js · Express.js</span>
                    </div>,
                    <div key="s3">
                        <span className="text-cyan-400">Database     → </span>
                        <span>MongoDB · SQL / MySQL</span>
                    </div>,
                    <div key="s4">
                        <span className="text-cyan-400">Tools & Lang → </span>
                        <span>C · Python · Git / GitHub</span>
                    </div>
                ])
                break
            case "projects":
                addResponse([
                    "→ Second Brain",
                    "→ MemeHub",
                    "→ Automated WA Messenger",
                    "→ SaveMyTab",
                    "→ CV Application",
                    <br key="br" />,
                    <span key="more" className="text-gray-500 italic">more projects → visit Projects section</span>
                ])
                break
            case "about":
                addResponse([
                    "I learn by building real things.",
                    "Curiosity drives me.",
                    "Projects shape who I become."
                ])
                break
            case "contact":
                addResponse([
                    <span key="gh" className="flex gap-2">GitHub   → <a href="https://github.com/itslokeshx" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors">https://github.com/itslokeshx</a></span>,
                    <span key="li" className="flex gap-2">LinkedIn → <a href="https://www.linkedin.com/in/itslokeshx/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors">https://www.linkedin.com/in/itslokeshx/</a></span>,
                    <span key="em" className="flex gap-2">Email    → <a href="mailto:itslokeshx@gmail.com" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors">itslokeshx@gmail.com</a></span>
                ])
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
        lines.forEach((line, i) => {
            setTimeout(() => {
                setHistory(prev => [...prev, {
                    id: Date.now() + i,
                    message: line,
                    color: "text-gray-300"
                }])
            }, i * 100)
        })
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input)
        }
    }

    // Helper to get level color (matches original specific colors)
    const getLevelColor = (level?: string) => {
        switch (level) {
            case 'INFO': return 'text-[#61afef]'
            case 'WARN': return 'text-[#e5c07b]'
            case 'SUCCESS': return 'text-[#98c379]'
            case 'ERROR': return 'text-red-500'
            case 'SYSTEM': return 'text-[#c678dd]'
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
                className="relative bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/5 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[360px]"
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
                    className="p-6 flex-1 overflow-y-auto overflow-x-hidden relative custom-scrollbar scroll-smooth"
                >
                    {/* Background Noise */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none fixed" />

                    {/* Boot ASCII Art - ALWAYS VISIBLE - PRESERVE WHITESPACE */}
                    <pre className="font-bold text-[8px] sm:text-[10px] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-[#56b6c2] to-[#61afef] self-start select-none mb-6 whitespace-pre font-mono">
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
                                    className="flex flex-row items-baseline gap-2 text-gray-400 font-medium w-full break-words leading-tight"
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
                            <div className="flex items-center gap-2 pt-2 group">
                                <span className="text-[#98c379]">➜</span>
                                <span className="text-[#56b6c2]">root@loki</span>
                                <span className="text-gray-500">:</span>
                                <span className="text-[#61afef]">~</span>
                                <span className="text-gray-400">$</span>

                                <div className="relative flex-1">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="w-full bg-transparent border-none outline-none text-gray-200 placeholder:text-gray-500/50 font-mono caret-cyan-400"
                                        autoFocus
                                        autoComplete="off"
                                        spellCheck="false"
                                        placeholder={placeholderText}
                                    />
                                </div>
                            </div>
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
