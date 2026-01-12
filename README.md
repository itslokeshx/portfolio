# Immersive 3D Portfolio

A high-performance, immersive 3D portfolio website built with **Next.js 14+**, **React Three Fiber**, and **GSAP**. This project features a continuous narrative journey through space, showcasing skills and projects with interactive WebGL experiences.

## Core Technologies

- **Framework**: Next.js 14 (App Router)
- **3D Engine**: React Three Fiber (Three.js)
- **Physics**: React Three Rapier (Rapier.js)
- **Animation**: GSAP (ScrollTrigger) & Framer Motion
- **Styling**: CSS Modules (Vanilla) & Tailwind (Optional)
- **State Management**: Zustand
- **Smooth Scroll**: Lenis

## Features

- **Hero Portal**: Custom GLSL shaders creating a warp-speed effect.
- **Narrative Scroll**: Seamless transition from vertical scroll to horizontal panning.
- **Physics Playground**: Interactive glass cube with gravity-enabled skill spheres.
- **Curved Gallery**: Catmull-Rom spline path camera navigation for projects.
- **Deep Space Dive**: Vertical timeline flight for experience section.
- **Interactive Avatar**: Procedural 3D head tracking mouse movements.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the project.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   *Note: This project uses a custom Webpack configuration for GLSL shaders. The build script is configured to use `next build --webpack`.*

## Deployment

Refer to [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Vercel or Netlify.

## License

MIT
