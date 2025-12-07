import styles from './event-banner.module.css';
import { getDateMonthLabel, type CollectionEventFilled } from '~/shared';
import { Image } from '~/shared/components/image/image';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, CalendarIcon, TimerIcon } from 'lucide-react';
import { EventBannerDataRow } from '~/routes/_home/-components/films-section/components/event-banner/components';

type EventBannerProps = {
  event: CollectionEventFilled;
};

export const EventBanner = ({ event }: EventBannerProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Link
      to="/"
      search={{ collectionId: event.collection.id.toString() }}
      className={styles.event_banner_link}
    >
      <div className={styles.poster_wrapper}>
        <Image src={event.film.poster} isExternal className={styles.poster_image} />
        <div className={styles.poster_overlay} />
      </div>
      <div className={styles.data}>
        <div className={styles.data_title}>
          <span>Ongoing event</span>
        </div>
        <div className={styles.event_title}>{event.title}</div>
        <div className={styles.event_data}>
          <EventBannerDataRow icon={<CalendarIcon size={16} />} value={getDateMonthLabel(event)} />
          <EventBannerDataRow
            icon={<TimerIcon size={16} />}
            value={event.yearFrom ? `${currentYear - event.yearFrom} years` : 'Regular event'}
          />
        </div>
      </div>
      <div className={styles.link_icon}>
        <ArrowRightIcon size={14} />
      </div>
    </Link>
  );
};
