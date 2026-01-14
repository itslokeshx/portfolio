export interface Project {
    id: string;
    title: string;
    tagline?: string;
    description: string;
    tech: string[];
    category: string;
    link: string;
    featured: boolean;
    icon?: string;
    gradient?: string;
    stats?: {
        [key: string]: string;
    };
    features?: string[];
}

export const PROJECTS: Project[] = [
    // Featured Projects
    {
        id: "feat-1",
        title: "Second Brain",
        tagline: "Your Digital Memory",
        description: "Knowledge management system with offline-first architecture, markdown support, and sync across devices.",
        tech: ["MongoDB", "Express", "React", "Node.js", "IndexedDB"],
        category: "MERN",
        link: "https://github.com/itslokeshx/Second-Brain",
        featured: true,
        icon: "🧠",
        gradient: "from-cyan to-plasma",
        stats: {
            lines: "15K+",
            users: "200+",
            uptime: "99.9%"
        },
        features: ["Offline Sync", "Markdown Editor", "Tag System", "Search"]
    },
    {
        id: "feat-2",
        title: "MemeHub",
        tagline: "Viral Content Engine",
        description: "Real-time meme discovery platform with trending algorithms, infinite scroll, and social sharing.",
        tech: ["React", "Node.js", "Tailwind", "Cloudinary"],
        category: "MERN",
        link: "https://github.com/itslokeshx/MemeHub",
        featured: true,
        icon: "😂",
        gradient: "from-violet to-cyan",
        stats: {
            memes: "10K+",
            daily: "500+",
            shares: "5K+"
        },
        features: ["Trending Algorithm", "Infinite Scroll", "Social Share", "Favorites"]
    },
    {
        id: "feat-3",
        title: "Automated WhatsApp API",
        tagline: "Message Automation Pro",
        description: "Backend system to schedule and automate WhatsApp messages with template support and analytics.",
        tech: ["Node.js", "Express", "REST API"],
        category: "Node.js",
        link: "https://github.com/itslokeshx/Automated-whatsapp-message",
        featured: true,
        icon: "💬",
        gradient: "from-plasma to-violet",
        stats: {
            messages: "50K+",
            templates: "100+",
            uptime: "99.5%"
        },
        features: ["Scheduling", "Templates", "Analytics", "Bulk Send"]
    },
    {
        id: "feat-4",
        title: "CV Application",
        tagline: "Resume Builder Pro",
        description: "Real-time dynamic resume builder with live preview and multiple template options.",
        tech: ["React", "Vite", "Tailwind"],
        category: "React",
        link: "https://github.com/itslokeshx/CV-application",
        featured: true,
        icon: "📄",
        gradient: "from-cyan to-violet",
        stats: {
            templates: "10+",
            exports: "1K+",
            users: "500+"
        },
        features: ["Live Preview", "PDF Export", "Templates", "Auto-Save"]
    },

    // Archive Projects - React
    {
        id: "react-1",
        title: "Travel Journal",
        description: "A digital travel diary built with React components.",
        tech: ["React", "CSS"],
        category: "React",
        link: "https://github.com/itslokeshx/Travel-journal",
        featured: false
    },
    {
        id: "react-2",
        title: "Business Card",
        description: "A digital business card portfolio component.",
        tech: ["React", "CSS"],
        category: "React",
        link: "https://github.com/itslokeshx/Business-card",
        featured: false
    },

    // TypeScript & Electron
    {
        id: "ts-1",
        title: "YaaziCut",
        description: "Desktop Video Editor utility built with Electron.",
        tech: ["TypeScript", "Electron"],
        category: "TypeScript",
        link: "https://github.com/itslokeshx/YaaziCut",
        featured: false
    },

    // Node.js & APIs
    {
        id: "node-1",
        title: "QR Code Generator",
        description: "Generate QR codes programmatically.",
        tech: ["Node.js", "API"],
        category: "Node.js",
        link: "https://github.com/itslokeshx/QR-Code-Generator",
        featured: false
    },
    {
        id: "node-2",
        title: "Github User Details",
        description: "Fetch and display user data using GitHub API.",
        tech: ["Node.js", "GitHub API"],
        category: "Node.js",
        link: "https://github.com/itslokeshx/Github_user_details",
        featured: false
    },
    {
        id: "node-3",
        title: "Advice Generator",
        description: "API integration project fetching random advice.",
        tech: ["Node.js", "API"],
        category: "Node.js",
        link: "https://github.com/itslokeshx/Advice-Generator",
        featured: false
    },

    // JavaScript Apps
    {
        id: "js-app-1",
        title: "Cat Meme App",
        description: "Generate random cat memes.",
        tech: ["JavaScript", "HTML/CSS"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/Cat-Meme-App",
        featured: false
    },
    {
        id: "js-app-2",
        title: "Otakumens",
        description: "Anime-themed landing page.",
        tech: ["JavaScript", "HTML/CSS"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/otakumens",
        featured: false
    },
    {
        id: "js-app-3",
        title: "Ordering App",
        description: "Food ordering interface logic.",
        tech: ["JavaScript", "HTML/CSS"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/ordering-app",
        featured: false
    },
    {
        id: "js-app-4",
        title: "Fitness Site",
        description: "Fitness landing page.",
        tech: ["JavaScript", "HTML/CSS"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/fitness-site",
        featured: false
    },

    // JavaScript Tools
    {
        id: "js-tool-1",
        title: "Password Generator",
        description: "Secure random password creator.",
        tech: ["JavaScript", "Tool"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/passwordgenerator",
        featured: false
    },
    {
        id: "js-tool-2",
        title: "To-Do List",
        description: "Simple task management app.",
        tech: ["JavaScript", "Tool"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/To-Do",
        featured: false
    },
    {
        id: "js-tool-3",
        title: "Color Flipper",
        description: "Random background color generator.",
        tech: ["JavaScript", "Tool"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/color-flipper",
        featured: false
    },
    {
        id: "js-tool-4",
        title: "Color Scheme Gen",
        description: "Generate matching color palettes.",
        tech: ["JavaScript", "API"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/color-scheme-generator",
        featured: false
    },

    // JavaScript Calculators
    {
        id: "js-calc-1",
        title: "Age Calculator",
        description: "Calculate exact age from date of birth.",
        tech: ["JavaScript", "Math"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/Age-Calculator",
        featured: false
    },
    {
        id: "js-calc-2",
        title: "EB Bill Calculator",
        description: "Calculate electricity bill amounts.",
        tech: ["JavaScript", "Math"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/EB-Bill-Calculator",
        featured: false
    },
    {
        id: "js-calc-3",
        title: "Love Calc 2.0",
        description: "Fun love compatibility calculator.",
        tech: ["JavaScript", "Logic"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/love-calce-2.0",
        featured: false
    },
    {
        id: "js-calc-4",
        title: "Segment Calculator",
        description: "Advanced segment logic calculator.",
        tech: ["JavaScript", "Logic"],
        category: "JavaScript",
        link: "https://github.com/itslokeshx/Segment-calculator",
        featured: false
    },

    // Python
    {
        id: "py-1",
        title: "MindfulAI",
        description: "AI-based project focused on mindfulness/mental health.",
        tech: ["Python", "AI"],
        category: "Python",
        link: "https://github.com/itslokeshx/mindfulAI",
        featured: false
    },

    // PHP & MySQL
    {
        id: "php-1",
        title: "Hostel Management",
        description: "Full management system for hostel allocation.",
        tech: ["PHP", "MySQL"],
        category: "PHP",
        link: "https://github.com/itslokeshx/hostelmanagement",
        featured: false
    },
    {
        id: "php-2",
        title: "Finance Tracker",
        description: "Personal finance tracking application.",
        tech: ["PHP", "SQL"],
        category: "PHP",
        link: "https://github.com/itslokeshx/finance_tracker",
        featured: false
    },

    // HTML & CSS
    {
        id: "html-1",
        title: "Tesla Tribute",
        description: "Tesla tribute landing page clone.",
        tech: ["HTML", "CSS"],
        category: "HTML/CSS",
        link: "https://github.com/itslokeshx/Tesla",
        featured: false
    },
    {
        id: "html-2",
        title: "News Homepage",
        description: "Responsive news layout with CSS Grid.",
        tech: ["HTML", "CSS Grid"],
        category: "HTML/CSS",
        link: "https://github.com/itslokeshx/News-Homepage",
        featured: false
    },
    {
        id: "html-3",
        title: "Result Summary",
        description: "Modern card component layout.",
        tech: ["HTML", "CSS Flexbox"],
        category: "HTML/CSS",
        link: "https://github.com/itslokeshx/Result-summary-page",
        featured: false
    },
    {
        id: "html-4",
        title: "Newsletter Sub",
        description: "Form validation and layout design.",
        tech: ["HTML", "CSS"],
        category: "HTML/CSS",
        link: "https://github.com/itslokeshx/Newsletter-Subscription",
        featured: false
    }
];

export const CATEGORIES = ["ALL", "MERN", "React", "Node.js", "JavaScript", "TypeScript", "Python", "PHP", "HTML/CSS"];
