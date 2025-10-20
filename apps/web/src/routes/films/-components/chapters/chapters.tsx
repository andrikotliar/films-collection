import { ScrollableLine, type Chapter } from '~/common';
import { ChapterLink } from '~/routes/films/-components/chapters/components';

type Props = {
  data: Chapter[];
  filmId: number;
};

export const Chapters = ({ data, filmId }: Props) => {
  return (
    <ScrollableLine>
      {data.map((chapter) => (
        <ChapterLink
          id={chapter.id}
          chapter={chapter.chapterOrder}
          title={chapter.title}
          isActive={chapter.id === filmId}
          poster={chapter.poster}
        />
      ))}
    </ScrollableLine>
  );
};
