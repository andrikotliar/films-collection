import { type PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const ConsoleContent = ({ children }: PropsWithChildren) => {
  return <div className={styles.content_layout}>{children}</div>;
};
