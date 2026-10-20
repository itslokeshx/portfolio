"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  Boxes,
  Users,
  Sparkles,
  Cpu,
  Bot,
  Search,
  Workflow,
  Layers,
  Rocket,
  Server,
  Database,
  GitBranch,
  Lightbulb,
  Terminal,
  Code2,
  Blocks,
} from "lucide-react";

interface ConstellationNode {
  id: string;
  label: string;
  category: string;
  description: string;
  orbit: "inner" | "outer";
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const CENTRAL_NODE: ConstellationNode = {
  id: "building",
  label: "BUILDING",
  category: "Core Philosophy",
  description:
    "Creating software that people actually use. Learning by building, maintaining, and refining real products.",
  orbit: "inner",
  x: 0,
  y: 0,
  icon: Blocks,
};

const ABOUT_NODES: ConstellationNode[] = [
  // Inner Orbit (Radius = 110)
  {
    id: "ai-eng",
    label: "AI Engineering",
    category: "AI Engineering",
    description:
      "Applied intelligence, model orchestration, and integrating neural capabilities into production.",
    orbit: "inner",
    x: 110,
    y: 0,
    icon: Cpu,
  },
  {
    id: "llm",
    label: "LLM Applications",
    category: "AI Engineering",
    description:
      "Developing context-aware, structured applications on foundation language models.",
    orbit: "inner",
    x: 55,
    y: 95,
    icon: Bot,
  },
  {
    id: "full-stack",
    label: "Full-Stack Development",
    category: "Full-Stack Development",
    description:
      "Architecting end-to-end applications from responsive client UIs to distributed backend services.",
    orbit: "inner",
    x: -55,
    y: 95,
    icon: Layers,
  },
  {
    id: "product",
    label: "Product Development",
    category: "Product Development",
    description:
      "Iterating from raw concept to shipped products with user empathy and sustainable design.",
    orbit: "inner",
    x: -110,
    y: 0,
    icon: Rocket,
  },
  {
    id: "apis",
    label: "APIs & Backend Systems",
    category: "Backend Architecture",
    description:
      "Designing secure RESTful endpoints, authentication systems, and resilient server backends.",
    orbit: "inner",
    x: -55,
    y: -95,
    icon: Server,
  },
  {
    id: "problem-solving",
    label: "Problem Solving",
    category: "Core Engineering",
    description:
      "Pragmatic engineering mindset focused on root-cause analysis and robust, useful software.",
    orbit: "inner",
    x: 55,
    y: -95,
    icon: Lightbulb,
  },

  // Outer Orbit (Radius = 195)
  {
    id: "agents",
    label: "AI Agents",
    category: "AI Engineering",
    description:
      "Autonomous multi-agent systems, tool execution, and self-directing task workflows.",
    orbit: "outer",
    x: 169,
    y: 98,
    icon: Workflow,
  },
  {
    id: "rag",
    label: "RAG Systems",
    category: "AI Engineering",
    description:
      "Semantic retrieval, vector search pipelines, and grounding LLMs in dynamic proprietary data.",
    orbit: "outer",
    x: 0,
    y: 195,
    icon: Search,
  },
  {
    id: "mern",
    label: "MERN Stack",
    category: "Full-Stack Development",
    description:
      "Building full-featured production systems with MongoDB, Express.js, React, and Node.js.",
    orbit: "outer",
    x: -169,
    y: 98,
    icon: Code2,
  },
  {
    id: "opensource",
    label: "Open Source",
    category: "Engineering Culture",
    description:
      "Building in the open, contributing to developer tooling, and sharing transparent code.",
    orbit: "outer",
    x: -169,
    y: -98,
    icon: GitBranch,
  },
  {
    id: "databases",
    label: "Databases",
    category: "Database Architecture",
    description:
      "Schema design, query optimization, indexing, relational modeling, and vector stores.",
    orbit: "outer",
    x: 0,
    y: -195,
    icon: Database,
  },
  {
    id: "automation",
    label: "Automation",
    category: "Systems & Automation",
    description:
      "Automating repetitive workflows, data sync jobs, and human-in-the-loop task runners.",
    orbit: "outer",
    x: 169,
    y: -98,
    icon: Terminal,
  },
];

const CONSTELLATION_CONNECTIONS: [string, string][] = [
  // Rays from central BUILDING node to inner core
  ["building", "ai-eng"],
  ["building", "llm"],
  ["building", "full-stack"],
  ["building", "product"],
  ["building", "apis"],
  ["building", "problem-solving"],

  // Inner hexagonal ring
  ["ai-eng", "llm"],
  ["llm", "full-stack"],
  ["full-stack", "product"],
  ["product", "apis"],
  ["apis", "problem-solving"],
  ["problem-solving", "ai-eng"],

  // Outer spokes connecting to adjacent inner hubs
  ["agents", "ai-eng"],
  ["agents", "llm"],
  ["rag", "llm"],
  ["rag", "full-stack"],
  ["mern", "full-stack"],
  ["mern", "product"],
  ["opensource", "product"],
  ["opensource", "apis"],
  ["databases", "apis"],
  ["databases", "problem-solving"],
  ["automation", "problem-solving"],
  ["automation", "ai-eng"],
];

const STATS = [
  { value: "50+", label: "PROJECTS BUILT", icon: FolderGit2 },
  { value: "10+", label: "PRODUCTS BUILT", icon: Boxes },
  { value: "500+", label: "USERS REACHED", icon: Users },
  { value: "∞", label: "CURIOSITY LEVEL", icon: Sparkles },
];

function AboutConstellation() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeId = hoveredNodeId || selectedNodeId || "building";
  const activeNode =
    activeId === "building"
      ? CENTRAL_NODE
      : ABOUT_NODES.find((n) => n.id === activeId) || CENTRAL_NODE;

