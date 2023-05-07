import { Link } from "react-router-dom";
import './styles.css';
import { useFilmsContext } from "@/context/filmsContext";
import { Loader, Pager } from "@/components";
import { getYearFromReleaseDate } from "@/heplers";

const FilmsList = () => {
  const {
    films,
    isFilmsLoading,
  } = useFilmsContext();

  if(isFilmsLoading) {
    return (
      <div className="list-container">
        <Loader />
      </div>
    );
  }

  if(films.length === 0) {
    return (
      <div className="list-empty">
        <p>Films not found.</p>
      </div>
    )
  }

  return (
    <div className="list-container custom-scroll custom-scroll-visible">
      <div className="list">
        {films.map(film => (
          <Link
            className="list-film"
            to={`/film/${film.id}`}
            key={film.id}
          >
            {!Array.isArray(film.collections) && (
              <div className="list-film__order">
                {film.collections.order}
              </div>
            )}
            <div className="list-film__cover">
              <img
                src={`/posters/${film.poster}.webp`}
                alt="film.title"
              />
            </div>
            <h3 className="list-film__title">
              {film.title}
            </h3>
            <p className="list-film__subtitle">
              {getYearFromReleaseDate(film.releaseDate)}
            </p>
          </Link>
        ))}
      </div>
      <Pager />
      {!isFilmsLoading && !films.length && (
        <span>Films not found</span>
      )}
    </div>
  );
};

export default FilmsList;