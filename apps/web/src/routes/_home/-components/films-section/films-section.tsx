import styles from './films-section.module.css';
import clsx from 'clsx';
import { AdditionalInfoSection, FilmsGrid } from './components';
import { getRouteApi } from '@tanstack/react-router';
import { CameraLoader, getFilmsListQueryOptions, Pagination } from '~/shared';
import { PAGE_LIMITS } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';

const routeApi = getRouteApi('/_home/');

export const FilmsSection = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { data, isFetching } = useSuspenseQuery(getFilmsListQueryOptions(searchParams));

  if (isFetching) {
    return (
      <div className={clsx(styles.films_section, styles.loader_wrapper)}>
        <CameraLoader />
      </div>
    );
  }

  const handlePageNavigation = (pageIndex: number) => {
    navigate({
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
      <AdditionalInfoSection info={data.additionalInfo} />
      <FilmsGrid films={data.list} />
      <div className={styles.pagination_wrapper}>
        <Pagination
          total={data.total}
          onPageChange={handlePageNavigation}
          currentPageIndex={searchParams.pageIndex}
          perPageCounter={PAGE_LIMITS.filmsList}
          totalLabel="films"
        />
      </div>
    </div>
  );
};
