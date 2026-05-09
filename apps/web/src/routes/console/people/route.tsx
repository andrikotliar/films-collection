import { api, getEmptyFormValues, getPeopleAdminListQueryOptions, type Input } from '~/shared';
import { List, useFormModal, withFormModal } from '~/routes/console/-shared';
import { Filters, PersonForm } from '~/routes/console/people/-components';
import { createFileRoute } from '@tanstack/react-router';
import { GetPeopleListQuerySchema } from '@films-collection/shared';
import { mutationOptions, useSuspenseQuery } from '@tanstack/react-query';

const personDefaultValues = getEmptyFormValues<Input<typeof api.people.create.exec>>({
  name: '',
  selected: false,
});

const getDeleteMutationOptions = () => {
  return mutationOptions({
    mutationFn: (id: number) => api.people.delete.exec({ params: { id } }),
    meta: {
      invalidateQueries: { queryKey: api.people.getList.staticKey },
    },
  });
};

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
  staticData: {
    title: 'Crew and Cast',
    backPath: '/console',
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { onOpen } = useFormModal();

  const { data: people, isFetching } = useSuspenseQuery(getPeopleAdminListQueryOptions(search));

  const handleChangePage = (pageIndex: number) => {
    navigate({
      search: (values) => ({
        ...values,
        pageIndex,
      }),
    });
  };

  return (
    <>
      <Filters />
      <List
        data={people}
        titleKey="name"
        getDeleteMutationOptions={getDeleteMutationOptions}
        onEdit={onOpen}
        isFetching={isFetching}
        onPageChange={handleChangePage}
        onCreate={() => onOpen(personDefaultValues)}
        createItemTitle="New crew or cast member"
      />
    </>
  );
}
