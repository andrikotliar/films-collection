import { FC } from 'react';
import styles from './AppMenuFilmsList.module.css';
import { FilmData } from '@/common/types';
import { buildRouterLink } from '@/helpers';
import { RouterLink } from '@/components';

type AppMenuFilmsListProps = {
  title: string;
  list: FilmData[];
};

const AppMenuFilmsList: FC<AppMenuFilmsListProps> = ({ list, title }) => {
  return (
    <div className={styles.filmsListWrapper}>
      <div className={styles.filmsListTitle}>{title}</div>
      <div className={styles.filmsListContainer}>
        {list.map((film) => (
          <RouterLink to={buildRouterLink('film', film.id)} key={film.id}>
            {film.title}
          </RouterLink>
        ))}
      </div>
    </div>
  );
};

export { AppMenuFilmsList };