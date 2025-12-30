import {
  getPeopleAdminListQueryOptions,
  Pagination,
  useDeletePerson,
  useSuspensePeopleAdminList,
} from '~/shared';
import {
  List,
  FormModal,
  PersonForm,
  AddItemButton,
  ConsoleContentLayout,
  type PersonFormSchema,
} from '~/routes/console/-shared';
import { Filters } from '~/routes/console/general_/people/-components';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { personDefaultValues } from '~/routes/console/-shared/components/person-form/configs';
import { GetPeopleListQuerySchema, PAGE_LIMITS } from '@films-collection/shared';
import type z from 'zod';

export const Route = createFileRoute('/console/general_/people')({
  validateSearch: (search) => {
    return GetPeopleListQuerySchema.parse(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context: { queryClient }, deps: { search } }) => {
    return await queryClient.ensureQueryData(getPeopleAdminListQueryOptions(search));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data: people } = useSuspensePeopleAdminList(search);

  const [person, setPerson] = useState<z.infer<typeof PersonFormSchema> | null>(null);

  const handleChangePage = (pageIndex: number) => {
    navigate({
      search: (values) => ({
        ...values,
        page: pageIndex,
      }),
    });
  };

  const { mutateAsync: deletePerson, isPending: isDeleting } = useDeletePerson();

  return (
    <ConsoleContentLayout
      title="Crew and cast"
      backPath="/console/general"
      backPathTitle="Back to categories"
    >
      <AddItemButton onClick={() => setPerson(personDefaultValues)}>
        Add crew or cast member
      </AddItemButton>
      <Filters />
      <List
        items={people.list}
        titleKey="name"
        onDelete={deletePerson}
        onEdit={setPerson}
        isDeletingInProgress={isDeleting}
      />
      <Pagination
        total={people.total}
        currentPageIndex={search.pageIndex}
        perPageCounter={PAGE_LIMITS.default}
        onPageChange={handleChangePage}
        totalLabel="people"
      />
      <FormModal
        values={person}
        onClose={() => setPerson(null)}
        afterSubmitEffect={() => setPerson(null)}
        form={PersonForm}
      />
    </ConsoleContentLayout>
  );
}
