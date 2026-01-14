"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Plus, ChevronDown, Search } from "lucide-react"

// --- Interfaces ---
interface Project {
  id: number
  title: string
  category: string
  description: string
  stack: string[]
  image: string
  color: string
  github: string
  demo: string
}

// --- Data ---
const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Second Brain",
    category: "MERN STACK",
    description: "A complete knowledge management system to store, organize, and retrieve thoughts efficiently. Features offline-first architecture with sync capabilities.",
    stack: ["MongoDB", "Express", "React", "Node.js", "IndexedDB"],
    image: "/knowledge-management-dashboard-dark-theme.jpg",
    color: "#00F0FF",
    github: "https://github.com/itslokeshx/Second-Brain",
    demo: "#",
  },
  {
    id: 2,
    title: "MemeHub",
    category: "MERN STACK",
    description: "A social platform for sharing and discovering memes with a community-driven feed and trending algorithms.",
    stack: ["React", "Express", "MongoDB", "Tailwind"],
    image: "/meme-social-platform-dark-theme-neon.jpg",
    color: "#9D00FF",
    github: "https://github.com/itslokeshx/MemeHub",
    demo: "#",
  },
  {
    id: 3,
    title: "WhatsApp API",
    category: "NODE.JS",
    description: "A backend system to schedule & automate WhatsApp messages for business loyalty programs and notifications.",
    stack: ["Node.js", "Express", "REST API", "Cron"],
    image: "/whatsapp-api-dashboard-automation-dark.jpg",
    color: "#00FF94",
    github: "https://github.com/itslokeshx/Automated-whatsapp-message",
    demo: "#",
  },
  {
    id: 4,
    title: "SaveMyTab",
    category: "CHROME EXT",
    description: "A browser extension to save and organize active tabs to boost productivity and reduce memory usage.",
    stack: ["JavaScript", "Chrome API", "HTML/CSS"],
    image: "/chrome-extension-tab-manager-dark-theme.jpg",
    color: "#FF9F00",
    github: "https://github.com/itslokeshx/SaveMyTab",
    demo: "#",
  },
  {
    id: 5,
    title: "CV Application",
    category: "REACT",
    description: "A dynamic resume builder application allowing real-time editing and preview with multiple templates.",
    stack: ["React", "Vite", "Tailwind"],
    image: "/resume-builder-application-dark-modern.jpg",
    color: "#FF0055",
    github: "https://github.com/itslokeshx/CV-application",
    demo: "#",
  },
]

const allProjects: Project[] = [
  ...featuredProjects,
  { id: 6, title: "Travel Journal", category: "REACT", description: "A digital travel diary built with React components.", stack: ["React", "HTML", "CSS"], image: "/travel-journal-app.jpg", color: "#61DAFB", github: "#", demo: "#" },
  { id: 7, title: "YaaziCut", category: "TYPESCRIPT", description: "Desktop Video Editor utility built with Electron & TypeScript.", stack: ["Electron", "TypeScript", "Node.js"], image: "/video-editor-desktop-app.jpg", color: "#3178C6", github: "#", demo: "#" },
  { id: 8, title: "QR Code Gen", category: "NODE.JS", description: "Generate QR codes programmatically using Node.js.", stack: ["Node.js", "Inquirer"], image: "/qr-code-generator-app.jpg", color: "#68A063", github: "#", demo: "#" },
  { id: 9, title: "MindfulAI", category: "PYTHON", description: "AI-based project focused on mindfulness/mental health.", stack: ["Python", "AI/ML"], image: "/ai-mental-health-app.jpg", color: "#3776AB", github: "#", demo: "#" },
  { id: 10, title: "Hostel Mgmt", category: "PHP & SQL", description: "Full management system for hostel allocation.", stack: ["PHP", "MySQL", "HTML"], image: "/hostel-management-system.jpg", color: "#777BB4", github: "#", demo: "#" },
  { id: 11, title: "Tesla Clone", category: "HTML/CSS", description: "Pixel-perfect clone of Tesla's homepage.", stack: ["HTML", "CSS"], image: "/tesla-website-clone.jpg", color: "#E34F26", github: "#", demo: "#" },
]

// --- Components ---

function ShuffleText({ text, isActive, className }: { text: string; isActive: boolean; className?: string }) {
  const [displayText, setDisplayText] = useState(text)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_"

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text)
      return
    }
    let frame = 0
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (char === " ") return " "
          if (frame > index) return text[index]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join("")
      )
      frame += 1
      if (frame > text.length + 5) {
        clearInterval(interval)
        setDisplayText(text)
      }
    }, 30)
    return () => clearInterval(interval)
  }, [isActive, text])

  return <span className={className}>{displayText}</span>
}

