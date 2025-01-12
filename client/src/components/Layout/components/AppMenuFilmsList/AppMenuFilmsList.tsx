import { FC, PropsWithChildren } from 'react';
import styles from './AppMenuFilmsList.module.css';

type AppMenuFilmsListProps = PropsWithChildren<{
  title: string;
}>;

export const AppMenuFilmsList: FC<AppMenuFilmsListProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.filmsListWrapper}>
      <div className={styles.filmsListTitle}>{title}</div>
      <div className={styles.filmsListContainer}>{children}</div>
    </div>
  );
};
