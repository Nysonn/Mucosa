import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsPage.module.css';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import useNews from '../hooks/useNews';
import { highlightText } from '../utils/highlightText';

// Filter Component for News
// function NewsFilter({ categories, activeCategory, onCategoryChange }) {
//   return (
//     <div className={styles.filterSection}>
//       <button
//         className={`${styles.filterButton} ${!activeCategory ? styles.active : ''}`}
//         onClick={() => onCategoryChange(null)}
//         aria-label="Show all news categories"
//       >
//         All
//       </button>
//       {categories.length > 0 ? (
//         categories.map((category) => (
//           <button
//             key={category}
//             className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
//             onClick={() => onCategoryChange(category)}
//             aria-label={`Filter by ${category}`}
//           >
//             {category}
//           </button>
//         ))
//       ) : (
//         <p className={styles.noCategories}>No categories available.</p>
//       )}
//     </div>
//   );
// }

// News Card Component
function NewsCard({ image, category, title, excerpt, date, author, searchQuery }) {
  // Format title for URL-friendly slug (if needed)
  const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();

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
        <Link to={`/news/${formattedTitle}`} className={styles.readMoreLink}>
          <button className={styles.readMore} aria-label={`Read more about ${title}`}>
            Read More
          </button>
        </Link>
      </div>
    </article>
  );
}

// News Page Component
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
