import { FC } from 'react';
import { Chapter } from '@/types';
import { ScrollableWrapper } from '@/ui';
import { FilmLink } from './components';
import styles from './Chapters.module.css';

type ChaptersFilmsProps = {
  data: Chapter[];
  filmId: number;
};

export const Chapters: FC<ChaptersFilmsProps> = ({ data, filmId }) => {
  return (
    <ScrollableWrapper className={styles.chapters}>
      {data.map((film, index) => (
        <FilmLink
          key={film.id}
          chapter={index + 1}
          isActive={film.id === filmId}
          id={film.id}
          poster={film.poster}
          title={film.title}
        />
      ))}
    </ScrollableWrapper>
  );
};
