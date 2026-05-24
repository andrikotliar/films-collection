import styles from './films-section.module.css';
import { AdditionalInfoSection, CurrentEvents, FilmsGrid, FilmsGridSkeleton } from './components';
import { getRouteApi } from '@tanstack/react-router';
import { getFilmsListQueryOptions, PageTitle, Pagination } from '~/shared';
import { useQuery } from '@tanstack/react-query';
import { FilmsNotFound } from '~/routes/_home/-components/films-section/components/films-not-found/films-not-found';

const routeApi = getRouteApi('/_home/');

export const FilmsSection = () => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { data, isFetching } = useQuery(getFilmsListQueryOptions(searchParams));

  if (isFetching) {
    return (
      <div className={styles.films_section}>
        <FilmsGridSkeleton />
      </div>
    );
  }

  if (!data) {
    return <FilmsNotFound />;
  }

  const handlePageNavigation = (pageIndex: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
  };

  return (
    <div className={styles.films_section}>
      <div className={styles.header}>
        <PageTitle>Films Collection</PageTitle>
      </div>
      <CurrentEvents
        events={data.events}
        total={data.allFilmsCount}
        anniversaryPoster={data.anniversaryPoster}
      />
      <AdditionalInfoSection info={data.additionalInfo} />
      <FilmsGrid films={data.list} />
      <div className={styles.pagination_wrapper}>
        <Pagination
          total={data.total}
          onPageChange={handlePageNavigation}
          currentPageIndex={searchParams.pageIndex}
          perPageCounter={data.pageLimit}
          totalLabel="films"
        />
      </div>
    </div>
  );
};
