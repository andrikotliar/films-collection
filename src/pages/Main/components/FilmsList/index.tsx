import './styles.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFilmsContext } from "@/context/FilmsContext";
import SelectedFilters from '../SelectedFilters';
import Pagination from '../Pagination';
import FilmListSkeleton from '@/pages/Main/components/FilmListSkeleton';

const FilmsList = () => {
  const {
    films,
    isFilmsLoading,
  } = useFilmsContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [films]);

  return (
    <div className="list-container">
      <SelectedFilters />
      {isFilmsLoading && <FilmListSkeleton />}
      {films.length === 0 && <p className="list-empty">Films not found.</p>}
      <div className="list">
        {films.map(film => (
          <Link
            className="list-film"
            to={`/film/${film.id}`}
            key={film.id}
          >
            {film?.ordered && (
              <div className="list-film__order">
                {film.collections[0].order}
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
      <Pagination />
    </div>
  );
};

export default FilmsList;