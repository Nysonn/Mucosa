import React from 'react';
import styles from './AboutPage.module.css';
import AnimatedNumber from './AnimatedNumber';

function ImpactMetric({ number, label, icon }) {
  return (
    <div className={styles.metric}>
      <div className={styles.metricContent}>
        <div className={styles.metricIcon}>
          <img src={icon || ActiveMembers} alt={label} />
        </div>
        <div className={styles.metricNumber}>
          <AnimatedNumber value={number} />
        </div>
        <div className={styles.metricLabel}>{label}</div>
      </div>
    </div>
  );
}

export default ImpactMetric;
