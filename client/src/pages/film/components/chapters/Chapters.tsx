import { FC } from 'react';
import { FilmData } from '@/types';
import { FilmLink } from './components';
import styles from './Chapters.module.css';

type ChaptersFilmsProps = {
  data: FilmData['chapters'];
  filmId: string;
};

const Chapters: FC<ChaptersFilmsProps> = ({ data, filmId }) => {
  return (
    <div className={styles.row}>
      {data.map((film, index) => (
        <FilmLink
          key={film._id}
          chapter={index + 1}
          isActive={film._id === filmId}
          id={film._id}
          poster={film.media[0].poster}
          title={film.title}
        />
      ))}
    </div>
  );
};

export { Chapters };