import React, { useState, useEffect, useRef } from 'react';
import styles from './FeaturedNews.module.css';
import useNews from '../../hooks/useNews';
import NewsCard from '../NewsCard/NewsCard';

function FeaturedNews() {
  const { news, loading, error } = useNews();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Map news and add duplicate of first item at the end
  const featuredNews = [
    ...news.map(item => ({
      category: item.category,
      image: item.image,
      excerpt: item.excerpt,
    })),
    // Add first item again at the end
    news[0] && {
      category: news[0].category,
      image: news[0].image,
      excerpt: news[0].excerpt,
    }
  ].filter(Boolean); // Remove undefined if news is empty

  const handleSlideChange = (next) => {
    setIsTransitioning(true);
    setCurrentSlide(next);

    // If we're on the last slide (duplicate), quickly reset to first after transition
    if (next === featuredNews.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 500); // Match this with your transition duration
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      // Only go up to the last non-duplicate slide
      const nextSlide = currentSlide >= featuredNews.length - 2 
        ? 0 
        : currentSlide + 1;
      handleSlideChange(nextSlide);
    }, 3000);
  };

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (featuredNews.length > 0) {
      startInterval();
    }
    return () => stopInterval();
  }, [featuredNews.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    stopInterval();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startInterval();
  };

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (featuredNews.length === 0) return <p>No news available.</p>;

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured News</h2>
          <p className={styles.sectionSubtitle}>
            Stay updated with the latest from our community
          </p>
        </div>
        
        <div className={styles.carousel}>
          <div 
            className={styles.carouselTrack}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transition: isTransitioning ? 'transform 0.5s ease' : 'none'
            }}
          >
            {featuredNews.map((item, index) => (
              <div
                key={index}
                className={styles.carouselSlide}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                <NewsCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.indicators}>
          {/* Only show indicators for original slides (exclude duplicate) */}
          {featuredNews.slice(0, -1).map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => handleSlideChange(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedNews;
