import { FilmsContext } from '@/context';
import { useContext, useMemo } from 'react';

const useRandomTitle = () => {
  const { films } = useContext(FilmsContext);

  const randomTitle = useMemo(() => {
    if (!films.length) {
      return null;
    }

    const count = films.length;
    const randomIndex = Math.floor(Math.random() * count);

    if (films[randomIndex]) {
      const film = films[randomIndex];

      const directors = film?.crew.find((item) => item.role === 'director');

      const names = directors?.people.map((person) => person.name).join(', ');

      return {
        info: film,
        directors: names,
      };
    }

    return null;
  }, [films]);

  return randomTitle;
};

export { useRandomTitle };
