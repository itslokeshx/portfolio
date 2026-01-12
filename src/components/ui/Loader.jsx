"use client";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import useStore from "@/store/useStore";

export default function Loader() {
    const { progress } = useProgress();
    const setLoaded = useStore((state) => state.setLoaded);
    const [shown, setShown] = useState(true);
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        // Smoother progress visual
        const interval = setInterval(() => {
            setDisplayProgress((old) => {
                if (old < progress) {
                    return Math.min(old + 1, 100);
                }
                return old;
            });
        }, 20);
        return () => clearInterval(interval);
    }, [progress]);

    useEffect(() => {
        if (displayProgress === 100) {
            // Artificial delay for "Moment of satisfaction"
            setTimeout(() => {
                setLoaded(true);
                setTimeout(() => setShown(false), 500); // Fade out duration
            }, 500);
        }
    }, [displayProgress, setLoaded]);

    if (!shown) return null;

    return (
        <div className={`loader-container ${displayProgress === 100 ? "fade-out" : ""}`}>
            <div className="loader-content">
                <h1 className="loader-logo">LD</h1> {/* Monogram/Logo */}
                <div className="loader-bar-container">
                    <div
                        className="loader-bar"
                        style={{ width: `${displayProgress}%` }}
                    />
                </div>
                <p className="loader-text">{Math.floor(displayProgress)}%</p>
            </div>

            <style jsx>{`
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          transition: opacity 0.5s ease-out;
        }
        .fade-out {
          opacity: 0;
          pointer-events: none;
        }
        .loader-content {
          text-align: center;
          width: 300px;
        }
        .loader-logo {
          font-family: var(--font-main);
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #fff;
          text-shadow: 0 0 20px var(--color-cyan);
        }
        .loader-bar-container {
          width: 100%;
          height: 2px;
          background: #111;
          position: relative;
          overflow: hidden;
        }
        .loader-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--color-cyan), #0088ff);
          box-shadow: 0 0 10px var(--color-cyan);
          transition: width 0.1s linear;
        }
        .loader-text {
          font-family: monospace;
          color: var(--color-text-dim);
          margin-top: 1rem;
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
}
