'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
    progress: number;
    isComplete: boolean;
}

const TERMINAL_LINES = [
    '> INITIALIZING_NEURAL_LINK...',
    '> LOADING_SYSTEMS...',
    '> CALIBRATING_VIEWPORT...',
    '> READY.',
];

export default function Preloader({ progress, isComplete }: PreloaderProps) {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    // Typing animation effect
    useEffect(() => {
        if (currentLineIndex >= TERMINAL_LINES.length) return;

        const currentLine = TERMINAL_LINES[currentLineIndex];
        const typingSpeed = 30; // ms per character

        if (displayedText.length < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentLine.slice(0, displayedText.length + 1));
            }, typingSpeed);
            return () => clearTimeout(timeout);
        } else {
            // Line complete, move to next after delay
            const timeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setDisplayedText('');
            }, 400);
            return () => clearTimeout(timeout);
        }
    }, [displayedText, currentLineIndex]);

    // Cursor blink effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Handle exit animation
    useEffect(() => {
        if (isComplete) {
            setTimeout(() => setIsExiting(true), 300);
        }
    }, [isComplete]);

    if (isExiting) {
        return null;
    }

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        clipPath: [
                            'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                            'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                        ],
                        transition: { duration: 0.8, ease: [0.645, 0.045, 0.355, 1] },
                    }}
                    className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
                >
                    {/* Loading Bar */}
                    <div className="w-[400px] max-w-[80vw] mb-8">
                        <motion.div
                            className="h-[2px] bg-cyan rounded-full"
                            initial={{ width: '0%', boxShadow: '0 0 20px rgba(0,240,255,0.8)' }}
                            animate={{
                                width: `${progress}%`,
                                boxShadow: '0 0 20px rgba(0,240,255,0.8)',
                            }}
                            transition={{ duration: 0.3, ease: 'linear' }}
                        />
                    </div>

                    {/* Terminal Text */}
                    <div className="font-mono text-cyan/60 text-sm tracking-wider min-h-[100px]">
                        {TERMINAL_LINES.slice(0, currentLineIndex).map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mb-1"
                            >
                                {line}
                            </motion.p>
                        ))}
                        {currentLineIndex < TERMINAL_LINES.length && (
                            <p className="mb-1">
                                {displayedText}
                                <span
                                    className={`inline-block w-2 h-4 bg-cyan ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            </p>
                        )}
                    </div>

                    {/* Progress Percentage */}
                    <div className="mt-4 font-mono text-cyan text-xs">
                        {Math.floor(progress)}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
