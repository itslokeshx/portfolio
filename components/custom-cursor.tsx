"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    },
    [cursorX, cursorY],
  )

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.matches('a, button, [role="button"], input, textarea, [data-hover]')) {
          setIsHovering(true)
        }
      }

      const handleMouseOut = () => {
        setIsHovering(false)
      }

      document.addEventListener("mouseover", handleMouseOver)
      document.addEventListener("mouseout", handleMouseOut)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseover", handleMouseOver)
        document.removeEventListener("mouseout", handleMouseOut)
        window.removeEventListener("resize", checkMobile)
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile, handleMouseMove])

  if (isMobile) return null

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-cyan rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Ring cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border border-cyan"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          borderColor: isHovering ? "#00F0FF" : "rgba(0, 240, 255, 0.5)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
