import type { ReactNode } from 'react';
import styles from './event-banner-data-row.module.css';

type EventBannerDataRowProps = {
  icon: ReactNode;
  value: string;
};

export const EventBannerDataRow = ({ icon, value }: EventBannerDataRowProps) => {
  return (
    <div className={styles.data_row}>
      {icon}
      {value}
    </div>
  );
};
