import { ChapterLink } from '~/routes/films/$id/-components/chapters/components';
import styles from './chapters.module.css';
import type { api, ApiResponse } from '~/shared';

type ChaptersProps = {
  data: ApiResponse<typeof api.films.get>['chapters'];
  filmId: number;
};

export const Chapters = ({ data, filmId }: ChaptersProps) => {
  return (
    <div className={styles.chapters}>
      {data.map((chapter, index) => (
        <ChapterLink
          id={chapter.id}
          chapter={index + 1}
          title={chapter.title}
          isActive={chapter.id === filmId}
          poster={chapter.poster}
          key={chapter.id}
        />
      ))}
    </div>
  );
};
