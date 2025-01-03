import { useSuspenseQuery } from '@tanstack/react-query';
import { ConsoleContentLayout, ConsoleTitle } from '../components';
import { fetchAdminListQuery } from '@/queries';
import { getRouteApi } from '@tanstack/react-router';
import { Island } from '@/components';

const routeApi = getRouteApi('/console/manage');

export const ConsoleManageFilmsPage = () => {
  const searchParams = routeApi.useSearch();
  const { data } = useSuspenseQuery(fetchAdminListQuery(searchParams));

  return (
    <ConsoleContentLayout>
      <ConsoleTitle>Manage films</ConsoleTitle>
      <Island displayPadding={false}></Island>
    </ConsoleContentLayout>
  );
};
