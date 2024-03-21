import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Chapter } from '@/common/types';
import { getChapters } from './helpers';
import { ChapterLink } from './components';
import { useFilmsContext } from '@/context';

import styles from './Chapters.module.css';

type Props = {
  parts: Chapter;
};

const Chapters: FC<Props> = ({ parts }) => {
  const { initialFilmsList } = useFilmsContext();
  const { id: currentFilmId } = useParams<string>();

  const chapters = getChapters(initialFilmsList, parts.title);

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
