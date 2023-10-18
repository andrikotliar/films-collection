import classes from './Chapters.module.css';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Chapter, FilmData } from '@/common';
import { Scrollable } from '@/components';
import { env } from '@/configs';

type ChaptersProps = {
  data: FilmData[];
  parts: Chapter;
};

const Chapters: FC<ChaptersProps> = ({ data, parts }) => {
  const { id: filmId } = useParams();

  const partsList = () => {
    return data
      .filter((film) => {
        if (film.chapters !== undefined) {
          return film.chapters.title === parts.title;
        }
      })
      .sort((a, b) =>
        Number(a.chapters?.part) > Number(b.chapters?.part) ? 1 : -1,
      );
  };

  return (
    <Scrollable className={classes.chapters}>
      {partsList().map((film) => (
        <Link
          to={`/film/${film.id}`}
          className={classNames(classes.link, {
            [classes.active]: filmId === film.id,
          })}
          key={film.id}
          id={film.id}
        >
          <img src={`${env.POSTERS_URL}${film.poster}`} alt={film.title} />
        </Link>
      ))}
    </Scrollable>
  );
};

export { Chapters };
