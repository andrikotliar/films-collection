import { Link } from '@tanstack/react-router';
import styles from './event-banner.module.css';
import { type CollectionEventFilled } from '~/shared';
import { Image } from '~/shared/components/image/image';
import clsx from 'clsx';

type EventBannerProps = {
  event: CollectionEventFilled;
  selectedEventId?: string | null;
};

export const EventBanner = ({ event, selectedEventId }: EventBannerProps) => {
  return (
    <Link
      to="/"
      search={{ eventCollectionId: event.collection.id.toString() }}
      className={clsx(
        styles.event_banner_button,
        selectedEventId === event.collection.id.toString() && styles.selected_event,
      )}
    >
      <div className={styles.event_banner_inner}>
        <Image src={event.film.poster} isExternal className={styles.poster_image} />
      </div>
      <div className={styles.event_title}>{event.title}</div>
    </Link>
  );
};
