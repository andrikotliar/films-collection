import classes from './Chapters.module.css';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Chapter, FilmData } from '@/common';
import { Scrollable } from '@/components';
import { getChapters } from '@/pages/Film/components/Chapters/helpers';
import { ChapterLink } from '@/pages/Film/components/Chapters/components';

type ChaptersProps = {
  data: FilmData[];
  parts: Chapter;
};

const Chapters: FC<ChaptersProps> = ({ data, parts }) => {
  const { id: currentFilmId } = useParams<string>();

  const chapters = getChapters(data, parts.title);

  return (
    <div className={classes.chapters}>
      {chapters.map((chapter) => (
        <ChapterLink
          currentFilmId={currentFilmId}
          id={chapter.id}
          title={chapter.title}
          poster={chapter.media[0].poster}
          key={chapter.id}
        />
      ))}
    </div>
  );
};

export { Chapters };
