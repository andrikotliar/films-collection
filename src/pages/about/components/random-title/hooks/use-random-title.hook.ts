import { fetchFilmIds } from '@/api';
import { FilmData } from '@/common/types';
import { useFilmsContext } from '@/context';
import { useEffect, useState } from 'react';

const useRandomTitle = () => {
  const [isTitleLoading, setIsTitleLoading] = useState(true);
  const [randomTitle, setRandomTitle] = useState<FilmData | null>(null);
  const { initialFilmsList } = useFilmsContext();

  const fetchIds = async () => {
    try {
      const ids = await fetchFilmIds();

      const count = ids.length;

      const randomIndex = Math.floor(Math.random() * count);

      setRandomTitle(initialFilmsList[randomIndex]);
    } catch (e: any) {
      console.error(e?.message);
    } finally {
      setIsTitleLoading(false);
    }
  };

  useEffect(() => {
    fetchIds();
  }, []);

  return { randomTitle, isTitleLoading };
};

export { useRandomTitle };
