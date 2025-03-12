import React, { useRef } from 'react';
import { FaUniversity, FaRegClock, FaTh, FaLaptop, FaGraduationCap, 
         FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import styles from './FCIConnectPage.module.css';
import SEO from '../components/SEO/SEO';
import MucosaLogo from '../assets/icons/mucosa-logo.png';
// Import your FCI banner image here
// import FCIBanner from '../assets/images/fci-banner.jpg';

function FCIConnectPage() {
  const quickLinksRef = useRef(null);

  const scrollToQuickLinks = () => {
    quickLinksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.fciConnectPage}>
      {/* SEO Meta Data */}
      <SEO
        title="FCI Connect - Your Gateway to Innovation at FCI"
        description="Discover resources, programs, and opportunities at the Faculty of Computing and Informatics (FCI) - Proudly part of MUCOSA!"
        // url="https://yourwebsite.com/fci-connect"
        image={MucosaLogo}
      />

      <div className={styles.container}>
        {/* Hero Section - Now using gradient instead of background image */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.pageTitle}>FCI Connect</h1>
            <p className={styles.pageDescription}>
              Your Gateway to Innovation at FCI – Proudly part of MUCOSA!
            </p>
            <button 
              onClick={scrollToQuickLinks} 
              className={styles.exploreButton}
              aria-label="Explore FCI resources"
            >
              Explore FCI
            </button>
          </div>
        </section>

        {/* Quick Links Section */}
        <section ref={quickLinksRef} className={styles.quickLinksSection}>
          <h2 className={styles.sectionTitle}>Quick Resources</h2>
          <div className={styles.linksGrid}>
            <a 
              href="https://fci.must.ac.ug/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkItem}
              aria-label="Visit FCI Homepage"
            >
              <div className={styles.iconContainer}>
                <FaUniversity className={styles.icon} />
              </div>
              <span className={styles.linkLabel}>FCI Home</span>
            </a>

            <a 
              href="https://timetable.must.ac.ug/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkItem}
              aria-label="Access FCI Timetable"
            >
              <div className={styles.iconContainer}>
                <FaRegClock className={styles.icon} />
              </div>
              <span className={styles.linkLabel}>Timetable</span>
            </a>

            <a 
              href="https://fci.must.ac.ug/programs" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkItem}
              aria-label="View FCI Programs and Departments"
            >
              <div className={styles.iconContainer}>
                <FaTh className={styles.icon} />
              </div>
              <span className={styles.linkLabel}>Programs</span>
            </a>

            <a 
              href="https://elearning.must.ac.ug/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.linkItem}
              aria-label="Access Online Learning Resources"
            >
              <div className={styles.iconContainer}>
                <FaLaptop className={styles.icon} />
              </div>
              <span className={styles.linkLabel}>E-Learning</span>
            </a>
          </div>
        </section>

        {/* Interactive Engagement Section */}
        <section className={styles.engagementSection}>
          <h2 className={styles.sectionTitle}>Discover FCI</h2>
          <div className={styles.featuresContainer}>
            <div className={styles.featureCard}>
              <h3>Diverse Programs</h3>
              <p>Explore our range of innovative computing and informatics programs designed for the digital future.</p>
              <a 
                href="https://fci.must.ac.ug/programs" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.featureButton}
              >
                View Programs
              </a>
            </div>
            <div className={styles.featureCard}>
              <h3>Student Resources</h3>
              <p>Access learning materials, labs, and support services to enhance your academic journey.</p>
              <a 
                href="https://fci.must.ac.ug/resources" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.featureButton}
              >
                Explore Resources
              </a>
            </div>
            <div className={styles.featureCard}>
              <h3>Research Opportunities</h3>
              <p>Engage with cutting-edge research projects and collaborate with industry partners.</p>
              <a 
                href="https://fci.must.ac.ug/research" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.featureButton}
              >
                Discover Research
              </a>
            </div>
          </div>
        </section>

        {/* Alternative Connect Section (Without Social Media Icons) */}
        <section className={styles.connectSection}>
          <h2 className={styles.sectionTitle}>Get in Touch with FCI</h2>
          
          <div className={styles.contactOptions}>
            <div className={styles.contactCard}>
              <h3>Visit Us</h3>
              <p>Faculty of Computing and Informatics, MUST Campus</p>
              <p>P.O. Box 1, Mbarara, Uganda</p>
            </div>
            
            <div className={styles.contactCard}>
              <h3>Contact Info</h3>
              <p>Email: fci@must.ac.ug</p>
              <p>Phone: +256 414 123456</p>
            </div>
            
            <div className={styles.contactCard}>
              <h3>Office Hours</h3>
              <p>Weekdays: 8:00 AM - 5:00 PM</p>
              <p>Weekend: Closed</p>
            </div>
          </div>
          
          <div className={styles.finalCta}>
            <a 
              href="https://fci.must.ac.ug/contact" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.ctaButton}
              aria-label="Get in touch with FCI"
            >
              Contact FCI
            </a>
            <a 
              href="https://fci.must.ac.ug" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.secondaryCta}
              aria-label="Visit the full FCI website"
            >
              Visit FCI Website
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FCIConnectPage; 