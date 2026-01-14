"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<"hidden" | "visible">("hidden")
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setTimeout(() => setPhase("visible"), 2000)

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let isLocked = false
    let textOpacity = 0

    const PARTICLE_SIZE = 2
    const PARTICLE_GAP = 5
    const COLOR = "0, 240, 255"

    class Particle {
      x: number
      y: number
      targetX: number
      targetY: number
      vx: number
      vy: number
      size: number

      constructor(x: number, y: number, tx: number, ty: number) {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.targetX = tx
        this.targetY = ty
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.size = PARTICLE_SIZE
      }

      update(mouse: { x: number, y: number }): boolean {
        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        this.vx += dx * 0.05
        this.vy += dy * 0.05

        const mdx = mouse.x - this.x
        const mdy = mouse.y - this.y
        const dist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (dist < 100) {
          const force = (100 - dist) / 100
          this.vx -= (mdx / dist) * force * 5
          this.vy -= (mdy / dist) * force * 5
        }

        this.vx *= 0.85
        this.vy *= 0.85

        this.x += this.vx
        this.y += this.vy

        return Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5
      }

      // No longer used directly in new loop logic, but kept for reference or fallback
      draw(context: CanvasRenderingContext2D, locked: boolean) {
        // ... (Replaced by direct loop drawing)
      }
    }

    const init = () => {
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = width
      canvas.height = height

      const tempCanvas = document.createElement("canvas")
      const tCtx = tempCanvas.getContext("2d")
      if (!tCtx) return

      tempCanvas.width = width
      tempCanvas.height = height

      tCtx.fillStyle = "white"
      const fontSize = width < 768 ? 60 : 120
      tCtx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`
      tCtx.textAlign = "center"
      tCtx.textBaseline = "middle"
      tCtx.fillText("LOKESH", width / 2, height / 2 - 50)

      const imageData = tCtx.getImageData(0, 0, width, height).data
      particles = []

      for (let y = 0; y < height; y += PARTICLE_GAP) {
        for (let x = 0; x < width; x += PARTICLE_GAP) {
          const index = (y * width + x) * 4
          if (imageData[index + 3] > 128) {
            particles.push(new Particle(x, y, x, y))
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      let lockedCount = 0

      // 1. Draw Particles (Fade out if locked)
      if (textOpacity < 1) {
        particles.forEach(p => {
          const settled = p.update(mouseRef.current)
          if (settled) lockedCount++

          const particleOpacity = isLocked ? 1 - textOpacity : 0.8
          ctx.fillStyle = `rgba(${COLOR}, ${particleOpacity})`
          ctx.fillRect(p.x, p.y, p.size, p.size)
        })
      }

      // 2. Check Lock State
      if (lockedCount > particles.length * 0.95) {
        isLocked = true
      }

      // 3. Draw Solid Text (Fade in if locked)
      if (isLocked) {
        if (textOpacity < 1) textOpacity += 0.02

        ctx.save()
        ctx.globalAlpha = textOpacity
        // Use the Cyan color instead of white to match particles
        ctx.fillStyle = `rgb(${COLOR})`
        const fontSize = width < 768 ? 60 : 120
        ctx.font = `900 ${fontSize}px "Space Grotesk", sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Softer Glow Effect (Reduced from 0.8 / 20)
        ctx.shadowColor = `rgba(${COLOR}, 0.5)`
        ctx.shadowBlur = 10

        ctx.fillText("LOKESH", width / 2, height / 2 - 50)
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleResize = () => {
      init()
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

      <canvas ref={canvasRef} className="absolute inset-0 z-10 block" />

      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-cyan/50 rounded flex items-center justify-center bg-black/20 backdrop-blur-sm shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <span className="text-cyan font-mono text-lg">{"{ }"}</span>
          </div>
          <div>
            <span className="text-white font-bold tracking-wide">LOKESH</span>
            <span className="block text-cyan/60 text-[10px] font-mono tracking-widest">DEV.SYS.01</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12 font-mono text-[10px] tracking-[0.2em] font-bold text-slate-400">
          <a href="#" className="hover:text-cyan transition-colors">HOME</a>
          <a href="#about" className="hover:text-cyan transition-colors">ABOUT</a>
          <a href="#skills" className="hover:text-cyan transition-colors">SKILLS</a>
          <a href="#projects" className="hover:text-cyan transition-colors">PROJECTS</a>
          <a href="#contact" className="hover:text-cyan transition-colors">CONTACT</a>
        </div>

        <button className="px-6 py-3 border border-cyan/20 text-cyan rounded hover:bg-cyan/5 transition-all flex items-center gap-3 group relative overflow-hidden">
          <span className="font-mono text-[10px] tracking-widest font-bold z-10">INITIALIZE RESUME</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse z-10" />
          <div className="absolute inset-0 bg-cyan/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </nav>

      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block mix-blend-screen pointer-events-none z-20">
        <div
          className="text-[10px] font-mono text-cyan/20 tracking-widest"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          SYS.ID: LK-047 // CORE
        </div>
      </div>

      <div className="absolute right-8 top-32 hidden md:block text-right mix-blend-screen pointer-events-none z-20">
        <div className="w-20 h-px bg-cyan/20 mb-2 ml-auto" />
        <span className="text-[10px] font-mono text-cyan/40 tracking-wider">NET.STATUS: [CONNECTED]</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: phase === "visible" ? 1 : 0, y: phase === "visible" ? 0 : 30 }}
        transition={{ duration: 1, delay: 0 }}
        className="absolute top-[50%] pt-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-6"
      >
        <div className="relative p-10 rounded-full border border-cyan/10 bg-black/40 backdrop-blur-sm flex flex-col items-center gap-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 to-transparent opacity-30" />

          <h2 className="text-xl md:text-2xl font-black text-cyan tracking-[0.3em] uppercase text-center relative z-10 drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            Web Developer
          </h2>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            {["HTML_CSS", "JAVASCRIPT", "REACT.JS", "MERN_STACK"].map((skill) => (
              <div key={skill} className="px-4 py-2 border border-cyan/10 bg-cyan/5 rounded text-[10px] md:text-xs font-mono text-cyan tracking-widest">
                [ {skill} ]
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-8 hidden md:flex items-center gap-4 z-20">
        <div className="w-8 h-8 rounded-full border border-cyan/20 flex items-center justify-center">
          <div className="w-4 h-4 text-cyan/50 animate-spin" style={{ borderTop: '1px solid currentColor', borderRadius: '50%' }} />
        </div>
        <div className="text-[10px] font-mono text-cyan/30 flex flex-col gap-1">
          <span>COORD: 12.7890° N, 79.0030° E</span>
          <span className="text-cyan/50">SECTOR: 7G // [LIVE]</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden md:block text-right z-20">
        <div className="text-[10px] font-mono text-cyan/30 mb-1">SYS.VER.2.0.4</div>
        <div className="text-[10px] font-mono text-cyan/20">MEMORY: 64TB // OK</div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[9px] font-mono text-cyan/40 tracking-[0.3em] uppercase">Scroll to Initialize</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="text-cyan/40 w-3 h-3" />
        </motion.div>
      </motion.div>

    </section>
  )
}
