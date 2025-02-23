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

  // Map news and add duplicate of first item at the end for smooth looping
  const featuredNews = [
    ...news.map(item => ({
      category: item.category,
      image: item.image,
      excerpt: item.excerpt,
    })),
    news[0] && {
      category: news[0].category,
      image: news[0].image,
      excerpt: news[0].excerpt,
    }
  ].filter(Boolean);

  const handleSlideChange = (next) => {
    setIsTransitioning(true);
    setCurrentSlide(next);

    // If moving to the duplicate slide, reset to the first slide after transition.
    if (next === featuredNews.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 500); // Match transition duration.
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      // Use functional update to always get the latest state.
      setCurrentSlide(prevSlide => {
        let nextSlide;
        if (prevSlide === featuredNews.length - 2) {
          // Move to duplicate slide.
          nextSlide = featuredNews.length - 1;
        } else if (prevSlide === featuredNews.length - 1) {
          // Safety fallback: reset to start.
          nextSlide = 0;
        } else {
          nextSlide = prevSlide + 1;
        }
        // Trigger transition effect.
        setIsTransitioning(true);
        // Clear transition state after duration.
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
        return nextSlide;
      });
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
              transition: isTransitioning ? 'transform 0.5s ease' : 'none',
              transform: `translateX(${ -currentSlide * 100 }%)`
            }}
          >
            {featuredNews.map((item, index) => (
              <div
                key={index}
                className={styles.carouselSlide}
              >
                <NewsCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.indicators}>
          {/* Only show indicators for the original slides (exclude duplicate) */}
          {featuredNews.slice(0, -1).map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentSlide || 
                (currentSlide === featuredNews.length - 1 && index === 0)
                  ? styles.active
                  : ''
              }`}
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
