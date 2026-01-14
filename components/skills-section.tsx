"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Html, Environment } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal } from "lucide-react"

// --- Data ---
const SKILLS_DATA = [
  { name: "React", proficiency: 95, experience: "3+ Years", projects: ["Second Brain", "MemeHub"], orbit: 1, speed: 0.5, color: "#61DAFB" },
  { name: "Node.js", proficiency: 90, experience: "3+ Years", projects: ["WhatsApp API", "QR Gen"], orbit: 1.5, speed: 0.4, color: "#68A063" },
  { name: "Three.js", proficiency: 78, experience: "1+ Year", projects: ["Portfolio"], orbit: 2, speed: 0.3, color: "#FFFFFF" },
  { name: "TypeScript", proficiency: 80, experience: "2+ Years", projects: ["YaaziCut"], orbit: 1.2, speed: 0.6, color: "#3178C6" },
  { name: "MongoDB", proficiency: 85, experience: "2+ Years", projects: ["Second Brain"], orbit: 1.8, speed: 0.35, color: "#47A248" },
  { name: "Tailwind", proficiency: 92, experience: "2+ Years", projects: ["All Projects"], orbit: 1.6, speed: 0.45, color: "#38B2AC" },
  { name: "Python", proficiency: 75, experience: "1+ Year", projects: ["MindfulAI"], orbit: 2.2, speed: 0.25, color: "#3776AB" },
  { name: "Next.js", proficiency: 90, experience: "2+ Years", projects: ["Portfolio"], orbit: 1.4, speed: 0.55, color: "#FFFFFF" },
]

function SkillNode({ data, onHover }: { data: any, onHover: (d: any) => void }) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const angle = time * data.speed * 0.5 + (data.orbit * 10)
    const radius = data.orbit * 3

    meshRef.current.position.x = Math.cos(angle) * radius
    meshRef.current.position.z = Math.sin(angle) * radius
    meshRef.current.rotation.y += 0.01
  })

  return (
    <group ref={meshRef}>
      <Float rotationIntensity={0} floatIntensity={0} speed={2}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            onHover(data)
          }}
          onPointerOut={() => {
            setHovered(false)
          }}
        >
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={hovered ? "#00F0FF" : data.color}
            emissive={hovered ? "#00F0FF" : "#000000"}
            emissiveIntensity={hovered ? 2 : 0}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <Html position={[0, 0.5, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div className={`px-2 py-1 rounded bg-black/50 border ${hovered ? 'border-cyan text-cyan' : 'border-white/10 text-white/50'} backdrop-blur-md text-xs font-mono transition-colors min-w-[60px] text-center`}>
            {data.name}
          </div>
        </Html>
      </Float>
    </group>
  )
}

function SkillsScene({ onHoverSkill }: { onHoverSkill: (skill: any) => void }) {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />

      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#000000" emissive="#00F0FF" emissiveIntensity={2} wireframe />
      </mesh>

      <group rotation={[0.4, 0, 0.2]}>
        {SKILLS_DATA.map((skill, i) => (
          <SkillNode key={i} data={skill} onHover={onHoverSkill} />
        ))}
      </group>
    </>
  )
}

function Typewriter({ text }: { text: string }) {
  const [display, setDisplay] = useState("")

  useEffect(() => {
    let i = 0
    setDisplay("")
    const interval = setInterval(() => {
      setDisplay(text.substring(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 20)
    return () => clearInterval(interval)
  }, [text])

  return <>{display}</>
}

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<typeof SKILLS_DATA[0] | null>(null)

  return (
    <section className="h-screen w-full bg-[#050505] relative overflow-hidden flex flex-col md:flex-row">

      {/* 70% 3D Scene (Left) */}
      <div className="w-full md:w-[70%] h-[60vh] md:h-full relative order-2 md:order-1">
        <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
          <SkillsScene onHoverSkill={setActiveSkill} />
        </Canvas>

        <div className="absolute bottom-8 left-8 pointer-events-none">
          <p className="font-mono text-cyan/40 text-xs tracking-widest">
            // INTERACTIVE_ORBIT_VIEW <br />
            // HOVER_NODES_TO_SCAN
          </p>
        </div>
      </div>

      {/* 30% Data Panel (Right) */}
      <div className="w-full md:w-[30%] h-[40vh] md:h-full border-l border-white/5 bg-black/50 backdrop-blur-xl p-8 flex flex-col relative order-1 md:order-2 z-10">

        <div className="mb-8 border-b border-white/5 pb-4">
          <h2 className="text-xl font-black text-white tracking-widest mb-1 flex items-center gap-2">
            <Terminal size={18} className="text-cyan" />
            SKILL_DATABASE
          </h2>
          <p className="font-mono text-xs text-cyan/50">SECURE_CONNECTION_ESTABLISHED</p>
        </div>

        <div className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!activeSkill ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full border border-dashed border-white/20 mx-auto mb-4 animate-[spin_10s_linear_infinite]" />
                <p className="font-mono text-xs text-white/40 tracking-wider">AWAITING_INPUT...</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeSkill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-4xl font-black text-white mb-2">{activeSkill.name}</h3>
                  <div className="h-1 w-20 bg-cyan shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
                </div>

                <div>
                  <p className="font-mono text-cyan/70 text-xs mb-2 uppercase tracking-wider">// PROFICIENCY_LEVEL</p>
                  <div className="text-2xl font-bold text-white flex items-center gap-3">
                    <Typewriter text={`${activeSkill.proficiency}%`} />
                    <div className="h-2 flex-grow bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeSkill.proficiency}%` }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="h-full bg-cyan"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-mono text-cyan/70 text-xs mb-2 uppercase tracking-wider">// EXPERIENCE_LOG</p>
                  <p className="text-lg text-slate-300 font-mono">
                    <Typewriter text={activeSkill.experience} />
                  </p>
                </div>

                <div>
                  <p className="font-mono text-cyan/70 text-xs mb-3 uppercase tracking-wider">// DEPLOYED_PROJECTS</p>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.projects.map(p => (
                      <span key={p} className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-slate-300 rounded hover:border-cyan/50 hover:text-cyan transition-colors cursor-default">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-end">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-cyan/50" />
            <div className="w-1 h-2 bg-cyan/30" />
            <div className="w-1 h-4 bg-cyan/80" />
          </div>
          <span className="font-mono text-[10px] text-white/20">V.3.0.4</span>
        </div>
      </div>
    </section>
  )
}
