import React from 'react';
import styles from '../../pages/CareerPage.module.css';

const RoadmapSection = ({ title, items }) => {
  return (
    <div className={styles.roadmapSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.roadmapGrid}>
        {items.map((item, index) => (
          <div key={index} className={styles.roadmapItem}>
            <div className={styles.roadmapIcon}>
              <img src={item.icon || frontendImage} alt={item.title} />
            </div>
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemDescription}>{item.description}</p>
            {item.skills && (
              <div className={styles.skillsList}>
                {item.skills.map((skill, idx) => (
                  <span key={idx} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapSection;
