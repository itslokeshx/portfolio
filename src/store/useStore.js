import { create } from 'zustand';

const useStore = create((set) => ({
    // Loading State
    loaded: false,
    setLoaded: (status) => set({ loaded: status }),

    // Interaction State
    soundEnabled: false,
    setSoundEnabled: (status) => set({ soundEnabled: status }),

    // Navigation
    currentSection: 0,
    setCurrentSection: (index) => set({ currentSection: index }),
}));

export default useStore;
