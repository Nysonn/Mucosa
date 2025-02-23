import React, { useState, useEffect, useRef } from 'react';
import ModalContainer from './ModalContainer';
import ProjectSubmissionForm from './ProjectSubmissionForm';
import useSubmitProject from '../../hooks/useSubmitProject';
import styles from './ProjectSubmissionModal.module.css';

function ProjectSubmissionModal({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({ /* initial state */ });
  const [imagePreview, setImagePreview] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const { status, submitProject } = useSubmitProject();
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) firstInputRef.current.focus();
  }, [isOpen]);

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview({ url: reader.result, name: file.name });
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const clearForm = () => {
    setFormData({ /* reset state */ });
    setImagePreview(null);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitProject(formData);
  };

  return (
    <ModalContainer isOpen={isOpen} isClosing={isClosing} onClose={handleClose}>
      <h2 ref={firstInputRef} id="modal-title" className={styles.modalTitle}>
        Submit Your Project
      </h2>
      <ProjectSubmissionForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        imagePreview={imagePreview}
        status={status}
        isSending={status === 'loading'}
      />
      {showMessage && status === 'success' && (
        <div className={`${styles.messageBox} ${styles.successBox}`}>
          <div className={styles.messageContent}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <p>Project submitted successfully! 🎉</p>
          </div>
        </div>
      )}
      {showMessage && status === 'error' && (
        <div className={`${styles.messageBox} ${styles.errorBox}`}>
          <div className={styles.messageContent}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p>Failed to submit project. Please try again.</p>
          </div>
        </div>
      )}
    </ModalContainer>
  );
}

export default ProjectSubmissionModal;
