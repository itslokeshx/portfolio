"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Plus, ChevronDown } from "lucide-react"

interface Project {
  id: number
  title: string
  category: string
  description: string
  stack: string[]
  image: string
  color: string
  github: string
  demo: string
}

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Second Brain",
    category: "MERN STACK",
    description:
      "**Problem:** Most productivity tools fail to protect years of focus data, locking backups behind paywalls and fragile local storage.\n**Impact:** When systems crash, long-term progress disappears, breaking consistency and trust.\n**Solution:** I built a local-first productivity system that works fully offline while securely backing up data for permanent ownership.",
    stack: ["MongoDB", "Express", "React", "Node.js", "IndexedDB"],
    image: "/Project_images/second-brain.png",
    color: "#0F172A",
    github: "https://github.com/itslokeshx/Second-Brain",
    demo: "https://second-brain-hub.vercel.app/",
  },
  {
    id: 2,
    title: "MemeHub",
    category: "MERN STACK",
    description:
      "**Problem:** Meme platforms treat users as passive consumers with little control over content quality or structure.\n**Impact:** This results in cluttered libraries, weak moderation, and no sense of community ownership.\n**Solution:** I built a community-driven meme platform with collaborative editing, moderation tools, and scalable content delivery.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Cloudinary"],
    image: "/Project_images/memehub.png",
    color: "#111827",
    github: "https://github.com/itslokeshx/MemeHub",
    demo: "https://memehub-m4gy.onrender.com/",
  },
  {
    id: 3,
    title: "Automated WA Messenger",
    category: "NODE/EXPRESS",
    description:
      "**Problem:** Small businesses were forced to pay recurring fees for basic WhatsApp automation.\n**Impact:** These unnecessary subscriptions reduced profit margins and limited customer engagement.\n**Solution:** I built a zero-subscription automation system using the WhatsApp Cloud API to send and schedule messages reliably.",
    stack: ["Node.js", "Express", "Cron", "WhatsApp Cloud API"],
    image: "/Project_images/Whatsapp_Automation.png",
    color: "#00FF94",
    github: "https://github.com/itslokeshx/Automated-whatsapp-message",
    demo: "https://github.com/itslokeshx/Automated-whatsapp-message",
  },
  {
    id: 4,
    title: "SaveMyTab",
    category: "CHROME EXT",
    description: "**Problem:** Modern workflows encourage tab overload, silently draining focus and mental clarity.\n**Impact:** Constant context switching slows productivity and increases cognitive fatigue.\n**Solution:** I built a lightweight browser extension that saves essential tabs instantly and keeps workspaces clean.",
    stack: ["JavaScript", "Chrome API", "HTML/CSS"],
    image: "/Project_images/SaveMyTab.jpeg",
    color: "#FF9F00",
    github: "https://github.com/itslokeshx/SaveMyTab",
    demo: "https://github.com/itslokeshx/SaveMyTab",
  },
  {
    id: 5,
    title: "CV Application",
    category: "REACT",
    description: "**Problem:** Traditional CV builders provide feedback only after exporting, forcing users to guess layouts.\n**Impact:** Users waste time with repeated revisions and unnecessary exports.\n**Solution:** I built a real-time CV builder that updates the resume instantly as users edit.",
    stack: ["React", "Vite"],
    image: "/Project_images/CV.jpeg",
    color: "#9333EA",
    github: "https://github.com/itslokeshx/CV-application",
    demo: "https://cv-application-nine-gamma.vercel.app/",
  },
]

