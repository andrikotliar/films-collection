import * as yup from 'yup';
import { createFileRoute } from '@tanstack/react-router';
import {
  fetchFilmsListQuery,
  fetchInitialDataQuery,
  type FilmsListFilters,
} from '@/common';
import { useDocumentTitle } from '@/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import { FilmsSection, RootPageLayout, Sidebar } from './-components';

const filmsListFilterSchema = yup.object().shape({
  pageIndex: yup.number().min(0),
  type: yup.string(),
  style: yup.string(),
  genreIds: yup.array(yup.string().required()),
  startDate: yup.string(),
  endDate: yup.string(),
  countryIds: yup.array(yup.string().required()),
  studioIds: yup.array(yup.string().required()),
  collectionId: yup.string(),
  actorId: yup.string(),
  awardId: yup.string(),
  personRole: yup.string(),
  personId: yup.string(),
  rating: yup.string(),
  title: yup.string(),
});

export const Route = createFileRoute('/_home/')({
  validateSearch: (
    search: Record<string, unknown>,
  ): Partial<FilmsListFilters> => {
    return filmsListFilterSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(fetchInitialDataQuery());
    await context.queryClient.ensureQueryData(fetchFilmsListQuery(deps.search));
  },
  component: RootPageContainer,
});

function RootPageContainer() {
  useDocumentTitle();

  const routeSearch = Route.useSearch();

  const { data, isFetching } = useSuspenseQuery(
    fetchFilmsListQuery(routeSearch),
  );

  return (
    <RootPageLayout>
      <Sidebar />
      <FilmsSection data={data} isLoading={isFetching} />
    </RootPageLayout>
  );
}
