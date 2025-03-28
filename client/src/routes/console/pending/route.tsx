import { PendingFilmsApi } from '@/api';
import { fetchPendingFilmsListQuery } from '@/queries';
import { PendingFilm, PendingFilmQueryFilters } from '@/types';
import {
  ConfirmModal,
  ConsoleContentLayout,
  ConsoleTitle,
  Island,
  Pagination,
} from '@/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string } from 'yup';
import { createPendingFilmSchema } from './-validation';
import { PendingFilmFormValues } from './-types';
import {
  PendingFilmForm,
  EditPendingFilmModal,
  PendingFilmRow,
  Tools,
} from './-components';
import { PENDING_FILMS_PER_PAGE } from '@/constants';

const pendingFilmsFilterSchema = object().shape({
  q: string(),
  priority: number().min(1).max(3),
  pageIndex: number().min(0),
  orderKey: string(),
  order: string().oneOf(['asc', 'desc']),
});

const defaultFormValues: PendingFilmFormValues = {
  title: '',
  priority: '1',
  collectionId: null,
  rating: null,
};

export const Route = createFileRoute('/console/pending')({
  validateSearch: (search): PendingFilmQueryFilters => {
    return pendingFilmsFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(
      fetchPendingFilmsListQuery(deps.search),
    );
  },
  component: PageContainer,
});

function PageContainer() {
  const [editModalContent, setEditModalContent] = useState<PendingFilm | null>(
    null,
  );
  const [filmToDelete, setFilmToDelete] = useState<PendingFilm | null>(null);

  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data, refetch } = useSuspenseQuery(
    fetchPendingFilmsListQuery(searchParams),
  );

  const form = useForm({
    defaultValues: defaultFormValues,
    resolver: yupResolver(createPendingFilmSchema),
  });

  const { mutate: createPendingFilm, isPending: isSaving } = useMutation({
    mutationFn: PendingFilmsApi.createPendingFilm,
    onSuccess: () => {
      refetch();
      form.reset(defaultFormValues);
    },
  });

  const { mutate: deletePendingFilm, isPending: isDeleteInProgress } =
    useMutation({
      mutationFn: PendingFilmsApi.deletePendingFilm,
      onSuccess: () => {
        refetch();
        setFilmToDelete(null);
      },
    });

  const handleCreatePendingFilm: SubmitHandler<PendingFilmFormValues> = (
    data,
  ) => {
    createPendingFilm({
      title: data.title.trim(),
      priority: Number(data.priority),
      collectionId: data.collectionId ? Number(data.collectionId) : null,
      rating: data.rating,
    });
  };

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageIndex,
      }),
    });
  };

  const handleDeletePendingFilm = (film: PendingFilm) => {
    deletePendingFilm(film.id);
  };

  return (
    <ConsoleContentLayout>
      <ConsoleTitle>Pending Films</ConsoleTitle>
      <FormProvider {...form}>
        <PendingFilmForm
          onSubmit={form.handleSubmit(handleCreatePendingFilm)}
          isSaving={isSaving}
          title="Add pending film"
        />
      </FormProvider>
      <Tools />
      <Island hasPaddings={false}>
        {data.list.map((film) => (
          <PendingFilmRow
            key={film.id}
            data={film}
            onDelete={() => setFilmToDelete(film)}
            onEdit={() => setEditModalContent(film)}
            isDeleteInProgress={isDeleteInProgress}
          />
        ))}
      </Island>

      <Pagination
        currentPageIndex={searchParams.pageIndex}
        total={data.total}
        onPageChange={handlePageChange}
        perPageCounter={PENDING_FILMS_PER_PAGE}
      />

      <EditPendingFilmModal
        onClose={() => setEditModalContent(null)}
        defaultValues={editModalContent}
        refetch={refetch}
      />

      <ConfirmModal
        title={`Confirm deleting ${filmToDelete?.title}`}
        data={filmToDelete}
        onClose={() => setFilmToDelete(null)}
        onConfirm={handleDeletePendingFilm}
        confirmButtonTitle="Delete"
        confirmButtonVariant="danger"
      />
    </ConsoleContentLayout>
  );
}
