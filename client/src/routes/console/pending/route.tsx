import { PendingFilmsApi } from '@/api';
import { fetchPendingFilmsListQuery } from '@/queries';
import { PendingFilmQueryFilters } from '@/types';
import { ConsoleContent, ConsoleTitle, Pagination } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string } from 'yup';
import { createPendingFilmSchema } from './-validation';
import { PendingFilmFormValues } from './-types';
import { PendingFilmForm, PendingFilmsList, Filters } from './-components';
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

  return (
    <ConsoleContent>
      <ConsoleTitle>Pending Films</ConsoleTitle>
      <FormProvider {...form}>
        <PendingFilmForm
          onSubmit={form.handleSubmit(handleCreatePendingFilm)}
          isSaving={isSaving}
          title="Add pending film"
        />
      </FormProvider>
      <Filters />
      <PendingFilmsList list={data.list} onRefetchList={refetch} />
      <Pagination
        currentPageIndex={searchParams.pageIndex}
        total={data.total}
        onPageChange={handlePageChange}
        perPageCounter={PENDING_FILMS_PER_PAGE}
      />
    </ConsoleContent>
  );
}
