"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Plus, ChevronDown, Search, X } from "lucide-react"

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

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Second Brain",
    category: "MERN STACK",
    description:
      "A complete knowledge management system to store, organize, and retrieve thoughts efficiently.",
    stack: ["MongoDB", "Express", "React", "Node.js", "IndexedDB"],
    image: "/knowledge-management-dashboard-dark-theme.jpg",
    color: "#0F172A",
    github: "https://github.com/itslokeshx/Second-Brain",
    demo: "https://second-brain-hub.vercel.app/",
  },
  {
    id: 2,
    title: "MemeHub",
    category: "MERN STACK",
    description:
      "A social platform for sharing and discovering memes with a community-driven feed.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Cloudinary"],
    image: "/meme-social-platform-dark-theme-neon.jpg",
    color: "#111827",
    github: "https://github.com/itslokeshx/MemeHub",
    demo: "https://memehub-m4gy.onrender.com/",
  },
  {
    id: 3,
    title: "Automated WA Messenger",
    category: "NODE.JS",
    description:
      "A backend system to schedule & automate WhatsApp messages for business loyalty programs.",
    stack: ["Node.js", "Express", "Cron", "WhatsApp Cloud API"],
    image: "/whatsapp-api-dashboard-automation-dark.jpg",
    color: "#00FF94",
    github: "https://github.com/itslokeshx/Automated-whatsapp-message",
    demo: "#",
  },
  {
    id: 4,
    title: "SaveMyTab",
    category: "CHROME EXT",
    description: "A browser extension to save and organize active tabs to boost productivity.",
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
    description: "A dynamic resume builder application allowing real-time editing and preview.",
    stack: ["React", "Vite"],
    image: "/resume-builder-application-dark-modern.jpg",
    color: "#9333EA",
    github: "https://github.com/itslokeshx/CV-application",
    demo: "https://cv-application-nine-gamma.vercel.app/",
  },
]

