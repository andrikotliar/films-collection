import classes from './FilmsGrid.module.css';
import { useFilmsContext } from '@/context';
import { Loader } from '@/components';
import { Film } from '@/pages/Main/components/FilmsGrid/components';
import { useListObserver } from '@/pages/Main/hooks';
import { PageTitle } from '@/pages/Main/components/PageTitle';

const FilmsGrid = () => {
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
    </div>
  );
};

export { FilmsGrid };
