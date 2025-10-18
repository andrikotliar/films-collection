import styles from './styles.module.css';
import { getDateMonthLabel, type CollectionEventFilled } from '~/common';
import { Image } from '~/common/components/image/image';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, CalendarIcon, TimerIcon } from 'lucide-react';
import { EventBannerDataRow } from '~/routes/_home/-components/event-banner/components';

type CollectionEventBannerProps = {
  event: CollectionEventFilled;
};

export const EventBanner = ({ event }: CollectionEventBannerProps) => {
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
        <div className={styles.data_title}>{event.title}</div>
        <div className={styles.event_date}>
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
