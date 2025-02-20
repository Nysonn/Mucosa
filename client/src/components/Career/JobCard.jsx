import React, { useState } from 'react';
import styles from '../../pages/CareerPage.module.css';

const JobCard = ({ title, company, location, type, description, requirements, link }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <h3 className={styles.jobTitle}>{title}</h3>
        <div className={styles.jobMeta}>
          <span className={styles.company}>{company}</span>
          <span className={styles.location}>{location}</span>
          <span className={styles.jobType}>{type}</span>
        </div>
      </div>
      <p className={styles.jobDescription}>
        {isExpanded ? description : `${description.slice(0, 150)}...`}
      </p>
      {!isExpanded && (
        <button 
          className={styles.expandButton}
          onClick={() => setIsExpanded(true)}
        >
          Read More
        </button>
      )}
      {isExpanded && (
        <>
          <div className={styles.requirements}>
            <h4>Requirements:</h4>
            <ul>
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.applyButton}
          >
            Apply Now
          </a>
        </>
      )}
    </div>
  );
};

export default JobCard;
