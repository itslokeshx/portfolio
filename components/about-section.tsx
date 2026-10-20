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
  shortLabel: string;
  category: string;
  description: string;
  orbit: "inner" | "outer";
  x: number;
  y: number;
  color: string;
  glowColor: string;
  icon: React.ComponentType<{
    className?: string;
    size?: number;
    style?: React.CSSProperties;
  }>;
}

const CENTRAL_NODE = {
  id: "building",
  label: "BUILDING",
  shortLabel: "BUILDING",
  category: "Core Philosophy",
  description:
    "Creating software that people actually use. Learning by building, maintaining, and refining real products.",
  orbit: "inner" as const,
  x: 0,
  y: 0,
  color: "#00F0FF",
  glowColor: "rgba(0, 240, 255, 0.5)",
  icon: Blocks,
};

const ABOUT_NODES: ConstellationNode[] = [
  // Inner Orbit (Radius = 110)
  {
    id: "ai-eng",
    label: "AI Engineering",
    shortLabel: "AI Eng",
    category: "AI & Machine Learning",
    description:
      "Applied intelligence, model orchestration, and integrating neural capabilities into production.",
    orbit: "inner",
    x: 110,
    y: 0,
    color: "#00F0FF", // Electric Cyan
    glowColor: "rgba(0, 240, 255, 0.5)",
    icon: Cpu,
  },
  {
    id: "llm",
    label: "LLM Applications",
    shortLabel: "LLM Apps",
    category: "AI Applications",
    description:
      "Developing context-aware, structured applications on foundation language models.",
    orbit: "inner",
    x: 55,
    y: 95,
    color: "#A855F7", // Vivid Purple
    glowColor: "rgba(168, 85, 247, 0.5)",
    icon: Bot,
  },
  {
    id: "full-stack",
    label: "Full-Stack Development",
    shortLabel: "Full-Stack",
    category: "Web Engineering",
    description:
      "Architecting end-to-end applications from responsive client UIs to distributed backend services.",
    orbit: "inner",
    x: -55,
    y: 95,
    color: "#10B981", // Neon Emerald
    glowColor: "rgba(16, 185, 129, 0.5)",
    icon: Layers,
  },
  {
    id: "product",
    label: "Product Development",
    shortLabel: "Product",
    category: "Product & Strategy",
    description:
      "Iterating from raw concept to shipped products with user empathy and sustainable design.",
    orbit: "inner",
    x: -110,
    y: 0,
    color: "#F59E0B", // Radiant Amber
    glowColor: "rgba(245, 158, 11, 0.5)",
    icon: Rocket,
  },
  {
    id: "apis",
    label: "APIs & Backend Systems",
    shortLabel: "APIs & Backend",
    category: "Backend Architecture",
    description:
      "Designing secure RESTful endpoints, authentication systems, and resilient server backends.",
    orbit: "inner",
    x: -55,
    y: -95,
    color: "#0EA5E9", // Plasma Sky Blue
    glowColor: "rgba(14, 165, 233, 0.5)",
    icon: Server,
  },
  {
    id: "problem-solving",
    label: "Problem Solving",
    shortLabel: "Problem Solving",
    category: "Core Engineering",
    description:
      "Pragmatic engineering mindset focused on root-cause analysis and robust, useful software.",
    orbit: "inner",
    x: 55,
    y: -95,
    color: "#F43F5E", // Coral Rose
    glowColor: "rgba(244, 63, 94, 0.5)",
    icon: Lightbulb,
  },

  // Outer Orbit (Radius = 195)
  {
    id: "agents",
    label: "AI Agents",
    shortLabel: "AI Agents",
    category: "Autonomous Systems",
    description:
      "Autonomous multi-agent systems, tool execution, and self-directing task workflows.",
    orbit: "outer",
    x: 169,
    y: 98,
    color: "#6366F1", // Electric Indigo
    glowColor: "rgba(99, 102, 241, 0.5)",
    icon: Workflow,
  },
  {
    id: "rag",
    label: "RAG Systems",
    shortLabel: "RAG",
    category: "Information Retrieval",
    description:
      "Semantic retrieval, vector search pipelines, and grounding LLMs in dynamic proprietary data.",
    orbit: "outer",
    x: 0,
    y: 195,
    color: "#EC4899", // Neon Pink
    glowColor: "rgba(236, 72, 153, 0.5)",
    icon: Search,
  },
  {
    id: "mern",
    label: "MERN Stack",
    shortLabel: "MERN",
    category: "Full-Stack Ecosystem",
    description:
      "Building full-featured production systems with MongoDB, Express.js, React, and Node.js.",
    orbit: "outer",
    x: -169,
    y: 98,
    color: "#22C55E", // Spring Green
    glowColor: "rgba(34, 197, 94, 0.5)",
    icon: Code2,
  },
  {
    id: "opensource",
    label: "Open Source",
    shortLabel: "Open Source",
    category: "Engineering Culture",
    description:
      "Building in the open, contributing to developer tooling, and sharing transparent code.",
    orbit: "outer",
    x: -169,
    y: -98,
    color: "#8B5CF6", // Lavender Violet
    glowColor: "rgba(139, 92, 246, 0.5)",
    icon: GitBranch,
  },
  {
    id: "databases",
    label: "Databases",
    shortLabel: "Databases",
    category: "Data Architecture",
    description:
      "Schema design, query optimization, indexing, relational modeling, and vector stores.",
    orbit: "outer",
    x: 0,
    y: -195,
    color: "#FB923C", // Tangerine Orange
    glowColor: "rgba(251, 146, 60, 0.5)",
    icon: Database,
  },
  {
    id: "automation",
    label: "Automation",
    shortLabel: "Automation",
    category: "Systems Automation",
    description:
      "Automating repetitive workflows, data sync jobs, and human-in-the-loop task runners.",
    orbit: "outer",
    x: 169,
    y: -98,
    color: "#14B8A6", // Vibrant Teal
    glowColor: "rgba(20, 184, 166, 0.5)",
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
  {
    value: "50+",
    label: "PROJECTS BUILT",
    icon: FolderGit2,
    accentColor: "#00F0FF",
  },
  {
    value: "10+",
    label: "PRODUCTS BUILT",
    icon: Boxes,
    accentColor: "#10B981",
  },
  {
    value: "500+",
    label: "USERS REACHED",
    icon: Users,
    accentColor: "#0EA5E9",
  },
  {
    value: "∞",
    label: "CURIOSITY LEVEL",
    icon: Sparkles,
    accentColor: "#F59E0B",
  },
];

function AboutConstellation() {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeId = hoveredNodeId || selectedNodeId || "building";
  const activeNode =
    activeId === "building"
      ? CENTRAL_NODE
      : ABOUT_NODES.find((n) => n.id === activeId) || CENTRAL_NODE;

  const nodeCoordsMap: Record<string, { x: number; y: number; color: string }> = {
    building: { x: CENTRAL_NODE.x, y: CENTRAL_NODE.y, color: CENTRAL_NODE.color },
    ...Object.fromEntries(
      ABOUT_NODES.map((n) => [n.id, { x: n.x, y: n.y, color: n.color }])
    ),
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Constellation Canvas Container */}
      <div className="relative aspect-square w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[480px] xl:max-w-[500px] mx-auto select-none">
        {/* SVG Graphic Layer */}
        <svg
          viewBox="-250 -250 500 500"
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="center-glow" cx="0%" cy="0%" r="50%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.12)" />
              <stop offset="50%" stopColor="rgba(0, 240, 255, 0.02)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Ambient center glow */}
          <circle cx="0" cy="0" r="210" fill="url(#center-glow)" />

          {/* Orbit paths */}
          <circle
            cx="0"
            cy="0"
            r="195"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
          />
          <circle
            cx="0"
            cy="0"
            r="110"
            fill="none"
            stroke="rgba(0, 240, 255, 0.18)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <circle
            cx="0"
            cy="0"
            r="50"
            fill="none"
            stroke="rgba(0, 240, 255, 0.22)"
            strokeWidth="1.2"
            strokeDasharray="2 4"
          />

          {/* Connection Lines */}
          {CONSTELLATION_CONNECTIONS.map(([fromId, toId]) => {
            const from = nodeCoordsMap[fromId];
            const to = nodeCoordsMap[toId];
            if (!from || !to) return null;

            const isDirectlyActive = activeId === fromId || activeId === toId;
            const isCenterConnected =
              activeId === "building" && (fromId === "building" || toId === "building");
            const isHighlighted = isDirectlyActive || isCenterConnected;
            const lineColor =
              activeId === fromId ? from.color : activeId === toId ? to.color : "#00F0FF";

            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isHighlighted ? lineColor : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeOpacity={isHighlighted ? 0.95 : 0.35}
                filter={isHighlighted ? "url(#node-glow)" : undefined}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Central Node (BUILDING) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
          style={{ left: "50%", top: "50%" }}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setSelectedNodeId("building")}
            onMouseEnter={() => setHoveredNodeId("building")}
            onMouseLeave={() => setHoveredNodeId(null)}
            onFocus={() => setHoveredNodeId("building")}
            onBlur={() => setHoveredNodeId(null)}
            aria-label="Central Domain Node: BUILDING (Core Philosophy)"
            className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
              activeId === "building"
                ? "bg-[#070d12] border-2 border-cyan shadow-[0_0_30px_rgba(0,240,255,0.6)] scale-105"
                : "bg-[#090909] border border-cyan/50 hover:border-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]"
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-cyan/5 animate-pulse pointer-events-none" />
            <Blocks className="w-5 h-5 sm:w-6 sm:h-6 text-cyan transition-transform duration-300 group-hover:scale-115" />
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.2em] text-cyan mt-0.5">
              BUILDING
            </span>
          </motion.button>
        </div>

        {/* 12 Interactive Nodes with Icons + Clear Labels */}
        {ABOUT_NODES.map((node) => {
          const isSelected = activeId === node.id;
          const leftPercent = ((node.x + 250) / 500) * 100;
          const topPercent = ((node.y + 250) / 500) * 100;
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 group cursor-pointer"
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                onClick={() => setSelectedNodeId(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onFocus={() => setHoveredNodeId(node.id)}
                onBlur={() => setHoveredNodeId(null)}
                aria-label={`${node.label} (${node.category}): ${node.description}`}
                style={{
                  borderColor: isSelected ? node.color : undefined,
                  boxShadow: isSelected
                    ? `0 0 22px ${node.glowColor}`
                    : undefined,
                }}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                  isSelected
                    ? "bg-[#0c0c0c] border-2 scale-110 z-30"
                    : "bg-[#0a0a0a]/95 border border-white/10 hover:border-white/40 hover:bg-white/[0.04]"
                }`}
              >
                <Icon
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:scale-115"
                  style={{ color: node.color }}
                />
              </motion.button>

              {/* Crisp Monospace Node Label */}
              <span
                className={`text-[9px] sm:text-[10px] font-mono whitespace-nowrap mt-1 select-none pointer-events-none transition-colors duration-200 ${
                  isSelected
                    ? "font-bold text-white tracking-wide"
                    : "text-mist/70 group-hover:text-white"
                }`}
                style={{ color: isSelected ? node.color : undefined }}
              >
                {node.shortLabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Clean Domain Inspector Deck */}
      <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[480px] xl:max-w-[500px] mt-3 min-h-[96px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              borderColor: `${activeNode.color}35`,
              boxShadow: `0 0 20px ${activeNode.glowColor}20`,
            }}
            className="w-full p-3.5 sm:p-4 rounded-xl bg-[#0a0a0a]/90 border backdrop-blur-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor: activeNode.color,
                    boxShadow: `0 0 8px ${activeNode.color}`,
                  }}
                />
                <span
                  className="text-[10px] font-mono font-bold tracking-wider uppercase"
                  style={{ color: activeNode.color }}
                >
                  // {activeNode.category.toUpperCase()}
                </span>
              </div>
              <span className="text-[9px] font-mono text-mist/40 uppercase tracking-widest">
                {activeId === "building" ? "ROOT_CORE" : "DOMAIN_SPEC"}
              </span>
            </div>

            <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <activeNode.icon
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                style={{ color: activeNode.color }}
              />
              <span>{activeNode.label}</span>
            </div>

            <p className="text-xs sm:text-sm text-mist/75 font-mono mt-1 leading-relaxed">
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
          {/* Left: Clean, Colorful Constellation with Visible Text */}
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
                  className="group bg-[#0a0a0a]/80 border border-white/5 rounded-xl p-3.5 sm:p-4 flex items-start justify-between hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div>
                    <div
                      className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight transition-transform duration-300 group-hover:translate-x-0.5"
                      style={{ color: stat.accentColor }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono text-mist/50 tracking-wider mt-1 uppercase">
                      {stat.label}
                    </div>
                  </div>
                  <stat.icon
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                    style={{ color: stat.accentColor }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
