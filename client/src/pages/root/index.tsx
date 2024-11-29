import { Sidebar, FilmsSection, RootPageLayout } from './components';
import { useDocumentTitle, useQueryFilter } from '@/hooks';
import { useMemo } from 'react';
import { countObjectKeys } from '@/helpers';
import { PER_PAGE } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { createFilmsListQuery } from '@/queries';

const RootPage = () => {
  useDocumentTitle();

  const { filterParams } = useQueryFilter();

  const filters = useMemo(() => {
    if (countObjectKeys(filterParams) === 0) {
      return {
        limit: PER_PAGE,
        skip: 0,
      };
    }

    return {
      ...filterParams,
      limit: PER_PAGE,
      skip: filterParams.skip ? filterParams.skip * PER_PAGE : 0,
    };
  }, [filterParams]);

  const { data, isLoading } = useQuery(createFilmsListQuery(filters));

  return (
    <RootPageLayout>
      <Sidebar />
      <FilmsSection data={data} isLoading={isLoading} />
    </RootPageLayout>
  );
};

export { RootPage };
