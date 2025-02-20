import React from 'react';
import styles from './EventsPage.module.css';
import useEvents from '../hooks/useEvents';
import EventCard from '../components/EventCard/EventCard';

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
