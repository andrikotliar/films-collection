import { Link } from '@tanstack/react-router';
import styles from './event-banner.module.css';
import { getPluralWord, type CollectionEventFilled } from '~/shared';
import { Image } from '~/shared/components/image/image';
import clsx from 'clsx';

type EventBannerProps = {
  event: CollectionEventFilled;
  selectedEventId?: string | null;
};

export const EventBanner = ({ event, selectedEventId }: EventBannerProps) => {
  const year = new Date().getFullYear();
  const isSelected = selectedEventId === event.collection.id.toString();
  const subTitle = event.yearFrom
    ? `${year - event.yearFrom} ${getPluralWord('year', event.yearFrom)} since`
    : null;

  return (
    <Link
      to="/"
      search={{ collectionId: event.collection.id.toString() }}
      className={clsx(styles.event_banner_button, isSelected && styles.selected_event)}
    >
      <div className={styles.event_banner_inner}>
        <Image src={event.film.poster} isExternal className={styles.poster_image} />
      </div>
      <div className={styles.event_title}>
        {subTitle} {event.title}
      </div>
    </Link>
  );
};
