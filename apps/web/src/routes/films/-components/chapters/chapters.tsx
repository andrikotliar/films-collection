import { ScrollableLine, type Chapter } from '~/shared';
import { ChapterLink } from '~/routes/films/-components/chapters/components';

type ChaptersProps = {
  data: Chapter[];
  filmId: number;
};

export const Chapters = ({ data, filmId }: ChaptersProps) => {
  return (
    <ScrollableLine>
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
    </ScrollableLine>
  );
};
