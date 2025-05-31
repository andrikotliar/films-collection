import { PeopleApi } from '@/api';
import {
  ConfirmModal,
  ConsoleContent,
  ConsoleTitle,
  Pagination,
  TextInput,
} from '@/components';
import { PEOPLE_ADMIN_PER_PAGE } from '@/constants';
import { useDebouncedSearch, useToaster } from '@/hooks';
import { fetchAdminPeopleListQuery } from '@/queries';
import { PersonForm, List, FormModal } from '@/routes/console/-components';
import {
  useManagePerson,
  usePersonForm,
} from '@/routes/console/-components/person-form/hooks';
import { EditPersonForm } from '@/routes/console/general_/people/-components';
import { Person } from '@/types';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { number, object, string } from 'yup';

const peopleListFiltersSchema = object({
  page: number(),
  q: string(),
});

export const Route = createFileRoute('/console/general_/people')({
  validateSearch: (search) => {
    return peopleListFiltersSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context: { queryClient }, deps: { search } }) => {
    await queryClient.ensureQueryData(fetchAdminPeopleListQuery(search));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const toaster = useToaster();

  const { data, refetch } = useSuspenseQuery(fetchAdminPeopleListQuery(search));

  const [itemToUpdate, setItemToUpdate] = useState<Person | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Person | null>(null);

  const form = usePersonForm();

  const { mutate: createPerson, isPending: isCreating } = useManagePerson({
    onSuccessHandler: () => {
      refetch();
      form.reset();
    },
  });

  const { mutate: deletePerson, isPending: isDeleting } = useMutation({
    mutationFn: PeopleApi.deletePerson,
    onSuccess: () => {
      refetch();
      setItemToDelete(null);
    },
    onError: (error) => toaster.error(error.message),
  });

  const handleChangePage = (pageIndex: number) => {
    navigate({
      search: {
        page: pageIndex,
      },
    });
  };

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (values) => ({
        ...values,
        q: value,
      }),
    });
  });

  return (
    <ConsoleContent>
      <ConsoleTitle>People</ConsoleTitle>
      <FormProvider {...form}>
        <PersonForm
          onSubmit={form.handleSubmit((values) => createPerson(values))}
          isLoading={isCreating}
        />
      </FormProvider>
      <TextInput
        label="Search person"
        defaultValue={search.q}
        onChange={handleSearch}
      />
      <List
        items={data.list}
        titleSelector="name"
        onDelete={setItemToDelete}
        onEdit={setItemToUpdate}
      />
      <Pagination
        total={data.total}
        currentPageIndex={search.page}
        perPageCounter={PEOPLE_ADMIN_PER_PAGE}
        onPageChange={handleChangePage}
        totalLabel="people"
      />
      <FormModal
        isOpen={itemToUpdate !== null}
        onClose={() => setItemToUpdate(null)}
      >
        {itemToUpdate !== null && (
          <EditPersonForm
            person={itemToUpdate}
            onSuccessHandler={() => {
              refetch();
              setItemToUpdate(null);
            }}
          />
        )}
      </FormModal>
      <ConfirmModal
        title={`Delete ${itemToDelete?.name}`}
        data={itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={(data) => deletePerson(data.id)}
        isPending={isDeleting}
      />
    </ConsoleContent>
  );
}
