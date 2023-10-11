import classes from './FilmsList.module.css';
import { Link } from 'react-router-dom';
import { useFilmsContext } from '@/context/FilmsContext';
import { Button, Loader } from '@/components';
import { FilterIcon } from '@/assets/icons';
import { useAppContext } from '@/context/AppContext';
import { SelectedFilters } from '../SelectedFilters';

const FilmsList = () => {
  const { isFilterOpen, setIsFilterOpen } = useAppContext();

  const { films, isFilmsLoading } = useFilmsContext();

  return (
    <div className={classes.wrapper}>
      <Button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        icon={<FilterIcon />}
        className={classes.filterButton}
        isHidden
      >
        Filters
      </Button>
      <SelectedFilters />
      {isFilmsLoading && <Loader />}
      {films.length === 0 && !isFilmsLoading && (
        <p>Films not found.</p>
      )}
      <div className={classes.list}>
        {films.map(film => (
          <Link
            className={classes.film}
            to={`/film/${film.id}`}
            key={film.id}
          >
            {film?.ordered && (
              <div className={classes.filmOrder}>
                {film.collections[0].order}
              </div>
            )}
            <div className={classes.filmCover}>
              <img src={film.posters[0]} alt={film.title} />
            </div>
            <h3 className={classes.filmTitle}>
              {film.title}
            </h3>
            <p className={classes.filmYear}>{film.year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { FilmsList };
