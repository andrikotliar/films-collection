import { fetchFilmIds } from '@/api';
import { FilmData } from '@/common/types';
import { useFilmsContext } from '@/context';
import { useEffect, useState } from 'react';

const useRandomTitle = () => {
  const [randomTitle, setRandomTitle] = useState<FilmData | null>(null);
  const { initialFilmsList } = useFilmsContext();

  const fetchIds = async () => {
    const ids = await fetchFilmIds();

    const count = ids.length;

    const randomIndex = Math.floor(Math.random() * count);

    setRandomTitle(initialFilmsList[randomIndex]);
  };

  useEffect(() => {
    fetchIds();
  }, []);

  return randomTitle;
};

export { useRandomTitle };
