import { fetchFilmIds } from '@/api';
import { FilmData } from '@/common/types';
import { useFilmsContext } from '@/context';
import { useQuery } from '@/hooks/query';
import { useState } from 'react';

const useRandomTitle = () => {
  const [randomTitle, setRandomTitle] = useState<FilmData | null>(null);
  const { initialFilmsList } = useFilmsContext();

  const { isFetching } = useQuery({
    fn: fetchFilmIds,
    onSuccess(data) {
      const count = data.length;
      const randomIndex = Math.floor(Math.random() * count);

      if (initialFilmsList) {
        setRandomTitle(initialFilmsList[randomIndex]);
      }
    },
  });

  return { randomTitle, isTitleLoading: isFetching };
};

export { useRandomTitle };
