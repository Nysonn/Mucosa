import React from 'react';
import styles from './ProjectCard.module.css';
import { highlightText } from '../../utils/highlightText';

function ProjectCard({ title, description, image, link, tech, searchQuery }) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <div
          className={styles.projectImage}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={styles.overlay}>
          <div className={styles.links}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Github
            </a>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.projectTitle}>
          {highlightText(title, searchQuery)}
        </h3>
        <p className={styles.projectDescription}>
          {highlightText(description, searchQuery)}
        </p>
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
