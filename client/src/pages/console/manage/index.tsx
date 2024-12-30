import { useSuspenseQuery } from '@tanstack/react-query';
import { ConsoleTitle } from '../components';
import { ManageFilmsLayout } from './components';
import { fetchAdminListQuery } from '@/queries';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/console/manage');

export const ConsoleManageFilmsPage = () => {
  const searchParams = routeApi.useSearch();
  const { data } = useSuspenseQuery(fetchAdminListQuery(searchParams));

  return (
    <ManageFilmsLayout>
      <ConsoleTitle>Manage films</ConsoleTitle>
    </ManageFilmsLayout>
  );
};
