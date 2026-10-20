export interface Project {
  id: number | string;
  title: string;
  category: string;
  subtitle?: string;
  summary?: string;
  description: string;
  highlights?: string[];
  stack: string[];
  image: string; // Centralized screenshot path (e.g. "/Project_images/lookout.png") or empty string for subtle cyber placeholder
  color: string;
  github: string;
  demo?: string;
  license?: string;
}

// ==========================================
// Centralized Project Definitions
// Screenshots can be set directly in the `image` field below.
// ==========================================

export const soulsyncProject: Project = {
  id: 0,
  title: "SoulSync",
  category: "FULL STACK",
  description:
    "**Problem:** Music streaming requires expensive subscriptions while offering fragmented features.\n**Impact:** Users pay ₹119/month for basic features and lack collaborative listening experiences.\n**Solution:** SoulSync — a free, open-source music streaming platform with AI-powered playlists, real-time duo sessions, intelligent search, and native Android support. No ads. No limits. Ever.",
  stack: ["React", "Node.js", "MongoDB", "Socket.io", "Groq AI", "Capacitor"],
  image: "/Project_images/soulsync.png",
  color: "#00F0FF",
  github: "https://github.com/itslokeshx/SoulSync",
  demo: "https://soul-sync-beta.vercel.app/",
};

export const lookoutProject: Project = {
  id: "lookout",
  title: "LookOut",
  category: "AI ENGINEERING",
  subtitle: "AI Agent for Database-Driven Email Campaigns",
  summary:
    "Multi-agent AI system for natural-language MongoDB querying and human-approved email campaigns.",
  description:
    "LookOut is an AI agent system for natural-language database querying and automated, human-approved email campaign workflows.\n**Architecture:** Built a multi-agent AI system on top of MongoDB using LangChain and FastAPI, enabling natural-language database querying and automated email campaign workflows.\n**Dual-Agent Safety:** Architected a two-agent system separating investigation from drafting. The chat agent cannot send emails, and the mail agent cannot send them without explicit human approval.\n**Deterministic Pipelines:** Implemented deterministic ranking through MongoDB aggregation pipelines and single-template rendering, validated against a dataset of 187 users with zero failed sends.",
  highlights: [
    "Natural-language database investigation.",
    "Separate investigation and email-drafting agents.",
    "Explicit human approval before sending campaigns.",
    "Deterministic ranking using MongoDB aggregation pipelines.",
    "Validated on a dataset of 187 users with zero failed sends.",
  ],
  stack: ["Python", "FastAPI", "React", "LangChain", "MongoDB", "LLMs"],
  // Centralized screenshot path: add screenshot path here when uploaded (e.g. "/Project_images/lookout.png")
  image: "",
  color: "#00F0FF",
  github: "https://github.com/itslokeshx/Lookout",
  demo: "#",
};

export const cortexiaProject: Project = {
  id: 1,
  title: "CorteXia",
  category: "MERN STACK",
  description:
    "**Problem:** Productivity tools are fragmented and AI lacks real context.\n**Impact:** Users lose clarity, consistency, and alignment between daily actions and long-term goals.\n**Solution:** CorteXia — an AI-powered unified workspace connecting tasks, goals, habits, finance, and journaling into one intelligent system.",
  stack: ["MongoDB", "Express", "React", "Node.js", "AI"],
  image: "/Project_images/Cortexia.png",
  color: "#6D28D9",
  github: "https://github.com/itslokeshx/CorteXia",
  demo: "https://corte-xia.vercel.app/",
};

export const rootsProject: Project = {
  id: 3,
  title: "Roots",
  category: "MERN STACK",
  description:
    "**Problem:** Mental health apps focus on surface-level mood tracking without uncovering underlying psychological patterns.\n**Impact:** Users manage symptoms but never understand the root causes driving their anxiety, burnout, or relationship struggles.\n**Solution:** Roots — an AI-guided psychological excavation app with 40-question depth sessions, living memory profiles, and personalized healing practices.",
  stack: ["React", "Node.js", "MongoDB", "Groq AI", "SSE"],
  image: "/Project_images/Roots.png",
  color: "#FFD700",
  github: "https://github.com/itslokeshx/Roots",
  demo: "https://find-your-root.vercel.app/",
};

