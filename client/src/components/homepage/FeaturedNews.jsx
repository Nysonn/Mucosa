import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './FeaturedNews.module.css';
import useNews from '../../hooks/useNews';
import NewsCard from '../NewsCard/NewsCard';

function FeaturedNews() {
  const { news, loading, error } = useNews();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const transitioningRef = useRef(false); // Avoid unnecessary re-renders

  // Memoize featured news
  const featuredNews = useMemo(() => {
    if (news.length === 0) return [];
    return [...news, news[0]]; // Add first item at the end for smooth looping
  }, [news]);

  const handleSlideChange = (next) => {
    if (transitioningRef.current) return; // Prevent multiple calls during transition
    transitioningRef.current = true;
    setCurrentSlide(next);

    if (next === featuredNews.length - 1) {
      setTimeout(() => {
        transitioningRef.current = false;
        setCurrentSlide(0);
      }, 500);
    } else {
      setTimeout(() => {
        transitioningRef.current = false;
      }, 500);
    }
  };

  const startInterval = () => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % featuredNews.length);
    }, 3000);
  };

  const stopInterval = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (featuredNews.length > 1 && !isHovered) {
      startInterval();
    }
    return stopInterval;
  }, [featuredNews.length, isHovered]);

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

        <div
          className={styles.carousel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`${styles.carouselTrack} ${transitioningRef.current ? styles.transitioning : ''}`}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredNews.map((item, index) => (
              <div key={index} className={styles.carouselSlide}>
                <NewsCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.indicators}>
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
