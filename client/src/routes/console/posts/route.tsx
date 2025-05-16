import { useDocumentTitle } from '@/hooks';
import { fetchAdminPostsListQuery } from '@/queries';
import {
  ConfirmModal,
  ConsoleContent,
  ConsoleTitle,
  Panel,
  Pagination,
} from '@/components';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { number, object } from 'yup';
import { PostRow } from './-components';
import { AddItemLink } from '@/routes/console/-components';
import { NEW_POST_ID, POSTS_ADMIN_PER_PAGE } from '@/constants';
import { useState } from 'react';
import { PostsListItem } from '@/types';
import { PostsApi } from '@/api';

const postsListFiltersSchema = object().shape({
  pageIndex: number(),
});

export const Route = createFileRoute('/console/posts')({
  validateSearch: (search) => {
    return postsListFiltersSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      fetchAdminPostsListQuery(deps.search),
    );
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, refetch } = useSuspenseQuery(
    fetchAdminPostsListQuery(searchParams),
  );
  const [postToDelete, setPostToDelete] = useState<PostsListItem | null>(null);

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: (id: number) => PostsApi.deletePost(id),
    onSuccess: () => {
      refetch();
      setPostToDelete(null);
    },
  });

  useDocumentTitle('Posts');

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
      <ConsoleTitle>Posts</ConsoleTitle>
      <AddItemLink to="/console/posts/$id" params={{ id: NEW_POST_ID }}>
        Add new post
      </AddItemLink>
      <Panel hasPaddings={false}>
        {data.list.map((post) => (
          <PostRow data={post} key={post.id} onDelete={setPostToDelete} />
        ))}
      </Panel>
      <Pagination
        total={data.count}
        onPageChange={handlePageChange}
        perPageCounter={POSTS_ADMIN_PER_PAGE}
        currentPageIndex={searchParams.pageIndex}
      />
      <ConfirmModal
        title={`Delete ${postToDelete?.title} ?`}
        data={postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={(data) => deletePost(data.id)}
        isPending={isPending}
      />
    </ConsoleContent>
  );
}