function ProjectRow({ project, index, isExpanded, onToggle }: { project: Project, index: number, isExpanded: boolean, onToggle: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="border-b border-white/5 relative group/row">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
        className={`group relative py-8 px-4 cursor-pointer transition-all duration-300 ${isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}`}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-8">
            <span className={`font-mono transition-colors text-sm ${isExpanded || isHovered ? "text-cyan" : "text-slate-600"}`}>
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            <div className="flex items-center gap-6">
              <h3 className={`font-bold text-3xl md:text-5xl transition-colors ${isExpanded || isHovered ? "text-white" : "text-slate-400"}`}>
                <ShuffleText text={project.title} isActive={isHovered} />
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block font-mono text-cyan/50 tracking-wider text-xs">{project.category}</span>
            <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} className={`transition-colors ${isExpanded || isHovered ? "text-cyan" : "text-slate-600"}`}>
              <Plus size={24} />
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white/[0.01]"
          >
            <div className="px-4 pb-8 pt-4">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5">
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 relative group bg-black/50">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.03)_2px,rgba(0,240,255,0.03)_4px)] pointer-events-none" />
                  </div>
                </div>
                <div className="md:col-span-7 flex flex-col gap-6">
                  <div>
                    <h4 className="text-xs text-cyan uppercase tracking-wider mb-3 font-mono border-b border-cyan/20 pb-2 inline-block">// DOSSIER</h4>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">// TECHNOLOGY_MATRIX</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="text-[10px] md:text-xs px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-cyan">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 pt-2">
                      <a href={project.github} target="_blank" className="px-5 py-2.5 border border-white/10 bg-white/[0.02] rounded-lg text-slate-200 text-xs font-bold font-mono tracking-wide flex items-center gap-2 hover:bg-white/10 hover:border-cyan/50 transition-all">
                        <Github size={16} /> SOURCE_CODE
                      </a>
                      <a href={project.demo} target="_blank" className="px-5 py-2.5 bg-cyan text-black rounded-lg text-xs font-bold font-mono tracking-wide flex items-center gap-2 hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
                        LIVE_DEPLOY <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ArchiveCard({ project }: { project: Project }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group relative bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-cyan/30 flex flex-col">
      <div className="h-40 w-full bg-black/50 relative overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-white mb-1 group-hover:text-cyan transition-colors">{project.title}</h3>
        <p className="text-xs text-slate-400 mb-4 line-clamp-2">{project.description}</p>
        <div className="mt-auto flex gap-2">
          <span className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-cyan/70">{project.category}</span>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedProjects({ onViewAll }: { onViewAll: () => void }) {
  const [expandedFeatured, setExpandedFeatured] = useState<number | null>(null)
  const [showArchive, setShowArchive] = useState(false)

  // Archive State
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("ALL")

  // Filter Logic
  const filteredArchive = allProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = activeFilter === "ALL" || p.category === activeFilter
    return matchesSearch && matchesCategory
  })

  return (
    <section id="projects" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <p className="font-mono text-cyan/60 text-sm mb-4">// FEATURED_PROJECTS</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-300 tracking-tight">FEATURED <span className="text-cyan">WORK</span></h2>
        </div>

        <div className="space-y-0 mb-16 border-t border-white/5">
          {featuredProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedFeatured === index}
              onToggle={() => {
                if (expandedFeatured !== index) setShowArchive(false)
                setExpandedFeatured(expandedFeatured === index ? null : index)
              }}
            />
          ))}
        </div>

        {/* Archive Trigger */}
        <div className="border border-white/5 bg-[#0a0a0a] relative z-20 rounded-lg overflow-hidden">
          <div
            onClick={() => {
              setShowArchive(!showArchive)
              setExpandedFeatured(null)
            }}
            className="p-6 cursor-pointer hover:bg-white/[0.02] transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="font-bold text-2xl text-white">PROJECT_ARCHIVE // DATABASE</span>
            </div>
            <ChevronDown className={`text-cyan transition-transform ${showArchive ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {showArchive && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-white/5"
              >
                <div className="p-8">
                  {/* Controls */}
                  <div className="flex flex-col md:flex-row gap-6 mb-8 justify-between">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan/50" size={16} />
                      <input
                        type="text"
                        placeholder="SEARCH DATABASE..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-black border border-white/10 rounded pl-10 pr-4 py-2 text-sm text-white focus:border-cyan focus:outline-none w-full md:w-64 font-mono"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {["ALL", "REACT", "NODE.JS", "PYTHON"].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveFilter(cat)}
                          className={`px-3 py-1 rounded text-xs font-mono border ${activeFilter === cat ? 'border-cyan text-cyan bg-cyan/10' : 'border-white/10 text-slate-500 hover:text-white'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArchive.map(p => (
                      <ArchiveCard key={p.id} project={p} />
                    ))}
                    {filteredArchive.length === 0 && (
                      <div className="col-span-full py-12 text-center text-slate-500 font-mono">
                        NO_RECORDS_FOUND
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
