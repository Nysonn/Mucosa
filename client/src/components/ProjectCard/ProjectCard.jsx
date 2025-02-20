import React from 'react';
import styles from '../../components/homepage/ShowcaseProjects.module.css';

function ProjectCard({ title, description, tech, image, github }) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <div 
          className={styles.projectImage}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={styles.overlay}>
          <div className={styles.links}>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
        <div className={styles.techStack}>
          {tech.map((item, index) => (
            <span key={index} className={styles.techItem}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
