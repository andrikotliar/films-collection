import sanitize from 'sanitize-html';
import { createFileRoute } from '@tanstack/react-router';
import { getArticlesAdminListQueryOptions, api, queryKey } from '~/shared';
import { List } from '~/routes/console/-shared';
import { GetArticlesListQueriesSchema } from '@films-collection/shared';
import { mutationOptions, useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/console/articles')({
  validateSearch: (search) => {
    return GetArticlesListQueriesSchema.parse(search);
  },
  loader: ({ context, location }) => {
    return context.queryClient.ensureQueryData(getArticlesAdminListQueryOptions(location.search));
  },
  component: PageContainer,
  staticData: {
    title: 'Articles',
    backPath: '/console',
  },
  head: () => ({
    meta: [
      {
        title: 'Articles - Films Collection',
      },
    ],
  }),
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.articles.delete({ params: { id } }),
    meta: {
      invalidateQueries: { queryKey: queryKey('articles.getAdminList') },
    },
  });
};

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isFetching } = useQuery(getArticlesAdminListQueryOptions(searchParams));

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
      to: '/console/articles/$id',
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
      onNavigateToForm="/console/articles/$id"
    />
  );
}
