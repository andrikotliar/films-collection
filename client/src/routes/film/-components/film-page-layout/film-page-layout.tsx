import styles from './film-page-layout.module.css';
import { FC, PropsWithChildren } from 'react';

export const FilmPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.filmPageLayout}>{children}</div>;
};
