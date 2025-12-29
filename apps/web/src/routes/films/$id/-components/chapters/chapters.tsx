import { ChapterLink } from '~/routes/films/$id/-components/chapters/components';
import styles from './chapters.module.css';
import type { api, ExtractResponseType } from '~/shared';

type ChaptersProps = {
  data: ExtractResponseType<typeof api.films.get>['chapters'];
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
