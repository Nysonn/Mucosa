import { useState, useRef, useEffect } from 'react';
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
        loading="lazy"
      />
    </a>
  );
}

function ProudPartners() {
  const { partners, loading, error } = usePartners();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  // Handle automatic scrolling
  useEffect(() => {
    if (!isAnimating || isDragging) return;

    const resetScroll = () => {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = 'translateX(0)';
        // Force reflow
        trackRef.current.offsetHeight;
        trackRef.current.style.transition = 'transform 20s linear';
        trackRef.current.style.transform = 'translateX(-50%)';
      }
    };

    resetScroll();
    const interval = setInterval(resetScroll, 20000);

    return () => clearInterval(interval);
  }, [isAnimating, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAnimating(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsAnimating(false);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${walk}px)`;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${walk}px)`;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsAnimating(true), 100);
  };

  const duplicatedPartners = partners ? [...partners, ...partners] : [];

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
        
        {/* Grid view for desktop */}
        <div className={styles.logosGrid}>
          {!loading && !error && partners.map((partner, index) => (
            <PartnerLogo key={`grid-${index}`} {...partner} />
          ))}
        </div>

        {/* Carousel view for mobile */}
        <div 
          ref={carouselRef}
          className={styles.carouselContainer}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchEnd={handleDragEnd}
        >
          <div 
            ref={trackRef}
            className={`${styles.carouselTrack} ${isDragging ? styles.dragging : ''} ${isAnimating ? styles.animating : ''}`}
          >
            {!loading && !error && duplicatedPartners.map((partner, index) => (
              <PartnerLogo key={`carousel-${index}`} {...partner} />
            ))}
          </div>
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
