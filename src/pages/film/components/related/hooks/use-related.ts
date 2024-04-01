import { useFilmsContext } from '@/context';
import { splitAt } from '@/helpers';
import { useMemo } from 'react';

const useRelated = (key: string, filmId: string) => {
  const { relatedFilmsList } = useFilmsContext();

  const data = useMemo(() => {
    const currentList = relatedFilmsList?.[key];

    if (!currentList) {
      return null;
    }

    const chaptersIndex = currentList.chapters.findIndex(
      (data) => data.id === filmId,
    );

    if (chaptersIndex < 0) {
      return null;
    }

    const splittedData = splitAt(chaptersIndex, currentList.chapters);

    return splittedData;
  }, [key, relatedFilmsList]);

  return data;
};

export { useRelated };
