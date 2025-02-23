import React, { useState, useEffect, useRef } from 'react';
import styles from './FeaturedNews.module.css';
import useNews from '../../hooks/useNews';
import NewsCard from '../NewsCard/NewsCard';

function FeaturedNews() {
  const { news, loading, error } = useNews();
  // Start with the first real slide (index 1)
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Create extended slides with a clone of the last slide at the beginning and a clone of the first slide at the end
  const extendedNews = [];
  if (news.length > 0) {
    // Clone of the last slide
    extendedNews.push({
      category: news[news.length - 1].category,
      image: news[news.length - 1].image,
      excerpt: news[news.length - 1].excerpt,
    });
    // Original news slides
    news.forEach(item => {
      extendedNews.push({
        category: item.category,
        image: item.image,
        excerpt: item.excerpt,
      });
    });
    // Clone of the first slide
    extendedNews.push({
      category: news[0].category,
      image: news[0].image,
      excerpt: news[0].excerpt,
    });
  }

  // Function to change slides
  const handleSlideChange = (next) => {
    setCurrentSlide(next);
    setIsTransitioning(true);
  };

  // Automatic slide change interval
  const startInterval = () => {
    stopInterval(); // Clear any existing interval first
    intervalRef.current = setInterval(() => {
      // Increment the slide index
      setCurrentSlide(prev => prev + 1);
      setIsTransitioning(true);
    }, 3000);
  };

  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (extendedNews.length > 0 && !isHovered) {
      startInterval();
    }
    return () => stopInterval();
  }, [extendedNews.length, isHovered]);

  // Adjust the slide index once the transition ends to create a seamless loop
  const handleTransitionEnd = () => {
    // If on the clone of the first slide, jump to the first real slide
    if (currentSlide === extendedNews.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    }
    // If on the clone of the last slide, jump to the last real slide
    else if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(extendedNews.length - 2);
    }
  };

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
  if (extendedNews.length === 0) return <p>No news available.</p>;

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
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s ease' : 'none',
            }}
          >
            {extendedNews.map((item, index) => (
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
          {/* Render indicators for only the original slides */}
          {news.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${currentSlide === index + 1 ? styles.active : ''}`}
              onClick={() => handleSlideChange(index + 1)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedNews;
