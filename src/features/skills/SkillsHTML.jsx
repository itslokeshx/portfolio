"use client";
import styles from "./skills.module.css";

export default function SkillsHTML() {
    return (
        <section id="skills-trigger" className={styles.skillsSection}>
            <div className={styles.content}>
                <h2 className={styles.title}>MY ARSENAL</h2>
                <p className={styles.subtitle}>Drag to stir. Click to inspect.</p>
            </div>
        </section>
    );
}
