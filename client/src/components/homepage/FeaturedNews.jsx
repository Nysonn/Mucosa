import { useState, useEffect, useRef } from 'react';
import styles from './FeaturedNews.module.css';
import useNews from '../../hooks/useNews';

function NewsCard({ image, category, excerpt }) {
  return (
    <article className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <div 
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={styles.imageOverlay}>
          <p className={styles.overlayText}>{excerpt}</p>
        </div>
        <span className={styles.category}>{category}</span>
      </div>
    </article>
  );
}

function FeaturedNews() {
  // Use the useNews hook to get news articles from the backend.
  const { news, loading, error } = useNews();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // We only need the category, image, and excerpt from each news item.
  // You can further filter or map if needed.
  const featuredNews = news.map(item => ({
    category: item.category,
    image: item.image,
    excerpt: item.excerpt
  }));

  // Start the automatic carousel interval.
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
    }, 3000); // Change slide every 3 seconds
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (featuredNews.length > 0) {
      startInterval();
    }
    return () => stopInterval(); // Cleanup on unmount or when featuredNews changes
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
          <p className={styles.sectionSubtitle}>Stay updated with the latest from our community</p>
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
