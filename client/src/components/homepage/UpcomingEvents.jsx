import styles from './UpcomingEvents.module.css';
import { Link } from 'react-router-dom';
import useEvents from '../hooks/useEvents';

function EventCard({ title, date, location, description }) {
  return (
    <div className={styles.eventCard}>
      <div className={styles.dateBox}>
        <span className={styles.month}>{date.month}</span>
        <span className={styles.day}>{date.day}</span>
      </div>
      <div className={styles.eventInfo}>
        <h3 className={styles.eventTitle}>{title}</h3>
        <p className={styles.eventLocation}>{location}</p>
        <p className={styles.eventDescription}>{description}</p>
        <button className={styles.registerButton}>Register Now</button>
      </div>
    </div>
  );
}

function UpcomingEvents() {
  // Retrieve all events using your existing useEvents hook.
  const { events: allEvents, loading, error } = useEvents();

  // Get the current date.
  const now = new Date();

  // Filter events that:
  // 1. Have a registrationLink provided.
  // 2. Have registration open.
  // 3. Have an event date that is upcoming (event date >= current date).
  const filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return event.registrationLink && event.isRegistrationOpen && eventDate >= now;
  });

  // Sort the filtered events by date in ascending order (soonest event first).
  filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Only select the first three events.
  const events = filteredEvents.slice(0, 3);

  return (
    <section className={styles.eventsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Upcoming Events</h2>
          <p className={styles.subtitle}>Join us in our upcoming tech events and workshops</p>
        </div>
        {loading && <p>Loading events...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className={styles.eventsGrid}>
          {events.map((event, index) => {
            // Format the event date for display.
            const eventDate = new Date(event.date);
            const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const day = eventDate.getDate();
            return (
              <EventCard
                key={index}
                title={event.title}
                date={{ month, day }}
                location={event.location}
                description={event.description}
              />
            );
          })}
        </div>
        <div className={styles.viewMore}>
          <Link to="/events">
            <button className={styles.viewMoreButton}>View All Events</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
