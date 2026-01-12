"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Lerp factor
  const speed = 0.2;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });

      // Check hover state on interactive elements
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive');

      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setCursor((prev) => {
        const dx = mouse.x - prev.x;
        const dy = mouse.y - prev.y;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mouse]);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor-ring ${isHovering ? "hover" : ""} ${isClicking ? "click" : ""}`}
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
        }}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovering ? "hover" : ""}`}
        style={{
          transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
        }}
      />

      <style jsx>{`
        .custom-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border: 2px solid var(--color-cyan);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s; /* removed transform transition to avoid lerp lag */
          mix-blend-mode: difference;
        }
        
        .custom-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 4px;
          height: 4px;
          background-color: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transition: width 0.3s, height 0.3s, opacity 0.3s;
        }

        /* Hover State */
        .custom-cursor-ring.hover {
          width: 40px;
          height: 40px;
          background-color: rgba(0, 240, 255, 0.1);
          border-color: var(--color-cyan);
        }
        
        .custom-cursor-dot.hover {
          opacity: 0;
          width: 2px;
          height: 2px;
        }

        /* Click/Drag State - Visual only, transform handled in JS */
        .custom-cursor-ring.click {
          border-color: var(--color-magenta);
          background-color: rgba(255, 0, 170, 0.1);
        }

        @media (max-width: 768px) {
          .custom-cursor-ring, .custom-cursor-dot {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
