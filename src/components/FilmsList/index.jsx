import { Link } from "react-router-dom";
import './styles.css';
import { useFilmsContext } from "@/context/filmsContext";
import { Loader, Pager } from "@/components";

const FilmsList = () => {
  const {
    films,
    isFilmsLoading,
  } = useFilmsContext();

  return (
    <div
      className="list-container custom-scroll custom-scroll-visible"
    >
      {isFilmsLoading && <Loader />}
      {films.length === 0 && <p className="list-empty">Films not found.</p>}
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
              {film.year}
            </p>
          </Link>
        ))}
      </div>
      <Pager />
    </div>
  );
};

export default FilmsList;