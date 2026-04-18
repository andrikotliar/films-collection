import styles from './current-events.module.css';
import { getInitialDataQueryOptions } from '~/shared';
import { useQuery } from '@tanstack/react-query';
import { EventBanner } from '~/routes/_home/-components/event-banner/event-banner';

export const CurrentEvents = () => {
  const { data: initialData } = useQuery(getInitialDataQueryOptions());

  if (!initialData?.events.length) {
    return null;
  }

  return (
    <div className={styles.events_track}>
      {initialData.events.map((event) => (
        <EventBanner event={event} key={event.id} />
      ))}
    </div>
  );
};