  const nodeCoordsMap: Record<string, { x: number; y: number }> = {
    building: { x: CENTRAL_NODE.x, y: CENTRAL_NODE.y },
    ...Object.fromEntries(ABOUT_NODES.map((n) => [n.id, { x: n.x, y: n.y }])),
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Constellation Canvas Container */}
      <div className="relative aspect-square w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[460px] xl:max-w-[480px] mx-auto select-none">
        {/* SVG Graphic Layer */}
        <svg
          viewBox="-250 -250 500 500"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Subtle soft cyan radial glow */}
            <radialGradient id="about-center-glow" cx="0%" cy="0%" r="50%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.08)" />
              <stop offset="65%" stopColor="rgba(0, 240, 255, 0.01)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="about-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Center ambient glow */}
          <circle cx="0" cy="0" r="210" fill="url(#about-center-glow)" />

          {/* Gentle slow-rotating background orbital guides */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
          >
            {/* Outer orbit */}
            <circle
              cx="0"
              cy="0"
              r="195"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
              strokeDasharray="3 8"
            />
            {/* Inner orbit */}
            <circle
              cx="0"
              cy="0"
              r="110"
              fill="none"
              stroke="rgba(0, 240, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
            {/* Core orbit */}
            <circle
              cx="0"
              cy="0"
              r="50"
              fill="none"
              stroke="rgba(0, 240, 255, 0.15)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />

            {/* Subtle alignment ticks */}
            <line x1="-198" y1="0" x2="-192" y2="0" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />
            <line x1="192" y1="0" x2="198" y2="0" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />
            <line x1="0" y1="-198" x2="0" y2="-192" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />
            <line x1="0" y1="192" x2="0" y2="198" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" />
          </motion.g>

          {/* Stable Minimal Connection Lines */}
          {CONSTELLATION_CONNECTIONS.map(([fromId, toId]) => {
            const from = nodeCoordsMap[fromId];
            const to = nodeCoordsMap[toId];
            if (!from || !to) return null;

            const isDirectlyActive =
              activeId === fromId || activeId === toId;
            const isCenterConnected =
              activeId === "building" && (fromId === "building" || toId === "building");
            const isHighlighted = isDirectlyActive || isCenterConnected;

            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isHighlighted ? "#00F0FF" : "rgba(255, 255, 255, 0.07)"}
                strokeWidth={isHighlighted ? 1.5 : 1}
                strokeOpacity={isHighlighted ? 0.9 : 0.35}
                filter={isHighlighted ? "url(#about-glow-cyan)" : undefined}
                className="transition-all duration-300 ease-out"
              />
            );
          })}
        </svg>

        {/* Central Node (BUILDING) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: "50%", top: "50%" }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setSelectedNodeId("building")}
            onMouseEnter={() => setHoveredNodeId("building")}
            onMouseLeave={() => setHoveredNodeId(null)}
            onFocus={() => setHoveredNodeId("building")}
            onBlur={() => setHoveredNodeId(null)}
            aria-label="Central Domain Node: BUILDING (Core Philosophy)"
            className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
              activeId === "building"
                ? "bg-[#080808] border-2 border-cyan shadow-[0_0_25px_rgba(0,240,255,0.35)]"
                : "bg-[#080808] border border-cyan/40 hover:border-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-cyan/[0.04] animate-pulse pointer-events-none" />
            <Blocks className="w-5 h-5 sm:w-6 sm:h-6 text-cyan transition-transform duration-300 group-hover:scale-110" />
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.2em] text-cyan mt-0.5">
              BUILDING
            </span>
          </motion.button>
        </div>

        {/* 12 Surrounding Nodes */}
        {ABOUT_NODES.map((node) => {
          const isSelected = activeId === node.id;
          const leftPercent = ((node.x + 250) / 500) * 100;
          const topPercent = ((node.y + 250) / 500) * 100;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setSelectedNodeId(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onFocus={() => setHoveredNodeId(node.id)}
                onBlur={() => setHoveredNodeId(null)}
                aria-label={`${node.label} (${node.category}): ${node.description}`}
                className={`group relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                  isSelected
                    ? "bg-cyan/10 border-2 border-cyan shadow-[0_0_20px_rgba(0,240,255,0.4)] z-20"
                    : "bg-[#0a0a0a]/95 border border-white/10 hover:border-cyan/50 hover:bg-cyan/[0.05] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-300 ${
                    isSelected
                      ? "text-cyan"
                      : "text-mist/60 group-hover:text-cyan"
                  }`}
                />

                {/* Clean Minimal Hover Tooltip */}
                {hoveredNodeId === node.id && (
                  <motion.div
                    initial={{ opacity: 0, y: node.y > 0 ? 4 : -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute z-30 pointer-events-none px-2.5 py-1 rounded-md bg-[#050505]/95 border border-white/15 text-slate-200 text-[10px] font-mono whitespace-nowrap shadow-xl tracking-wide ${
                      node.y > 0 ? "-top-8" : "top-11"
                    } left-1/2 -translate-x-1/2`}
                  >
                    {node.label}
                  </motion.div>
                )}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Cyberpunk Minimal HUD Card (Domain Inspector) */}
      <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[460px] xl:max-w-[480px] mt-4 min-h-[92px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan/80 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan tracking-wider uppercase">
                  // {activeNode.category.toUpperCase()}
                </span>
              </div>
              <span className="text-[9px] font-mono text-mist/40 uppercase tracking-widest">
                {activeId === "building" ? "ROOT_NODE" : "DOMAIN_NODE"}
              </span>
            </div>
            <div className="text-sm sm:text-base font-semibold text-white/95 flex items-center gap-2.5">
              <activeNode.icon className="w-4 h-4 text-cyan flex-shrink-0" />
              <span>{activeNode.label}</span>
            </div>
            <p className="text-xs sm:text-sm text-mist/60 font-mono mt-1.5 leading-relaxed">
              {activeNode.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });
  const [typedText, setTypedText] = useState("");

  const fullText =
    "I'm a developer interested in building useful products through full-stack development and AI engineering.\n\nI work across the MERN stack, REST APIs, authentication systems, real-time applications, database architecture, and automation tools. I'm also exploring AI engineering through LLM-powered applications, retrieval-augmented generation (RAG), embeddings, vector databases, and AI agents.\n\nI built SoulSync, a music platform that has crossed 350+ users, 50,000+ song streams, and 100+ playlists created. Working on SoulSync has given me hands-on experience taking a product from an idea to something people use, maintaining it, and improving it over time.\n\nI enjoy solving practical problems, experimenting with ideas, and learning through building. My focus is on developing software that is useful, functional, and thoughtfully engineered.";

  // Typing effect with responsive speed
  useEffect(() => {
    if (!isInView) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[600px] py-20 pb-16 md:py-24 md:pb-20 px-4 md:px-8 overflow-hidden bg-void"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="font-mono text-cyan/60 text-sm mb-4">
            // SYSTEM_PROFILE
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
            ABOUT <span className="text-cyan">ME</span>
          </h2>
          <p className="text-mist/60 max-w-2xl mx-auto text-sm sm:text-base">
            Exploring the digital frontier through code, creativity, and
            constant learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">
          {/* Left: Distinct Engineering Constellation */}
          <div className="w-full flex justify-center">
            <AboutConstellation />
          </div>

          {/* Right: Terminal Bio + Statistics */}
          <div className="space-y-6 sm:space-y-8 w-full">
            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30%" }}
              transition={{ duration: 0.6 }}
              className="bg-[#0a0a0a]/90 rounded-2xl overflow-hidden border border-white/10 hover:border-cyan/30 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-colors duration-300"
            >
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.03] border-b border-white/5">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 sm:ml-4 text-xs font-mono text-cyan/70 tracking-wider">
                  lokesh.bio
                </span>
              </div>
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed">
                <div className="text-cyan/90 font-semibold mb-2">$ cat about.txt</div>
                <div className="mt-3 sm:mt-4 text-mist/80 whitespace-pre-line leading-relaxed">
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

            {/* Stats Grid: 50+ Projects, 10+ Products, 500+ Users, ∞ Curiosity */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group bg-[#0a0a0a]/80 border border-white/5 rounded-xl p-3.5 sm:p-4 flex items-start justify-between hover:border-cyan/30 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-black text-cyan tracking-tight transition-transform duration-300 group-hover:translate-x-0.5">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono text-mist/50 tracking-wider mt-1 uppercase">
                      {stat.label}
                    </div>
                  </div>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-mist/30 mt-1 flex-shrink-0 group-hover:text-cyan/60 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
