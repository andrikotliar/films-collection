import * as yup from 'yup';
import sanitize from 'sanitize-html';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  ConsoleContent,
  ConsoleTitle,
  Panel,
  Pagination,
  useDeletePageContent,
  useDocumentTitle,
  fetchAdminPageContentListQuery,
  NEW_ITEM_ID,
  PAGE_CONTENT_ADMIN_PER_PAGE,
  type PageContentListItem,
} from '~/common';
import { AddItemLink, List } from '~/routes/console/-shared';

const pageContentListFiltersSchema = yup.object().shape({
  pageIndex: yup.number(),
});

export const Route = createFileRoute('/console/page-content')({
  validateSearch: (search) => {
    return pageContentListFiltersSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(fetchAdminPageContentListQuery(deps.search));
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(fetchAdminPageContentListQuery(searchParams));

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

  const handleEditItem = (data: PageContentListItem) => {
    navigate({
      to: '/console/page-content/$id',
      params: {
        id: data.id.toString(),
      },
    });
  };

  return (
    <ConsoleContent>
      <ConsoleTitle>Pages Content</ConsoleTitle>
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
        perPageCounter={PAGE_CONTENT_ADMIN_PER_PAGE}
        currentPageIndex={searchParams.pageIndex}
        totalLabel="pages content"
      />
    </ConsoleContent>
  );
}
