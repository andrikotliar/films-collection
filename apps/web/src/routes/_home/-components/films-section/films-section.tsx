import styles from './films-section.module.css';
import clsx from 'clsx';
import { AdditionalInfoSection, CurrentEvents, FilmsGrid } from './components';
import { getRouteApi } from '@tanstack/react-router';
import { CameraLoader, getFilmsListQueryOptions, IconLink, PageTitle, Pagination } from '~/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { InfoIcon, SettingsIcon } from 'lucide-react';

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
      <div className={styles.header}>
        <PageTitle>Films Collection</PageTitle>
        <div className={styles.navigation}>
          <IconLink icon={<InfoIcon />} to="/about" />
          <IconLink icon={<SettingsIcon />} to="/console" />
        </div>
      </div>
      <CurrentEvents events={data.events} total={data.allFilmsCount} />
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
