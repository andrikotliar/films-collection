import styles from './film-page-layout.module.css';

export const FilmPageLayout = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.film_page_layout}>{children}</div>;
};
