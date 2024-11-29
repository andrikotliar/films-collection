import { ArrowLeftIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import styles from './NavigationRow.module.css';

const NavigationRow = () => {
  return (
    <div className={styles.navigationRow}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeftIcon className={styles.backLinkIcon} />
        <span>Back to list</span>
      </Link>
    </div>
  );
};

export { NavigationRow };
