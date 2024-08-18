import { EyeIcon } from 'lucide-react';
import { FC } from 'react';
import styles from './WatchCount.module.css';
import { buildQueryLink } from '@/helpers';
import { Link } from 'react-router-dom';

type WatchCountProps = {
  value?: number;
};

const WatchCount: FC<WatchCountProps> = ({ value }) => {
  if (!value) {
    return null;
  }

  return (
    <Link to={buildQueryLink({ watchCount: value })} className={styles.wrapper}>
      <EyeIcon className={styles.eyeIcon} />
      <div className={styles.label}>Watch Count</div>
      <div className={styles.value}>{value}</div>
    </Link>
  );
};

export { WatchCount };
