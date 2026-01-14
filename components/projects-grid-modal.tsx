"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, ArrowRight } from "lucide-react"

const ALL_PROJECTS = [
  {
    id: 1,
    title: "Second Brain",
    category: "WEB",
    year: "2024",
    description: "Knowledge management system",
    stack: ["MongoDB", "React", "Node.js"],
    featured: true,
  },
  {
    id: 2,
    title: "MemeHub",
    category: "WEB",
    year: "2024",
    description: "Viral meme discovery platform",
    stack: ["React", "Tailwind", "API"],
    featured: true,
  },
  {
    id: 3,
    title: "YaaziCut",
    category: "TOOLS",
    year: "2024",
    description: "URL shortener with analytics",
    stack: ["Node.js", "MongoDB"],
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio v3",
    category: "WEB",
    year: "2024",
    description: "This legendary portfolio site",
    stack: ["Next.js", "Three.js", "Framer"],
  },
  {
    id: 5,
    title: "API Gateway",
    category: "BACKEND",
    year: "2023",
    description: "Centralized API management",
    stack: ["Node.js", "Express", "Redis"],
  },
  {
    id: 6,
    title: "Task Manager Pro",
    category: "WEB",
    year: "2023",
    description: "Team collaboration tool",
    stack: ["React", "MongoDB", "Socket.io"],
  },
  {
    id: 7,
    title: "Weather Dashboard",
    category: "WEB",
    year: "2023",
    description: "Real-time weather tracking",
    stack: ["React", "API", "Charts"],
  },
  {
    id: 8,
    title: "E-commerce Store",
    category: "WEB",
    year: "2023",
    description: "Full-stack shopping platform",
    stack: ["MERN", "Stripe", "Redux"],
  },
  {
    id: 9,
    title: "Chat Application",
    category: "WEB",
    year: "2023",
    description: "Real-time messaging app",
    stack: ["React", "Socket.io", "MongoDB"],
  },
  {
    id: 10,
    title: "Blog CMS",
    category: "WEB",
    year: "2022",
    description: "Content management system",
    stack: ["Node.js", "MongoDB", "React"],
  },
  {
    id: 11,
    title: "Expense Tracker",
    category: "TOOLS",
    year: "2022",
    description: "Personal finance manager",
    stack: ["React", "Charts", "LocalStorage"],
  },
  {
    id: 12,
    title: "Recipe Finder",
    category: "WEB",
    year: "2022",
    description: "Recipe discovery app",
    stack: ["React", "API", "Tailwind"],
  },
  {
    id: 13,
    title: "Music Player",
    category: "FUN",
    year: "2022",
    description: "Audio streaming interface",
    stack: ["React", "Howler.js", "CSS"],
  },
  {
    id: 14,
    title: "Code Snippet Manager",
    category: "TOOLS",
    year: "2022",
    description: "Developer productivity tool",
    stack: ["React", "Monaco", "IndexedDB"],
  },
  {
    id: 15,
    title: "Habit Tracker",
    category: "TOOLS",
    year: "2021",
    description: "Daily habit tracking app",
    stack: ["React", "Chart.js", "MongoDB"],
  },
]

const CATEGORIES = ["ALL", "WEB", "BACKEND", "TOOLS", "FUN"]

interface ProjectsGridModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectsGridModal({ isOpen, onClose }: ProjectsGridModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("ALL")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Matrix rain effect
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.floor(canvas.width / 14)
    const drops: number[] = Array(columns).fill(1)
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(0, 240, 255, 0.5)"
      ctx.font = "14px monospace"

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 14, drops[i] * 14)

        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isOpen])

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === "ALL" || project.category === activeCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Matrix Rain Background */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />

          {/* Backdrop */}
          <div className="absolute inset-0 bg-void/90 backdrop-blur-xl z-10" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-20 w-full max-w-7xl max-h-[90vh] bg-titanium/80 backdrop-blur-2xl border-2 border-cyan rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 0 100px rgba(0, 240, 255, 0.3)" }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-titanium/90 backdrop-blur-md p-6 border-b border-cyan/20 z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-cyan">PROJECT ARCHIVE</h2>
                  <p className="text-carbon text-sm">{filteredProjects.length} projects indexed</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-12 h-12 rounded-full border-2 border-cyan flex items-center justify-center hover:bg-cyan hover:text-void transition-all"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 bg-void/50 border border-cyan/30 rounded-xl font-mono text-mist placeholder:text-carbon focus:border-cyan focus:outline-none transition-colors"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-carbon" size={20} />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full font-mono text-sm transition-all ${
                      activeCategory === category
                        ? "bg-cyan border-cyan text-void glow-cyan"
                        : "border-2 border-cyan/30 text-cyan hover:border-cyan/60"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-20 text-carbon">No projects match your search</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-void/50 backdrop-blur-md border border-cyan/20 rounded-2xl p-6 cursor-pointer hover:border-cyan/60 transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                    >
                      {/* Glitch overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-cyan/10 border border-cyan/30 rounded-full text-xs font-mono text-cyan">
                          {project.category}
                        </span>
                        <span className="text-xs text-carbon">{project.year}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-black text-mist group-hover:text-cyan transition-colors mb-2">
                        {project.title}
                        {project.featured && <span className="ml-2 text-gold text-sm">★</span>}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-carbon line-clamp-2 mb-4">{project.description}</p>

                      {/* Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-titanium border border-cyan/20 rounded text-xs text-cyan/70"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 3 && (
                          <span className="px-2 py-1 text-xs text-carbon">+{project.stack.length - 3}</span>
                        )}
                      </div>

                      {/* Hover Arrow */}
                      <ArrowRight
                        className="absolute bottom-6 right-6 text-cyan opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all"
                        size={24}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
