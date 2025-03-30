import { FC, PropsWithChildren } from 'react';
import styles from './ConsoleContent.module.css';

export const ConsoleContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.contentLayout}>{children}</div>;
};