const allProjects: Project[] = [
  ...featuredProjects,
  // React Projects
  {
    id: 6,
    title: "Travel Journal",
    category: "REACT",
    description: "A digital travel diary built with React components to document trips.",
    stack: ["React", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#61DAFB",
    github: "https://github.com/itslokeshx/Travel-journal",
    demo: "https://travel-journal-eight-rho.vercel.app/",
  },
  {
    id: 7,
    title: "Business Card",
    category: "REACT",
    description: "A digital business card portfolio component built with React.",
    stack: ["React", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#61DAFB",
    github: "https://github.com/itslokeshx/Business-card",
    demo: "https://business-card-chi-plum.vercel.app/",
  },
  // TypeScript/Electron
  {
    id: 8,
    title: "YaaziCut",
    category: "TYPESCRIPT",
    description: "Desktop Video Editor utility built with Electron & TypeScript.",
    stack: ["Electron", "TypeScript", "Node.js"],
    image: "/video-editor-desktop-app.jpg",
    color: "#3178C6",
    github: "https://github.com/itslokeshx/YaaziCut",
    demo: "#",
  },
  {
    id: 9,
    title: "Billzy",
    category: "TYPESCRIPT",
    description: "TypeScript repository for billing or invoice management.",
    stack: ["TypeScript", "Node.js"],
    image: "/video-editor-desktop-app.jpg",
    color: "#3178C6",
    github: "https://github.com/itslokeshx/Billzy",
    demo: "https://billzy-psi.vercel.app/",
  },
  // Node.js APIs
  {
    id: 10,
    title: "QR Code Generator",
    category: "NODE.JS",
    description: "Generate QR codes programmatically using Node.js.",
    stack: ["Node.js", "Inquirer"],
    image: "/qr-code-generator-app.jpg",
    color: "#68A063",
    github: "https://github.com/itslokeshx/QR-Code-Generator",
    demo: "#",
  },
  {
    id: 11,
    title: "Github User Details",
    category: "NODE.JS",
    description: "Fetch and display user data using GitHub API.",
    stack: ["Node.js", "API"],
    image: "/qr-code-generator-app.jpg",
    color: "#68A063",
    github: "https://github.com/itslokeshx/Github_user_details",
    demo: "https://itslokeshx.github.io/Github_user_details/",
  },
  {
    id: 12,
    title: "Advice Generator",
    category: "NODE.JS",
    description: "API integration project fetching random advice via REST API.",
    stack: ["Node.js", "API"],
    image: "/qr-code-generator-app.jpg",
    color: "#68A063",
    github: "https://github.com/itslokeshx/Advice-Generator",
    demo: "https://itslokeshx.github.io/Advice-Generator/",
  },
  // JavaScript Apps
  {
    id: 13,
    title: "Cat Meme App",
    category: "JAVASCRIPT",
    description: "A fun application for generating and viewing cat memes.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/Cat-Meme-App",
    demo: "https://itslokeshx.github.io/Cat-Meme-App/",
  },
  {
    id: 14,
    title: "Otakumens",
    category: "JAVASCRIPT",
    description: "A community-focused site for anime and manga enthusiasts.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/otakumens",
    demo: "https://itslokeshx.github.io/otakumens/",
  },
  {
    id: 15,
    title: "Ordering App",
    category: "JAVASCRIPT",
    description: "A digital ordering system interface for food or services.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/ordering-app",
    demo: "https://itslokeshx.github.io/ordering-app/",
  },
  {
    id: 16,
    title: "Fitness Site",
    category: "JAVASCRIPT",
    description: "A website dedicated to fitness routines and health tracking.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/fitness-site",
    demo: "https://itslokeshx.github.io/fitness-site/",
  },
  {
    id: 17,
    title: "Counter",
    category: "JAVASCRIPT",
    description: "A simple interactive counter application.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/counter",
    demo: "https://itslokeshx.github.io/counter/",
  },
  {
    id: 18,
    title: "Study Hub sem3",
    category: "JAVASCRIPT",
    description: "A resource sharing hub for Semester 3 class materials.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/sem3",
    demo: "https://ucekcse.github.io/sem3/",
  },
  {
    id: 19,
    title: "Study Hub sem4",
    category: "JAVASCRIPT",
    description: "SEM 4 Study Hub - A site to share PYQs, assignments, and study resources.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/sem4",
    demo: "https://ucekcse.github.io/sem4/",
  },
  // JavaScript Tools
  {
    id: 20,
    title: "Password Generator",
    category: "JAVASCRIPT",
    description: "A utility tool to generate secure, random passwords.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/passwordgenerator",
    demo: "https://itslokeshx.github.io/passwordgenerator/",
  },
  {
    id: 21,
    title: "To-Do List",
    category: "JAVASCRIPT",
    description: "A task management tool to organize daily activities.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/To-Do",
    demo: "https://itslokeshx.github.io/To-Do/",
  },
  {
    id: 22,
    title: "Color Flipper",
    category: "JAVASCRIPT",
    description: "A tool to generate and switch background colors dynamically.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/color-flipper",
    demo: "https://itslokeshx.github.io/color-flipper/",
  },
  {
    id: 23,
    title: "Color Scheme Generator",
    category: "JAVASCRIPT",
    description: "A tool to create and visualize color palettes using APIs.",
    stack: ["JavaScript", "API"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/color-scheme-generator",
    demo: "https://itslokeshx.github.io/color-scheme-generator/",
  },
  {
    id: 24,
    title: "Age Calculator",
    category: "JAVASCRIPT",
    description: "A utility to calculate exact age based on date of birth.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/Age-Calculator",
    demo: "https://itslokeshx.github.io/Age-Calculator/",
  },
  {
    id: 25,
    title: "EB Bill Calculator",
    category: "JAVASCRIPT",
    description: "A calculator for estimating electricity bills based on units consumed.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/EB-Bill-Calculator",
    demo: "https://itslokeshx.github.io/EB-Bill-Calculator/",
  },
  {
    id: 26,
    title: "Love Calculator 2.0",
    category: "JAVASCRIPT",
    description: "A fun JS-based application to calculate compatibility percentages.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/love-calce-2.0",
    demo: "https://itslokeshx.github.io/love-calce-2.0/",
  },
  {
    id: 27,
    title: "Segment Calculator",
    category: "JAVASCRIPT",
    description: "A specialized calculator for specific mathematical segments.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/Segment-calculator",
    demo: "https://itslokeshx.github.io/Segment-calculator/",
  },
  {
    id: 28,
    title: "Math Calce",
    category: "JAVASCRIPT",
    description: "A general purpose mathematical calculator.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/math-calce",
    demo: "https://itslokeshx.github.io/math-calce/",
  },
  {
    id: 29,
    title: "Temperature Calculator",
    category: "JAVASCRIPT",
    description: "A utility to convert temperatures between Celsius, Fahrenheit, and Kelvin.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/travel-journal-app.jpg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/temperature-calculator",
    demo: "https://itslokeshx.github.io/temperature-calculator/",
  },
  // HTML/CSS
  {
    id: 30,
    title: "Tesla Tribute Page",
    category: "HTML/CSS",
    description: "A tribute landing page inspired by Tesla's design.",
    stack: ["HTML", "CSS"],
    image: "/tesla-website-clone.jpg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/Tesla",
    demo: "https://itslokeshx.github.io/Tesla/",
  },
  {
    id: 31,
    title: "News Homepage",
    category: "HTML/CSS",
    description: "Responsive news layout with complex CSS Grid.",
    stack: ["HTML", "CSS"],
    image: "/tesla-website-clone.jpg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/News-Homepage",
    demo: "https://itslokeshx.github.io/News-Homepage/",
  },
  {
    id: 32,
    title: "Result Summary",
    category: "HTML/CSS",
    description: "Modern card component layout challenge.",
    stack: ["HTML", "CSS"],
    image: "/tesla-website-clone.jpg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/Result-summary-page",
    demo: "https://itslokeshx.github.io/Result-summary-page/",
  },
  {
    id: 33,
    title: "Newsletter Subscription",
    category: "HTML/CSS",
    description: "Form validation and layout design for newsletters.",
    stack: ["HTML", "CSS"],
    image: "/tesla-website-clone.jpg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/Newsletter-Subscription",
    demo: "https://itslokeshx.github.io/Newsletter-Subscription/",
  },
  {
    id: 34,
    title: "Love Calce 1.0",
    category: "HTML/CSS",
    description: "The initial HTML/CSS version of the compatibility calculator.",
    stack: ["HTML", "CSS"],
    image: "/tesla-website-clone.jpg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/love-calce-1.0",
    demo: "https://itslokeshx.github.io/love-calce-1.0/",
  },
  // PHP & MySQL
  {
    id: 35,
    title: "Hostel Management",
    category: "PHP & SQL",
    description: "Full management system for hostel allocation and student data.",
    stack: ["PHP", "MySQL", "HTML"],
    image: "/hostel-management-system.jpg",
    color: "#777BB4",
    github: "https://github.com/itslokeshx/hostelmanagement",
    demo: "#",
  },
  {
    id: 36,
    title: "Finance Tracker",
    category: "PHP & SQL",
    description: "Personal finance tracking application using SQL for database management.",
    stack: ["PHP", "MySQL"],
    image: "/hostel-management-system.jpg",
    color: "#777BB4",
    github: "https://github.com/itslokeshx/finance_tracker",
    demo: "#",
  },
  // Python
  {
    id: 37,
    title: "MindfulAI",
    category: "PYTHON",
    description: "AI-based project focused on mindfulness and mental health.",
    stack: ["Python", "AI/ML"],
    image: "/ai-mental-health-app.jpg",
    color: "#3776AB",
    github: "https://github.com/itslokeshx/mindfulAI",
    demo: "#",
  },
]

// Shuffle Text Effect Component
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
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (frame > index) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join(""),
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

function ProjectRow({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border-b border-white/5" ref={rowRef}>
      {/* Row Header */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
        className={`
          group relative py-8 px-4 cursor-pointer transition-all duration-300
          ${isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}
        `}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            <span
              className={`font-mono transition-colors text-sm whitespace-nowrap ${isExpanded || isHovered ? "text-cyan" : "text-slate-600"}`}
            >
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>

            <h3
              className={`font-bold text-3xl md:text-5xl transition-colors ${isExpanded || isHovered ? "text-white" : "text-slate-400"}`}
            >
              <ShuffleText text={project.title} isActive={isHovered} />
            </h3>
          </div>

          {/* Inline Image Preview (Static, appears on hover) */}
          {/* Inline Image Preview (Static, reserved space) */}
          <div className="hidden md:block w-40 h-24 flex-shrink-0 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-lg overflow-hidden border-2"
              style={{ borderColor: project.color, boxShadow: `0 0 20px ${project.color}40` }}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent animate-scan" />
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="hidden md:block font-mono text-cyan/50 tracking-wider text-xs whitespace-nowrap">
              {project.category}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              className={`transition-colors flex-shrink-0 ${isExpanded || isHovered ? "text-cyan" : "text-slate-600"}`}
            >
              <Plus size={24} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-8 pt-4 bg-white/[0.01]">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left: Project Image */}
                <div className="md:col-span-5">
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 relative group bg-black/50">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Hologram Scanlines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.03)_2px,rgba(0,240,255,0.03)_4px)]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right: Details */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  <div>
                    <h4 className="text-xs text-cyan uppercase tracking-wider mb-3 font-mono border-b border-cyan/20 pb-2 inline-block">
                      // DOSSIER
                    </h4>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">
                        // TECHNOLOGY_MATRIX
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] md:text-xs px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-cyan hover:bg-cyan/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 border border-white/10 bg-white/[0.02] rounded-lg hover:bg-white/10 hover:border-cyan/50 text-slate-200 text-xs font-bold font-mono tracking-wide flex items-center gap-2 transition-all"
                      >
                        <Github size={16} />
                        SOURCE_CODE
                      </a>
                      {project.demo !== "#" ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-cyan text-black rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] text-xs font-bold font-mono tracking-wide flex items-center gap-2 transition-all"
                        >
                          LIVE_DEPLOY
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <button
                          disabled
                          className="px-5 py-2.5 bg-cyan/20 text-slate-500 rounded-lg text-xs font-bold font-mono tracking-wide flex items-center gap-2 cursor-not-allowed opacity-50"
                        >
                          NO_LIVE_DEMO
                          <ExternalLink size={14} />
                        </button>
                      )}
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

// Archive Card Component
function ArchiveCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-cyan/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col h-full"
    >
      {/* Card Image */}
      <div className="h-48 w-full relative overflow-hidden bg-black/50">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />

        {/* Overlay Links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 rounded-full hover:bg-cyan hover:text-black text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 rounded-full hover:bg-cyan hover:text-black text-white transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan transition-colors">{project.title}</h3>
          <span className="text-[10px] font-mono text-cyan/70 border border-cyan/20 px-2 py-1 rounded">
            {project.category}
          </span>
        </div>

        <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded font-mono">
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded font-mono">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedProjects({ onViewAll }: { onViewAll: () => void }) {
  const [expandedFeatured, setExpandedFeatured] = useState<number | null>(null)
  const [showArchive, setShowArchive] = useState(false)
  const [isArchiveTriggerHovered, setIsArchiveTriggerHovered] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("ALL")

  const categories = ["ALL", "MERN STACK", "REACT", "NODE.JS", "TYPESCRIPT", "JAVASCRIPT", "PYTHON", "PHP & SQL", "HTML/CSS"]

  const filteredProjects =
    activeFilter === "ALL"
      ? allProjects.filter((p) =>
        searchQuery === ""
          ? true
          : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      : allProjects.filter(
        (p) =>
          p.category === activeFilter &&
          (searchQuery === ""
            ? true
            : p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))),
      )

  return (
    <section id="projects" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-cyan/60 text-sm mb-4">// FEATURED_PROJECTS</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-300 tracking-tight">
            FEATURED <span className="text-cyan">WORK</span>
          </h2>
        </div>

        {/* Featured Projects List */}
        <div className="space-y-0 mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedFeatured === index}
              onToggle={() => {
                if (expandedFeatured !== index) {
                  setShowArchive(false)
                }
                setExpandedFeatured(expandedFeatured === index ? null : index)
              }}
            />
          ))}
        </div>

        {/* Archive Trigger */}
        <div className="border-b border-white/5 bg-[#050505] relative z-20">
          <div
            onMouseEnter={() => setIsArchiveTriggerHovered(true)}
            onMouseLeave={() => setIsArchiveTriggerHovered(false)}
            onClick={() => {
              if (!showArchive) {
                setExpandedFeatured(null)
              }
              setShowArchive(!showArchive)
            }}
            className={`
              group relative py-8 px-4 cursor-pointer transition-all duration-300
              ${showArchive ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <span
                  className={`font-mono transition-colors text-sm ${showArchive || isArchiveTriggerHovered ? "text-cyan" : "text-slate-600"}`}
                >
                  // ARCHIVE
                </span>
                <span
                  className={`font-bold text-3xl md:text-5xl transition-colors ${showArchive || isArchiveTriggerHovered ? "text-white" : "text-slate-400"}`}
                >
                  <ShuffleText text="VIEW ALL PROJECTS" isActive={isArchiveTriggerHovered} />
                </span>
              </div>
              <motion.div
                animate={{ rotate: showArchive ? 180 : 0 }}
                className={`transition-colors ${showArchive || isArchiveTriggerHovered ? "text-cyan" : "text-slate-600"}`}
              >
                <ChevronDown size={24} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Archive Grid */}
        <AnimatePresence>
          {showArchive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden bg-[#0a0a0a]"
            >
              <div className="px-4 py-12">
                <div className="mb-8 max-w-xl">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan/40" />
                    <input
                      type="text"
                      placeholder="Search by title or tech stack..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-transparent border border-cyan/20 rounded-lg font-mono text-sm text-white placeholder:text-cyan/30 focus:border-cyan focus:outline-none transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan/40 hover:text-cyan transition-colors"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-4 mb-16">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`
                        px-6 py-3 rounded-full text-sm font-bold font-mono border transition-all duration-300 uppercase tracking-wide
                        ${activeFilter === cat
                          ? "bg-cyan text-black border-cyan shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                          : "bg-transparent border-white/10 text-slate-500 hover:border-cyan/50 hover:text-cyan"
                        }
                      `}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ArchiveCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-mist/50 font-mono">NO PROJECTS FOUND</p>
                    <p className="text-mist/30 text-sm mt-2">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
