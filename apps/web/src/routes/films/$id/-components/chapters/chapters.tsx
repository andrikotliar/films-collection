import { type Chapter } from '~/shared';
import { ChapterLink } from '~/routes/films/$id/-components/chapters/components';
import styles from './chapters.module.css';

type ChaptersProps = {
  data: Chapter[];
  filmId: number;
};

export const Chapters = ({ data, filmId }: ChaptersProps) => {
  return (
    <div className={styles.chapters}>
      {data.map((chapter) => (
        <ChapterLink
          id={chapter.id}
          chapter={chapter.chapterOrder}
          title={chapter.title}
          isActive={chapter.id === filmId}
          poster={chapter.poster}
          key={chapter.id}
        />
      ))}
    </div>
  );
};
