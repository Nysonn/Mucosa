import styles from './UpcomingEvents.module.css';
import { Link } from 'react-router-dom';
import useEvents from '../../hooks/useEvents';

function EventCard({ title, date, location, description, registrationLink }) {
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
        <a href={registrationLink} target="_blank" rel="noopener noreferrer">
              <button className={styles.registerButton}>Register Now</button>
            </a>
      </div>
    </div>
  );
}

function UpcomingEvents() {
  // Retrieve all events using your existing useEvents hook.
  const { events: allEvents, loading, error } = useEvents();

  // Get the current date.
  const now = new Date();

  // Filter events based on your criteria.
  const filteredEvents = allEvents.filter(event => {
    // Construct a valid date from the event's date object
    const { day, month, year } = event.date;
    const eventDate = new Date(`${month} ${day}, ${year}`);
    return event.registrationLink && event.isRegistrationOpen && eventDate >= now;
  });

  // Sort the filtered events by date in ascending order (soonest event first).
  filteredEvents.sort((a, b) => {
    const { day: dayA, month: monthA, year: yearA } = a.date;
    const { day: dayB, month: monthB, year: yearB } = b.date;
    const dateA = new Date(`${monthA} ${dayA}, ${yearA}`);
    const dateB = new Date(`${monthB} ${dayB}, ${yearB}`);
    return dateA - dateB;
  });

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
            const { day, month } = event.date; // No need to reparse if the backend provides this directly
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
