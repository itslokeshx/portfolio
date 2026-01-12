"use client";
import styles from "./skills.module.css";
import { skills } from "./data";

export default function SkillsHTML() {
    const categories = {
        Frontend: skills.filter(s => s.category === 'Frontend'),
        Backend: skills.filter(s => s.category === 'Backend'),
        Tools: skills.filter(s => s.category === 'Tools')
    };

    return (
        <section id="skills-trigger" className={styles.skillsSection}>
            <div className={styles.stickyHeader}>
                <h2>MY ARSENAL</h2>
                <p>Technologies I use to build modern web applications</p>
            </div>

            <div className={styles.skillsContainer}>
                {Object.entries(categories).map(([category, categorySkills]) => (
                    <div key={category} className={styles.categorySection}>
                        <h3 className={styles.categoryTitle}>{category}</h3>
                        <div className={styles.skillsGrid}>
                            {categorySkills.map((skill) => (
                                <div key={skill.name} className={styles.skillCard}>
                                    <div
                                        className={styles.skillIcon}
                                        style={{
                                            backgroundColor: `${skill.color}20`,
                                            borderColor: skill.color
                                        }}
                                    >
                                        <div
                                            className={styles.skillDot}
                                            style={{ backgroundColor: skill.color }}
                                        />
                                    </div>
                                    <div className={styles.skillInfo}>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <span className={styles.skillLevel}>{skill.level}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
