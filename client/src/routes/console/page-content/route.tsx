import { useDeletePageContent, useDocumentTitle } from '@/hooks';
import {
  fetchAdminPageContentListQuery,
  NEW_ITEM_ID,
  PAGE_CONTENT_ADMIN_PER_PAGE,
  type PageContentListItem,
} from '@/common';
import { ConfirmModal, ConsoleContent, ConsoleTitle, Panel, Pagination } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { number, object } from 'yup';
import { PageContentRow } from './-components';
import { AddItemLink } from '@/routes/console/-common';
import { useState } from 'react';

const pageContentListFiltersSchema = object().shape({
  pageIndex: number(),
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
  const [pageContentToDelete, setPageContentToDelete] = useState<PageContentListItem | null>(null);

  const { mutate: deletePageContent, isPending } = useDeletePageContent();

  useDocumentTitle('Page Content');

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
  };

  return (
    <ConsoleContent>
      <ConsoleTitle>Pages Content</ConsoleTitle>
      <AddItemLink to="/console/page-content/$id" params={{ id: NEW_ITEM_ID }}>
        Add new page content
      </AddItemLink>
      <Panel hasPaddings={false}>
        {data.list.map((pageContent) => (
          <PageContentRow
            data={pageContent}
            key={pageContent.id}
            onDelete={setPageContentToDelete}
          />
        ))}
      </Panel>
      <Pagination
        total={data.count}
        onPageChange={handlePageChange}
        perPageCounter={PAGE_CONTENT_ADMIN_PER_PAGE}
        currentPageIndex={searchParams.pageIndex}
        totalLabel="pages content"
      />
      <ConfirmModal
        title={`Delete ${pageContentToDelete?.title} ?`}
        data={pageContentToDelete}
        onClose={() => setPageContentToDelete(null)}
        onConfirm={(data) => deletePageContent(data.id)}
        isPending={isPending}
      />
    </ConsoleContent>
  );
}
