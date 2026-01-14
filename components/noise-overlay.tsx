"use client"

import { useEffect, useRef } from "react"

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = 256
    canvas.width = size
    canvas.height = size

    const imageData = ctx.createImageData(size, size)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255
      data[i] = value
      data[i + 1] = value
      data[i + 2] = value
      data[i + 3] = 255
    }

    ctx.putImageData(imageData, 0, 0)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03]" style={{ mixBlendMode: "overlay" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          backgroundRepeat: "repeat",
          imageRendering: "pixelated",
        }}
      />
    </div>
  )
}
