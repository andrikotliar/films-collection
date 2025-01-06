import styles from './FilmPageLayout.module.css';
import { FC, PropsWithChildren } from 'react';

export const FilmPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.filmPageLayout}>{children}</div>;
};
