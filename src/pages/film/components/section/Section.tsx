import { FC, PropsWithChildren } from 'react';
import styles from './Section.module.css';

const Section: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.section}>{children}</div>;
};

export { Section };
