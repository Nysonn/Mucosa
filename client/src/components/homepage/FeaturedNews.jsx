import React, { useState, useEffect, useRef } from 'react';
import styles from './FeaturedNews.module.css';
import useNews from '../../hooks/useNews';
import NewsCard from '../NewsCard/NewsCard';

function FeaturedNews() {
  const { news, loading, error } = useNews();
  // State to track the current slide index.
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to control whether the transition should be animated.
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  // Refs for the interval and the carousel track.
  const intervalRef = useRef(null);
  const trackRef = useRef(null);

  // Map the news items to only the properties needed.
  const featuredNews = news.map(item => ({
    category: item.category,
    image: item.image,
    excerpt: item.excerpt,
  }));

  // Create a slides array by appending a clone of the first slide.
  const slides = featuredNews.length > 0 ? [...featuredNews, featuredNews[0]] : [];

  // Function to advance to the next slide.
  const nextSlide = () => {
    setCurrentSlide(prev => prev + 1);
  };

  // Start the automatic carousel interval.
  useEffect(() => {
    if (slides.length > 0) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    // Clean up the interval on component unmount.
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  // This handler is triggered at the end of the CSS transition.
  // When the currentSlide index reaches the cloned slide (last in the array),
  // we disable the transition and immediately jump back to the first slide.
  const handleTransitionEnd = () => {
    if (currentSlide === slides.length - 1) {
      // Temporarily disable the CSS transition.
      setTransitionEnabled(false);
      // Reset to the original first slide.
      setCurrentSlide(0);
    }
  };

  // Re-enable the CSS transition after a short delay once the jump has been made.
  useEffect(() => {
    if (!transitionEnabled) {
      // A small timeout ensures the jump is applied immediately without animation.
      const timeoutId = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [transitionEnabled]);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (slides.length === 0) return <p>No news available.</p>;

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
            ref={trackRef}
            className={styles.carouselTrack}
            style={{
              // Use negative translation based on currentSlide.
              transform: `translateX(-${currentSlide * 100}%)`,
              // Apply or remove the transition for smooth animation.
              transition: transitionEnabled ? 'transform 0.5s ease' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((item, index) => (
              <div key={index} className={styles.carouselSlide}>
                <NewsCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.indicators}>
          {featuredNews.map((_, index) => (
            <button
              key={index}
              // Highlight the active indicator.
              className={`${styles.indicator} ${
                // If currentSlide points to the cloned slide, highlight the first indicator.
                index === (currentSlide === slides.length - 1 ? 0 : currentSlide)
                  ? styles.active
                  : ''
              }`}
              onClick={() => {
                setCurrentSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedNews;
