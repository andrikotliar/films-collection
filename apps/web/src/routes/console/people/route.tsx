import {
  api,
  getEmptyFormValues,
  getPeopleAdminListQueryOptions,
  Pagination,
  queryKeys,
  type Input,
} from '~/shared';
import {
  List,
  AddItemButton,
  ConsoleContentLayout,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { Filters, PersonForm } from '~/routes/console/people/-components';
import { createFileRoute } from '@tanstack/react-router';
import { GetPeopleListQuerySchema, PAGE_LIMITS } from '@films-collection/shared';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

const personDefaultValues = getEmptyFormValues<Input<typeof api.people.create>>({
  name: '',
  selected: false,
});

export const Route = createFileRoute('/console/people')({
  validateSearch: (search) => {
    return GetPeopleListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context: { queryClient }, deps: { search } }) => {
    return await queryClient.ensureQueryData(getPeopleAdminListQueryOptions(search));
  },
  component: withFormModal(PersonForm, RouteComponent),
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { onOpen } = useFormModal();

  const { data: people } = useSuspenseQuery(getPeopleAdminListQueryOptions(search));

  const handleChangePage = (pageIndex: number) => {
    navigate({
      search: (values) => ({
        ...values,
        page: pageIndex,
      }),
    });
  };

  const { mutateAsync: deletePerson, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => api.people.remove({ params: { id } }),
    meta: {
      invalidateQueries: [queryKeys.people.list()],
    },
  });

  return (
    <ConsoleContentLayout title="Crew and cast" backPath="/console">
      <AddItemButton onClick={() => onOpen(personDefaultValues)}>
        Add crew or cast member
      </AddItemButton>
      <Filters />
      <List
        items={people.list}
        titleKey="name"
        onDelete={deletePerson}
        onEdit={onOpen}
        isDeletingInProgress={isDeleting}
      />
      <Pagination
        total={people.total}
        currentPageIndex={search.pageIndex}
        perPageCounter={PAGE_LIMITS.default}
        onPageChange={handleChangePage}
        totalLabel="people"
      />
    </ConsoleContentLayout>
  );
}
