'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MotionValue } from 'framer-motion';
import { getOptimalFrameCount, getCanvasResolution } from '@/utils/deviceDetection';

interface UseImageSequenceReturn {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    isLoaded: boolean;
    progress: number;
    currentFrame: number;
    error: string | null;
}

interface UseImageSequenceProps {
    folderPath: string;
    baseFrames: number;
    scrollProgress: MotionValue<number>;
    enabled?: boolean;
}

export function useImageSequence({
    folderPath,
    baseFrames,
    scrollProgress,
    enabled = true,
}: UseImageSequenceProps): UseImageSequenceReturn {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const frameRequestRef = useRef<number | undefined>(undefined);

    const totalFrames = getOptimalFrameCount(baseFrames);

    // Preload all frames
    useEffect(() => {
        if (!enabled) return;

        const loadImages = async () => {
            try {
                const imagePromises: Promise<HTMLImageElement>[] = [];

                for (let i = 1; i <= totalFrames; i++) {
                    const frameNum = String(i).padStart(4, '0');
                    const img = new Image();
                    img.src = `/assets/frames/${folderPath}/frame_${frameNum}.jpg`;

                    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                        img.onload = () => {
                            setProgress((prev) => Math.min(prev + (100 / totalFrames), 100));
                            resolve(img);
                        };
                        img.onerror = () => reject(new Error(`Failed to load frame ${frameNum}`));
                    });

                    imagePromises.push(promise);
                }

                const loadedImages = await Promise.all(imagePromises);
                imagesRef.current = loadedImages;
                setIsLoaded(true);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load images');
                console.error('Image loading error:', err);
            }
        };

        loadImages();
    }, [folderPath, totalFrames, enabled]);

    // Draw frame to canvas with aspect ratio preservation
    const drawFrame = useCallback((img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match container
        const rect = canvas.getBoundingClientRect();
        const resolution = getCanvasResolution();
        canvas.width = rect.width * resolution;
        canvas.height = rect.height * resolution;

        // Calculate aspect ratio
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth: number, drawHeight: number, offsetX = 0, offsetY = 0;

        if (imgRatio > canvasRatio) {
            // Image is wider than canvas
            drawHeight = canvas.height;
            drawWidth = img.width * (canvas.height / img.height);
            offsetX = (canvas.width - drawWidth) / 2;
        } else {
            // Image is taller than canvas
            drawWidth = canvas.width;
            drawHeight = img.height * (canvas.width / img.width);
            offsetY = (canvas.height - drawHeight) / 2;
        }

        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, []);

    // Update frame based on scroll progress
    useEffect(() => {
        if (!isLoaded || !enabled) return;

        const updateFrame = () => {
            const progress = scrollProgress.get();
            const frameIndex = Math.min(
                Math.floor(progress * (totalFrames - 1)),
                totalFrames - 1
            );

            setCurrentFrame(frameIndex);

            const img = imagesRef.current[frameIndex];
            if (img) {
                drawFrame(img);
            }
        };

        // Initial draw
        updateFrame();

        // Subscribe to scroll changes
        const unsubscribe = scrollProgress.on('change', () => {
            if (frameRequestRef.current) {
                cancelAnimationFrame(frameRequestRef.current);
            }
            frameRequestRef.current = requestAnimationFrame(updateFrame);
        });

        return () => {
            unsubscribe();
            if (frameRequestRef.current) {
                cancelAnimationFrame(frameRequestRef.current);
            }
        };
    }, [isLoaded, scrollProgress, totalFrames, drawFrame, enabled]);

    // Handle window resize
    useEffect(() => {
        if (!isLoaded || !enabled) return;

        const handleResize = () => {
            const img = imagesRef.current[currentFrame];
            if (img) {
                drawFrame(img);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, currentFrame, drawFrame, enabled]);

    return {
        canvasRef,
        isLoaded,
        progress,
        currentFrame,
        error,
    };
}
