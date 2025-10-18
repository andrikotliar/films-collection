import { Link } from '@tanstack/react-router';
import { type FilmSearchResult, getYearFromDate } from '~/common';
import { Image } from '~/components/image/image';

type FoundFilmProps = {
  film: FilmSearchResult;
  onFilmOpen: VoidFunction;
};

export const FoundFilm = ({ film, onFilmOpen }: FoundFilmProps) => {
  const genres = film.genres.map((genre) => genre.genre.title).join(', ');

  return (
    <Link
      to="/film/$id"
      params={{
        id: film.id.toString(),
      }}
      className="flex gap-2.5 p-1 border border-transparent rounded-lg hover:border-gray-500 overflow-hidden"
      onClick={onFilmOpen}
    >
      <div className="w-12 shrink-0">
        <Image
          src={film.poster}
          alt={`Poster of the "${film.title}"`}
          className="rounded-sm"
          isExternal
        />
      </div>
      <div className="flex flex-col w-full min-w-0">
        <h3 className="text-lg transition font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {film.title}
        </h3>
        <p className="text-gray-400 text-sm">{genres}</p>
        <div className="text-emerald-500 text-sm">{getYearFromDate(film.releaseDate)}</div>
      </div>
    </Link>
  );
};
