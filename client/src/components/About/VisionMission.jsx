import React from 'react';
import styles from '../../pages/AboutPage.module.css';

function VisionMission() {
  return (
    <section className={styles.visionMission}>
      <div className={styles.visionSection}>
        <h2>Our Vision</h2>
        <p>
          To be the leading student community that empowers and connects computing
          students, fostering innovation and excellence in technology education.
        </p>
      </div>
      <div className={styles.missionSection}>
        <h2>Our Mission</h2>
        <p>
          To create a vibrant community that enhances learning, promotes
          collaboration, and prepares students for successful careers in technology
          through practical experiences, mentorship, and industry connections.
        </p>
      </div>
    </section>
  );
}

export default VisionMission;
