import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsPage.module.css';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import useNews from '../hooks/useNews';
import { highlightText } from '../utils/highlightText';
import NewsFilter from '../components/NewsFilter/NewsFilter';
import SEO from '../components/SEO/SEO';
import MucosaLogo from '../assets/icons/mucosa-logo.png';

function NewsCard({ image, category, title, excerpt, date, author, searchQuery }) {
  return (
    <article className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={`News: ${title}`} className={styles.image} />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{highlightText(title, searchQuery)}</h2>
        <p className={styles.excerpt}>{highlightText(excerpt, searchQuery)}</p>
        <div className={styles.meta}>
          <div className={styles.author}>
            <img src={author.avatar} alt={author.name} className={styles.avatar} />
            <span>{author.name}</span>
          </div>
          <span className={styles.date}>{date}</span>
        </div>
        <Link to={`/news/${title}`} className={styles.readMoreLink}>
          <button className={styles.readMore} aria-label={`Read more about ${title}`}>
            Read More
          </button>
        </Link>
      </div>
    </article>
  );
}

function NewsPage() {
  const {
    news,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    loading,
    error,
  } = useNews();

  // Optimize search input change handler with useCallback
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  return (
    <div className={styles.newsPage}>
      {/* SEO Meta Data */}
      <SEO
        title="Latest News - Stay Updated with MUCOSA Community"
        description="Stay updated with the latest news, announcements, and stories from the MUCOSA community."
        // url="https://yourwebsite.com/news"
        image={MucosaLogo}
      />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Latest News</h1>
          <p className={styles.pageDescription}>
            Stay updated with the latest news, announcements, and stories from the MUCOSA community.
          </p>
        </header>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
            aria-label="Search for news articles"
          />
        </div>

        {/* Category Filter */}
        <NewsFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* News Articles */}
        <div className={styles.newsGrid}>
          {loading ? (
            <div className={styles.loading}>Loading news...</div>
          ) : error ? (
            <div className={styles.error}>Error: {error.message}</div>
          ) : news.length > 0 ? (
            news.map((newsItem, index) => (
              <NewsCard key={index} {...newsItem} searchQuery={searchQuery} />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No news articles found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {news.length > 0 && (
          <div className={styles.loadMore}>
            <PrimaryButton>Load More Articles</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsPage;
