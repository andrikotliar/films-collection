import { Link } from '@tanstack/react-router';
import styles from './event-banner.module.css';
import { getPluralWord, getExternalImageUrl, type api, type ApiResponse, Image } from '~/shared';

type EventBannerProps = {
  event: ApiResponse<typeof api.films.getDashboard.exec>['events'][number];
};

export const EventBanner = ({ event }: EventBannerProps) => {
  const year = new Date().getFullYear();
  const subTitle = event.yearFrom
    ? `${year - event.yearFrom} ${getPluralWord('year', event.yearFrom)} since`
    : null;

  return (
    <Link
      to="/films"
      search={{ collectionId: event.collectionId }}
      className={styles.event_banner_button}
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
