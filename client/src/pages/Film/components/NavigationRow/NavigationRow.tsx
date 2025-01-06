import { ArrowLeftIcon } from 'lucide-react';
import styles from './NavigationRow.module.css';
import { BackLink } from '@/ui';

export const NavigationRow = () => {
  return (
    <div className={styles.navigationRow}>
      <BackLink path="/">Back to list</BackLink>
    </div>
  );
};
