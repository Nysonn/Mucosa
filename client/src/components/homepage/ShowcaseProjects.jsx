import React, { useMemo, useState, useRef, useEffect } from 'react';
import styles from './ShowcaseProjects.module.css';
import { Link } from "react-router-dom";
import PrimaryButton from '../Buttons/PrimaryButton';
import SecondaryButton from '../Buttons/SecondaryButton';
import useProjects from '../../hooks/useProjects';
import ProjectSubmissionModal from '../common/ProjectSubmissionModal';
import ProjectCard from '../ProjectCard/ProjectCard';

function ShowcaseProjects() {
  const { projects, loading, error } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  // Compute three random projects whenever the projects list changes.
  const featuredProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [projects]);

  // Carousel interval logic
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 3000);
  };

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (featuredProjects.length > 0) startInterval();
    return () => stopInterval();
  }, [featuredProjects.length]);

  const handleMouseEnter = () => {
    stopInterval();
  };

  const handleMouseLeave = () => {
    startInterval();
  };

  const handleSubmitProject = async (formData) => {
    try {
      // Implement project submission logic here
      setIsModalOpen(false);
      // Optionally, handle response or show success message
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (featuredProjects.length === 0) return <p>No projects available.</p>;

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
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className={styles.carouselSlide}
              style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ProjectCard {...project} />
            </div>
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
