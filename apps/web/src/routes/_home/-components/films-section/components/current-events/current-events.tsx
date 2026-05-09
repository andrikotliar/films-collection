import { EventBanner } from '~/routes/_home/-components/films-section/components/event-banner/event-banner';
import styles from './current-events.module.css';
import { type api, type ApiResponse } from '~/shared';
import { Link, useSearch } from '@tanstack/react-router';

type CurrentEventsProps = {
  events: ApiResponse<typeof api.films.getList.exec>['events'];
  total: number;
};

export const CurrentEvents = ({ events, total }: CurrentEventsProps) => {
  const search = useSearch({ from: '/_home/' });

  if (!events.length) {
    return null;
  }

  return (
    <div className={styles.events_track}>
      {search.collectionId && (
        <Link className={styles.all_films_link} to="/">
          <div className={styles.all_films_link_inner}>{total}</div>
          <div className={styles.all_films_link_title}>All films</div>
        </Link>
      )}
      {events.map((event) => (
        <EventBanner event={event} key={event.id} selectedEventId={search.collectionId} />
      ))}
    </div>
  );
};
