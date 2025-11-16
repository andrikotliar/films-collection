import styles from './styles.module.css';
import { FilmsNotFound, AdditionalInfoSection, CurrentEvents, FilmsGrid } from './components';
import { getRouteApi } from '@tanstack/react-router';
import { PER_PAGE, type FilmsListResponse, Loader, Pagination } from '~/shared';

type Props = {
  data: FilmsListResponse;
  isLoading: boolean;
};

const routeApi = getRouteApi('/_home/');

export const FilmsSection = ({ data, isLoading }: Props) => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();

  if (isLoading) {
    return (
      <div className={styles.films_section}>
        <Loader />
      </div>
    );
  }

  if (!data.films.length) {
    return (
      <div className={styles.films_section}>
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
    <div className={styles.films_section}>
      {!searchParams.collectionId && <CurrentEvents />}
      <AdditionalInfoSection info={data.additionalInfo} />
      <FilmsGrid films={data.films} />
      <div className={styles.pagination_wrapper}>
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
