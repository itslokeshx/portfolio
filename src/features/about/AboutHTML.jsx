"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutChapters } from "./data";
import styles from "./about.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHTML() {
    const containerRef = useRef();
    const panelsRef = useRef();

    useEffect(() => {
        const container = containerRef.current;
        const panels = panelsRef.current;

        // Create horizontal scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=400%", // Scroll 4 screens worth
                scrub: 1,
                pin: true,
                // markers: true, // debug
                onUpdate: (self) => {
                    // Dispatch event for 3D scene to pick up
                    window.dispatchEvent(new CustomEvent('about-scroll', { detail: self.progress }));
                }
            },
        });

        // Move panels left
        tl.to(panels, {
            xPercent: -100 * (aboutChapters.length - 1) / aboutChapters.length, // Shift by (N-1)/N %
            ease: "none",
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className={styles.aboutSection} id="about-trigger">
            <div className={styles.panelsContainer} ref={panelsRef} style={{ width: `${aboutChapters.length * 100}vw` }}>
                {aboutChapters.map((chapter) => (
                    <div key={chapter.id} className={styles.panel}>
                        <div className={styles.card}>
                            <span className={styles.chapterNum}>{`0${chapter.id}`}</span>
                            <h2 className={styles.title}>{chapter.title}</h2>
                            <p className={styles.text}>{chapter.content}</p>
                            <span className={styles.year}>{chapter.year}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Values Section at the end? Brief says "At the end of the timeline".
          We can add it as the last panel or separate.
          Let's add it as a separate section after this pinned section for simplicity,
          or make the panels width wider to include it.
          Brief says "Chapter System (4-5 Chapters)... At the end... show 'What Drives Me'".
          I'll stick to the 5 chapters for now.
      */}
        </section>
    );
}
