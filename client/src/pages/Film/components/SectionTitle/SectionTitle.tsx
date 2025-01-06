import styles from './SectionTitle.module.css';
import { FC, PropsWithChildren } from 'react';

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
};
