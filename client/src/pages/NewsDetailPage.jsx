import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './NewsDetailPage.module.css';
import useNewsDetail from '../hooks/useNewsDetail';

function NewsDetailPage() {
  const { newsTitle } = useParams(); 
  const { news, loading, error } = useNewsDetail(newsTitle);

  if (loading) {
    return <p className={styles.loading}>Loading article...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error.message}</p>;
  }

  if (!news) {
    return <p className={styles.error}>Article not found!</p>;
  }

  // Split the content into paragraphs based on newline characters.
  // We filter out any empty strings that might result.
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
                  alt={news.author.username} 
                  className={styles.avatar} 
                />
                <div className={styles.authorDetails}>
                  <span className={styles.authorName}>{news.author.username}</span>
                  {/* Uncomment below if you expect a role property */}
                  {/* {news.author.role && <span className={styles.authorRole}>{news.author.role}</span>} */}
                </div>
              </div>
            </div>
          </div>
        </header>

        <figure className={styles.imageContainer}>
          <img src={news.image} alt={news.title} className={styles.image} />
          {news.imageCaption && (
            <figcaption className={styles.imageCaption}>
              {news.imageCaption}
              {news.imageCredit && <span className={styles.imageCredit}>{news.imageCredit}</span>}
            </figcaption>
          )}
        </figure>

        <article className={styles.content}>
          {contentParagraphs.map((paragraph, index) => (
            <p key={index} className={styles.excerpt}>{paragraph}</p>
          ))}
        </article>

        {news.relatedArticles && news.relatedArticles.length > 0 && (
          <section className={styles.relatedArticles}>
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {news.relatedArticles.map((article, index) => (
                <div key={index} className={styles.relatedArticle}>
                  {article.image && <img src={article.image} alt={article.title} className={styles.relatedImage} />}
                  <h3 className={styles.relatedArticleTitle}>{article.title}</h3>
                  <span className={styles.relatedCategory}>{article.category}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default NewsDetailPage;
