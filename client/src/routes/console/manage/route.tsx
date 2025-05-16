import { FILMS_ADMIN_LIST_PER_PAGE, NEW_FILM_ID } from '@/constants';
import { useDocumentTitle } from '@/hooks';
import { fetchAdminListQuery } from '@/queries';
import { AdminFilmsQueryFilters, FilmsAdminListItem } from '@/types';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  ConsoleContent,
  ConsoleTitle,
  Panel,
  Pagination,
  ConfirmModal,
} from '@/components';
import { number, object, string } from 'yup';
import { AddItemLink } from '@/routes/console/-components';
import { AdminFilm, AdminFilmsGrid, AdminFilmsTools } from './-components';
import { FilmsApi } from '@/api';
import { useState } from 'react';

const adminFilmsFilterSchema = object().shape({
  q: string(),
  pageIndex: number().min(0),
  sortingField: string(),
  sortingDirection: string().oneOf(['asc', 'desc']),
});

export const Route = createFileRoute('/console/manage')({
  validateSearch: (search): AdminFilmsQueryFilters => {
    return adminFilmsFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      fetchAdminListQuery(deps.search),
    );
  },
  component: PageContainer,
});

function PageContainer() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, refetch } = useSuspenseQuery(fetchAdminListQuery(searchParams));

  const [filmToDelete, setFilmToDelete] = useState<FilmsAdminListItem | null>(
    null,
  );

  const {
    mutate: handleDeleteFilm,
    isPending,
    error: deletionError,
    variables,
  } = useMutation({
    mutationFn: FilmsApi.deleteFilm,
    onSuccess: () => {
      refetch();
      setFilmToDelete(null);
    },
  });

  useDocumentTitle('Admin list');

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (params) => ({
        ...params,
        pageIndex,
      }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ConsoleContent>
      <ConsoleTitle>Manage films</ConsoleTitle>
      <AdminFilmsTools />
      <AddItemLink to="/console/manage/$id" params={{ id: NEW_FILM_ID }}>
        Add new film
      </AddItemLink>
      <Panel>
        <AdminFilmsGrid>
          {data.films.map((film) => (
            <AdminFilm film={film} key={film.id} onDelete={setFilmToDelete} />
          ))}
        </AdminFilmsGrid>
      </Panel>
      <Pagination
        total={data.total}
        perPageCounter={FILMS_ADMIN_LIST_PER_PAGE}
        onPageChange={handlePageChange}
        currentPageIndex={searchParams.pageIndex}
        totalLabel="films"
      />
      <ConfirmModal
        title={`Confirm delete ${filmToDelete?.title}`}
        data={filmToDelete}
        onClose={() => setFilmToDelete(null)}
        onConfirm={(film) => handleDeleteFilm(film.id)}
        isPending={isPending}
        error={variables === filmToDelete?.id ? deletionError?.message : null}
      />
    </ConsoleContent>
  );
}