const allProjects: Project[] = [
  ...featuredProjects,

  // HTML/CSS Projects (in specified order)
  {
    id: 30,
    title: "Tesla Tribute Page",
    category: "HTML/CSS",
    description: "A tribute page for Nikola Tesla — my first web development project built with HTML & CSS.",
    stack: ["HTML", "CSS"],
    image: "/Project_images/Tesla.jpeg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/Tesla",
    demo: "https://itslokeshx.github.io/Tesla/",
  },
  {
    id: 33,
    title: "Newsletter Subscription",
    category: "HTML/CSS",
    description: "A static Newsletter Subscription page built with HTML, CSS, and JavaScript. Designed as a Frontend Mentor challenge, featuring a responsive layout and form validation for email subscription.",
    stack: ["HTML", "CSS"],
    image: "/Project_images/newsLetter.jpeg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/Newsletter-Subscription",
    demo: "https://itslokeshx.github.io/Newsletter-Subscription/",
  },
  {
    id: 31,
    title: "News Homepage",
    category: "HTML/CSS",
    description: "A static News Homepage built with HTML, CSS, and JavaScript. Fully responsive and designed as part of a Frontend Mentor Challenge.",
    stack: ["HTML", "CSS"],
    image: "/Project_images/News_page.jpeg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/News-Homepage",
    demo: "https://itslokeshx.github.io/News-Homepage/",
  },
  {
    id: 32,
    title: "Result Summary",
    category: "HTML/CSS",
    description: "A static Result Summary Page built with HTML and CSS. Created as a Frontend Mentor challenge to practice responsive layouts and clean UI design.",
    stack: ["HTML", "CSS"],
    image: "/Project_images/result.jpeg",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/Result-summary-page",
    demo: "https://itslokeshx.github.io/Result-summary-page/",
  },
  {
    id: 34,
    title: "Love Calce 1.0",
    category: "HTML/CSS",
    description: "❤️ Love Calculator 1.0 – A fun web app that shows love percentage with GIF reactions. Enter your name & crush's name, get instant love results! 💘",
    stack: ["HTML", "CSS"],
    image: "/Project_images/Love_Cale_1.0.png",
    color: "#E34F26",
    github: "https://github.com/itslokeshx/love-calce-1.0",
    demo: "https://itslokeshx.github.io/love-calce-1.0/",
  },

  // JavaScript Projects (in specified order)
  {
    id: 19,
    title: "Study Hub sem4",
    category: "JAVASCRIPT",
    description: "📚 SEM 4 Study Hub – A simple site to share PYQs, assignments, tasks, and study resources for our class. Built with HTML, CSS, and JavaScript for easy access to notes & materials.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Sem4.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/sem4",
    demo: "https://ucekcse.github.io/sem4/",
  },
  {
    id: 25,
    title: "EB Bill Calculator",
    category: "JAVASCRIPT",
    description: "⚡💡 A real-time Electricity Bill Calculator built with HTML, CSS, and JavaScript. 🔢 Enter the number of units consumed, and the app instantly shows the 💰 amount to pay based on Tamil Nadu domestic tariff rates.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/EB_BILL.jpeg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/EB-Bill-Calculator",
    demo: "https://itslokeshx.github.io/EB-Bill-Calculator/",
  },
  {
    id: 26,
    title: "Love Calculator 2.0",
    category: "JAVASCRIPT",
    description: "❤️ Love Calculator 2.0 – A fun web app that shows love percentage with GIF reactions. Enter your name & crush's name, get instant love results! 💘",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Love_Cal.jpeg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/love-calce-2.0",
    demo: "https://itslokeshx.github.io/love-calce-2.0/",
  },
  {
    id: 13,
    title: "Cat Meme App",
    category: "JAVASCRIPT",
    description: "🐱 Cat Meme Generator – Select an emotion, choose GIFs or images, and get an instant cat meme! Built with vanilla JS to practice DOM manipulation & filtering.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/cat_meme.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/Cat-Meme-App",
    demo: "https://itslokeshx.github.io/Cat-Meme-App/",
  },
  {
    id: 20,
    title: "Password Generator",
    category: "JAVASCRIPT",
    description: "🔐 Random Password Generator – Generate secure passwords (Weak, Medium, Strong) with numbers, letters & symbols. Built in vanilla JS with copy-to-clipboard.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Password_gen.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/passwordgenerator",
    demo: "https://itslokeshx.github.io/passwordgenerator/",
  },
  {
    id: 29,
    title: "Temperature Calculator",
    category: "JAVASCRIPT",
    description: "A simple and responsive Temperature Converter web app built with HTML, CSS, and JavaScript. Instantly convert between Celsius, Fahrenheit, and Kelvin.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Temp_Cal.jpeg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/temperature-calculator",
    demo: "https://itslokeshx.github.io/temperature-calculator/",
  },
  {
    id: 15,
    title: "Ordering App",
    category: "JAVASCRIPT",
    description: "🍔 Ordering App – A simple online food ordering simulation built with HTML, CSS & JavaScript. Add/remove items in real-time with a dynamic cart.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/ordering-app.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/ordering-app",
    demo: "https://itslokeshx.github.io/ordering-app/",
  },
  {
    id: 24,
    title: "Age Calculator",
    category: "JAVASCRIPT",
    description: "🎂📅 A simple Age Calculator built with HTML, CSS, and JavaScript. 👤 Enter your birthdate and instantly find out your exact age in years, months, and days!",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Age_cal.jpeg",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/Age-Calculator",
    demo: "https://itslokeshx.github.io/Age-Calculator/",
  },
  {
    id: 28,
    title: "Math Calce",
    category: "JAVASCRIPT",
    description: "🧮 A simple Math Calculator built with HTML, CSS, and JavaScript as a small JS challenge",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Math_cal.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/math-calce",
    demo: "https://itslokeshx.github.io/math-calce/",
  },
  {
    id: 14,
    title: "Otakumens",
    category: "JAVASCRIPT",
    description: "A clean and responsive website showcasing popular anime. Built using HTML, CSS, and JavaScript.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Otakumens.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/otakumens",
    demo: "https://itslokeshx.github.io/otakumens/",
  },
  {
    id: 16,
    title: "Fitness Site",
    category: "JAVASCRIPT",
    description: "💪🌐 A simple Fitness Website built with HTML, CSS, and JavaScript in 1hour during a college symposium web dev challenge. 🏆",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/fitness_site.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/fitness-site",
    demo: "https://itslokeshx.github.io/fitness-site/",
  },
  {
    id: 18,
    title: "Study Hub sem3",
    category: "JAVASCRIPT",
    description: "📚 SEM 3 Study Hub – A simple site to share class notes, PYQs, assignments, and resources for easy access. Built with HTML, CSS, and JavaScript for collaborative learning.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Sem3.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/sem3",
    demo: "https://ucekcse.github.io/sem3/",
  },
  {
    id: 21,
    title: "To-Do List",
    category: "JAVASCRIPT",
    description: "A simple and responsive To-Do List web app built with HTML, CSS, and JavaScript. Add, manage, and organize your daily tasks easily right in your browser.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/To_Do.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/To-Do",
    demo: "https://itslokeshx.github.io/To-Do/",
  },
  {
    id: 22,
    title: "Color Flipper",
    category: "JAVASCRIPT",
    description: "🎨 Color Flipper – A simple JavaScript project that changes background colors randomly on button click. A basic project from FreeCodeCamp to practice with DOM & Math.random()",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/Color_flipper.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/color-flipper",
    demo: "https://itslokeshx.github.io/color-flipper/",
  },
  {
    id: 17,
    title: "Counter",
    category: "JAVASCRIPT",
    description: "A simple counter app built with HTML, CSS, and JavaScript. A basic project from FreeCodeCamp to practice DOM manipulation and JavaScript fundamentals.",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/Project_images/counter.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/counter",
    demo: "https://itslokeshx.github.io/counter/",
  },

  // React Projects
  {
    id: 6,
    title: "Travel Journal",
    category: "REACT",
    description: "🌍 Travel Journal – A simple React project for practicing props and dynamic data rendering. Users can explore a travel journal layout with destination cards powered by reusable components. Built with React + Vite, styled for a clean and minimal look. 🚀",
    stack: ["React", "HTML", "CSS"],
    image: "/Project_images/Trave_journal.png",
    color: "#61DAFB",
    github: "https://github.com/itslokeshx/Travel-journal",
    demo: "https://travel-journal-eight-rho.vercel.app/",
  },
  {
    id: 7,
    title: "Business Card",
    category: "REACT",
    description: "🚀 Tesla Digital Business Card – A React + Vite project imagining how Tesla's digital business card might look. Clean, fast, and responsive.",
    stack: ["React", "CSS"],
    image: "/Project_images/BusinessCard.png",
    color: "#61DAFB",
    github: "https://github.com/itslokeshx/Business-card",
    demo: "https://business-card-chi-plum.vercel.app/",
  },

  // TypeScript/Electron
  {
    id: 8,
    title: "YaaziCut",
    category: "TYPESCRIPT",
    description: "YaaziCut is a minimal, lossless video splitter for Linux and Windows—drag your video, pick how many segments, and split instantly. No frills, no re-encoding, just fast and simple video division.",
    stack: ["Electron", "TypeScript", "Node.js"],
    image: "/Project_images/YaaziCut.png",
    color: "#3178C6",
    github: "https://github.com/itslokeshx/YaaziCut",
    demo: "https://github.com/itslokeshx/YaaziCut",
  },
  {
    id: 9,
    title: "Billzy",
    category: "TYPESCRIPT",
    description: "TypeScript repository for billing or invoice management.",
    stack: ["TypeScript", "Node.js"],
    image: "/Project_images/Billzy.png",
    color: "#3178C6",
    github: "https://github.com/itslokeshx/Billzy",
    demo: "https://billzy-psi.vercel.app/",
  },

  // Node.js & APIs
  {
    id: 10,
    title: "QR Code Generator",
    category: "NODE/EXPRESS",
    description: "⚡ QR Code Generator – A simple Node.js CLI app that generates a QR code from a URL and saves user input (name + URL) into a text file. 🚀 Built with Inquirer, qr-image, and Node.js.",
    stack: ["Node.js", "Inquirer"],
    image: "/Project_images/QR.jpeg",
    color: "#68A063",
    github: "https://github.com/itslokeshx/QR-Code-Generator",
    demo: "https://github.com/itslokeshx/QR-Code-Generator",
  },
  {
    id: 11,
    title: "Github User Details",
    category: "API",
    description: "📊 GitHub User Details – Fetch and display any GitHub user's profile info in real-time. Built with HTML, CSS, and vanilla JavaScript using the GitHub API.",
    stack: ["JavaScript", "API"],
    image: "/Project_images/GIthub_user_details.jpeg",
    color: "#68A063",
    github: "https://github.com/itslokeshx/Github_user_details",
    demo: "https://itslokeshx.github.io/Github_user_details/",
  },
  {
    id: 12,
    title: "Advice Generator",
    category: "API",
    description: "A Frontend Mentor project – Random Advice Generator built with HTML, CSS, and JavaScript. Uses an API to fetch and display random pieces of advice with a single click.",
    stack: ["JavaScript", "API"],
    image: "/Project_images/Advice_Gen.jpeg",
    color: "#68A063",
    github: "https://github.com/itslokeshx/Advice-Generator",
    demo: "https://itslokeshx.github.io/Advice-Generator/",
  },
  {
    id: 23,
    title: "Color Scheme Generator",
    category: "API",
    description: "🎨 Color Scheme Generator – A Scrimba API project that generates dynamic color palettes using the Color API. Pick a base color & scheme type, get instant palettes.",
    stack: ["JavaScript", "API"],
    image: "/Project_images/Color_scheme.png",
    color: "#F7DF1E",
    github: "https://github.com/itslokeshx/color-scheme-generator",
    demo: "https://itslokeshx.github.io/color-scheme-generator/",
  },

  // PHP & MySQL
  {
    id: 35,
    title: "Hostel Management",
    category: "PHP & SQL",
    description: "🏫 Hostel Management System – A responsive web app for managing student registrations, room availability, and complaints. 💻 Built with PHP, MySQL, HTML, CSS, and JavaScript.",
    stack: ["PHP", "MySQL", "HTML"],
    image: "/Project_images/hostel_management.png",
    color: "#777BB4",
    github: "https://github.com/itslokeshx/hostelmanagement",
    demo: "https://github.com/itslokeshx/hostelmanagement",
  },

  // Python
  {
    id: 37,
    title: "MindfulAI",
    category: "PYTHON",
    description: "🧠 MindfulAI is an intelligent and empathetic web app providing AI-powered mental health support. It features emotion detection 💬, personalized recommendations 🧾, a user dashboard 👤, and secure login 🔐. Built with Flask, Supabase, and Gemini API.",
    stack: ["Python", "AI/ML"],
    image: "/Project_images/MindfullAI.png",
    color: "#3776AB",
    github: "https://github.com/itslokeshx/mindfulAI",
    demo: "https://mindfulai-cggh.onrender.com/",
  },
]

