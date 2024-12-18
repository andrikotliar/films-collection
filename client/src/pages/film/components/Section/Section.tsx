import { FC, PropsWithChildren } from 'react';
import styles from './Section.module.css';

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.section}>{children}</div>;
};
