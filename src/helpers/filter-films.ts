import { FilmData } from '@/common/types';
import { countObjectKeys } from '@/helpers/count-keys';

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
        if (property === 'duration') {
          return film[property] === Number(filterParams[property]);
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

        if (property === 'collections' || property === 'awards') {
          return film[property]?.some(
            (item) => item.title === filterParams[property],
          );
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
