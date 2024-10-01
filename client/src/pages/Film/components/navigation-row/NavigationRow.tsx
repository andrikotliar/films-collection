import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './NavigationRow.module.css';

const NavigationRow = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeftIcon className={styles.backLinkIcon} />
        <span>Back to list</span>
      </Link>
    </div>
  );
};

export { NavigationRow };
