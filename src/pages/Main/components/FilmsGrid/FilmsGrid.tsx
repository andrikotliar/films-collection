import classes from './FilmsGrid.module.css';
import { useFilmsContext } from '@/context/FilmsContext';
import { Button, Loader } from '@/components';
import { FilterIcon } from '@/assets/icons';
import { useAppContext } from '@/context/AppContext';
import { Film } from '@/pages/Main/components/FilmsGrid/components';
import { useListObserver } from '@/pages/Main/hooks';
import { PageTitle } from '@/pages/Main/components/PageTitle';

const FilmsGrid = () => {
  const { isFilterOpen, setIsFilterOpen, filtersCount } = useAppContext();

  const { films, isFilmsLoading } = useFilmsContext();

  const lastFilmRef = useListObserver();

  return (
    <div className={classes.gridSection}>
      <PageTitle />
      {isFilmsLoading && <Loader isFullPage />}
      <div className={classes.grid}>
        {films.map((film, index) =>
          index === films.length - 1 ? (
            <Film ref={lastFilmRef} data={film} key={film.id} />
          ) : (
            <Film data={film} key={film.id} />
          ),
        )}
      </div>
      {films.length === 0 && !isFilmsLoading && <p>Films not found.</p>}
      <Button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        icon={<FilterIcon />}
        className={classes.filterButton}
        isHidden
      >
        Filters
        {filtersCount > 0 && <span>({filtersCount})</span>}
      </Button>
    </div>
  );
};

export { FilmsGrid };
