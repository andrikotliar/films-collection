import { getDateMonthLabel, type CollectionEventFilled } from '@/common';
import { Image } from '@/components/image/image';
import { Link } from '@tanstack/react-router';
import styles from './styles.module.css';
import { CalendarIcon, TimerIcon } from 'lucide-react';

type CollectionEventBannerProps = {
  event: CollectionEventFilled;
};

export const CollectionEventBanner = ({ event }: CollectionEventBannerProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Link
      to="/"
      search={{ collectionId: event.collection.id.toString() }}
      className={styles.wrapper}
    >
      <Image src={event.film.poster} isExternal className={styles.image} />
      <div className={styles.content}>
        <div className={styles.title}>{event.title}</div>
        <div className={styles.info}>
          <CalendarIcon size={12} /> {getDateMonthLabel(event)}
        </div>
        <div className={styles.info}>
          <TimerIcon size={12} />
          {event.yearFrom ? `${currentYear - event.yearFrom} years` : 'Regular event'}
        </div>
      </div>
    </Link>
  );
};
