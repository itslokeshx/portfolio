"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { X, ExternalLink } from "lucide-react"

interface Skill {
  name: string
  proficiency: number
  experience: string
  projects: string[]
  orbitRadius: number
  angle: number
  x: number
  y: number
  vx: number
  vy: number
}

const SKILLS_DATA = [
  {
    name: "React",
    proficiency: 95,
    experience: "3+ Years",
    projects: ["Second Brain", "MemeHub", "CV App"],
    orbit: "inner",
  },
  {
    name: "Node.js",
    proficiency: 90,
    experience: "3+ Years",
    projects: ["WhatsApp API", "QR Generator"],
    orbit: "inner",
  },
  { name: "Express", proficiency: 88, experience: "3+ Years", projects: ["Second Brain", "MemeHub"], orbit: "inner" },
  {
    name: "MongoDB",
    proficiency: 85,
    experience: "2+ Years",
    projects: ["Second Brain", "Hostel Mgmt"],
    orbit: "inner",
  },
  { name: "TypeScript", proficiency: 80, experience: "2+ Years", projects: ["YaaziCut"], orbit: "outer" },
  { name: "Tailwind", proficiency: 92, experience: "2+ Years", projects: ["All Projects"], orbit: "outer" },
  { name: "Git", proficiency: 87, experience: "3+ Years", projects: ["All Projects"], orbit: "outer" },
  { name: "Next.js", proficiency: 90, experience: "2+ Years", projects: ["Portfolio"], orbit: "outer" },
  { name: "Python", proficiency: 75, experience: "1+ Year", projects: ["MindfulAI"], orbit: "outer" },
  { name: "Three.js", proficiency: 78, experience: "1+ Year", projects: ["Portfolio"], orbit: "outer" },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [selectedSkill, setSelectedSkill] = useState<(typeof SKILLS_DATA)[0] | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const skillsRef = useRef<Skill[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const innerRadius = 120
    const outerRadius = 200

    skillsRef.current = SKILLS_DATA.map((skill, i) => {
      const isInner = skill.orbit === "inner"
      const radius = isInner ? innerRadius : outerRadius
      const count = isInner ? 4 : 6
      const baseAngle = isInner ? (i * Math.PI * 2) / count : ((i - 4) * Math.PI * 2) / count

      return {
        ...skill,
        orbitRadius: radius,
        angle: baseAngle,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      }
    })
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width: rect.width, height: Math.min(rect.width, 600) })
        canvasRef.current.width = rect.width
        canvasRef.current.height = Math.min(rect.width, 600)
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }, [])

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      for (const skill of skillsRef.current) {
        const skillX = centerX + skill.x
        const skillY = centerY + skill.y
        const dist = Math.sqrt((clickX - skillX) ** 2 + (clickY - skillY) ** 2)

        if (dist < 35) {
          const skillData = SKILLS_DATA.find((s) => s.name === skill.name)
          if (skillData) {
            setSelectedSkill(skillData)
          }
          return
        }
      }
    },
    [dimensions],
  )

  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    const animate = () => {
      if (!isInView) return

      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw sun (JavaScript)
      const sunPulse = 1 + Math.sin(Date.now() * 0.003) * 0.1

      // Sun glow layers
      for (let i = 5; i > 0; i--) {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40 * i * sunPulse)
        gradient.addColorStop(0, `rgba(255, 215, 0, ${0.3 / i})`)
        gradient.addColorStop(1, "rgba(255, 215, 0, 0)")
        ctx.fillStyle = gradient
        ctx.arc(centerX, centerY, 40 * i * sunPulse, 0, Math.PI * 2)
        ctx.fill()
      }

      // Sun core
      ctx.beginPath()
      ctx.fillStyle = "#FFD700"
      ctx.arc(centerX, centerY, 30 * sunPulse, 0, Math.PI * 2)
      ctx.fill()

      // Sun text
      ctx.fillStyle = "#050505"
      ctx.font = "bold 20px 'Space Grotesk', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("JS", centerX, centerY)

      // Rotating rays
      const rayCount = 8
      const rayTime = Date.now() * 0.0005
      ctx.strokeStyle = "rgba(255, 215, 0, 0.3)"
      ctx.lineWidth = 2
      for (let i = 0; i < rayCount; i++) {
        const angle = rayTime + (i * Math.PI * 2) / rayCount
        ctx.beginPath()
        ctx.moveTo(centerX + Math.cos(angle) * 40, centerY + Math.sin(angle) * 40)
        ctx.lineTo(centerX + Math.cos(angle) * 70, centerY + Math.sin(angle) * 70)
        ctx.stroke()
      }

      // Draw orbit paths
      ctx.strokeStyle = "rgba(0, 240, 255, 0.1)"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 10])
      ctx.beginPath()
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      // Update and draw skills
      skillsRef.current.forEach((skill) => {
        // Update angle
        skill.angle += 0.002

        // Target position on orbit
        const targetX = Math.cos(skill.angle) * skill.orbitRadius
        const targetY = Math.sin(skill.angle) * skill.orbitRadius

        // Mouse attraction
        const skillScreenX = centerX + skill.x
        const skillScreenY = centerY + skill.y
        const dx = mouseRef.current.x - skillScreenX
        const dy = mouseRef.current.y - skillScreenY
        const mouseDist = Math.sqrt(dx * dx + dy * dy)

        if (mouseDist < 150 && mouseDist > 0) {
          const force = ((150 - mouseDist) / 150) * 2
          skill.vx += (dx / mouseDist) * force
          skill.vy += (dy / mouseDist) * force
        }

        // Return to orbit
        skill.vx += (targetX - skill.x) * 0.02
        skill.vy += (targetY - skill.y) * 0.02

        // Damping
        skill.vx *= 0.95
        skill.vy *= 0.95

        // Update position
        skill.x += skill.vx
        skill.y += skill.vy

        const screenX = centerX + skill.x
        const screenY = centerY + skill.y

        // Glow based on proficiency
        const glowSize = skill.proficiency >= 90 ? 45 : skill.proficiency >= 80 ? 35 : 25
        const glowOpacity = skill.proficiency >= 90 ? 0.6 : skill.proficiency >= 80 ? 0.4 : 0.2

        ctx.beginPath()
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowSize)
        gradient.addColorStop(0, `rgba(0, 240, 255, ${glowOpacity})`)
        gradient.addColorStop(1, "rgba(0, 240, 255, 0)")
        ctx.fillStyle = gradient
        ctx.arc(screenX, screenY, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Node background
        ctx.beginPath()
        ctx.fillStyle = "#0a0a0a"
        ctx.strokeStyle = "rgba(0, 240, 255, 0.5)"
        ctx.lineWidth = 2
        ctx.arc(screenX, screenY, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Core
        ctx.beginPath()
        ctx.fillStyle = "#00F0FF"
        ctx.arc(screenX, screenY, 8, 0, Math.PI * 2)
        ctx.fill()

        // Label
        ctx.fillStyle = "#E2E8F0"
        ctx.font = "12px 'Space Grotesk', sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(skill.name, screenX, screenY + 35)

        // Proficiency bar
        const barWidth = 50
        const barHeight = 4
        ctx.fillStyle = "#1a1a1a"
        ctx.fillRect(screenX - barWidth / 2, screenY + 42, barWidth, barHeight)
        ctx.fillStyle = "#00F0FF"
        ctx.fillRect(screenX - barWidth / 2, screenY + 42, barWidth * (skill.proficiency / 100), barHeight)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationRef.current)
  }, [isInView, dimensions])

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="font-mono text-cyan/60 text-sm mb-4">// TECHNOLOGY_MATRIX</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            SKILLS <span className="text-cyan">CONSTELLATION</span>
          </h2>
          <p className="text-mist/60 max-w-2xl mx-auto">
            Click on any skill node to analyze proficiency data. Each skill orbits with real physics—they attract,
            repel, and respond to your cursor.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-8 text-sm font-mono">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-cyan opacity-100" />
            <span className="text-mist/60">90-100%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-cyan opacity-60" />
            <span className="text-mist/60">80-89%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-cyan opacity-30" />
            <span className="text-mist/60">70-79%</span>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="relative max-w-3xl mx-auto">
          <canvas
            ref={canvasRef}
            className="w-full cursor-crosshair"
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
          />
        </div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0a0a0a] border border-cyan/30 rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
              style={{ boxShadow: "0 0 60px rgba(0, 240, 255, 0.2)" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 text-mist/50 hover:text-cyan transition-colors"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cyan/10 border-2 border-cyan flex items-center justify-center">
                  <span className="text-3xl font-black text-cyan">{selectedSkill.name.slice(0, 2)}</span>
                </div>
                <h3 className="text-2xl font-black text-white">{selectedSkill.name}</h3>
                <p className="text-cyan/60 font-mono text-sm">{selectedSkill.experience}</p>
              </div>

              {/* Proficiency Gauge */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-mono text-mist/50">PROFICIENCY</span>
                  <span className="font-mono text-cyan">{selectedSkill.proficiency}%</span>
                </div>
                <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.proficiency}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan to-cyan/60 rounded-full"
                    style={{ boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)" }}
                  />
                </div>
              </div>

              {/* Related Projects */}
              <div>
                <h4 className="font-mono text-xs text-mist/50 mb-3 tracking-wider">// RELATED_PROJECTS</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.projects.map((project) => (
                    <span
                      key={project}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-mist/80 hover:border-cyan/50 hover:text-cyan transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {project} <ExternalLink size={12} />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
