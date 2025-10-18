import type { ReactNode } from 'react';
import styles from './styles.module.css';

type DataRowProps = {
  icon: ReactNode;
  value: string;
};

export const EventBannerDataRow = ({ icon, value }: DataRowProps) => {
  return (
    <div className={styles.dataRow}>
      {icon}
      {value}
    </div>
  );
};
