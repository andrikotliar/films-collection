import styles from './film-page-layout.module.css';
import { ReactNode } from 'react';

type FilmPageLayoutProps = {
  children?: ReactNode;
};

export const FilmPageLayout = ({ children }: FilmPageLayoutProps) => {
  return <div className={styles.filmPageLayout}>{children}</div>;
};
