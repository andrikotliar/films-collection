import { Link } from '@tanstack/react-router';
import styles from './event-banner.module.css';
import { type CollectionEventFilled } from '~/shared';
import { Image } from '~/shared/components/image/image';

type EventBannerProps = {
  event: CollectionEventFilled;
};

export const EventBanner = ({ event }: EventBannerProps) => {
  return (
    <Link
      to="/"
      search={{ collectionId: event.collection.id.toString() }}
      className={styles.event_banner_button}
    >
      <div className={styles.event_banner_inner}>
        <Image src={event.film.poster} isExternal className={styles.poster_image} />
      </div>
      <div className={styles.event_title}>{event.title}</div>
    </Link>
  );
};
