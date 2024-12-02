import styles from './FilmPageLayout.module.css';
import { FC, PropsWithChildren } from 'react';

const FilmPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.filmPageLayout}>{children}</div>;
};

export { FilmPageLayout };
