import type { PropsWithChildren } from 'react';
import styles from './films-grid.module.css';

export const FilmsGrid = ({ children }: PropsWithChildren) => {
  return <div className={styles.grid}>{children}</div>;
};
