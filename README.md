<div align="center">

# Portfolio

A personal developer portfolio built with Next.js, TypeScript, and Three.js.

[![Live Site](https://img.shields.io/badge/Live-itslokeshx.vercel.app-00fff5?style=flat-square&labelColor=0a0a0a)](https://itslokeshx.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

<br />

<img src="public/site%20images/home.png" alt="Portfolio Preview" width="100%" />

</div>

## About

A terminal-themed portfolio designed around clarity and intentional interaction. Rather than a static résumé page, the site is structured as a cohesive system — each section uses terminal UI patterns, monospaced typography, and subtle animation to reflect how I approach building software.

## Features

- **Terminal-styled interface** — Custom chrome with boot sequences, status indicators, and monospaced layout
- **Interactive skills constellation** — Orbit-based visualization where each node shows proficiency and related projects on hover
- **Smooth motion design** — Framer Motion-powered transitions, staggered reveals, and typewriter effects
- **Responsive across devices** — Tested and optimized from desktop to mobile
- **Production-grade deployment** — Dockerized and deployed on Google Cloud Run with scale-to-zero

## Screenshots

<table>
<tr>
<td><img src="public/site%20images/about.png" alt="About" /></td>
<td><img src="public/site%20images/skill1.png" alt="Skills" /></td>
</tr>
<tr>
<td><img src="public/site%20images/project1.png" alt="Projects" /></td>
<td><img src="public/site%20images/contact.png" alt="Contact" /></td>
</tr>
</table>

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Animation | Framer Motion |
| 3D | Three.js, React Three Fiber |
| Icons | Lucide React |
| Analytics | Vercel Analytics |
| Container | Docker |
| Hosting | Google Cloud Run |

## Project Structure

```
app/           → Routes, layouts, page composition
components/    → Reusable UI and section components
hooks/         → Custom React hooks
lib/           → Utilities and shared logic
public/        → Static assets and project images
styles/        → Global styles and Tailwind config
```

## Getting Started

```bash
# Clone
git clone https://github.com/itslokeshx/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Run locally
pnpm dev
```

### Docker

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=itslokeshx/portfolio&type=Date)](https://star-history.com/#itslokeshx/portfolio&Date)

</div>

## License

[MIT](LICENSE)
