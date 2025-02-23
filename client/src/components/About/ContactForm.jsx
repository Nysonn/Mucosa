import React, { useState, useEffect } from 'react';
import styles from '../../pages/AboutPage.module.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useContactForm } from '../../hooks/useAboutData';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { status, submitForm } = useContactForm();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setShowMessage(true);
      
      const timer = setTimeout(() => {
        setShowMessage(false);
        if (status === 'success') {
          setFormData({ name: '', email: '', subject: '', message: '' });
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use await with mutateAsync so that status updates to 'loading' properly.
    await submitForm(formData);
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
        />
      </div>
      <PrimaryButton 
          type="submit" 
          disabled={status === 'loading'}
      >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
      </PrimaryButton>
      
      {showMessage && status === 'success' && (
        <div className={`${styles.messageBox} ${styles.successBox}`}>
          <div className={styles.messageContent}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <p>Thank you for your message! We'll get back to you soon.</p>
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
            <p>Oops! Something went wrong. Please try again.</p>
          </div>
        </div>
      )}
    </form>
  );
}

export default ContactForm;
