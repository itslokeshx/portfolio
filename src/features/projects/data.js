export const projects = [
    {
        id: 1,
        title: "Second Brain",
        description: "A self-hosted backend and sync system built on top of the Focus To-Do web frontend, enabling offline-first usage with MongoDB cloud sync and full data ownership.",
        role: "Full Stack Developer",
        tech: ["MongoDB", "Express", "React", "Node.js"],
        github: "https://github.com/itslokeshx/Second-Brain",
        featured: true
    },
    {
        id: 2,
        title: "MemeHub",
        description: "Full-stack MERN meme-sharing platform where users can upload, browse, and search memes. Built with React, Tailwind, Node.js, Express, MongoDB, and Cloudinary.",
        role: "Full Stack Developer",
        tech: ["React", "TypeScript", "Node.js", "MongoDB", "Cloudinary", "Tailwind"],
        github: "https://github.com/itslokeshx/MemeHub",
        featured: true
    },
    {
        id: 3,
        title: "Automated WhatsApp Message",
        description: "WhatsApp Automation API — A Node.js backend to schedule and send WhatsApp Business messages via REST API for business loyalty programs.",
        role: "Backend Developer",
        tech: ["Node.js", "Express", "WhatsApp API"],
        github: "https://github.com/itslokeshx/Automated-whatsapp-message",
        featured: true
    },
    {
        id: 4,
        title: "CV Application",
        description: "CV Builder – A modern, responsive React application for creating and customizing CVs with real-time preview. Built with React 18, Vite, and Tailwind CSS.",
        role: "Frontend Developer",
        tech: ["React", "Vite", "Tailwind CSS"],
        github: "https://github.com/itslokeshx/CV-application",
        featured: true
    },
    {
        id: 5,
        title: "SaveMyTab",
        description: "SaveMyTab – A lightweight Chrome extension to save, manage, and delete tabs or URLs. Keep your research, dev work, or casual browsing organized without cluttering bookmarks!",
        role: "Extension Developer",
        tech: ["JavaScript", "Chrome APIs"],
        github: "https://github.com/itslokeshx/SaveMyTab",
        featured: true
    },
    {
        id: 6,
        title: "YaaziCut",
        description: "Desktop Video Editor utility built with Electron & TypeScript. A powerful tool for quick video edits.",
        role: "Desktop Developer",
        tech: ["TypeScript", "Electron", "Node.js"],
        github: "https://github.com/itslokeshx/YaaziCut",
        featured: true
    }
];

export const categorizedProjects = {
    "MERN Stack": [
        { name: "Second Brain", desc: "Knowledge management system (Featured above)", link: "https://github.com/itslokeshx/Second-Brain" },
        { name: "MemeHub", desc: "Social meme sharing platform (Featured above)", link: "https://github.com/itslokeshx/MemeHub" }
    ],
    "React.js": [
        { name: "CV Application", desc: "Real-time Resume Builder", link: "https://github.com/itslokeshx/CV-application" },
        { name: "Travel Journal", desc: "A digital travel diary built with React components", link: "https://github.com/itslokeshx/Travel-journal" },
        { name: "Business Card", desc: "A digital business card portfolio component", link: "https://github.com/itslokeshx/Business-card" }
    ],
    "TypeScript & Electron": [
        { name: "YaaziCut", desc: "Desktop Video Editor utility built with Electron & TypeScript", link: "https://github.com/itslokeshx/YaaziCut" }
    ],
    "Node.js & APIs": [
        { name: "Automated WhatsApp", desc: "WhatsApp scheduling API (Featured)", link: "https://github.com/itslokeshx/Automated-whatsapp-message" },
        { name: "QR Code Generator", desc: "Generate QR codes programmatically using Node.js", link: "https://github.com/itslokeshx/QR-Code-Generator" },
        { name: "Github User Details", desc: "Fetch and display user data using GitHub API", link: "https://github.com/itslokeshx/Github_user_details" },
        { name: "Advice Generator", desc: "API integration project fetching random advice", link: "https://github.com/itslokeshx/Advice-Generator" }
    ],
    "JavaScript": [
        { name: "Apps & Games", desc: "Cat Meme App, Otakumens, Ordering App, Fitness Site", link: "https://github.com/itslokeshx?tab=repositories&q=&type=&language=javascript" },
        { name: "Tools", desc: "Password Generator, To-Do List, Color Flipper, Color Scheme Gen", link: "https://github.com/itslokeshx?tab=repositories&q=&type=&language=javascript" },
        { name: "Calculators", desc: "Age Calc, EB Bill Calc, Love Calc 2.0, Segment Calc", link: "https://github.com/itslokeshx?tab=repositories&q=&type=&language=javascript" }
    ],
    "Python": [
        { name: "MindfulAI", desc: "AI-based project focused on mindfulness/mental health", link: "https://github.com/itslokeshx/mindfulAI" }
    ],
    "PHP & MySQL": [
        { name: "Hostel Management", desc: "Full management system for hostel allocation", link: "https://github.com/itslokeshx/hostelmanagement" },
        { name: "Finance Tracker", desc: "Personal finance tracking application using SQL", link: "https://github.com/itslokeshx/finance_tracker" }
    ],
    "HTML & CSS": [
        { name: "Tesla Tribute", desc: "Tesla's Tribute page", link: "https://github.com/itslokeshx/Tesla" },
        { name: "News Homepage", desc: "Responsive news layout with complex CSS Grid", link: "https://github.com/itslokeshx/News-Homepage" },
        { name: "Result Summary", desc: "Modern card component layout", link: "https://github.com/itslokeshx/Result-summary-page" },
        { name: "Newsletter Sub", desc: "Form validation and layout design", link: "https://github.com/itslokeshx/Newsletter-Subscription" }
    ]
};
