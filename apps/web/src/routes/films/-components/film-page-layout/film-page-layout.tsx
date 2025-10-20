import styles from './styles.module.css';
import type { PropsWithChildren } from 'react';

type FilmPageLayoutProps = PropsWithChildren;

export const FilmPageLayout = ({ children }: FilmPageLayoutProps) => {
  return <div className={styles.film_page_layout}>{children}</div>;
};