export const unmaskedProject: Project = {
  id: "unmasked",
  title: "Unmasked",
  category: "AI ENGINEERING",
  subtitle: "Conversational RAG Application",
  summary:
    "Conversational RAG application supporting grounded multi-turn analysis and history-aware retrieval.",
  description:
    "Unmasked is a retrieval-augmented generation application for grounded, multi-turn conversational analysis.\n**RAG Integration:** Developed a RAG application integrating LangChain, ChromaDB, and a Groq-hosted Llama 3.1 8B model.\n**History-Aware Retrieval:** Engineered a history-aware retrieval pipeline that rewrites ambiguous follow-up questions into standalone search queries, improving contextual retrieval across multi-turn conversations.\n**Modular Architecture:** Designed a modular architecture separating CLI interaction, chain orchestration, ingestion and retrieval, and session memory.\n**Vector Isolation:** Implemented per-collection vector isolation and automated Wikipedia ingestion.",
  highlights: [
    "Retrieval-augmented generation.",
    "History-aware query rewriting.",
    "Vector retrieval using ChromaDB.",
    "Modular ingestion, retrieval, orchestration, and session memory.",
    "Per-collection vector isolation and Wikipedia ingestion.",
  ],
  stack: [
    "Python",
    "LangChain",
    "Groq",
    "Llama 3.1 8B",
    "ChromaDB",
    "Hugging Face",
  ],
  // Centralized screenshot path: add screenshot path here when uploaded (e.g. "/Project_images/unmasked.png")
  image: "",
  color: "#8B5CF6",
  github: "https://github.com/itslokeshx/Unmasked",
  demo: "#",
};

export const docChatProject: Project = {
  id: "docchat",
  title: "DocChat",
  category: "AI ENGINEERING",
  subtitle: "RAG-Powered PDF Chatbot",
  summary:
    "A RAG-powered PDF chatbot that ingests, embeds, and queries PDF documents using Groq-hosted LLMs and ChromaDB to provide context-aware answers.",
  description:
    "A RAG-powered PDF chatbot that ingests, embeds, and queries PDF documents using Groq-hosted LLMs and ChromaDB to provide context-aware answers.",
  highlights: [
    "PDF document ingestion and vector embedding.",
    "Context-aware Q&A via Groq-hosted LLMs.",
    "Vector storage with ChromaDB.",
    "Public repository, MIT License.",
  ],
  stack: ["Python", "RAG", "Groq", "ChromaDB", "embeddings", "LLMs"],
  // Centralized screenshot path: add screenshot path here when uploaded (e.g. "/Project_images/docchat.png")
  image: "",
  color: "#10B981",
  github: "https://github.com/itslokeshx/DocChat",
  demo: "#",
  license: "MIT",
};

export const queryNestProject: Project = {
  id: "querynest",
  title: "QueryNest",
  category: "AI ENGINEERING",
  subtitle: "Natural-Language Query Engine for MongoDB",
  summary:
    "A natural-language query engine for MongoDB that translates English questions into safe MongoDB queries and explains the results.",
  description:
    "A natural-language query engine for MongoDB that translates English questions into safe MongoDB queries and explains the results.",
  highlights: [
    "Translates English questions into safe MongoDB queries.",
    "Explains query results in plain English.",
    "Safeguards database integrity during translation.",
    "Public repository, MIT License.",
  ],
  stack: ["Python", "MongoDB", "LangChain", "Groq", "LLMs"],
  // Centralized screenshot path: add screenshot path here when uploaded (e.g. "/Project_images/querynest.png")
  image: "",
  color: "#F59E0B",
  github: "https://github.com/itslokeshx/QueryNest",
  demo: "#",
  license: "MIT",
};

export const engineeringTeamProject: Project = {
  id: "engineering_team",
  title: "Engineering_team",
  category: "AI ENGINEERING",
  subtitle: "Multi-Agent CrewAI Sandbox & Debates",
  summary:
    "A multi-agent CrewAI setup for building Python applications in a sandbox and running AI debates.",
  description:
    "A multi-agent CrewAI setup for building Python applications in a sandbox and running AI debates.",
  highlights: [
    "Multi-agent CrewAI collaborative orchestration.",
    "Sandboxed Python application development.",
    "Automated multi-agent debate and reasoning workflows.",
  ],
  stack: ["Python", "CrewAI", "multi-agent systems", "sandboxed execution", "LLMs"],
  // Centralized screenshot path: add screenshot path here when uploaded (e.g. "/Project_images/engineering_team.png")
  image: "",
  color: "#EC4899",
  github: "https://github.com/itslokeshx/Engineering_team",
  demo: "#",
};

// ==========================================
// 1. Featured Work Projects (Exact Order: SoulSync, LookOut, Cortexia, Roots, Unmasked)
// ==========================================
export const featuredProjects: Project[] = [
  soulsyncProject,
  lookoutProject,
  cortexiaProject,
  rootsProject,
  unmaskedProject,
];

// ==========================================
// 2. Dedicated AI Engineering Projects (Exact Order: LookOut, Unmasked, DocChat, QueryNest, Engineering_team)
// ==========================================
export const aiEngineeringProjects: Project[] = [
  lookoutProject,
  unmaskedProject,
  docChatProject,
  queryNestProject,
  engineeringTeamProject,
];
