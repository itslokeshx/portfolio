"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"

interface Skill {
  name: string
  proficiency: number
  experience: string
  projects: string[]
  orbit: string
  orbitRadius: number
  angle: number
  x: number
  y: number
  vx: number
  vy: number
}

const JS_SKILL = {
  name: "JavaScript",
  proficiency: 75,
  experience: "Intermediate",
  projects: [
    "Study Hub sem4",
    "Ordering App",
    "Fitness Site",
    "Password Generator",
    "EB Bill Calculator",
    "Segment Calculator",
    "Color Flipper",
  ],
  orbit: "center",
}

const SKILLS_DATA = [
  {
    name: "HTML",
    proficiency: 90,
    experience: "Advanced",
    projects: ["Tesla", "News Homepage", "Newsletter Subscription", "Love Calce 1.0", "Study Hub sem3", "Study Hub sem4"],
    orbit: "inner",
  },
  {
    name: "CSS",
    proficiency: 80,
    experience: "Intermediate",
    projects: ["News Homepage", "Result Summary", "Newsletter Subscription"],
    orbit: "inner",
  },
  {
    name: "React",
    proficiency: 60,
    experience: "Beginner",
    projects: ["CV Application", "Travel Journal", "Business Card", "MemeHub", "Second Brain"],
    orbit: "inner",
  },
  {
    name: "Node.js",
    proficiency: 55,
    experience: "Beginner",
    projects: ["Automated WhatsApp Messager", "QR Code Generator", "Advice Generator"],
    orbit: "inner",
  },
  {
    name: "Express.js",
    proficiency: 55,
    experience: "Beginner",
    projects: ["Automated WhatsApp Messager", "Second Brain", "MemeHub"],
    orbit: "outer",
  },
  {
    name: "MongoDB",
    proficiency: 55,
    experience: "Beginner",
    projects: ["Second Brain", "MemeHub"],
    orbit: "outer",
  },
  {
    name: "SQL / MySQL",
    proficiency: 50,
    experience: "Beginner",
    projects: ["Hostel Management"],
    orbit: "outer",
  },
  {
    name: "C",
    proficiency: 50,
    experience: "Beginner",
    projects: ["DSA Practice"],
    orbit: "outer",
  },
  {
    name: "Python",
    proficiency: 50,
    experience: "Beginner",
    projects: ["MindfulAI"],
    orbit: "outer",
  },
  {
    name: "Git / GitHub",
    proficiency: 85,
    experience: "Intermediate",
    projects: ["All Projects"],
    orbit: "outer",
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<(typeof SKILLS_DATA)[0] | null>(null)
  const skillsRef = useRef<Skill[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const updateSkills = () => {
      const mobile = window.innerWidth < 768
      const scaleFactor = 1
      const innerRadius = 120 * scaleFactor
      const outerRadius = 200 * scaleFactor

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
    }

    updateSkills()
    window.addEventListener("resize", updateSkills)
    return () => window.removeEventListener("resize", updateSkills)
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect()
        const mobile = window.innerWidth < 768
        setIsMobile(mobile)
        const canvasHeight = mobile ? 800 : Math.min(rect.width, 600)
        setDimensions({ width: rect.width, height: canvasHeight })
        canvasRef.current.width = rect.width
        canvasRef.current.height = canvasHeight
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const handleCanvasHover = useCallback(
    (e: React.MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const hoverX = e.clientX - rect.left
      const hoverY = e.clientY - rect.top
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      for (const skill of skillsRef.current) {
        const skillX = centerX + skill.x
        const skillY = centerY + skill.y
        const dist = Math.sqrt((hoverX - skillX) ** 2 + (hoverY - skillY) ** 2)

        if (dist < 40) {
          const skillData = SKILLS_DATA.find((s) => s.name === skill.name)
          if (skillData && skillData !== hoveredSkill) {
            setHoveredSkill(skillData)
          }
          return
        }
      }

      // Check for sun hover
      const sunDist = Math.sqrt((hoverX - centerX) ** 2 + (hoverY - centerY) ** 2)
      if (sunDist < 40) {
        if (hoveredSkill?.name !== JS_SKILL.name) {
          setHoveredSkill(JS_SKILL)
        }
        return
      }

      setHoveredSkill(null)
    },
    [dimensions, hoveredSkill],
  )

  const handleCanvasLeave = useCallback(() => {
    setHoveredSkill(null)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    // Get actual orbit radii from skills (they're set during initialization)
    const innerOrbitRadius = skillsRef.current.find(s => s.orbit === "inner")?.orbitRadius || 120
    const outerOrbitRadius = skillsRef.current.find(s => s.orbit === "outer")?.orbitRadius || 200

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

      ctx.beginPath()
      ctx.fillStyle = "#FFD700"
      ctx.arc(centerX, centerY, 30 * sunPulse, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#050505"
      ctx.font = "bold 20px 'Space Grotesk', sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("JS", centerX, centerY)

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
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 10])
      ctx.beginPath()
      ctx.arc(centerX, centerY, innerOrbitRadius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(centerX, centerY, outerOrbitRadius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      const rotationSpeed = hoveredSkill ? 0.0005 : 0.002

      skillsRef.current.forEach((skill) => {
        // Update angle with consistent rotation
        skill.angle += rotationSpeed

        // Target position on orbit
        const targetX = Math.cos(skill.angle) * skill.orbitRadius
        const targetY = Math.sin(skill.angle) * skill.orbitRadius

        // Smooth return to orbit with gentle easing
        skill.vx += (targetX - skill.x) * 0.015
        skill.vy += (targetY - skill.y) * 0.015

        // Damping for smooth motion
        skill.vx *= 0.92
        skill.vy *= 0.92

        // Update position
        skill.x += skill.vx
        skill.y += skill.vy

        const screenX = centerX + skill.x
        const screenY = centerY + skill.y

        const isHovered = hoveredSkill?.name === skill.name
        const glowSize = isHovered ? 70 : skill.proficiency >= 90 ? 50 : skill.proficiency >= 80 ? 40 : 30
        const glowOpacity = isHovered ? 0.9 : skill.proficiency >= 90 ? 0.7 : skill.proficiency >= 80 ? 0.5 : 0.3

        // Glow effect
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowSize)
        gradient.addColorStop(0, `rgba(0, 240, 255, ${glowOpacity})`)
        gradient.addColorStop(1, "rgba(0, 240, 255, 0)")
        ctx.fillStyle = gradient
        ctx.arc(screenX, screenY, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Node background
        ctx.beginPath()
        ctx.fillStyle = isHovered ? "rgba(0, 240, 255, 0.25)" : "#0a0a0a"
        ctx.strokeStyle = isHovered ? "#00F0FF" : "rgba(0, 240, 255, 0.6)"
        ctx.lineWidth = isHovered ? 3.5 : 2.5
        ctx.arc(screenX, screenY, 22, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Core
        ctx.beginPath()
        ctx.fillStyle = isHovered ? "#FFFFFF" : "#00F0FF"
        ctx.arc(screenX, screenY, isHovered ? 14 : 9, 0, Math.PI * 2)
        ctx.fill()

        // Label
        ctx.fillStyle = isHovered ? "#FFFFFF" : "#E2E8F0"
        ctx.font = isHovered ? "bold 14px 'Space Grotesk', sans-serif" : "12px 'Space Grotesk', sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(skill.name, screenX, screenY + 38)

        // Proficiency bar
        const barWidth = 55
        const barHeight = 5
        ctx.fillStyle = "#1a1a1a"
        ctx.fillRect(screenX - barWidth / 2, screenY + 46, barWidth, barHeight)
        ctx.fillStyle = isHovered ? "#FFFFFF" : "#00F0FF"
        ctx.fillRect(screenX - barWidth / 2, screenY + 46, barWidth * (skill.proficiency / 100), barHeight)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationRef.current)
  }, [isInView, dimensions, hoveredSkill])

  return (
    <section id="skills" ref={sectionRef} className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden bg-void">
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
            Hover over any skill node to view proficiency data and related projects.
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

        {/* Container with two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Canvas Container */}
          <div className="lg:col-span-2 relative">
            <canvas
              ref={canvasRef}
              className="w-full cursor-default"
              onMouseLeave={handleCanvasLeave}
              onMouseMove={handleCanvasHover}
            />
          </div>

          {/* Right: Sticky Skills Data Panel */}
          <motion.div
            className="lg:sticky lg:top-20 rounded-2xl border border-cyan/30 bg-[#0a0a0a] p-6"
            style={{ boxShadow: "0 0 60px rgba(0, 240, 255, 0.15)" }}
          >
            {hoveredSkill ? (
              <motion.div
                key={hoveredSkill.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cyan/10 border-2 border-cyan flex items-center justify-center">
                    <span className="text-3xl font-black text-cyan">{hoveredSkill.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">{hoveredSkill.name}</h3>
                  <p className="text-cyan/60 font-mono text-sm">{hoveredSkill.experience}</p>
                </div>

                {/* Proficiency Gauge */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-mono text-mist/50">PROFICIENCY</span>
                    <span className="font-mono text-cyan">{hoveredSkill.proficiency}%</span>
                  </div>
                  <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${hoveredSkill.proficiency}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan to-cyan/60 rounded-full"
                      style={{ boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)" }}
                    />
                  </div>
                </div>

                {/* Related Projects */}
                <div>
                  <h4 className="font-mono text-xs text-mist/50 mb-3 tracking-wider">// RELATED_PROJECTS</h4>
                  <div className="flex flex-wrap gap-2">
                    {hoveredSkill.projects.map((project) => (
                      <span
                        key={project}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-mono text-mist/80 hover:border-cyan/50 hover:text-cyan transition-colors"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <p className="text-mist/50 font-mono text-sm">HOVER OVER A SKILL</p>
                <p className="text-mist/30 text-xs mt-2">to view proficiency & projects</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
