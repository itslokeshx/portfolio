import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                void: '#050505',
                titanium: '#121212',
                cyan: {
                    DEFAULT: '#00F0FF',
                    400: '#00F0FF',
                },
                plasma: '#0077FF',
                violet: '#9D00FF',
                mist: '#E2E8F0',
                carbon: '#94A3B8',
                gold: '#FFD700',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                heading: ['var(--font-space-grotesk)', 'sans-serif'],
                mono: ['var(--font-fira-code)', 'monospace'],
            },
            boxShadow: {
                'cyan-glow': '0 0 20px rgba(0, 240, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.2), 0 0 60px rgba(0, 240, 255, 0.1)',
                'cyan-glow-intense': '0 0 30px rgba(0, 240, 255, 0.6), 0 0 60px rgba(0, 240, 255, 0.4), 0 0 90px rgba(0, 240, 255, 0.2)',
            },
            backdropBlur: {
                'md': '12px',
            },
            animation: {
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
};

export default config;
