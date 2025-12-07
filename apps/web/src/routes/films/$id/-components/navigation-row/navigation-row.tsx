import { BackLink } from '~/shared';
import styles from "./navigation-row.module.css";

export const NavigationRow = () => {
  return (
    <div className={styles.navigation_row}>
      <BackLink path="/">Back to list</BackLink>
    </div>
  );
};
