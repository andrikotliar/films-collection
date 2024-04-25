import { useDataContext } from '@/context';
import { splitAt } from '@/helpers';
import { useMemo } from 'react';

const useRelated = (key: string, filmId: string) => {
  const { relatedFilms } = useDataContext();

  const data = useMemo(() => {
    const currentList = relatedFilms?.[key];

    if (!currentList) {
      return null;
    }

    const chaptersIndex = currentList.chapters.findIndex(
      (data) => data.id === filmId,
    );

    const chaptersFilledWithNumbers = currentList.chapters.map(
      (chapter, index) => ({
        ...chapter,
        chapter: index + 1,
      }),
    );

    const chapters = splitAt(chaptersIndex, chaptersFilledWithNumbers);

    return {
      chapters,
      remakes: currentList.remakes,
      originals: currentList.originals,
    };
  }, [key, relatedFilms]);

  return data;
};

export { useRelated };
