import styles from './GroupHeader.module.css';
import { FC, PropsWithChildren } from 'react';

const GroupHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.groupHeader}>
      <div className={styles.title}>{children}</div>
    </div>
  );
};

export { GroupHeader };
