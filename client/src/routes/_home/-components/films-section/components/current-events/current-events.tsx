import { fetchInitialDataQuery } from '@/common';
import { CollectionEventBanner } from '@/components';
import { useQuery } from '@tanstack/react-query';
import styles from './current-events.module.css';

export const CurrentEvents = () => {
  const { data: initialData } = useQuery(fetchInitialDataQuery());

  if (!initialData?.events) {
    return null;
  }

  return (
    <div className={styles.grid}>
      {initialData.events.map((event) => (
        <CollectionEventBanner data={event} />
      ))}
    </div>
  );
};
