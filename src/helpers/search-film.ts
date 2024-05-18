import { FilmData } from '@/common/types';

const FILTER_WORDS = ['and', 'or', 'of', 'for', '&', 'the', 'a'];

const searchFilm = (query: string, films: FilmData[]) => {
  const searchQueryWords = query.split(' ');

  const filteredWords = searchQueryWords.filter(
    (word) => !FILTER_WORDS.includes(word),
  );

  const filteredFilms = films.filter((film) => {
    const title = film.title.toLowerCase();
    return filteredWords.every((word) => title.includes(word.toLowerCase()));
  });

  return filteredFilms;
};

export { searchFilm };
