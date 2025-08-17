import type { CollectionEventFilled } from '@/common';
import { CollectionEventBanner } from '@/components';
import styles from './styles.module.css';
import { useEffect, useRef, useState } from 'react';

type EventsListProps = {
  items: CollectionEventFilled[];
};

const ITEM_WIDTH = 160;

export const EventsList = ({ items }: EventsListProps) => {
  const containerRef = useRef<HTMLInputElement>(null);
  const [placeholdersCount, setPlaceholdersCount] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;

      const count = Math.ceil(width / (ITEM_WIDTH + 20)) - items.length;

      if (count > 0) {
        setPlaceholdersCount(count);
      }
    }
  }, [containerRef, items]);

  return (
    <div className={styles.list} ref={containerRef}>
      {items.map((event) => (
        <div key={event.id} className={styles.item}>
          <CollectionEventBanner event={event} />
        </div>
      ))}
      {Array.from({ length: placeholdersCount }, (_, index) => (
        <div key={index} className={styles.placeholder} />
      ))}
    </div>
  );
};
