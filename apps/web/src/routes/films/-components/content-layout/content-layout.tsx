import styles from './styles.module.css';
import { type PropsWithChildren } from 'react';

export const ContentLayout = ({ children }: PropsWithChildren) => {
  return <div className={styles.content}>{children}</div>;
};
