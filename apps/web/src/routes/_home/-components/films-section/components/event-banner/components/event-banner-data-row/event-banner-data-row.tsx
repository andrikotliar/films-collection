import type { ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  icon: ReactNode;
  value: string;
};

export const EventBannerDataRow = ({ icon, value }: Props) => {
  return (
    <div className={styles.dataRow}>
      {icon}
      {value}
    </div>
  );
};
