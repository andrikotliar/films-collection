import { type FilmSearchResult } from '~/common';
import { FoundFilm } from './found-film';

type SearchMenuContentProps = {
  films: FilmSearchResult[];
  onFilmOpen: VoidFunction;
};

export const SearchMenuContent = ({ films, onFilmOpen }: SearchMenuContentProps) => {
  const isEmpty = films.length === 0;

  if (isEmpty) {
    return (
      <div className="p-4">
        <div>Not found</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-5 md:grid md:grid-cols-[repeat(2,1fr)] md:gap-2">
        {films.map((film) => (
          <FoundFilm key={film.id} film={film} onFilmOpen={onFilmOpen} />
        ))}
      </div>
    </div>
  );
};
