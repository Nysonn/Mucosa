import React, { useMemo } from 'react';
import styles from './ShowcaseProjects.module.css';
import { Link } from "react-router-dom";
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import useProjects from '../../hooks/useProjects';

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
              <a href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
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

function ShowcaseProjects() {
  const { projects, loading, error } = useProjects();

  // Compute three random projects whenever the projects list changes.
  const randomProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    // Shuffle a copy of the projects array and pick the first three.
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [projects]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className={styles.showcaseSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Project Showcase</h2>
          <p className={styles.subtitle}>
            Discover innovative projects built by our community members
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {randomProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className={styles.cta}>
          <Link to="#">
            <PrimaryButton>
              Submit Your Project
            </PrimaryButton>
          </Link>
          <Link to="/projects">
            <SecondaryButton>
              View All Projects
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ShowcaseProjects;
