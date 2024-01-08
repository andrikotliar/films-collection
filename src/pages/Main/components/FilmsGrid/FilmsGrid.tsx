import classes from './FilmsGrid.module.css';
import { useFilmsContext } from '@/context';
import { Loader, Pagination } from '@/components';
import { Film } from '@/pages/Main/components/FilmsGrid/components';
import { PageTitle } from '@/pages/Main/components/PageTitle';

const FilmsGrid = () => {
  const { films, isFilmsLoading, pagesCount } = useFilmsContext();

  return (
    <div className={classes.gridSection}>
      <PageTitle />
      {isFilmsLoading && <Loader isFullPage />}
      <div className={classes.grid}>
        {films.map((film) => (
          <Film data={film} key={film.id} />
        ))}
      </div>
      {pagesCount > 1 && <Pagination count={pagesCount} />}
      {films.length === 0 && !isFilmsLoading && <p>Films not found.</p>}
    </div>
  );
};

export { FilmsGrid };
