import { useState, useEffect, useRef } from 'react';
import styles from './AboutPage.module.css';
import ActiveMembers from '../../src/assets/icons/active-members.png';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import PrimaryButton from '../../src/components/Buttons/PrimaryButton';
import { useTeamMembers, useImpactMetrics, useContactForm } from '../hooks/useAboutData';

/**
 * Vision and Mission component with static data from the frontend.
 */
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

/**
 * AnimatedNumber component remains unchanged.
 */
function AnimatedNumber({ value, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null); // Use useRef to hold the DOM element
  const startValue = parseInt(value.replace('+', '')); // Clean number from string
  const [isVisible, setIsVisible] = useState(false);

  // Use useEffect to observe when the element comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Optional: disconnect once visible
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  // Use useEffect to animate the number once visible
  useEffect(() => {
    if (!isVisible) return;

    const end = startValue;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const intervalId = setInterval(() => {
      setCount((prev) => {
        if (prev < end) {
          return prev + 1;
        } else {
          clearInterval(intervalId);
          return prev;
        }
      });
    }, stepTime);

    return () => clearInterval(intervalId);
  }, [startValue, duration, isVisible]);

  return <span ref={elementRef}>{count}+</span>;
}

/**
 * ImpactMetric component for displaying a single metric.
 */
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

/**
 * Updated ContactForm component with enhanced message handling
 */
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
      
      // For success: clear form and hide message after delay
      if (status === 'success') {
        const messageTimer = setTimeout(() => {
          setShowMessage(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
        
        return () => clearTimeout(messageTimer);
      }
      
      // For error: just hide message after delay
      if (status === 'error') {
        const messageTimer = setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        
        return () => clearTimeout(messageTimer);
      }
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
          rows={5}
        />
      </div>
      <PrimaryButton 
        type="submit" 
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
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

/**
 * TeamMember component to display an individual team member.
 */
function TeamMember({ name, role, image, bio, socials }) {
  return (
    <div className={styles.teamMember}>
      <div className={styles.memberImage}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.memberInfo}>
        <h3 className={styles.memberName}>{name}</h3>
        <p className={styles.memberRole}>{role}</p>
        <p className={styles.memberBio}>{bio}</p>
        <div className={styles.socialLinks}>
          {socials.map((social, index) => {
            let IconComponent;
            switch (social.platform.toLowerCase()) {
              case 'linkedin':
                IconComponent = FaLinkedin;
                break;
              case 'twitter':
                IconComponent = FaTwitter;
                break;
              case 'github':
                IconComponent = FaGithub;
                break;
              default:
                IconComponent = null;
            }
            return (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {IconComponent && <IconComponent className={styles.socialIcon} />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * AboutPage component integrating data from the backend using custom hooks.
 * Vision and Mission data is static and provided from the frontend.
 */
function AboutPage() {
  // Use our custom hooks to fetch team members, impact metrics, and handle contact form.
  const { teamMembers, loading: teamLoading, error: teamError } = useTeamMembers();
  const { impactMetrics, loading: metricsLoading, error: metricsError } = useImpactMetrics();

  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>About MUCOSA</h1>
          <p className={styles.pageDescription}>
            Learn about our community, mission, and the people behind MUCOSA.
          </p>
        </header>

        {/* Vision and Mission Section (static from frontend) */}
        <VisionMission />

        {/* Team Members Section */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          {teamLoading ? (
            <p>Loading team members...</p>
          ) : teamError ? (
            <p>Error loading team members: {teamError.message}</p>
          ) : (
            <div className={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          )}
        </section>

        {/* Impact Metrics Section */}
        <section className={styles.impactSection}>
          <h2 className={styles.sectionTitle}>Our Impact</h2>
          {metricsLoading ? (
            <p>Loading impact metrics...</p>
          ) : metricsError ? (
            <p>Error loading impact metrics: {metricsError.message}</p>
          ) : (
            <div className={styles.metricsGrid}>
              {impactMetrics.map((metric, index) => (
                <ImpactMetric key={index} {...metric} />
              ))}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <div className={styles.contactContainer}>
            <div className={styles.contactInfo}>
              <h3>Contact Information</h3>
              <p>Have questions or want to get involved? Reach out to us!</p>
              <div className={styles.contactDetails}>
                <p>
                  <strong>Email:</strong> info@mucosa.org
                </p>
                <p>
                  <strong>Location:</strong> Faculty of Computing and Informatics, Mbarara University of Science and Technology
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
