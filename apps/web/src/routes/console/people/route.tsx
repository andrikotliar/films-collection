import {
  api,
  countObjectKeys,
  Filters,
  FiltersSidebar,
  filterValues,
  getEmptyFormValues,
  getPeopleAdminListQueryOptions,
  TextInput,
  useDebouncedSearch,
  useSidebarVisibility,
  type FilterItem,
  type Input,
} from '~/shared';
import {
  Column,
  ContentWithSidebar,
  List,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { PersonForm } from '~/routes/console/people/-components';
import { createFileRoute } from '@tanstack/react-router';
import {
  convertEnumValuesToOption,
  GetPeopleListQuerySchema,
  PersonRole,
  enumValues,
} from '@films-collection/shared';
import { mutationOptions, useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import type { z } from 'zod';
import { useMemo } from 'react';

const personDefaultValues = getEmptyFormValues<Input<typeof api.people.create.exec>>({
  name: '',
  selected: false,
});

const filtersConfig: Array<FilterItem<z.infer<typeof GetPeopleListQuerySchema>>> = [
  {
    id: 'selected',
    title: 'Content',
    type: 'boolean',
    options: [
      {
        id: 'selected',
        label: 'Selected',
      },
      {
        id: 'notAssigned',
        label: 'Not assigned',
      },
    ],
  },
  {
    id: 'role',
    title: 'Role',
    type: 'checkmark',
    options: convertEnumValuesToOption(enumValues(PersonRole)),
    inputType: 'radio',
  },
];

const defaultFilters: z.infer<typeof GetPeopleListQuerySchema> = {
  selected: false,
  notAssigned: false,
  role: null,
};

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
  loader: async ({ context: { queryClient }, location }) => {
    return await queryClient.ensureQueryData(getPeopleAdminListQueryOptions(location.search));
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
  const { isFilterOpen, toggleFilter } = useSidebarVisibility();

  const { data, isFetching } = useQuery(getPeopleAdminListQueryOptions(search));

  const handleChangePage = (pageIndex: number) => {
    navigate({
      search: (values) => ({
        ...values,
        pageIndex,
      }),
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

  const appliedFilters = countObjectKeys(search, ['pageIndex', 'q']);

  const initialFilters = useMemo(() => {
    return {
      ...defaultFilters,
      ...search,
    };
  }, [search]);

  const filterPeople = (data: z.infer<typeof GetPeopleListQuerySchema>) => {
    const appliedFilters = filterValues(data);
    navigate({
      search: (values) => ({
        ...values,
        ...appliedFilters,
      }),
    });
  };

  const handleReset = () => {
    navigate({
      to: '/console/people',
    });
  };

  return (
    <ContentWithSidebar>
      <FiltersSidebar
        isOpen={isFilterOpen}
        onToggle={toggleFilter}
        filtersCount={appliedFilters}
        heightReducer="100px"
        topPositionMargin="80px"
      >
        <Filters
          defaultValues={initialFilters}
          config={filtersConfig}
          schema={GetPeopleListQuerySchema}
          filtersCount={appliedFilters}
          resetValues={defaultFilters}
          onSubmit={filterPeople}
          onReset={handleReset}
        />
      </FiltersSidebar>
      <Column>
        <TextInput
          placeholder="Search person"
          defaultValue={search.q ?? ''}
          onChange={handleSearch}
          icon={<SearchIcon />}
        />
        <List
          data={data}
          titleKey="name"
          getDeleteMutationOptions={getDeleteMutationOptions}
          onEdit={onOpen}
          isFetching={isFetching}
          onPageChange={handleChangePage}
          onCreate={() => onOpen(personDefaultValues)}
          createItemTitle="New crew or cast member"
        />
      </Column>
    </ContentWithSidebar>
  );
}
