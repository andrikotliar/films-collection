import styles from './Chapters.module.css';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Chapter, FilmData } from '@/common';
import { getChapters } from './helpers';
import { ChapterLink } from './components';

type Props = {
  data: FilmData[];
  parts: Chapter;
};

const Chapters: FC<Props> = ({ data, parts }) => {
  const { id: currentFilmId } = useParams<string>();

  const chapters = getChapters(data, parts.title);

  return (
    <div className={styles.chapters}>
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
