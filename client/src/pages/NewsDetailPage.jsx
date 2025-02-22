import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './NewsDetailPage.module.css';
import useNewsDetail from '../hooks/useNewsDetail';
import SEO from '../components/SEO/SEO';
import MucosaLogo from '../assets/icons/mucosa-logo.png';

function NewsDetailPage() {
  const { newsTitle } = useParams();
  const { news, loading, error } = useNewsDetail(newsTitle);

  if (error) {
    return <p className={styles.error}>Error: {error.message}</p>;
  }

  // Set meta data using news details when available, or use default values.
  const metaTitle = news ? `${news.title} - News Detail` : 'News Detail';
  const metaDescription =
    news && news.content
      ? news.content.substring(0, 150) + '...'
      : 'Read the latest news and articles on our platform.';
  const metaImage = news && news.image ? news.image : MucosaLogo;

  return (
    <div className={styles.newsDetailPage}>
      {/* SEO Meta Data */}
      <SEO
        title={metaTitle}
        description={metaDescription}
        url={`https://yourwebsite.com/news/${newsTitle}`}
        image={metaImage}
      />
      <div className={styles.container}>
        <header className={styles.header}>
          {news && news.category && (
            <div className={styles.category}>{news.category}</div>
          )}
          <h1 className={styles.title}>{news ? news.title : 'Loading...'}</h1>
          {news && (
            <div className={styles.meta}>
              <div className={styles.timeAndAuthor}>
                <time className={styles.time}>{news.date}</time>
                <div className={styles.authorInfo}>
                  <img
                    src={news.author.avatar || 'default-avatar.png'}
                    alt={news.author.name}
                    className={styles.avatar}
                  />
                  <div className={styles.authorDetails}>
                    <span className={styles.authorName}>{news.author.name}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loading}>
              <div className={styles.loadingSpinner} />
              <span>Loading article...</span>
            </div>
          </div>
        ) : news ? (
          <>
            <figure className={styles.imageContainer}>
              <img src={news.image} alt={news.title} className={styles.image} />
            </figure>

            <article className={styles.content}>
              {news.content &&
                news.content
                  .split(/\r?\n/)
                  .filter((paragraph) => paragraph.trim() !== '')
                  .map((paragraph, index) => (
                    <p key={index} className={styles.excerpt}>
                      {paragraph}
                    </p>
                  ))}
            </article>
          </>
        ) : (
          <p className={styles.error}>Article not found!</p>
        )}
      </div>
    </div>
  );
}

export default NewsDetailPage;
