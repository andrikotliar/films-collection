import styles from './films-section.module.css';
import { AdditionalInfoSection, CurrentEvents, FilmsGrid, FilmsGridSkeleton } from './components';
import { getRouteApi } from '@tanstack/react-router';
import {
  getFilmsListQueryOptions,
  Logo,
  PageTitle,
  Pagination,
  SortingPopup,
  type SortingParams,
} from '~/shared';
import { useQuery } from '@tanstack/react-query';
import { FilmsNotFound } from '~/routes/_home/-components/films-section/components/films-not-found/films-not-found';
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
    label: 'Latest added',
    value: 'addedAt',
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
    label: 'Box Office',
    value: 'boxOffice',
  },
  {
    label: 'Collection order',
    value: 'collectionId',
    isNotSelectable: true,
  },
];

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
        <div className={styles.mobile_logo}>
          <Logo />
        </div>
        <PageTitle>Films Collection</PageTitle>
      </div>
      <CurrentEvents
        events={data.events}
        total={data.allFilmsCount}
        anniversaryPoster={data.anniversaryPoster}
      />
      <SortingPopup
        fields={sortingFields}
        onSorting={handleSorting}
        defaultOrder={sortingValues.order}
        defaultOrderKey={sortingValues.orderKey}
        isDisabled={searchParams.collectionId !== undefined}
        buttonWrapperClassName={styles.sorting}
      />
      <AdditionalInfoSection info={data.additionalInfo} />
      <FilmsGrid films={data.list} isCollection={!!searchParams.collectionId} />
      <Pagination
        total={data.total}
        onPageChange={handlePageNavigation}
        currentPageIndex={searchParams.pageIndex}
        perPageCounter={data.pageLimit}
        totalLabel="films"
        wrapperClassName={styles.pagination_wrapper}
      />
    </div>
  );
};
