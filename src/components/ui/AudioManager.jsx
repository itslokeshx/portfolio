"use client";
import { useEffect, useRef, useState } from "react";
import useStore from "@/store/useStore";

export default function AudioManager() {
    const soundEnabled = useStore((state) => state.soundEnabled);
    const toggleSound = useStore((state) => state.toggleSound);
    // In a real app, we would load Audio via Howler or native Audio
    // For this portfolio, we'll demonstrate the toggle UI and setup

    // Since we don't have actual mp3 assets, we will render the UI
    // and set up the hook structure.

    return (
        <div className="audio-control" onClick={toggleSound}>
            <div className={`icon ${soundEnabled ? 'active' : 'muted'}`}>
                {soundEnabled ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                )}
            </div>
            <span className="label">AUDIO {soundEnabled ? 'ON' : 'OFF'}</span>

            <style jsx>{`
         .audio-control {
           position: fixed;
           bottom: 2rem;
           left: 2rem;
           z-index: 100;
           display: flex;
           align-items: center;
           gap: 1rem;
           cursor: pointer;
           color: var(--color-text-muted);
           mix-blend-mode: difference; /* Visible on light/dark */
           transition: opacity 0.3s;
         }
         .audio-control:hover {
           opacity: 1;
           color: #fff;
         }
         .icon {
            display: flex;
            align-items: center;
            justify-content: center;
         }
         .label {
            font-size: 0.8rem;
            letter-spacing: 0.1rem;
            font-weight: bold;
         }
       `}</style>
        </div>
    );
}
