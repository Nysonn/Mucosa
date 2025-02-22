import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './NewsDetailPage.module.css';
import useNewsDetail from '../hooks/useNewsDetail';

function NewsDetailPage() {
  const { newsTitle } = useParams();
  const { news, loading, error } = useNewsDetail(newsTitle);

  if (error) {
    return <p className={styles.error}>Error: {error.message}</p>;
  }

  if (!news) {
    return <p className={styles.error}>Article not found!</p>;
  }

  // Split the content into paragraphs based on newline characters.
  const contentParagraphs = news.content
    ? news.content.split(/\r?\n/).filter(paragraph => paragraph.trim() !== "")
    : [];

  return (
    <div className={styles.newsDetailPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          {news.category && <div className={styles.category}>{news.category}</div>}
          <h1 className={styles.title}>{news.title}</h1>
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
                  {/* If needed, you can uncomment the line below if a role is provided */}
                  {/* {news.author.role && <span className={styles.authorRole}>{news.author.role}</span>} */}
                </div>
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loading}>
              <div className={styles.loadingSpinner} />
              <span>Loading article...</span>
            </div>
          </div>
        ) : (
          <>
            <figure className={styles.imageContainer}>
              <img src={news.image} alt={news.title} className={styles.image} />
            </figure>

            <article className={styles.content}>
              {contentParagraphs.map((paragraph, index) => (
                <p key={index} className={styles.excerpt}>{paragraph}</p>
              ))}
            </article>
          </>
        )}
      </div>
    </div>
  );
}

export default NewsDetailPage;
