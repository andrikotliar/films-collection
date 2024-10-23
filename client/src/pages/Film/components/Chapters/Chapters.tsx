import { FC } from 'react';
import { FilmData } from '@/types';
import { ScrollableRow } from '@/components';
import { FilmLink } from './components';

type ChaptersFilmsProps = {
  data: FilmData['chapters'];
  filmId: string;
};

const Chapters: FC<ChaptersFilmsProps> = ({ data, filmId }) => {
  return (
    <ScrollableRow>
      {data.map((film, index) => (
        <FilmLink
          key={film._id}
          chapter={index + 1}
          isActive={film._id === filmId}
          id={film._id}
          poster={film.poster}
          title={film.title}
        />
      ))}
    </ScrollableRow>
  );
};

export { Chapters };
