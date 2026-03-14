import styles from './films-section.module.css';
import { FilmsNotFound, AdditionalInfoSection, CurrentEvents, FilmsGrid } from './components';
import { getRouteApi } from '@tanstack/react-router';
import { Button, Loader, Pagination, type api, type ApiResponse } from '~/shared';
import { PAGE_LIMITS } from '@films-collection/shared';
import { FilterIcon } from 'lucide-react';
import { useSidebar } from '~/routes/_home/-context';

type FilmsSectionProps = {
  data: ApiResponse<typeof api.films.list>;
  isLoading: boolean;
};

const routeApi = getRouteApi('/_home/');

export const FilmsSection = ({ data, isLoading }: FilmsSectionProps) => {
  const searchParams = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { toggleFilter } = useSidebar();

  if (isLoading) {
    return (
      <div className={styles.films_section}>
        <Loader />
      </div>
    );
  }

  if (!data.list.length) {
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
      <CurrentEvents />
      <AdditionalInfoSection info={data.additionalInfo} />
      <div className={styles.filter_wrapper}>
        <Button icon={<FilterIcon />} onClick={toggleFilter}>
          Filters
        </Button>
      </div>
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
