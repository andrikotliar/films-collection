import { BackLink } from '~/common';
import styles from './styles.module.css';

export const NavigationRow = () => {
  return (
    <div className={styles.navigation_row}>
      <BackLink path="/">Back to list</BackLink>
    </div>
  );
};
