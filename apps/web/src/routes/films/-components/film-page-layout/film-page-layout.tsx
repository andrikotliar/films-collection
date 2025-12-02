import styles from './styles.module.css';
import type { PropsWithChildren } from 'react';

export const FilmPageLayout = ({ children }: PropsWithChildren) => {
  return <div className={styles.film_page_layout}>{children}</div>;
};
