import classes from './FilmsList.module.css';
import { useFilmsContext } from '@/context/FilmsContext';
import { Button, Loader } from '@/components';
import { FilterIcon } from '@/assets/icons';
import { useAppContext } from '@/context/AppContext';
import { SelectedFilters } from '../SelectedFilters';
import { RefCallback, useCallback, useRef } from 'react';
import { Film } from '@/pages/Main/components/FilmsList/components';
import { FILMS_COUNT_STEP } from '@/common';

const FilmsList = () => {
  const { isFilterOpen, setIsFilterOpen, filtersCount } =
    useAppContext();

  const { films, isFilmsLoading, hasMore, setFilmsCount } =
    useFilmsContext();

  const observer = useRef<IntersectionObserver | null>(
    null,
  );

  const lastFilmRef: RefCallback<HTMLAnchorElement> =
    useCallback(
      (node) => {
        if (isFilmsLoading) return;

        if (observer.current) {
          observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasMore) {
              setFilmsCount(
                (num) => num + FILMS_COUNT_STEP,
              );
            }
          },
        );

        if (node) {
          observer.current?.observe(node);
        }
      },
      [isFilmsLoading, hasMore],
    );

  return (
    <div className={classes.wrapper}>
      <Button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        icon={<FilterIcon />}
        className={classes.filterButton}
        isHidden
      >
        Filters
        {filtersCount > 0 && <span>({filtersCount})</span>}
      </Button>
      <SelectedFilters />
      {isFilmsLoading && <Loader isFullPage />}
      <div className={classes.list}>
        {films.map((film, index) =>
          index === films.length - 1 ? (
            <Film
              ref={lastFilmRef}
              data={film}
              key={film.id}
            />
          ) : (
            <Film data={film} key={film.id} />
          ),
        )}
      </div>
      {films.length === 0 && !isFilmsLoading && (
        <p>Films not found.</p>
      )}
    </div>
  );
};

export { FilmsList };
