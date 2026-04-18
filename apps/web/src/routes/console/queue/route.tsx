import { GetIncompleteFilmsQuerySchema, PAGE_LIMITS } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import type z from 'zod';
import {
  AddItemButton,
  ConsoleContentLayout,
  filmDefaultFormValues,
  List,
  useDeleteFilm,
  useFormModal,
  withFormModal,
  type FilmFormSchema,
} from '~/routes/console/-shared';
import { PartialFilmForm } from '~/routes/console/queue/-components';
import { Filters } from '~/routes/console/queue/-components/filters/filters';
import { listHandlers } from '~/routes/console/queue/-configs';
import { getDescription } from '~/routes/console/queue/-helpers';
import {
  getIncompleteFilmsListQueryOptions,
  Pagination,
  TextInput,
  useDebouncedSearch,
} from '~/shared';

export const Route = createFileRoute('/console/queue')({
  validateSearch: (search) => {
    return GetIncompleteFilmsQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(getIncompleteFilmsListQueryOptions(deps.search));
  },
  component: withFormModal(PartialFilmForm, RouteComponent),
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const { data, isFetching } = useSuspenseQuery(getIncompleteFilmsListQueryOptions(search));

  const { onOpen } = useFormModal<z.infer<typeof FilmFormSchema>>();

  const { mutateAsync, isPending } = useDeleteFilm();

  const handlePageChange = (pageIndex: number) => {
    navigate({
      search: (previous) => ({
        ...previous,
        pageIndex,
      }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (params) => ({
        ...params,
        pageIndex: 0,
        q: value,
      }),
    });
  });

  return (
    <ConsoleContentLayout title="Pending Films" backPath="/console">
      <AddItemButton onClick={() => onOpen({ ...filmDefaultFormValues, status: 'PLANNED' })}>
        Add film
      </AddItemButton>
      <TextInput
        placeholder="Search film"
        onChange={handleSearch}
        defaultValue={search.q ?? ''}
        icon={<SearchIcon />}
      />
      <Filters />
      <List
        items={data.list}
        isFetching={isFetching}
        isDeletingInProgress={isPending}
        onDelete={mutateAsync}
        description={getDescription}
        onEdit={(values) => onOpen({ ...filmDefaultFormValues, ...values })}
        onCreate={(data) => {
          navigate({ to: '/console/films/$id', params: { id: data.id.toString() } });
        }}
        additionalHandlers={listHandlers}
      />
      <Pagination
        total={data.count}
        perPageCounter={PAGE_LIMITS.default}
        onPageChange={handlePageChange}
        currentPageIndex={search.pageIndex}
        totalLabel="films"
      />
    </ConsoleContentLayout>
  );
}
