import styles from '../homepage/FeaturedNews.module.css';

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

export default NewsCard;
