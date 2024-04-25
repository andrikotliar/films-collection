import { useDataContext } from '@/context';
import { useMemo } from 'react';

const useRandomTitle = () => {
  const { films } = useDataContext();

  const randomTitle = useMemo(() => {
    if (!films) {
      return null;
    }

    const count = films.length;
    const randomIndex = Math.floor(Math.random() * count);

    if (films[randomIndex]) {
      return films[randomIndex];
    }

    return null;
  }, [films]);

  return randomTitle;
};

export { useRandomTitle };
