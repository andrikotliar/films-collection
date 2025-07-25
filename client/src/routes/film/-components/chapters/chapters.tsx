import { Chapter } from '@/common';
import { ScrollableWrapper } from '@/components';
import { FilmLink } from './components';
import styles from './chapters.module.css';

type ChaptersFilmsProps = {
  data: Chapter[];
  filmId: number;
};

export const Chapters = ({ data, filmId }: ChaptersFilmsProps) => {
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
