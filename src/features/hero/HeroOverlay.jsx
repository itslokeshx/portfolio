"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroOverlay() {
  const scrollRef = useRef();

  useEffect(() => {
    // Bounce animation
    gsap.to(scrollRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div className="hero-overlay">
      <div className="scroll-prompt" ref={scrollRef}>
        <span className="scroll-text">SCROLL TO ENTER</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>

      <style jsx>{`
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 4rem;
        }
        .scrollPrompt {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          color: var(--color-cyan);
          font-size: 1rem;
          letter-spacing: 0.3rem;
          animation: float 3s ease-in-out infinite, glow 2s ease-in-out infinite;
          text-shadow: 
            0 0 10px rgba(0, 240, 255, 0.8),
            0 0 20px rgba(0, 240, 255, 0.6),
            0 0 30px rgba(0, 240, 255, 0.4);
          font-weight: 600;
          display: flex; /* Added to maintain layout for text and icon */
          flex-direction: column; /* Added to maintain layout for text and icon */
          align-items: center; /* Added to maintain layout for text and icon */
          pointer-events: auto; /* Allow interaction */
          cursor: pointer; /* Indicate interactivity */
        }
        .scrollPrompt:hover {
          opacity: 1; /* Enhance hover effect */
        }
        .scroll-text {
          font-size: 0.8rem; /* Adjusted to fit new design */
          letter-spacing: 0.2rem; /* Adjusted to fit new design */
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-15px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
