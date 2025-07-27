import { getDateMonthLabel, type CollectionEventFilled } from '@/common';
import { Link } from '@tanstack/react-router';
import styles from './collection-event-banner.module.css';
import {
  ArrowRightCircleIcon,
  Calendar1Icon,
  CalendarClockIcon,
  LibraryBigIcon,
} from 'lucide-react';

type CollectionEventBannerProps = {
  data: CollectionEventFilled;
};

export const CollectionEventBanner = ({ data }: CollectionEventBannerProps) => {
  const datesLabel = getDateMonthLabel(data);
  const year = new Date().getFullYear();

  const yearsCount = data.yearFrom ? year - data.yearFrom : null;
  return (
    <Link
      to="/"
      search={{ collectionId: data.collection.id.toString() }}
      className={styles.event}
      style={{
        backgroundImage: `linear-gradient(${data.background.angle}deg, ${data.background.color1}, ${data.background.color2})`,
        color: data.background.textColor,
      }}
    >
      <div className={styles.info}>
        <h3 className={styles.title}>{data.title}</h3>
        <div className={styles.data}>
          <span className={styles.block}>
            <Calendar1Icon size={18} />
            {datesLabel}
          </span>
          <span className={styles.block}>
            <LibraryBigIcon size={18} />
            Collection: <b>{data.collection.title}</b>
          </span>
          {yearsCount && (
            <span className={styles.block}>
              <CalendarClockIcon size={18} />
              Started <b>{yearsCount}</b> years ago
            </span>
          )}
        </div>
      </div>
      <div className={styles.callToAction}>
        <span>Explore</span> <span className={styles.count}>{data.filmsCount}</span> movies
        <ArrowRightCircleIcon className={styles.arrowIcon} />
      </div>
    </Link>
  );
};
