import { PersonRole } from '@/common/enums';
import { ActorsList, FilmData } from '@/common/types';
import { FilterFilmsOptions, Person } from './types';
import { personRoleToPageTitle } from '@/common/maps';

const findPersonFilms = ({ role, currentId, films }: FilterFilmsOptions) => {
  if (role === PersonRole.ACTOR) {
    return films.filter((film) => {
      return film.cast.find(({ actorId }) => actorId === currentId);
    });
  }

  return films.filter((film) => {
    const currentRole = film.crew.find((item) => item.role === role);

    if (!currentRole) {
      return false;
    }

    return currentRole.people.find((person) => person.name === currentId);
  });
};

const getStatisticValues = (films: FilmData[], property: 'genres' | 'year') => {
  const set = new Set<string>();

  films.forEach((film) => {
    film[property].forEach((value) => set.add(String(value)));
  });

  return Array.from(set);
};

const getPersonData = (
  role: PersonRole,
  personId: string,
  actors: ActorsList,
): Person => {
  const name = role === PersonRole.ACTOR ? actors[personId]?.name : personId;

  return {
    name,
    position: personRoleToPageTitle[role],
  };
};

export { findPersonFilms, getStatisticValues, getPersonData };
