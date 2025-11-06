import styles from './styles.module.css';
import { BREAKPOINTS, fetchInitialDataQuery } from '~/lib';
import { useQuery } from '@tanstack/react-query';
import { EventBanner } from '~/routes/_home/-components/films-section/components/event-banner/event-banner';

const getPlaceholdersCount = (eventsCount: number) => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= BREAKPOINTS.xl2) {
    return 4 - eventsCount;
  }

  if (screenWidth >= BREAKPOINTS.xl) {
    return eventsCount % 2;
  }

  return 0;
};

export const CurrentEvents = () => {
  const { data: initialData } = useQuery(fetchInitialDataQuery());

  if (!initialData?.events.length) {
    return null;
  }

  const placeholdersCount = getPlaceholdersCount(initialData.events.length);

  return (
    <div className={styles.events_grid}>
      {initialData.events.map((event) => (
        <EventBanner event={event} key={event.id} />
      ))}
      {placeholdersCount > 0 &&
        Array.from({ length: placeholdersCount }, (_, index) => (
          <div className={styles.event_placeholder} key={index} />
        ))}
    </div>
  );
};
