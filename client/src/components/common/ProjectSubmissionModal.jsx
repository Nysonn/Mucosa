import React, { useState, useEffect, useRef } from 'react';
import styles from './ProjectSubmissionModal.module.css';
import useSubmitProject from '../../hooks/useSubmitProject';

/**
 * ProjectSubmissionModal Component
 *
 * Renders a modal for submitting project details.
 * Utilizes a custom hook to send data to the backend and mirrors the pattern of the working contact form.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Callback to close the modal.
 */
function ProjectSubmissionModal({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
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
  const [showMessage, setShowMessage] = useState(false);
  const { status, submitProject } = useSubmitProject();

  // Refs for focus management (accessibility)
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Focus the first input when the modal opens.
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // Close the modal on Escape key press.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Show feedback messages when status changes.
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        if (status === 'success') {
          clearForm();
          handleClose();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /**
   * Handles input changes (both text and file inputs).
   * @param {Event} e - The change event.
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview({
          url: reader.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /**
   * Clears the form data.
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
    setImagePreview(null);
  };

  /**
   * Initiates the closing animation and triggers the onClose callback.
   */
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // This should match the CSS animation duration.
  };

  /**
   * Handles form submission by delegating to the custom hook.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitProject(formData);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}>
        <div className={`${styles.modal} ${isClosing ? styles.closing : ''}`}>
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

            <div className={styles.formRow}>
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

            <button type="submit" className={styles.submitButton} disabled={status === 'sending'}>
              {status === 'sending' ? 'Submitting...' : 'Submit Project'}
            </button>
          </form>

          {showMessage && status === 'success' && (
            <div className={`${styles.messageBox} ${styles.successBox}`} role="alert" aria-live="assertive">
              <div className={styles.messageContent}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <p>Project submitted successfully! 🎉</p>
              </div>
            </div>
          )}

          {showMessage && status === 'error' && (
            <div className={`${styles.messageBox} ${styles.errorBox}`} role="alert" aria-live="assertive">
              <div className={styles.messageContent}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <p>Failed to submit project. Please try again.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectSubmissionModal;
