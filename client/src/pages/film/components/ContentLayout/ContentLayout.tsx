import styles from './ContentLayout.module.css';
import { FC, PropsWithChildren } from 'react';

const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

export { ContentLayout };
