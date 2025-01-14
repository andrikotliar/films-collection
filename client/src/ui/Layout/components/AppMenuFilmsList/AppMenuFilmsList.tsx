import { FC } from 'react';
import styles from './AppMenuFilmsList.module.css';
import { FilmLinkItem } from '@/types';
import { RouterLink } from '@/ui/RouterLink/RouterLink';

type AppMenuFilmsListProps = {
  title: string;
  list: FilmLinkItem[];
};

export const AppMenuFilmsList: FC<AppMenuFilmsListProps> = ({
  list,
  title,
}) => {
  return (
    <div className={styles.filmsListWrapper}>
      <div className={styles.filmsListTitle}>{title}</div>
      <div className={styles.filmsListContainer}>
        {list.map((film) => (
          <RouterLink to="/film/$id" params={{ id: film._id }} key={film._id}>
            {film.title}
          </RouterLink>
        ))}
      </div>
    </div>
  );
};
