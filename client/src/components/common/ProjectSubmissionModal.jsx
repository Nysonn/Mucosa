import React, { useState } from 'react';
import styles from './ProjectSubmissionModal.module.css';

function ProjectSubmissionModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    studentName: '',
    email: '',
    category: '',
    technologies: '',
    githubLink: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.modalTitle}>Submit Your Project</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="studentName"
                placeholder="Student's Name"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="category"
              placeholder="Project Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="technologies"
              placeholder="Technologies Used (comma-separated)"
              value={formData.technologies}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="url"
              name="githubLink"
              placeholder="GitHub Link"
              value={formData.githubLink}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.fileInput}>
              <span>Upload Project Image</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectSubmissionModal;