// ProjectSubmissionForm.jsx
import React from 'react';
import styles from './ProjectSubmissionModal.module.css';

function ProjectSubmissionForm({
  formData,
  handleChange,
  handleSubmit,
  imagePreview,
  status,
  isSending
}) {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Project Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter project title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="studentName">Student's Name</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            placeholder="Enter your name"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category">Project Category</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter project category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="technologies">Technologies Used</label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          placeholder="e.g., React, Node.js, CSS"
          value={formData.technologies}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="githubLink">GitHub Link</label>
        <input
          type="url"
          id="githubLink"
          name="githubLink"
          placeholder="Enter GitHub URL"
          value={formData.githubLink}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Project Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe your project"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.fileInput}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>{imagePreview ? 'Change Image' : 'Upload Project Image'}</span>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>
        {imagePreview && (
          <div className={styles.filePreview}>
            <img src={imagePreview.url} alt="Preview" />
            <div className={styles.filePreviewName}>{imagePreview.name}</div>
          </div>
        )}
      </div>

      <button type="submit" className={styles.submitButton} disabled={isSending}>
        {isSending ? 'Submitting...' : 'Submit Project'}
      </button>
    </form>
  );
}

export default ProjectSubmissionForm;
