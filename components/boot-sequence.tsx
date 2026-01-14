"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const BOOT_MESSAGES = ["> INITIALIZING_NEURAL_LINK...", "> LOADING_SYSTEMS...", "> CALIBRATING_VIEWPORT...", "> READY."]

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isExiting, setIsExiting] = useState(false)

  const typeMessage = useCallback((message: string, index: number) => {
    let charIndex = 0
    setDisplayedText("")

    const typeInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setDisplayedText(message.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        if (index < BOOT_MESSAGES.length - 1) {
          setTimeout(() => setCurrentMessageIndex(index + 1), 300)
        }
      }
    }, 30)

    return () => clearInterval(typeInterval)
  }, [])

  useEffect(() => {
    const duration = 2500
    const startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          setIsExiting(true)
          setTimeout(onComplete, 800)
        }, 500)
      }
    }, 16)

    return () => clearInterval(progressInterval)
  }, [onComplete])

  useEffect(() => {
    if (currentMessageIndex < BOOT_MESSAGES.length) {
      const cleanup = typeMessage(BOOT_MESSAGES[currentMessageIndex], currentMessageIndex)
      return cleanup
    }
  }, [currentMessageIndex, typeMessage])

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="fixed inset-0 z-[10000] bg-void flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Loading Bar Container */}
          <div className="w-64 md:w-80 mb-8">
            <div className="h-0.5 bg-titanium rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 20px rgba(0, 240, 255, 0.8)",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="text-right mt-2 text-xs font-mono text-cyan/60">{Math.round(progress)}%</div>
          </div>

          {/* Terminal Messages */}
          <div className="font-mono text-sm space-y-2 text-left w-64 md:w-80">
            {BOOT_MESSAGES.slice(0, currentMessageIndex).map((msg, i) => (
              <div key={i} className="text-cyan/60">
                {msg}
              </div>
            ))}
            {currentMessageIndex < BOOT_MESSAGES.length && (
              <div className="text-cyan">
                {displayedText}
                <span className="animate-pulse">█</span>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div className="fixed inset-0 z-[10000] flex overflow-hidden">
          <motion.div
            className="w-1/2 h-full bg-void"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.div
            className="w-1/2 h-full bg-void"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
