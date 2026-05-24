import sanitize from 'sanitize-html';
import { createFileRoute } from '@tanstack/react-router';
import { getPageContentAdminListQueryOptions, api } from '~/shared';
import { List } from '~/routes/console/-shared';
import { GetPageContentListQueriesSchema } from '@films-collection/shared';
import { mutationOptions, useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/console/page-content')({
  validateSearch: (search) => {
    return GetPageContentListQueriesSchema.parse(search);
  },
  loader: ({ context, location }) => {
    return context.queryClient.ensureQueryData(
      getPageContentAdminListQueryOptions(location.search),
    );
  },
  component: PageContainer,
  staticData: {
    title: 'Page Content',
    backPath: '/console',
  },
  head: () => ({
    meta: [
      {
        title: 'Pages Content - Films Collection',
      },
    ],
  }),
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.pageContent.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: { queryKey: api.pageContent.getAdminList.staticKey },
    },
  });
};

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isFetching } = useQuery(getPageContentAdminListQueryOptions(searchParams));

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
  };

  const handleEditItem = (data: { id: number }) => {
    navigate({
      to: '/console/page-content/$id',
      params: {
        id: data.id.toString(),
      },
    });
  };

  return (
    <List
      data={data}
      getDeleteMutationOptions={getDeleteMutationOptions}
      onEdit={handleEditItem}
      description={(data) => {
        return sanitize(data.shortContent, {
          allowedTags: [],
          allowedAttributes: {},
        });
      }}
      isFetching={isFetching}
      onPageChange={handlePageChange}
      onNavigateToForm="/console/page-content/$id"
    />
  );
}
