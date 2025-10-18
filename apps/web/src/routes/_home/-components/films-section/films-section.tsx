import styles from './styles.module.css';
import { FilmsNotFound, AdditionalInfoSection, CurrentEvents } from './components';
import { getRouteApi } from '@tanstack/react-router';
import { PER_PAGE, type FilmsListResponse, FilmsGrid, Loader, Pagination } from '~/common';

type FilmsSectionProps = {
  data: FilmsListResponse;
  isLoading: boolean;
};

const routeApi = getRouteApi('/_home/');

export const FilmsSection = ({ data, isLoading }: FilmsSectionProps) => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  if (isLoading) {
    return (
      <div className={styles.filmsSection}>
        <Loader />
      </div>
    );
  }

  if (!data.films.length) {
    return (
      <div className={styles.filmsSection}>
        <AdditionalInfoSection info={data.additionalInfo} />
        <FilmsNotFound />
      </div>
    );
  }

  const handlePageNavigation = (pageIndex: number) => {
    navigate({
      to: '/',
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.filmsSection}>
      {!searchParams.collectionId && <CurrentEvents />}
      <AdditionalInfoSection info={data.additionalInfo} />
      <FilmsGrid films={data.films} />
      <div className={styles.paginationWrapper}>
        <Pagination
          total={data.total}
          onPageChange={handlePageNavigation}
          currentPageIndex={searchParams.pageIndex}
          perPageCounter={PER_PAGE}
          totalLabel="films"
        />
      </div>
    </div>
  );
};
