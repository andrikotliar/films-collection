import { Link } from '@tanstack/react-router';
import styles from './event-banner.module.css';
import { getPluralWord, getExternalImageUrl, type api, type ApiResponse, Image } from '~/shared';
import clsx from 'clsx';

type EventBannerProps = {
  event: ApiResponse<typeof api.films.getList.exec>['events'][number];
  selectedEventId?: number;
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
        <Image src={getExternalImageUrl(event.poster)} className={styles.poster_image} />
      </div>
      <div className={styles.event_title}>
        {subTitle} {event.title}
      </div>
    </Link>
  );
};
