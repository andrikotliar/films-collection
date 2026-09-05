import { useLocation } from '@tanstack/react-router';
import { BackLink } from '~/shared';
import styles from './navigation-row.module.css';

export const NavigationRow = () => {
  const location = useLocation();
  return (
    <div className={styles.row}>
      <BackLink path="/" search={location.search}>
        Return to the list
      </BackLink>
    </div>
  );
};
