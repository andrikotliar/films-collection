import { PER_PAGE } from '@/common/constants';
import { FilmData } from '@/common/types';
import { countObjectKeys } from '@/helpers/count-keys';

const PARAMS_TO_SKIP = ['endDate'];

const filterFilms = (
  list: FilmData[],
  filterParams: { [key: string]: any },
): FilmData[] => {
  if (!countObjectKeys(filterParams)) {
    return list;
  }

  try {
    const filteredFilms = list.filter((film) => {
      const match = Object.keys(filterParams).every((property) => {
        if (PARAMS_TO_SKIP.includes(property)) {
          return true;
        }

        if (property === 'cast') {
          return film.cast.find((actor) => actor.actorId === filterParams.cast);
        }

        if (property === 'crew') {
          const crew = JSON.parse(filterParams.crew);

          const crewPosition = film.crew.find(
            (item) => item.role === crew.role,
          );
          return crewPosition?.people.find(
            (person) => person.name === crew.name,
          );
        }

        if (property === 'duration') {
          return film.duration === Number(filterParams.duration);
        }

        if (property === 'seasons') {
          return (
            film.type.includes('Series') &&
            film.series?.seasons.length === +filterParams[property]
          );
        }

        if (property === 'episodes') {
          return (
            film.type.includes('Series') &&
            film.series?.episodesTotal === +filterParams[property]
          );
        }

        if (property === 'collections') {
          return film[property]?.some(
            (item) => item.title === filterParams[property],
          );
        }

        if (property === 'awards') {
          return film[property]?.some(
            (item) => item.awardId === filterParams[property],
          );
        }

        if (property === 'startDate' && filterParams.endDate) {
          const filmBaseDate = new Date(film.releaseDate[0]).getTime();
          const startDate = new Date(filterParams.startDate).getTime();
          const endDate = new Date(filterParams.endDate).getTime();

          return filmBaseDate >= startDate && filmBaseDate <= endDate;
        }

        return (film as any)[property].some((value: string | number) => {
          return filterParams[property].includes(String(value));
        });
      });
      if (match) {
        return true;
      }
      return false;
    });

    return filteredFilms;
  } catch (e: any) {
    console.error('Filter error', e?.message);
    return [];
  }
};

const paginateFilms = (films: FilmData[], pageIndex: number) => {
  const sliceStart = PER_PAGE * pageIndex;
  const sliceEnd = PER_PAGE * (pageIndex + 1);

  const paginatedFilms = films.slice(sliceStart, sliceEnd);
  const pagesCount = Math.ceil(films.length / PER_PAGE);

  return {
    paginatedFilms,
    pagesCount,
  };
};

export { paginateFilms, filterFilms };
