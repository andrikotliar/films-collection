import { RelatedFilms, RelatedItem } from '@/common/types';
import { useMemo } from 'react';

enum RelatedTitlesTab {
  CHAPTERS = 'sequels',
  REMAKES = 'remakes',
  ORIGINALS = 'originals',
}

type Tabs = {
  id: RelatedTitlesTab;
  name: string;
  content: RelatedItem[];
  isNumerationShown?: boolean;
};

const useRelated = (related: RelatedFilms, currentFilmId: string): Tabs[] => {
  const data = useMemo(() => {
    const values: Tabs[] = [
      {
        id: RelatedTitlesTab.CHAPTERS,
        name: 'Chapters',
        content: related.chapters ?? [],
        isNumerationShown: true,
      },
      {
        id: RelatedTitlesTab.REMAKES,
        name: 'Remakes',
        content: related.remakes ?? [],
      },
      {
        id: RelatedTitlesTab.ORIGINALS,
        name: 'Originals',
        content: related.originals ?? [],
      },
    ];

    return values.filter((tab) => tab.content.length);
  }, [related, currentFilmId]);

  return data;
};

export { useRelated, RelatedTitlesTab };
