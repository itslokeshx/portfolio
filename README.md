# Portfolio Website

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. It features a Cyberpunk-inspired aesthetic with interactive terminal elements, 3D graphics, and smooth animations.

![Homepage Screenshot](public/site%20images/home.png)

## Features

- **Cyberpunk Aesthetics**: Immersive dark mode UI featuring neon accents, subtle scanlines, and glitch effects for a cohesive thematic experience.
- **Interactive Terminal**: A fully functional CLI implementation where users execute commands (`help`, `about`, `projects`) to navigate or trigger actions.
- **High Performance**: Optimized for Core Web Vitals with 60 FPS animations, ensuring smooth scrolling and transitions via Framer Motion.
- **Responsive Design**: Mobile-first architecture that scales complex UI elements like the 3D canvas and terminal window across all device sizes.
- **3D Integration**: Seamlessly blended React Three Fiber elements that provide depth without compromising accessibility or load times.

## Design & Architecture

- **Component Architecture**: Follows specific design patterns separating logic (custom hooks) from presentation (dumb components) for better maintainability.
- **State Management**: Utilizes lightweight React Context for managing application-wide state such as terminal command history and sound settings.
- **Theming System**: Implements a robust Tailwind-based design system using CSS variables for consistent spacing, typography, and color palettes.
- **Accessibility**: Built with semantic HTML and appropriate ARIA labels, ensuring the custom interactive elements remain usable for all visitors.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI
- **Animation**: Framer Motion, React Three Fiber
- **Icons**: Lucide React

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable React components (UI, specific sections).
- `public/`: Static assets (images, fonts).
- `lib/`: Utility functions and helper classes.
- `styles/`: Global styles and Tailwind configuration.

## License

This project is licensed under the MIT License.


