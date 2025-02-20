import React, { useMemo, useState } from 'react';
import styles from './ShowcaseProjects.module.css';
import { Link } from "react-router-dom";
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import useProjects from '../../hooks/useProjects';
import ProjectSubmissionModal from '../common/ProjectSubmissionModal';
import ProjectCard from '../ProjectCard/ProjectCard';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute three random projects whenever the projects list changes.
  const randomProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    // Shuffle a copy of the projects array and pick the first three.
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [projects]);

  const handleSubmitProject = async (formData) => {
    try {
      // Here you would implement the logic to send the data to your backend
      // For example:
      // const response = await fetch('/api/projects', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      setIsModalOpen(false);
      // Show success message or handle response
    } catch (error) {
      console.error('Error submitting project:', error);
      // Handle error appropriately
    }
  };

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
          <PrimaryButton onClick={() => setIsModalOpen(true)}>
            Submit Your Project
          </PrimaryButton>
          <Link to="/projects">
            <SecondaryButton>
              View All Projects
            </SecondaryButton>
          </Link>
        </div>
      </div>

      <ProjectSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitProject}
      />
    </section>
  );
}

export default ShowcaseProjects;
