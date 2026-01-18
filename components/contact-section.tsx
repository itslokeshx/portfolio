"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, MapPin, Send } from "lucide-react"

const SOCIAL_LINKS = [
  { name: "GitHub", icon: Github, url: "https://github.com/itslokeshx", handle: "@itslokeshx" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/itslokeshx/", handle: "/in/itslokeshx" },
  { name: "X (Twitter)", icon: Twitter, url: "https://x.com/itslokeshx", handle: "@itslokeshx" },
]

function MagneticButton({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const distance = Math.sqrt(distX * distX + distY * distY)

    if (distance < 100) {
      x.set(distX * 0.4)
      y.set(distY * 0.4)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      className="group flex flex-col items-center gap-3"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-cyan/50 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300">
        {children}
      </div>
      <span className="text-xs font-mono text-mist/50 group-hover:text-cyan transition-colors">{label}</span>
    </motion.a>
  )
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" })
  const [typedText, setTypedText] = useState("")
  const [commandOutput, setCommandOutput] = useState<string[]>([])
  const fullText = "INITIATE_COMM_LINK"

  useEffect(() => {
    if (!isInView) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        // Add command outputs sequentially
        setTimeout(() => setCommandOutput((prev) => [...prev, "> Establishing secure connection..."]), 500)
        setTimeout(() => setCommandOutput((prev) => [...prev, "> Connection established."]), 1200)
        setTimeout(() => setCommandOutput((prev) => [...prev, "> Ready to receive transmission."]), 1900)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 md:px-8 flex items-center justify-center bg-void"
    >
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-cyan/60 text-sm mb-4">// COMM_LINK</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            LET&apos;S <span className="text-cyan">CONNECT</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(0, 240, 255, 0.1)" }}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="flex-1 text-center text-xs font-mono text-mist/40">lokesh@neural-link ~ comm_channel</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 md:p-8 font-mono">
            {/* Command Input */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-400">→</span>
                <span className="text-mist/40">~</span>
                <span className="text-cyan">{typedText}</span>
                <span className="animate-pulse text-cyan">█</span>
              </div>
              {/* Command Output */}
              <div className="mt-3 space-y-1">
                {commandOutput.map((output, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-mist/60"
                  >
                    {output}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-cyan/30 transition-colors">
                  <div className="w-10 h-10 bg-cyan/10 rounded-lg flex items-center justify-center">
                    <Mail className="text-cyan" size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-mist/40 uppercase tracking-wider block">EMAIL</span>
                    <a href="mailto:itslokeshx@gmail.com" className="text-sm text-mist hover:text-cyan transition-colors">
                      itslokeshx@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-cyan/30 transition-colors">
                  <div className="w-10 h-10 bg-cyan/10 rounded-lg flex items-center justify-center">
                    <MapPin className="text-cyan" size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-mist/40 uppercase tracking-wider block">LOCATION</span>
                    <span className="text-sm text-mist">Kanchipuram, Tamil Nadu</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-end">
                <a
                  href="mailto:itslokeshx@gmail.com"
                  className="group relative px-8 py-4 bg-cyan/5 border border-cyan/20 text-cyan font-mono text-sm tracking-widest rounded-xl overflow-hidden hover:bg-cyan hover:text-black hover:border-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 active:scale-95"
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <span>SEND_MESSAGE</span>
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    />
                  </div>
                  {/* Scanline effect on hover */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 pt-8 mb-8">
              <div className="text-xs text-mist/40 mb-6 text-center">// SOCIAL_UPLINKS</div>
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                {SOCIAL_LINKS.map((link) => (
                  <MagneticButton key={link.name} href={link.url} label={link.handle}>
                    <link.icon size={24} className="sm:w-7 sm:h-7 text-mist/60 group-hover:text-cyan transition-colors" />
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 mb-8 space-y-2"
        >
          <p className="text-sm text-mist/40 font-mono">
            Designed & Developed by <span className="text-cyan">LOKESH</span>
          </p>
          <p className="text-xs text-mist/20 font-mono">SYS.VER.2.0 // 2026 // ALL_SYSTEMS_NOMINAL</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
