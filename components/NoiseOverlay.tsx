'use client';

import { useEffect, useRef } from 'react';

export default function NoiseOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = 512;
        canvas.height = 512;

        // Generate noise texture
        const imageData = ctx.createImageData(512, 512);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;     // R
            data[i + 1] = value; // G
            data[i + 2] = value; // B
            data[i + 3] = 255;   // A
        }

        ctx.putImageData(imageData, 0, 0);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[9997] opacity-[0.03] mix-blend-overlay"
            style={{
                imageRendering: 'pixelated',
            }}
        />
    );
}
