import * as yup from 'yup';
import { createFileRoute } from '@tanstack/react-router';
import { TitleType } from '@/enums';
import { fetchFilmsListQuery, fetchInitialDataQuery } from '@/queries';
import { FilmsListFilters } from '@/types';
import { RootPage } from '@/pages';

const filmsListFilterSchema = yup.object().shape({
  pageIndex: yup.number().min(0),
  type: yup.string().oneOf(Object.values(TitleType)),
  style: yup.string(),
  genres: yup.array(yup.string().required()),
  startDate: yup.string(),
  endDate: yup.string(),
  countries: yup.array(yup.string().required()),
  studios: yup.array(yup.string().required()),
  collection: yup.string(),
  awards: yup.string(),
  actorId: yup.string(),
  personRole: yup.string(),
  personName: yup.string(),
  duration: yup.number(),
  budget: yup.number(),
  boxOffice: yup.number(),
  seasonsTotal: yup.number(),
  episodesTotal: yup.number(),
  watchCount: yup.number(),
  rating: yup.number(),
});

export const Route = createFileRoute('/')({
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
  component: RootPage,
});
