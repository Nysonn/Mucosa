import React from 'react';
import styles from '../../pages/CareerPage.module.css';

const ResourceCard = ({ title, description, link, icon }) => {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.resourceCard}
    >
      <div className={styles.resourceIcon}>
        <img src={icon || JsIcon} alt={title} />
      </div>
      <h3 className={styles.resourceTitle}>{title}</h3>
      <p className={styles.resourceDescription}>{description}</p>
    </a>
  );
};

export default ResourceCard;
