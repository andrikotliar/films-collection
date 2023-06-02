import { FilmType } from "@/types";

const handleSearchFilter = (searchQuery: string, title: string) => {
  const lowerTitle = title.toLowerCase();
  const words = searchQuery.split(' ');
  const exclude = ['the', 'of', 'in', 'on', 'and', 'vs', 'or'];
  const filteredWords = words.filter((w) => !exclude.includes(w));

  return filteredWords.every((w) => w.length > 2 && lowerTitle.includes(w));
};

export const filterFilms = (list: FilmType[], filterParams: any): FilmType[] => {
  if(!Object.keys(filterParams).length) {
    return list;
  }

  const params = { ...filterParams };
  delete params.page;
  delete params.actorName;

  const filteredFilms = list.filter((film) => {
    const match = Object.keys(params).every((property) => {
      if(property === 'search' && params.search) {
        return handleSearchFilter(params.search, film.title);
      }

      if(property === 'year') {
        return film.year === Number(params[property]);
      }

      if(property === 'collections') {
        return film.collections.some(collection => collection.name === params.collections);
      }

      if(property === 'actorId') {
        const hasActorId = film.cast.find((actor) => actor.actorId === params.actorId);
        if(hasActorId) {
          return true;
        }
        return false;
      }

      if(Array.isArray(params[property]) && film[property]) {
        return film[property]?.some(item => params[property].includes(item));
      }

      if(typeof params[property] === 'string') {
        return film[property].includes(params[property]);
      }
    });
    if(match) {
      return true;
    }
    return false;
  });

  if(filterParams.collections) {
    const filmsWithMinifiedCollections = filteredFilms.map(film => {
      const currentCollection = film.collections.filter(
        collection => collection.name === filterParams.collections
      );

      if(currentCollection.length) {
        return {
          ...film,
          collections: currentCollection,
          ordered: true
        }
      }
      
      return {
        ...film,
        collections: []
      };
    });

    console.log(filmsWithMinifiedCollections)

    if(filmsWithMinifiedCollections[0]?.collections[0]?.order) {
      return filmsWithMinifiedCollections.sort(
        (a, b) => Number(a?.collections[0]?.order) > Number(b?.collections[0]?.order) ? 1 : -1
      );
    }

    return filteredFilms;
  }

  return filteredFilms;
}