import { RelatedFilms } from '@/common/types';
import { splitAt } from '@/helpers';
import { useMemo } from 'react';

const useRelated = (related: RelatedFilms, currentFilmId: string) => {
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

    const chapters = splitAt(chaptersIndex, chaptersFilledWithNumbers);

    return {
      chapters,
      remakes: related.remakes,
      originals: related.originals,
    };
  }, [related, currentFilmId]);

  return data;
};

export { useRelated };
