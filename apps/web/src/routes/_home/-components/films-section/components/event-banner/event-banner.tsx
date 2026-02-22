import { Link } from '@tanstack/react-router';
import styles from './event-banner.module.css';
import { getPluralWord, type api, type ApiResponse } from '~/shared';
import { Image } from '~/shared/components/image/image';
import clsx from 'clsx';

type EventBannerProps = {
  event: ApiResponse<typeof api.initialData.list>['events'][number];
  selectedEventId?: number | null;
};

export const EventBanner = ({ event, selectedEventId }: EventBannerProps) => {
  const year = new Date().getFullYear();
  const isSelected = selectedEventId === event.collectionId;
  const subTitle = event.yearFrom
    ? `${year - event.yearFrom} ${getPluralWord('year', event.yearFrom)} since`
    : null;

  return (
    <Link
      to="/"
      search={{ collectionId: event.collectionId }}
      className={clsx(styles.event_banner_button, isSelected && styles.selected_event)}
    >
      <div className={styles.event_banner_inner}>
        <Image src={event.poster} className={styles.poster_image} />
      </div>
      <div className={styles.event_title}>
        {subTitle} {event.title}
      </div>
    </Link>
  );
};
