import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EventsPage.module.css';
import useEvents from '../hooks/useEvents';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import { highlightText } from '../utils/highlightText';

function EventCard({ 
  title, 
  date, 
  location, 
  description, 
  image, 
  category, 
  organizer, 
  isRegistrationOpen,
  searchQuery  // receive searchQuery to highlight matches
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
          <div className={styles.organizer}>
            <img 
              src={organizer.avatar} 
              alt={organizer.name} 
              className={styles.organizerAvatar} 
            />
            <span>{organizer.name}</span>
          </div>
        </div>
        <p className={styles.description}>
          {highlightText(description, searchQuery)}
        </p>
        {isRegistrationOpen ? (
          <Link to="/register">
            <PrimaryButton>Register Now</PrimaryButton>
          </Link>
        ) : (
          <PrimaryButton disabled>Registration Closed</PrimaryButton>
        )}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const {
    events,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    loading,
    error,
  } = useEvents();

  return (
    <div className={styles.eventsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Upcoming Events</h1>
          <p className={styles.pageDescription}>
            Discover and participate in exciting tech events, workshops, and meetups
          </p>
        </header>

        <div className={styles.filters}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.active : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading events...</div>
        ) : error ? (
          <div className={styles.error}>Error: {error.message}</div>
        ) : (
          <div className={styles.eventsGrid}>
            {events.length > 0 ? (
              events.map((event, index) => (
                <EventCard 
                  key={index} 
                  {...event} 
                  searchQuery={searchQuery}
                />
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No events found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
