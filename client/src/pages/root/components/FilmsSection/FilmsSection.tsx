import styles from './FilmsSection.module.css';
import { FC } from 'react';
import { FilmsGrid, Loader, Pagination } from '@/ui';
import { FilmsNotFound, AdditionalInfoSection } from './components';
import { FilmsListResponse } from '@/types';
import { getRouteApi } from '@tanstack/react-router';
import { PER_PAGE } from '@/constants';

type FilmsSectionProps = {
  data: FilmsListResponse;
  isLoading: boolean;
};

const routeApi = getRouteApi('/');

export const FilmsSection: FC<FilmsSectionProps> = ({ data, isLoading }) => {
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
      <AdditionalInfoSection info={data.additionalInfo} />
      <FilmsGrid films={data.films} />
      <div className={styles.paginationWrapper}>
        <Pagination
          total={data.total}
          onPageChange={handlePageNavigation}
          currentPageIndex={searchParams.pageIndex}
          perPageCounter={PER_PAGE}
        />
      </div>
    </div>
  );
};
