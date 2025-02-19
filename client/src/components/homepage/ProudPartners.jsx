import styles from './ProudPartners.module.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { Link } from "react-router-dom";
import { usePartners } from '../../hooks/usePartners'; 

function PartnerLogo({ name, logo, website }) {
  return (
    <a 
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.partnerLogo}
    >
      <div 
        className={styles.logo}
        style={{ backgroundImage: `url(${logo})` }}
        title={name}
      />
    </a>
  );
}

function ProudPartners() {
  // Use the custom hook to fetch partners data
  const { partners, loading, error } = usePartners();

  return (
    <section className={styles.partnersSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Proud Partners</h2>
          <p className={styles.subtitle}>
            Working together with industry leaders to empower the next generation of tech innovators
          </p>
        </div>

        {/* Display loading or error messages */}
        {loading && <p>Loading partners...</p>}
        {error && <p>Error: {error.message}</p>}
        
        <div className={styles.logosGrid}>
          {!loading && !error && partners.map((partner, index) => (
            <PartnerLogo key={index} {...partner} />
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Interested in partnering with MUCOSA?
          </p>
          <Link to="/about">
              <PrimaryButton>
                Become a Partner
              </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProudPartners;
