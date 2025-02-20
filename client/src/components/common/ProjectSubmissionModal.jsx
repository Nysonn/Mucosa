import React, { useState, useEffect, useRef } from 'react';
import styles from './ProjectSubmissionModal.module.css';

/**
 * ProjectSubmissionModal Component
 *
 * Renders a modal dialog for project submissions.
 * This updated version enhances accessibility and code clarity.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Indicates if the modal is currently open.
 * @param {function} props.onClose - Callback to be invoked when the modal should close.
 * @param {function} props.onSubmit - Callback to handle the submission of project data.
 */
function ProjectSubmissionModal({ isOpen, onClose, onSubmit }) {
  const [isClosing, setIsClosing] = useState(false);
  const [message, setMessage] = useState(null);
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
  
  // Refs for managing focus within the modal
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Set focus on the first input field when the modal opens.
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // Listen for 'Escape' key press to close the modal for accessibility.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Clear any messages when the modal is closed.
  useEffect(() => {
    if (!isOpen) {
      setMessage(null);
    }
  }, [isOpen]);

  /**
   * Handles changes for both text and file inputs.
   *
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /**
   * Initiates the closing animation and then calls the provided onClose callback.
   */
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      // Optionally reset the form when closing.
      clearForm();
    }, 300); // Duration should match the CSS animation duration.
  };

  /**
   * Resets the form data to its initial state.
   */
  const clearForm = () => {
    setFormData({
      title: '',
      studentName: '',
      email: '',
      category: '',
      technologies: '',
      githubLink: '',
      description: '',
      image: null,
    });
  };

  /**
   * Handles form submission by calling the provided onSubmit callback.
   * Displays success or error messages accordingly.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setMessage({
        type: 'success',
        text: 'Project submitted successfully! 🎉',
      });
      // Clear form and close the modal after a short delay.
      setTimeout(() => {
        clearForm();
        handleClose();
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to submit project. Please try again.',
      });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  // Render nothing if the modal is not open.
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}
        aria-hidden={!isOpen}
      >
        <div
          ref={modalRef}
          className={`${styles.modal} ${isClosing ? styles.closing : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
          <h2 id="modal-title" className={styles.modalTitle}>
            Submit Your Project
          </h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                ref={firstInputRef}
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
      
      {message && (
        <div
          className={`${styles.message} ${styles[message.type]}`}
          role="alert"
          aria-live="assertive"
        >
          {message.type === 'success' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12" y2="16" />
            </svg>
          )}
          {message.text}
        </div>
      )}
    </>
  );
}

export default ProjectSubmissionModal;
