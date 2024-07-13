import { RelatedFilms, RelatedItem } from '@/common/types';
import { splitChapters } from '@/pages/film/components/related/helpers';
import { useMemo } from 'react';

enum ChaptersTab {
  PREQUELS = 'prequels',
  SEQUELS = 'sequels',
  REMAKES = 'remakes',
  ORIGINALS = 'originals',
}

type Tabs = {
  id: ChaptersTab;
  name: string;
  content: RelatedItem[];
};

const useRelated = (related: RelatedFilms, currentFilmId: string): Tabs[] => {
  const data = useMemo(() => {
    const chaptersIndex = related.chapters.findIndex(
      (data) => data.id === currentFilmId,
    );

    const chaptersFilledWithNumbers = related.chapters.map(
      (chapter, index) => ({
        ...chapter,
        chapter: index + 1,
      }),
    );

    const chapters = splitChapters(chaptersIndex, chaptersFilledWithNumbers);

    const values: Tabs[] = [
      {
        id: ChaptersTab.PREQUELS,
        name: 'Prequels',
        content: chapters.prequels,
      },
      {
        id: ChaptersTab.SEQUELS,
        name: 'Sequels',
        content: chapters.sequels,
      },
      {
        id: ChaptersTab.REMAKES,
        name: 'Remakes',
        content: related.remakes ?? [],
      },
      {
        id: ChaptersTab.ORIGINALS,
        name: 'Originals',
        content: related.originals ?? [],
      },
    ];

    return values.filter((tab) => tab.content.length);
  }, [related, currentFilmId]);

  return data;
};

export { useRelated, ChaptersTab };
