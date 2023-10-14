import { FilmData } from '@/common';

const handleSearchFilter = (
  searchQuery: string,
  title: string,
) => {
  const lowerTitle = title.toLowerCase();
  const words = searchQuery.split(' ');
  const exclude = [
    'the',
    'of',
    'in',
    'on',
    'and',
    'vs',
    'or',
  ];
  const filteredWords = words.filter(
    w => !exclude.includes(w),
  );

  return filteredWords.every(
    w => w.length > 2 && lowerTitle.includes(w),
  );
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
    delete params.actorName;

    const filteredFilms = list.filter(film => {
      const match = Object.keys(params).every(property => {
        if (property === 'search' && params.search) {
          return handleSearchFilter(
            params.search,
            film.title,
          );
        }

        if (property === 'crew') {
          const parsedCrew = JSON.parse(params[property]);
          const role = Object.keys(parsedCrew)[0];
          const crewPosition = film.crew.find(
            item => item.role === role,
          );
          return crewPosition?.people.find(
            ppl => ppl.name === parsedCrew[role],
          );
        }

        if (property === 'year') {
          const yearsMatch =
            params[property].includes(
              film.year.toString(),
            ) ||
            film.description
              .map(item => item.year?.toString())
              .some(year =>
                params[property].includes(year),
              );

          return yearsMatch;
        }

        if (property === 'duration') {
          return (
            film[property] === Number(params[property])
          );
        }

        if (
          property === 'collections' ||
          property === 'awards'
        ) {
          return film[property]?.some(
            item => item.title === params[property],
          );
        }

        if (property === 'actorId') {
          const hasActorId = film.cast.find(
            actor => actor.actorId === params.actorId,
          );
          if (hasActorId) {
            return true;
          }
          return false;
        }

        return (film as any)[property].some(
          (item: string) => params[property].includes(item),
        );
      });
      if (match) {
        return true;
      }
      return false;
    });

    if (filterParams.collections) {
      const filmsWithMinifiedCollections =
        filteredFilms.map(film => {
          const currentCollection = film.collections.filter(
            collection =>
              collection.title === filterParams.collections,
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

      if (
        filmsWithMinifiedCollections[0]?.collections[0]
          ?.order
      ) {
        return filmsWithMinifiedCollections.sort((a, b) =>
          Number(a?.collections[0]?.order) >
          Number(b?.collections[0]?.order)
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
