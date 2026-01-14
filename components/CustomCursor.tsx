'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.getAttribute('role') === 'button' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-cyan rounded-full pointer-events-none z-[9999]"
                style={{
                    boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
                }}
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{
                    type: 'spring',
                    damping: 50,
                    stiffness: 1000,
                    mass: 0.1,
                }}
            />

            {/* Ring */}
            <motion.div
                className={`fixed top-0 left-0 border-2 border-cyan/50 rounded-full pointer-events-none z-[9998] transition-all duration-150 ${isHovering ? 'w-12 h-12' : 'w-8 h-8'
                    }`}
                animate={{
                    x: mousePosition.x - (isHovering ? 24 : 16),
                    y: mousePosition.y - (isHovering ? 24 : 16),
                }}
                transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 200,
                    mass: 0.5,
                }}
            />
        </>
    );
}
