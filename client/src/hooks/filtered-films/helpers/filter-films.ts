import { FilmData } from '@/types';
import { countObjectKeys } from '@/helpers';
import { TitleType } from '@/enums';

const PARAMS_TO_SKIP = ['endDate'];
const NUMBER_PROPS = ['duration', 'rating', 'watchCount'];

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

        if (NUMBER_PROPS.includes(property)) {
          return (film as any)[property] === Number(filterParams[property]);
        }

        if (property === 'seasons') {
          return (
            film.type.includes(TitleType.SERIES) &&
            film.series?.seasons.length === +filterParams[property]
          );
        }

        if (property === 'episodes') {
          return (
            film.type.includes(TitleType.SERIES) &&
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

        if (property === 'extra') {
          const filmsWithCreatedAt = list.filter((film) => film.createdAt);
          const sortedList = filmsWithCreatedAt.sort(
            (a, b) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime(),
          );
          const ids = sortedList.map(({ id }) => id).slice(0, 10);

          return ids.includes(film.id);
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

export { filterFilms };
