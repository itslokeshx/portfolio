"use client";
import styles from './projects.module.css';
import { projects } from './data';

export default function ProjectsHTML() {
    return (
        <section id="projects-trigger" className={styles.projectsSection}>
            <div className={styles.stickyHeader}>
                <h2>SELECTED WORKS</h2>
                <p>Real-world applications built with MERN Stack</p>
            </div>

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
        </section>
    );
}