// Shuffle Text Effect Component
function ShuffleText({ text, isActive, className }: { text: string; isActive: boolean; className?: string }) {
  const [displayText, setDisplayText] = useState(text)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_"

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text)
      return
    }

    let frame = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (frame > index) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join(""),
      )
      frame += 1
      if (frame > text.length + 5) {
        clearInterval(interval)
        setDisplayText(text)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isActive, text])

  return <span className={className}>{displayText}</span>
}

function ProjectRow({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: Project
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll logic removed as per user request to "let it be like before"
  }, [])

  return (
    <div className="border-b border-white/5" ref={rowRef}>
      {/* Row Header */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
        className={`
          group relative py-8 px-4 cursor-pointer transition-all duration-300
          ${isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}
        `}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            <span
              className={`font-mono transition-colors text-sm whitespace-nowrap ${isExpanded || isHovered ? "text-cyan" : "text-slate-600"}`}
            >
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>

            <h3
              className={`font-bold text-3xl md:text-5xl transition-colors ${isExpanded || isHovered ? "text-white" : "text-slate-400"}`}
            >
              <ShuffleText text={project.title} isActive={isHovered} />
            </h3>
          </div>

          {/* Inline Image Preview (Static, appears on hover) */}
          {/* Inline Image Preview (Static, reserved space) */}
          <div className="hidden md:block w-40 h-24 flex-shrink-0 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-lg overflow-hidden border-2 ${project.id === 1
                ? 'border-cyan shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                : project.id === 2
                  ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                  : project.id === 5
                    ? 'border-slate-600 shadow-[0_0_20px_rgba(71,85,105,0.25)]'
                    : ''
                }`}
              style={{
                borderColor: project.id === 1 || project.id === 2 ? undefined : project.color,
                boxShadow: project.id === 1 || project.id === 2 ? undefined : `0 0 20px ${project.color}40`
              }}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent animate-scan" />
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="hidden md:block font-mono text-cyan/50 tracking-wider text-xs whitespace-nowrap">
              {project.category}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              className={`transition-colors flex-shrink-0 ${isExpanded || isHovered ? "text-cyan" : "text-slate-600"}`}
            >
              <Plus size={24} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-8 pt-4 bg-white/[0.01]">
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left: Project Image */}
                <div className="md:col-span-5">
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 relative group bg-black">
                    {/* Noise texture overlay */}
                    <motion.div
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                        mixBlendMode: 'overlay'
                      }}
                    />

                    {/* Main image with smooth multi-stage blur */}
                    <motion.img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      initial={{
                        filter: 'blur(60px) brightness(0.4) contrast(1.3) saturate(0.3)',
                        opacity: 0.3
                      }}
                      animate={{
                        filter: [
                          'blur(60px) brightness(0.4) contrast(1.3) saturate(0.3)',
                          'blur(30px) brightness(0.7) contrast(1.15) saturate(0.7)',
                          'blur(10px) brightness(0.9) contrast(1.05) saturate(0.95)',
                          'blur(0px) brightness(1) contrast(1) saturate(1)'
                        ],
                        opacity: [0.3, 0.6, 0.9, 1]
                      }}
                      transition={{
                        duration: 0.8,
                        times: [0, 0.3, 0.65, 1],
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="w-full h-full object-cover"
                      style={{
                        willChange: 'filter, opacity'
                      }}
                    />

                    {/* Scanline overlay */}
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.03) 2px, rgba(0, 240, 255, 0.03) 4px)'
                      }}
                    />

                    {/* Hologram Scanlines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,240,255,0.03)_2px,rgba(0,240,255,0.03)_4px)]" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right: Details */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  <div>
                    <h4 className="text-xs text-cyan uppercase tracking-wider mb-3 font-mono border-b border-cyan/20 pb-2 inline-block">
                      // DOSSIER
                    </h4>
                    <div className="text-sm text-slate-300 leading-relaxed mb-4 space-y-2">
                      {project.description.split('\n').map((line, i) => {
                        const parts = line.split('**');
                        if (parts.length === 3) {
                          return (
                            <p key={i}>
                              <strong className="text-cyan">{parts[1]}</strong>
                              {parts[2]}
                            </p>
                          );
                        }
                        return <p key={i}>{line}</p>;
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">
                        // TECHNOLOGY_MATRIX
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] md:text-xs px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-cyan hover:bg-cyan/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-medium font-mono text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20 flex items-center gap-2"
                      >
                        <Github size={16} />
                        Code
                      </a>
                      {project.demo !== "#" ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn px-4 py-2 rounded-lg bg-cyan/5 border border-cyan/20 text-cyan font-medium font-mono text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-cyan hover:text-black hover:border-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2"
                        >
                          Live Demo
                          <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                        </a>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-600 font-medium font-mono text-sm tracking-wide flex items-center gap-2 cursor-not-allowed"
                        >
                          No Demo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  )
}

// Archive Card Component
function ArchiveCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden hover:border-cyan/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col h-full"
    >
      {/* Card Image */}
      <div className="h-48 w-full relative overflow-hidden bg-black/50">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />

        {/* Overlay Links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-black/50 border border-white/10 rounded-full hover:bg-cyan hover:text-black hover:border-cyan text-slate-200 transition-all duration-300 backdrop-blur-md hover:scale-110"
            title="View Code"
          >
            <Github size={20} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-black/50 border border-white/10 rounded-full hover:bg-cyan hover:text-black hover:border-cyan text-slate-200 transition-all duration-300 backdrop-blur-md hover:scale-110"
            title="Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan transition-colors">{project.title}</h3>
          <span className="text-[10px] font-mono text-cyan/70 border border-cyan/20 px-2 py-1 rounded">
            {project.category}
          </span>
        </div>

        <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded font-mono">
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded font-mono">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Mobile-only buttons */}
        <div className="flex gap-2 mt-3 md:hidden">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-cyan/5 border border-cyan/20 text-cyan text-xs font-semibold px-3 py-2.5 rounded-lg text-center hover:bg-cyan hover:text-black hover:border-cyan transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            Live Demo ↗
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-lg text-center hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <Github size={14} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedProjects({ onViewAll }: { onViewAll: () => void }) {
  const [expandedFeatured, setExpandedFeatured] = useState<number | null>(null)
  const [showArchive, setShowArchive] = useState(false)
  const [isArchiveTriggerHovered, setIsArchiveTriggerHovered] = useState(false)
  const [activeFilter, setActiveFilter] = useState("HTML/CSS")
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [showArchive])

  const categories = ["HTML/CSS", "JAVASCRIPT", "API", "REACT", "NODE/EXPRESS", "TYPESCRIPT", "MERN STACK", "PHP & SQL", "PYTHON"]

  const filteredProjects = allProjects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-32 bg-[#050505] overflow-hidden">
      <motion.div
        className="container mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-cyan/60 text-sm mb-4">// FEATURED_PROJECTS</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-300 tracking-tight">
            FEATURED <span className="text-cyan">WORK</span>
          </h2>
        </div>

        {/* Featured Projects List */}
        <div className="space-y-0 mb-4 md:mb-8">
          {featuredProjects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isExpanded={expandedFeatured === index}
              onToggle={() => {
                if (expandedFeatured !== index) {
                  setShowArchive(false)
                }
                setExpandedFeatured(expandedFeatured === index ? null : index)
              }}
            />
          ))}
        </div>

        {/* Archive Trigger */}
        <div className="border-b border-white/5 bg-[#050505] relative z-20">
          <div
            onMouseEnter={() => setIsArchiveTriggerHovered(true)}
            onMouseLeave={() => setIsArchiveTriggerHovered(false)}
            onClick={() => {
              if (!showArchive) {
                setExpandedFeatured(null)
              }
              setShowArchive(!showArchive)
            }}
            className={`
              group relative py-4 md:py-8 px-4 cursor-pointer transition-all duration-300
              ${showArchive ? "bg-white/[0.02]" : "hover:bg-white/[0.02]"}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <span
                  className={`font-mono transition-colors text-sm ${showArchive || isArchiveTriggerHovered ? "text-cyan" : "text-slate-600"}`}
                >
                  // ARCHIVE
                </span>
                <span
                  className={`font-bold text-3xl md:text-5xl transition-colors ${showArchive || isArchiveTriggerHovered ? "text-white" : "text-slate-400"}`}
                >
                  <ShuffleText text="VIEW ALL PROJECTS" isActive={isArchiveTriggerHovered} />
                </span>
              </div>
              <motion.div
                animate={{ rotate: showArchive ? 180 : 0 }}
                className={`transition-colors ${showArchive || isArchiveTriggerHovered ? "text-cyan" : "text-slate-600"}`}
              >
                <ChevronDown size={24} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Archive Grid */}
        <AnimatePresence>
          {showArchive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden bg-[#0a0a0a]"
            >
              <div className="px-4 py-6 md:py-12">

                {/* Filter Tabs */}
                <div className="relative mb-8 md:mb-16">
                  <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex overflow-x-auto no-scrollbar md:flex-wrap gap-3 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`
                          px-5 py-2 md:px-7 md:py-3 rounded-full text-[10px] md:text-xs font-bold font-mono border transition-all duration-300 uppercase tracking-wide whitespace-nowrap flex-shrink-0
                          ${activeFilter === cat
                            ? "bg-cyan text-black border-cyan shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                            : "bg-transparent border-white/10 text-slate-500 hover:border-cyan/50 hover:text-cyan"
                          }
                        `}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Left Scroll Hint */}
                  <AnimatePresence>
                    {canScrollLeft && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-0 top-0 bottom-2 w-8 pointer-events-none md:hidden flex items-center justify-start pl-2"
                      >
                        <motion.div
                          animate={{ x: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <span className="text-cyan font-bold text-xs shadow-black drop-shadow-md">{"<"}</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right Scroll Hint */}
                  <AnimatePresence>
                    {canScrollRight && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-0 top-0 bottom-2 w-8 pointer-events-none md:hidden flex items-center justify-end pr-2"
                      >
                        <motion.div
                          animate={{ x: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <span className="text-cyan font-bold text-xs shadow-black drop-shadow-md">{">"}</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ArchiveCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-mist/50 font-mono">NO PROJECTS FOUND</p>
                    <p className="text-mist/30 text-sm mt-2">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
