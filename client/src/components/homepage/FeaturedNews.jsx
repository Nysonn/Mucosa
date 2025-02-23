import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './FeaturedNews.module.css';
import useNews from '../../hooks/useNews';
import NewsCard from '../NewsCard/NewsCard';

// Helper function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = array.slice(); // Create a shallow copy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function FeaturedNews() {
  const { news, loading, error } = useNews();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Compute six random featured news items when the news data changes.
  const featuredNews = useMemo(() => {
    if (!news || news.length === 0) return [];
    // Shuffle the fetched news and take the first six items.
    const selectedNews = shuffleArray(news).slice(0, 6);
    // Map to include only the necessary properties.
    return selectedNews.map(item => ({
      category: item.category,
      image: item.image,
      excerpt: item.excerpt,
    }));
  }, [news]);

  // Starts the carousel auto-slide interval.
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredNews.length);
    }, 3000);
  };

  // Clears the carousel auto-slide interval.
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
          {featuredNews.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedNews;
