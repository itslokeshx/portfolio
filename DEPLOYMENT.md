# Deployment Guide

This portfolio is built with Next.js and heavily relies on WebGL (Three.js). Here are the best practices for deploying it.

## Vercel (Recommended)

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository.
2. **Import Project**: Go to Vercel Dashboard, click "Add New", and select "Project".
3. **Configure Build Settings**:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build --webpack` (Important: We forced this flag in package.json, so standard `npm run build` works too).
   - **Output Directory**: `.next` (Standard).
4. **Environment Variables**: Add any API keys if you added external services (currently none required).
5. **Deploy**: Click Deploy.

## Netlify

1. **New Site from Git**: Connect your repository.
2. **Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (Requires `@netlify/plugin-nextjs`).
3. **Advanced**: You may need to install the Netlify Next.js Runtime plugin if not auto-detected.

## Performance Considerations

- **Asset Size**: The `public/fonts` and images should be optimized.
- **Heavy Shaders**: The portal shader is optimized, but test on mobile devices.
- **Canvas Size**: The `dpr` prop in `Scene.jsx` is set to `[1, 1.5]` to prevent overheating on high-DPI mobile screens. 

## Troubleshooting

- **GLSL Errors**: If shaders fail to load, ensure `next.config.mjs` has the correct `raw-loader` and `glslify-loader` rules.
- **Hydration Errors**: Ensure 3D components (`Canvas`) are only rendered on the client (we use `next/dynamic` for the Scene to handle this).
