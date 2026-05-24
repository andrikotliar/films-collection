import styles from './current-events.module.css';
import { type api, type ApiResponse } from '~/shared';
import { Link, useSearch } from '@tanstack/react-router';
import {
  EventBanner,
  EventPoster,
} from '~/routes/_home/-components/films-section/components/current-events/components';

type CurrentEventsProps = {
  events: ApiResponse<typeof api.films.getList.exec>['events'];
  total: number;
  anniversaryPoster: string | null;
};

export const CurrentEvents = ({ events, total, anniversaryPoster }: CurrentEventsProps) => {
  const search = useSearch({ from: '/_home/' });

  if (!events.length && !anniversaryPoster) {
    return null;
  }

  const shouldShowReset = search.collectionId || search.releasedThisDay;

  return (
    <div className={styles.events_track}>
      {shouldShowReset && (
        <Link className={styles.all_films_link} to="/">
          <div className={styles.all_films_link_inner}>{total}</div>
          <div className={styles.all_films_link_title}>All films</div>
        </Link>
      )}
      {anniversaryPoster && (
        <EventPoster
          posterPath={anniversaryPoster}
          title="Anniversaries"
          search={{ releasedThisDay: true }}
          isSelected={search.releasedThisDay}
        />
      )}
      {events.map((event) => (
        <EventBanner event={event} key={event.id} selectedEventId={search.collectionId} />
      ))}
    </div>
  );
};
