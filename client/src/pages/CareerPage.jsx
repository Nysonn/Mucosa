import React, { useState } from 'react';
import styles from './CareerPage.module.css';
import { useRoadmapData, useJobsData, useResourcesData } from '../hooks/useCareerData';
import RoadmapSection from '../components/Career/RoadmapSection';
import JobCard from '../components/Career/JobCard';
import ResourceCard from '../components/Career/ResourceCard';
import SEO from '../components/SEO/SEO';
import MucosaLogo from '../assets/icons/mucosa-logo.png';

function CareerPage() {
  const [activeTab, setActiveTab] = useState('roadmap');

  // Fetch data using custom hooks
  const { roadmapData, loading: loadingRoadmap, error: errorRoadmap } = useRoadmapData();
  const { jobs, loading: loadingJobs, error: errorJobs } = useJobsData();
  const { resources, loading: loadingResources, error: errorResources } = useResourcesData();

  return (
    <div className={styles.careerPage}>
      {/* SEO Meta Data */}
      <SEO
        title="Career Development - Explore Career Paths and Opportunities"
        description="Explore career paths, find job opportunities, and access resources to help you succeed in your professional journey."
        // url="https://yourwebsite.com/career"
        image={MucosaLogo}
      />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Career Development</h1>
          <p className={styles.pageDescription}>
            Explore career paths, find opportunities, and access resources to help you succeed.
          </p>
        </header>

        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tab} ${activeTab === 'roadmap' ? styles.active : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            Career Roadmap
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'jobs' ? styles.active : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Opportunities
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'resources' ? styles.active : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'roadmap' && (
            <div className={styles.roadmapContent}>
              {loadingRoadmap && <p>Loading roadmap...</p>}
              {errorRoadmap && <p>Error loading roadmap: {errorRoadmap.message}</p>}
              {roadmapData && Object.entries(roadmapData).map(([category, items]) => (
                <RoadmapSection key={category} title={category} items={items} />
              ))}
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className={styles.jobsContent}>
              {loadingJobs && <p>Loading jobs...</p>}
              {errorJobs && <p>Error loading jobs: {errorJobs.message}</p>}
              {jobs && jobs.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className={styles.resourcesContent}>
              {loadingResources && <p>Loading resources...</p>}
              {errorResources && <p>Error loading resources: {errorResources.message}</p>}
              {resources && resources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CareerPage;
