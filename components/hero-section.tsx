"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Download } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [phase, setPhase] = useState<"forming" | "exploding" | "revealed">("forming")
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number>(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Particle animation for dot-matrix LOKESH formation
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current
    let width = container.clientWidth
    let height = container.clientHeight
    canvas.width = width
    canvas.height = height

    // Sample text to get particle positions
    const sampleText = (text: string) => {
      const tempCanvas = document.createElement("canvas")
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return []

      const fontSize = Math.min(width * 0.12, 180)
      tempCanvas.width = width
      tempCanvas.height = height

      tempCtx.fillStyle = "#ffffff"
      tempCtx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`
      tempCtx.textAlign = "center"
      tempCtx.textBaseline = "middle"
      tempCtx.fillText(text, width / 2, height / 2)

      const imageData = tempCtx.getImageData(0, 0, width, height)
      const positions: { x: number; y: number }[] = []
      const gap = isMobile ? 6 : 4

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const i = (y * width + x) * 4
          if (imageData.data[i + 3] > 128) {
            positions.push({ x, y })
          }
        }
      }
      return positions
    }

    const textPositions = sampleText("LOKESH")
    const particleCount = textPositions.length

    interface Particle {
      x: number
      y: number
      targetX: number
      targetY: number
      vx: number
      vy: number
      size: number
      alpha: number
    }

    const particles: Particle[] = textPositions.map((pos) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      targetX: pos.x,
      targetY: pos.y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      size: isMobile ? 2 : 3,
      alpha: 1,
    }))

    const startTime = Date.now()
    let currentPhase = "forming"

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const elapsed = (Date.now() - startTime) / 1000

      ctx.clearRect(0, 0, width, height)

      // Draw grid lines (futuristic background)
      ctx.strokeStyle = "rgba(0, 240, 255, 0.03)"
      ctx.lineWidth = 1
      const gridSize = 50
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      if (elapsed < 2.5) {
        // Phase 1: Formation
        currentPhase = "forming"
        const progress = Math.min(elapsed / 2.5, 1)
        const eased = 1 - Math.pow(1 - progress, 3)

        particles.forEach((p) => {
          p.x += (p.targetX - p.x) * eased * 0.08
          p.y += (p.targetY - p.y) * eased * 0.08

          ctx.beginPath()
          ctx.fillStyle = `rgba(0, 240, 255, ${0.8 + Math.random() * 0.2})`
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        })
      } else if (elapsed < 3.5) {
        // Phase 2: Hold + Glitch
        currentPhase = "holding"
        const glitchIntensity = Math.sin(elapsed * 50) * 2

        particles.forEach((p) => {
          const offsetX = Math.random() < 0.1 ? glitchIntensity : 0
          const offsetY = Math.random() < 0.1 ? glitchIntensity : 0

          ctx.beginPath()
          ctx.fillStyle = `rgba(0, 240, 255, 0.9)`
          ctx.arc(p.targetX + offsetX, p.targetY + offsetY, p.size, 0, Math.PI * 2)
          ctx.fill()
        })
      } else if (elapsed < 4.5) {
        // Phase 3: Explosion
        currentPhase = "exploding"
        const explodeProgress = (elapsed - 3.5) / 1

        particles.forEach((p) => {
          const angle = Math.atan2(p.targetY - height / 2, p.targetX - width / 2)
          const distance = explodeProgress * 500 * (0.5 + Math.random() * 0.5)

          p.x = p.targetX + Math.cos(angle) * distance
          p.y = p.targetY + Math.sin(angle) * distance
          p.alpha = 1 - explodeProgress

          if (p.alpha > 0) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`
            ctx.arc(p.x, p.y, p.size * (1 - explodeProgress * 0.5), 0, Math.PI * 2)
            ctx.fill()
          }
        })
      } else {
        // Phase 4: Revealed - particles gone
        if (currentPhase !== "revealed") {
          currentPhase = "revealed"
          setPhase("revealed")
        }
      }
    }

    animate()

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile])

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-void"
      style={{ opacity, scale }}
    >
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-cyan/50 rounded-lg flex items-center justify-center">
            <span className="text-cyan font-mono text-lg">{"{ }"}</span>
          </div>
          <div>
            <span className="text-white font-bold tracking-wide">LOKESH</span>
            <span className="block text-cyan/60 text-xs font-mono">DEV.SYS.01</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wider">
          <a href="#projects" className="text-mist hover:text-cyan transition-colors">
            WORK
          </a>
          <a href="#about" className="text-mist hover:text-cyan transition-colors">
            ABOUT
          </a>
          <a href="#contact" className="text-mist hover:text-cyan transition-colors">
            CONTACT
          </a>
        </div>

        <button className="px-5 py-2.5 border border-cyan text-cyan rounded-full font-mono text-sm tracking-wide hover:bg-cyan hover:text-void transition-all flex items-center gap-2">
          INITIALIZE RESUME <Download size={14} />
        </button>
      </nav>

      {/* Side HUD Elements */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block">
        <div
          className="text-[10px] font-mono text-mist/40 tracking-widest"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          SYS.ID: 4B92-X // CORE
        </div>
      </div>

      <div className="absolute right-6 top-32 hidden md:block text-right">
        <div className="w-24 h-0.5 bg-cyan/50 mb-2 ml-auto" />
        <span className="text-[10px] font-mono text-cyan tracking-wider">NET_STATUS: [CONNECTED]</span>
      </div>

      {/* Main Hero Text - Only shows after particles explode */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "revealed" ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-[15vw] md:text-[12vw] font-black tracking-tight text-cyan mb-4"
          style={{ textShadow: "0 0 60px rgba(0, 240, 255, 0.5)" }}
        >
          LOKESH
        </h1>

        <p className="text-xl md:text-2xl text-cyan/80 tracking-[0.4em] font-mono mb-8">FULL STACK DEVELOPER</p>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-3 justify-center max-w-xl">
          {["MERN_STACK", "REACT.JS", "NODE", "THREE.JS"].map((skill) => (
            <span
              key={skill}
              className="px-5 py-2 border border-cyan/40 rounded text-sm font-mono text-cyan/90 tracking-wider hover:bg-cyan/10 transition-colors"
            >
              [ {skill} ]
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "revealed" ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="text-xs font-mono text-cyan tracking-[0.3em]">SCROLL TO INITIALIZE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-cyan">↓</span>
          <span className="text-cyan/60">↓</span>
        </motion.div>
      </motion.div>

      {/* Bottom HUD */}
      <div className="absolute bottom-8 left-6 hidden md:flex items-center gap-4">
        <div className="w-6 h-6 border border-mist/30 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
        </div>
        <div className="text-[10px] font-mono text-mist/50">
          <div>COORD: 34.05, -118.24</div>
          <div className="text-cyan/60">SECTOR: 7G // [LIVE]</div>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 hidden md:flex items-center gap-4 text-right">
        <div className="text-[10px] font-mono text-mist/50">
          <div>SYS.VER.2.0.4</div>
          <div className="text-cyan/60">MEMORY: 64TB // OK</div>
        </div>
        <div className="w-6 h-4 border border-cyan/30 rounded-sm flex items-center justify-center">
          <div className="w-4 h-2 bg-cyan/50 rounded-sm" />
        </div>
      </div>
    </motion.section>
  )
}
