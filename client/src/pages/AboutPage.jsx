import React from 'react';
import styles from './AboutPage.module.css';
import VisionMission from '../components/About/VisionMission';
import ImpactMetric from '../components/About/ImpactMetric';
import ContactForm from '../components/About/ContactForm';
import TeamMember from '../components/About/TeamMember';
import { useTeamMembers, useImpactMetrics } from '../hooks/useAboutData';

function AboutPage() {
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

        {/* Vision and Mission Section */}
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
