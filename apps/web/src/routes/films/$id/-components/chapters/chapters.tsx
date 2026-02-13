import { Columns2Icon } from 'lucide-react';
import { ChapterLink } from '~/routes/films/$id/-components/chapters/components';
import { Section } from '~/routes/films/$id/-components/section/section';
import { ScrollableLine, type api, type ApiResponse } from '~/shared';

type ChaptersProps = {
  data: ApiResponse<typeof api.films.get>['chapters'];
  filmId: number;
};

const getTitle = (index: number, count: number) => {
  if (index === 0) {
    return 'Sequels';
  }

  if (index + 1 === count) {
    return 'Prequels';
  }

  return 'Prequels / Sequels';
};

export const Chapters = ({ data, filmId }: ChaptersProps) => {
  const currentIndex = data.findIndex((film) => film.id === filmId);
  const sectionTitle = getTitle(currentIndex, data.length);

  return (
    <Section title={sectionTitle} icon={<Columns2Icon />}>
      <ScrollableLine>
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
      </ScrollableLine>
    </Section>
  );
};
