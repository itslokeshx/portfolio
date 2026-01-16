"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Rocket, Settings, Database } from "lucide-react"

interface OrbitNode {
  id: string
  label: string
  icon: string
  angle: number
  orbitRadius: number
  speed: number
}

// Base orbit radii for desktop
const ORBIT_NODES: OrbitNode[] = [
  { id: "html", label: "HTML / CSS", icon: "pen", angle: Math.PI * 0.8, orbitRadius: 180, speed: 0.0008 },
  { id: "js", label: "JavaScript", icon: "code", angle: Math.PI * 0.2, orbitRadius: 180, speed: 0.0008 },
  { id: "mern", label: "MERN Stack", icon: "layers", angle: Math.PI * 1.3, orbitRadius: 180, speed: 0.0008 },
  { id: "api", label: "REST APIs", icon: "cloud", angle: Math.PI * 1.7, orbitRadius: 180, speed: 0.0008 },
  { id: "github", label: "GitHub", icon: "database", angle: Math.PI * 0.5, orbitRadius: 140, speed: 0.001 },
]

const STATS = [
  { value: "2+", label: "YEARS OF PROGRAMMING", icon: Clock },
  { value: "35+", label: "PROJECTS", icon: Rocket },
  { value: "1500+", label: "HOURS OF CODING", icon: Settings },
  { value: "5+", label: "REAL WORLD PRODUCTS", icon: Database },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<OrbitNode[]>([...ORBIT_NODES])
  const [typedText, setTypedText] = useState("")

  const fullText = "I am a web developer with 2+ years of experience in HTML, CSS and JavaScript and growing experience in React, Node.js, Express and MongoDB. I have strong fundamentals in programming and problem-solving, actively build real-world projects, maintain open-source repositories, and continuously improve my engineering skills through hands-on development."

  // Typing effect with faster speed
  useEffect(() => {
    if (!isInView) return
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 15) // Much faster typing (15ms instead of 50ms)
    return () => clearInterval(interval)
  }, [isInView])

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect()
        const mobile = window.innerWidth < 768
        setIsMobile(mobile)
        setDimensions({ width: rect.width, height: rect.height })
        canvasRef.current.width = rect.width
        canvasRef.current.height = rect.height
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !isInView || dimensions.width === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    // Scale orbit radii for mobile
    const scaleFactor = isMobile ? 0.75 : 1
    const outerOrbitRadius = 180 * scaleFactor
    const innerOrbitRadius = 140 * scaleFactor

    const drawIcon = (x: number, y: number, iconType: string, size: number) => {
      ctx.strokeStyle = "#E2E8F0"
      ctx.lineWidth = 1.5
      ctx.fillStyle = "transparent"

      switch (iconType) {
        case "layers":
          ctx.beginPath()
          ctx.moveTo(x - size / 2, y)
          ctx.lineTo(x, y - size / 3)
          ctx.lineTo(x + size / 2, y)
          ctx.lineTo(x, y + size / 3)
          ctx.closePath()
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(x - size / 2, y + size / 4)
          ctx.lineTo(x, y + size / 3 + size / 4)
          ctx.lineTo(x + size / 2, y + size / 4)
          ctx.stroke()
          break
        case "code":
          ctx.beginPath()
          ctx.moveTo(x - size / 3, y - size / 4)
          ctx.lineTo(x - size / 2, y)
          ctx.lineTo(x - size / 3, y + size / 4)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(x + size / 3, y - size / 4)
          ctx.lineTo(x + size / 2, y)
          ctx.lineTo(x + size / 3, y + size / 4)
          ctx.stroke()
          break
        case "pen":
          ctx.beginPath()
          ctx.moveTo(x - size / 4, y + size / 4)
          ctx.lineTo(x + size / 4, y - size / 4)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(x - size / 4, y + size / 4, 3, 0, Math.PI * 2)
          ctx.stroke()
          break
        case "database":
          ctx.beginPath()
          ctx.ellipse(x, y - size / 4, size / 3, size / 6, 0, 0, Math.PI * 2)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(x - size / 3, y - size / 4)
          ctx.lineTo(x - size / 3, y + size / 4)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(x + size / 3, y - size / 4)
          ctx.lineTo(x + size / 3, y + size / 4)
          ctx.stroke()
          ctx.beginPath()
          ctx.ellipse(x, y + size / 4, size / 3, size / 6, 0, 0, Math.PI)
          ctx.stroke()
          break
        case "cloud":
          ctx.beginPath()
          ctx.arc(x - size / 4, y, size / 4, Math.PI * 0.5, Math.PI * 1.5)
          ctx.arc(x, y - size / 4, size / 4, Math.PI, Math.PI * 2)
          ctx.arc(x + size / 4, y, size / 4, Math.PI * 1.5, Math.PI * 0.5)
          ctx.lineTo(x - size / 4, y + size / 4)
          ctx.stroke()
          break
      }
    }

    const animate = () => {
      if (!isInView) return
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw orbit rings
      ctx.strokeStyle = "rgba(0, 240, 255, 0.15)"
      ctx.lineWidth = 1
      ctx.setLineDash([5, 10])
      ctx.beginPath()
      ctx.arc(centerX, centerY, outerOrbitRadius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(centerX, centerY, innerOrbitRadius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw connection lines to center
      nodesRef.current.forEach((node) => {
        const nodeRadius = (node.orbitRadius === 180 ? outerOrbitRadius : innerOrbitRadius)
        const x = centerX + Math.cos(node.angle) * nodeRadius
        const y = centerY + Math.sin(node.angle) * nodeRadius

        ctx.beginPath()
        ctx.strokeStyle = "rgba(0, 240, 255, 0.2)"
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()
      })

      // Draw center node (</>)
      const centerPulse = 1 + Math.sin(Date.now() * 0.003) * 0.05
      const centerRotation = (Date.now() * 0.0003) % (Math.PI * 2)

      // Multi-layer glow circles
      const glowLayers = [
        { radius: 40, opacity: 0.2 },
        { radius: 50, opacity: 0.15 },
        { radius: 60, opacity: 0.1 },
        { radius: 70, opacity: 0.05 },
        { radius: 80, opacity: 0.03 }
      ]

      glowLayers.forEach((layer, index) => {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, layer.radius * centerPulse)
        const color = index % 2 === 0 ? "0, 240, 255" : "157, 0, 255"
        gradient.addColorStop(0, `rgba(${color}, ${layer.opacity})`)
        gradient.addColorStop(1, `rgba(${color}, 0)`)
        ctx.fillStyle = gradient
        ctx.arc(centerX, centerY, layer.radius * centerPulse, 0, Math.PI * 2)
        ctx.fill()
      })

      // Inner ring
      ctx.beginPath()
      ctx.strokeStyle = "#00F0FF"
      ctx.lineWidth = 2
      ctx.arc(centerX, centerY, 50 * centerPulse, 0, Math.PI * 2)
      ctx.stroke()

      // Code symbol </>
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(centerRotation)
      ctx.font = "bold 48px 'Space Grotesk', monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Left bracket <
      ctx.fillStyle = "#00F0FF"
      ctx.fillText("<", -20, 0)

      // Slash /
      ctx.fillStyle = "#9D00FF"
      ctx.fillText("/", 0, 0)

      // Right bracket >
      ctx.fillStyle = "#0077FF"
      ctx.fillText(">", 20, 0)

      ctx.restore()

      // Draw orbit nodes
      nodesRef.current.forEach((node) => {
        node.angle += node.speed

        const nodeRadius = (node.orbitRadius === 180 ? outerOrbitRadius : innerOrbitRadius)
        const x = centerX + Math.cos(node.angle) * nodeRadius
        const y = centerY + Math.sin(node.angle) * nodeRadius

        // Node background circle
        ctx.beginPath()
        ctx.fillStyle = "#0a0a0a"
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
        ctx.lineWidth = 1
        ctx.arc(x, y, 28, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Draw icon
        drawIcon(x, y, node.icon, 24)

        // Label below
        ctx.fillStyle = "#94A3B8"
        ctx.font = "10px 'Space Grotesk', sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(node.label, x, y + 45)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationRef.current)
  }, [isInView, dimensions])

  return (
    <section id="about" ref={sectionRef} className="relative min-h-[600px] py-20 pb-16 md:py-20 md:pb-16 px-4 md:px-8 overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Orbital Constellation */}
          <div className="relative h-[450px] md:h-[450px]">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>

          {/* Right: Terminal + Content */}
          <div className="space-y-8">
            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30%" }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a0a] rounded-2xl overflow-hidden border-2 border-cyan/30 max-w-3xl"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-titanium/80 border-b border-cyan/20">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs font-mono text-cyan/70">lokesh.bio</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="text-cyan mb-2">$ cat about.txt</div>
                <div
                  className="mt-4 text-mist/80"
                >
                  {isInView && typedText.length > 0 ? typedText : ""}
                  {isInView && typedText.length < fullText.length && (
                    <span className="text-cyan animate-pulse">_</span>
                  )}
                  {isInView && typedText.length >= fullText.length && (
                    <span className="text-cyan ml-1 animate-blink">█</span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-12">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#111] border border-white/5 rounded-xl p-4 flex items-start justify-between hover:border-cyan/30 transition-colors"
                >
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan">{stat.value}</div>
                    <div className="text-[10px] sm:text-xs font-mono text-mist/50 tracking-wider mt-1">{stat.label}</div>
                  </div>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-mist/30" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
