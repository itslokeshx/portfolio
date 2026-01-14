// Device capability detection utilities

export const isMobile = (): boolean => {
    if (typeof window === 'undefined') return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const isLowEndDevice = (): boolean => {
    if (typeof window === 'undefined') return false;
    const memory = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    return memory < 4 || cores < 4;
};

export const getOptimalFrameCount = (baseFrames: number): number => {
    if (isMobile()) return Math.floor(baseFrames / 2); // 120 frames for mobile
    if (isLowEndDevice()) return Math.floor(baseFrames * 0.75); // 180 frames for low-end devices
    return baseFrames; // 240 frames for desktop
};

export const getCanvasResolution = (): number => {
    if (isMobile()) return 0.75; // Reduce resolution by 25% on mobile
    return 1; // Full resolution on desktop
};
