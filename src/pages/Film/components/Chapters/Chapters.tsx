import classes from './Chapters.module.css';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Chapter, FilmData } from '@/common';
import { Scrollable } from '@/components';
import { getChapters } from '@/pages/Film/components/Chapters/helpers';

type ChaptersProps = {
  data: FilmData[];
  parts: Chapter;
};

const Chapters: FC<ChaptersProps> = ({ data, parts }) => {
  const { id: filmId } = useParams();

  const chapters = getChapters(data, parts.title);

  return (
    <Scrollable className={classes.chapters}>
      {chapters.map((chapter) => (
        <Link
          to={`/film/${chapter.id}`}
          className={classNames(classes.link, {
            [classes.active]: filmId === chapter.id,
          })}
          key={chapter.id}
          id={chapter.id}
        >
          <img src={chapter.media[0].poster} alt={chapter.title} />
        </Link>
      ))}
    </Scrollable>
  );
};

export { Chapters };
