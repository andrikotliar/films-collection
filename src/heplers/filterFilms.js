const handleSearchFilter = (searchQuery, title) => {
  const lowerTitle = title.toLowerCase();
  const words = searchQuery.split(' ');
  const exclude = ['the', 'of', 'in', 'on', 'and', 'vs', 'or'];
  const filteredWords = words.filter((w) => !exclude.includes(w));

  return filteredWords.some((w) => w.length > 2 && lowerTitle.includes(w));
};

export const filterFilms = (list, filterParams) => {
  if(!Object.keys(filterParams).length) {
    return list;
  }

  const params = { ...filterParams };
  delete params.page;

  const filteredFilms = list.filter((film) => {
    const match = Object.keys(params).every(property => {
      if(property === 'search') {
        return handleSearchFilter(params.search, film.title);
      }

      if(property === 'year' || property === 'duration') {
        return film[property] === Number(params[property]);
      }

      if(property === 'collections') {
        return film.collections.some(collection => collection.name === params.collections);
      }

      if(property === 'actor') {
        const hasActorId = film.cast.find((actor) => actor.actorId === params.actor);
        if(hasActorId) {
          return true;
        }
        return false;
      }

      if(Array.isArray(params[property])) {
        return film[property] && film[property].some(item => params[property].includes(item));
      }

      if(typeof params[property] === 'string') {
        return film[property] && film[property].includes(params[property]);
      }
    });
    if(match) {
      return true;
    }
    return false;
  });

  if(filterParams.collections) {
    const filmsWithMinifiedCollections = filteredFilms.map(film => {
      const currentCollection = film.collections.find(
        collection => collection.name === filterParams.collections
      );

      return {
        ...film,
        collections: currentCollection,
      }
    });

    if(filmsWithMinifiedCollections[0].collections?.order) {
      return filmsWithMinifiedCollections.sort(
        (a, b) => a.collections.order > b.collections.order ? 1 : -1
      );
    }

    return filteredFilms;
  }

  return filteredFilms;
}