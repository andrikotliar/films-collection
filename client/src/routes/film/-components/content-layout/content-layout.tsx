import styles from './content-layout.module.css';
import { FC, PropsWithChildren } from 'react';

export const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
