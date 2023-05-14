import './styles.css';
import { Link } from "react-router-dom";
import { useFilmsContext } from "@/context/filmsContext";
import { Loader, Pager } from "@/components";
import { useEffect, useRef } from "react";

const FilmsList = () => {
  const listContainerRef = useRef();

  const {
    films,
    isFilmsLoading,
  } = useFilmsContext();

  useEffect(() => {
    if(listContainerRef) {
      listContainerRef.current.scrollTo(0, 0);
    }
  }, [films])

  return (
    <div
      className="list-container custom-scroll custom-scroll-visible"
      ref={listContainerRef}
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