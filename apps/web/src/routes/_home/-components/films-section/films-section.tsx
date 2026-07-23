import styles from './films-section.module.css';
import { AdditionalInfoSection, CurrentEvents, FilmsGrid, FilmsGridSkeleton } from './components';
import { getRouteApi } from '@tanstack/react-router';
import {
  getFilmsListQueryOptions,
  IconLink,
  PageTitle,
  Pagination,
  SortingPopup,
  type SortingParams,
} from '~/shared';
import { useQuery } from '@tanstack/react-query';
import { FilmsNotFound } from '~/routes/_home/-components/films-section/components/films-not-found/films-not-found';
import { SettingsIcon } from 'lucide-react';
import type { ListOption, SortingOrder } from '@films-collection/shared';

type SortingValues = {
  order: SortingOrder;
  orderKey: string;
};

const routeApi = getRouteApi('/_home/');

const sortingFields: ListOption<string, { isNotSelectable?: boolean }>[] = [
  {
    label: 'Release order',
    value: 'releaseDate',
  },
  {
    label: 'Updated At',
    value: 'updatedAt',
  },
  {
    label: 'Title',
    value: 'title',
  },
  {
    label: 'Collection order',
    value: 'collectionId',
    isNotSelectable: true,
  },
];

export const FilmsSection = () => {
  const searchParams = routeApi.useSearch({ select: ({ filmId: _, ...params }) => params });
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

  const handleSorting = (sorting: SortingParams) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...sorting,
        pageIndex: 0,
      }),
    });
  };

  const getSortingValues = (): SortingValues => {
    if (searchParams.collectionId) {
      return {
        order: 'asc',
        orderKey: 'collectionId',
      };
    }

    if (searchParams.order && searchParams.orderKey) {
      return {
        order: searchParams.order,
        orderKey: searchParams.orderKey,
      };
    }

    return {
      order: 'desc',
      orderKey: 'releaseDate',
    };
  };

  const sortingValues = getSortingValues();

  return (
    <div className={styles.films_section}>
      <div className={styles.header}>
        <PageTitle>Films Collection</PageTitle>
        <IconLink icon={<SettingsIcon />} to="/console" />
      </div>
      <CurrentEvents
        events={data.events}
        total={data.allFilmsCount}
        anniversaryPoster={data.anniversaryPoster}
      />
      <div className={styles.sorting}>
        <SortingPopup
          fields={sortingFields}
          onSorting={handleSorting}
          defaultOrder={sortingValues.order}
          defaultOrderKey={sortingValues.orderKey}
          isDisabled={searchParams.collectionId !== undefined}
        />
      </div>
      <AdditionalInfoSection info={data.additionalInfo} />
      <FilmsGrid films={data.list} isCollection={!!searchParams.collectionId} />
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
