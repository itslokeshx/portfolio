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
        .scroll-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-cyan);
          opacity: 0.6;
          transition: opacity 0.3s;
          pointer-events: auto;
          cursor: pointer;
        }
        .scroll-prompt:hover {
          opacity: 1;
        }
        .scroll-text {
          font-size: 0.8rem;
          letter-spacing: 0.2rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
      `}</style>
        </div>
    );
}
