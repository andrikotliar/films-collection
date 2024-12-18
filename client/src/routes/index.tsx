import * as yup from 'yup';
import { createFileRoute } from '@tanstack/react-router';
import { TitleType } from '@/enums';
import { fetchFilmsListQuery, fetchInitialDataQuery } from '@/queries';
import { FilmsListFilters } from '@/types';

const filmsListFilterSchema = yup.object().shape({
  limit: yup.number().min(0),
  skip: yup.number().min(0),
  type: yup.string().oneOf(Object.values(TitleType)),
  style: yup.string(),
  genres: yup.array(yup.string().required()),
  startDate: yup.string(),
  endDate: yup.string(),
  countries: yup.array(yup.string().required()),
  studios: yup.array(yup.string().required()),
  collection: yup.string(),
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
});
