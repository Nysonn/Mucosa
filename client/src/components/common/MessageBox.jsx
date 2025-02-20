import React from 'react';
import styles from './ProjectSubmissionModal.module.css';

function MessageBox({ type, children }) {
  return (
    <div className={`${styles.messageBox} ${styles[type]}`} role="alert" aria-live="assertive">
      <div className={styles.messageContent}>
        {children}
      </div>
    </div>
  );
}

export default MessageBox;
