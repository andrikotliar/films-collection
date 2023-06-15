import './styles.css';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Chapter, FilmData } from '@/types';

type ChaptersProps = {
  data: FilmData[];
  parts: Chapter
}

const Chapters: FC<ChaptersProps> = ({ data, parts }) => {
  const { id: filmId } = useParams();

  const partsList = () => {
    return data.filter((film) => {
      if (film.parts !== undefined) {
        return film.parts.title === parts.title;
      }
    }).sort((a, b) => Number(a.parts?.part) > Number(b.parts?.part) ? 1 : -1);
  }

  return (
    <div className="chapters custom-scroll">
      {partsList().map(film => (
        <Link
          to={`/film/${film.id}`}
          className={classNames(
            'chapters__link',
            {
              'chapters__link--active': filmId === film.id
            }
          )}
          key={film.id}
          id={film.id}
        >
          <img src={`/posters/${film.poster}.webp`} alt="" />
        </Link>
      ))}
    </div>
  );
};

export default Chapters;