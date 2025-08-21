import { BackLink, ConsoleContent, ConsoleTitle, Pagination } from '@/components';
import { PEOPLE_ADMIN_PER_PAGE, fetchAdminPeopleListQuery, type Person } from '@/common';
import { List, FormModal, PersonForm } from '@/routes/console/-common';
import { Filters } from '@/routes/console/general_/people/-components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { number, object, string } from 'yup';
import { useDeletePerson } from '@/hooks';

const peopleListFiltersSchema = object({
  page: number(),
  q: string().nullable(),
  role: string().nullable(),
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

  const { data } = useSuspenseQuery(fetchAdminPeopleListQuery(search));

  const [person, setPerson] = useState<Person | null>(null);

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
    <ConsoleContent>
      <BackLink path="/console/general">Back to categories</BackLink>
      <ConsoleTitle>People</ConsoleTitle>
      <Filters />
      <List
        items={data.list}
        titleSelector="name"
        onDelete={deletePerson}
        onEdit={setPerson}
        isDeletingInProgress={isDeleting}
      />
      <Pagination
        total={data.total}
        currentPageIndex={search.page}
        perPageCounter={PEOPLE_ADMIN_PER_PAGE}
        onPageChange={handleChangePage}
        totalLabel="people"
      />
      <FormModal
        values={person}
        onClose={() => setPerson(null)}
        afterSubmitEffect={() => setPerson(null)}
        form={PersonForm}
      />
    </ConsoleContent>
  );
}
