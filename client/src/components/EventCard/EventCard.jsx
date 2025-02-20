import styles from '../../pages/EventsPage.module.css';
import PrimaryButton from '../Buttons/PrimaryButton';
import { highlightText } from '../../utils/highlightText';

function EventCard({ 
  title, 
  date, 
  location, 
  description, 
  image, 
  category, 
  isRegistrationOpen,
  registrationLink,
  searchQuery 
}) {
  return (
    <div className={styles.eventCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.dateBox}>
          <span className={styles.month}>{date.month}</span>
          <span className={styles.day}>{date.day}</span>
        </div>
        <h2 className={styles.title}>
          {highlightText(title, searchQuery)}
        </h2>
        <div className={styles.details}>
          <div className={styles.location}>
            <i className="fas fa-map-marker-alt"></i>
            {location}
          </div>
        </div>
        <p className={styles.description}>
          {highlightText(description, searchQuery)}
        </p>
        {isRegistrationOpen ? (
          registrationLink ? (
            <a href={registrationLink} target="_blank" rel="noopener noreferrer">
              <PrimaryButton>Register Now</PrimaryButton>
            </a>
          ) : (
            <PrimaryButton disabled>Registration not open yet</PrimaryButton>
          )
        ) : (
          <PrimaryButton disabled>Registration Closed</PrimaryButton>
        )}
      </div>
    </div>
  );
}

export default EventCard;
