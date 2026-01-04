import sanitize from 'sanitize-html';
import { createFileRoute } from '@tanstack/react-router';
import {
  Panel,
  Pagination,
  useDeletePageContent,
  useDocumentTitle,
  getPageContentAdminListQueryOptions,
  useSuspensePageContentAdminList,
} from '~/shared';
import { AddItemLink, ConsoleContentLayout, List } from '~/routes/console/-shared';
import {
  GetPageContentListQueriesSchema,
  NEW_ITEM_ID,
  PAGE_LIMITS,
} from '@films-collection/shared';

export const Route = createFileRoute('/console/page-content')({
  validateSearch: (search) => {
    return GetPageContentListQueriesSchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(getPageContentAdminListQueryOptions(deps.search));
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspensePageContentAdminList(searchParams);

  const { mutateAsync: deletePageContent, isPending } = useDeletePageContent();

  useDocumentTitle('Page Content');

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
    <ConsoleContentLayout title="Pages Content" backPath="/console">
      <AddItemLink to="/console/page-content/$id" params={{ id: NEW_ITEM_ID }}>
        Add new page content
      </AddItemLink>
      <Panel hasPaddings={false}>
        <List
          items={data.list}
          onDelete={deletePageContent}
          onEdit={handleEditItem}
          description={(data) => {
            return sanitize(data.shortContent, {
              allowedTags: [],
              allowedAttributes: {},
            });
          }}
          isDeletingInProgress={isPending}
        />
      </Panel>
      <Pagination
        total={data.count}
        onPageChange={handlePageChange}
        perPageCounter={PAGE_LIMITS.default}
        currentPageIndex={searchParams.pageIndex}
        totalLabel="pages content"
      />
    </ConsoleContentLayout>
  );
}
