'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimalFrameCount } from '@/utils/deviceDetection';

interface PreloaderProps {
    progress: number;
    isComplete: boolean;
}

export default function Preloader({ progress, isComplete }: PreloaderProps) {
    const [terminalText, setTerminalText] = useState('INITIALIZING_NEURAL_LINK...');
    const [isExiting, setIsExiting] = useState(false);

    const totalFrames = useMemo(() => {
        const baseFrames = 240;
        const sections = 3;
        return getOptimalFrameCount(baseFrames) * sections;
    }, []);

    useEffect(() => {
        if (progress < 30) {
            setTerminalText('INITIALIZING_NEURAL_LINK...');
        } else if (progress < 90) {
            setTerminalText(`LOADING_ASSETS [${Math.floor((progress / 100) * totalFrames)}/${totalFrames} FRAMES]...`);
        } else if (progress < 100) {
            setTerminalText('CALIBRATING_VIEWPORT...');
        } else {
            setTerminalText('SYSTEM_READY');
        }
    }, [progress, totalFrames]);

    useEffect(() => {
        if (isComplete) {
            setTimeout(() => setIsExiting(true), 500);
        }
    }, [isComplete]);

    if (isExiting) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{
                    clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
                    transition: { duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }
                }}
                className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
            >
                {/* Loading Bar */}
                <div className="w-[400px] max-w-[80vw] mb-8">
                    <div className="h-[2px] bg-titanium rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-cyan-400"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Terminal Text */}
                <div className="font-mono text-cyan-400/60 text-sm tracking-wider">
                    <motion.p
                        key={terminalText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        &gt; {terminalText}
                    </motion.p>
                </div>

                {/* Progress Percentage */}
                <div className="mt-4 font-mono text-cyan-400 text-xs">
                    {Math.floor(progress)}%
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
