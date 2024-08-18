import { EyeIcon } from 'lucide-react';
import { FC } from 'react';
import styles from './WatchCount.module.css';

type WatchCountProps = {
  value?: number;
};

const WatchCount: FC<WatchCountProps> = ({ value }) => {
  if (!value) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <EyeIcon className={styles.eyeIcon} />
      <div className={styles.label}>Watch Count</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export { WatchCount };
