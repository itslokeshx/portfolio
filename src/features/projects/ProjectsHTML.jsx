"use client";
import { useState } from 'react';
import styles from './projects.module.css';
import { projects, categorizedProjects } from './data';

export default function ProjectsHTML() {
    return (
        <section id="projects-trigger" className={styles.projectsSection}>
            <div className={styles.stickyHeader}>
                <h2>FEATURED WORKS</h2>
                <p>Selected high-impact applications</p>
            </div>

            {/* Featured Projects Grid */}
            <div className={styles.projectsGrid}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.projectTitle}>{project.title}</h3>
                            <span className={styles.projectRole}>{project.role}</span>
                        </div>

                        <p className={styles.projectDesc}>{project.description}</p>

                        <div className={styles.techStack}>
                            {project.tech.map((tech, i) => (
                                <span key={i} className={styles.techBadge}>{tech}</span>
                            ))}
                        </div>

                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.projectLink}
                            >
                                View on GitHub →
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* More Projects Section - Categorized */}
            <div className={styles.moreProjectsSection}>
                <div className={styles.stickyHeader}>
                    <h2>MORE PROJECTS</h2>
                    <p>Archive by Language & Technology</p>
                </div>

                <div className={styles.accordionContainer}>
                    {Object.entries(categorizedProjects).map(([category, items]) => (
                        <AccordionItem key={category} title={category} items={items} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AccordionItem({ title, items }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
            <button
                className={styles.accordionHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={styles.accordionTitle}>{title}</span>
                <span className={styles.accordionIcon}>{isOpen ? '−' : '+'}</span>
            </button>

            <div className={styles.accordionContent}>
                <div className={styles.accordionInner}>
                    {items.map((project, i) => (
                        <a
                            key={i}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.miniProjectRow}
                        >
                            <span className={styles.miniTitle}>{project.name}</span>
                            <span className={styles.miniDesc}>{project.desc}</span>
                            <span className={styles.miniArrow}>↗</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
