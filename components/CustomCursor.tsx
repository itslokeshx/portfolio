'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Spring animation for smooth cursor movement
    const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

    // Delayed ring position for lag effect
    const ringX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const ringY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            ringX.set(e.clientX);
            ringY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.getAttribute('role') === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')
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
    }, [cursorX, cursorY, ringX, ringY]);

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-[2px] h-[2px] bg-cyan rounded-full pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-1px',
                    translateY: '-1px',
                    boxShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
                }}
            />

            {/* Cursor ring with lag effect */}
            <motion.div
                className="fixed top-0 left-0 border-2 border-cyan/50 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: isHovering ? '-6px' : '-4px',
                    translateY: isHovering ? '-6px' : '-4px',
                }}
                animate={{
                    width: isHovering ? '12px' : '8px',
                    height: isHovering ? '12px' : '8px',
                    borderColor: isHovering ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 240, 255, 0.5)',
                    boxShadow: isHovering
                        ? '0 0 20px rgba(0, 240, 255, 0.8)'
                        : '0 0 10px rgba(0, 240, 255, 0.4)',
                }}
                transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                }}
            />
        </>
    );
}
