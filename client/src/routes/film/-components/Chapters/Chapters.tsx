import { FC } from 'react';
import { Chapter } from '@/types';
import { ScrollableWrapper } from '@/components';
import { FilmLink } from './components';
import styles from './Chapters.module.css';

type ChaptersFilmsProps = {
  data: Chapter[];
  filmId: number;
};

export const Chapters: FC<ChaptersFilmsProps> = ({ data, filmId }) => {
  return (
    <ScrollableWrapper className={styles.chapters}>
      {data.map((film) => (
        <FilmLink
          key={film.id}
          chapter={film.chapterOrder}
          isActive={film.id === filmId}
          id={film.id}
          poster={film.poster}
          title={film.title}
        />
      ))}
    </ScrollableWrapper>
  );
};
