import styles from './current-events.module.css';
import { EventBanner } from '~/routes/_home/-components/films-section/components/event-banner/event-banner';
import { Link, useSearch } from '@tanstack/react-router';
import { getInitialDataQueryOptions } from '~/shared';
import { useQuery } from '@tanstack/react-query';

export const CurrentEvents = () => {
  const search = useSearch({ from: '/_home/' });

  const { data: initialData } = useQuery(getInitialDataQueryOptions());

  if (!initialData?.events.length) {
    return null;
  }

  return (
    <div className={styles.events_track}>
      {search.collectionId && (
        <Link className={styles.all_films_link} to="/">
          <div className={styles.all_films_link_inner}>{initialData?.filmsTotal ?? ''}</div>
          <div className={styles.all_films_link_title}>All films</div>
        </Link>
      )}
      {initialData.events.map((event) => (
        <EventBanner event={event} key={event.id} selectedEventId={search.collectionId} />
      ))}
    </div>
  );
};
