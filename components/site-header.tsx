"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Github, Twitter, Linkedin, FileText } from "lucide-react"

export function SiteHeader() {
    const [activeSection, setActiveSection] = useState("home")
    const [isScrolled, setIsScrolled] = useState(false)

    // Fast smooth scroll handler
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        const element = document.getElementById(id)
        if (element) {
            // Custom fast scroll
            const y = element.getBoundingClientRect().top + window.pageYOffset - 80 // Offset for header
            window.scrollTo({
                top: y,
                behavior: "smooth"
            })
            setActiveSection(id)
        }
    }

    // Scroll listener for glass effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Active section tracker
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.2, rootMargin: "-80px 0px -20% 0px" } // Adjusted for better triggering on long sections
        )

        const sections = ["home", "about", "skills", "projects", "contact"]
        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const navItems = [
        { name: "HOME", id: "home" },
        { name: "ABOUT", id: "about" },
        { name: "SKILLS", id: "skills" },
        { name: "PROJECTS", id: "projects" },
        { name: "CONTACT", id: "contact" },
    ]

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
                isScrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent border-b border-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
        >
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                {/* Left: Connected Identity */}
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded border border-cyan/50 bg-cyan/5 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                        <span className="text-cyan font-mono font-bold text-sm">{"{ }"}</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <div className="flex items-center gap-2">
                            <motion.span
                                layoutId="connected-text"
                                className="text-cyan font-bold tracking-[0.2em] text-sm drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] inline-block font-mono"
                            >
                                CONNECTED
                            </motion.span>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]" />
                        </div>
                        <span className="text-carbon text-[10px] font-mono tracking-wider mt-1">DEV.SYS.01</span>
                    </div>
                </div>

                {/* Center: Navigation */}
                <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5 border border-white/5 backdrop-blur-sm">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => scrollToSection(e, item.id)}
                            className={cn(
                                "relative px-4 py-1.5 text-[10px] font-medium tracking-widest transition-colors duration-300 rounded-full",
                                activeSection === item.id ? "text-cyan" : "text-gray-400 hover:text-gray-200"
                            )}
                        >
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-cyan/10 rounded-full border border-cyan/20"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {item.name}
                        </a>
                    ))}
                </nav>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Socials (Optional, keep minimal) */}
                    {/* <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-white/10">
              <Github className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition-colors" />
           </div> */}

                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent("trigger-resume"))}
                        className="flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2 border border-cyan/30 rounded text-cyan text-[10px] sm:text-[11px] tracking-widest font-medium hover:bg-cyan/10 transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] backdrop-blur-md bg-void/30 group"
                    >
                        EXECUTE RESUME
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan/50 group-hover:bg-cyan transition-all" />
                    </button>
                </div>
            </div>
        </motion.header>
    )
}
