import { FilmData } from '@/common/types';

const handleSearchFilter = (searchQuery: string, title: string) => {
  const lowerTitle = title.toLowerCase();
  const words = searchQuery.split(' ');
  const exclude = ['the', 'of', 'in', 'on', 'and', 'vs', 'or'];
  const filteredWords = words.filter((w) => !exclude.includes(w));

  return filteredWords.every((w) => w.length > 2 && lowerTitle.includes(w));
};

export const filterFilms = (
  list: FilmData[],
  filterParams: any,
): FilmData[] => {
  if (!Object.keys(filterParams).length) {
    return list;
  }

  try {
    const params = { ...filterParams };

    const filteredFilms = list.filter((film) => {
      const match = Object.keys(params).every((property) => {
        if (property === 'search' && params.search) {
          return handleSearchFilter(params.search, film.title);
        }

        if (property === 'duration') {
          return film[property] === Number(params[property]);
        }

        if (property === 'year') {
          return film[property].includes(Number(params[property]));
        }

        if (property === 'seasons') {
          return (
            film.type.includes('Series') &&
            film.series?.seasons.length === +params[property]
          );
        }

        if (property === 'episodes') {
          return (
            film.type.includes('Series') &&
            film.series?.episodesTotal === +params[property]
          );
        }

        if (property === 'collections' || property === 'awards') {
          return film[property]?.some(
            (item) => item.title === params[property],
          );
        }

        return (film as any)[property].some((item: string | number) =>
          params[property].includes(item.toString()),
        );
      });
      if (match) {
        return true;
      }
      return false;
    });

    if (filterParams.collections) {
      const filmsWithMinifiedCollections = filteredFilms.map((film) => {
        const currentCollection = film.collections.filter(
          (collection) => collection.title === filterParams.collections,
        );

        if (currentCollection.length) {
          return {
            ...film,
            collections: currentCollection,
            ordered: true,
          };
        }

        return {
          ...film,
          collections: [],
        };
      });

      if (filmsWithMinifiedCollections[0]?.collections[0]?.order) {
        return filmsWithMinifiedCollections.sort((a, b) =>
          Number(a?.collections[0]?.order) > Number(b?.collections[0]?.order)
            ? 1
            : -1,
        );
      }

      return filteredFilms;
    }

    return filteredFilms;
  } catch (e: any) {
    console.error('Filter error', e?.message);
    return [];
  }
};
