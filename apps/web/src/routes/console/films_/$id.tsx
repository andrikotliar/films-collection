import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  isNewItem,
  Panel,
  LocalStorage,
  getInitialDataQueryOptions,
  getPendingFilmQueryOptions,
  useSuspensePendingFilm,
} from '~/shared';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { FilmForm } from '~/routes/console/films_/-components';
import { filmDefaultFormValues } from '~/routes/console/films_/-configs';
import type { FilmFormValues } from '~/routes/console/films_/-types';
import z from 'zod';
import { NEW_ITEM_ID } from '@films-collection/shared';

const ConsoleFilmQueriesSchema = z
  .object({
    pendingFilmId: z.string(),
  })
  .partial();

export const Route = createFileRoute('/console/films_/$id')({
  validateSearch: (search) => {
    return ConsoleFilmQueriesSchema.parse(search);
  },
  loaderDeps: ({ search }) => {
    return {
      search,
    };
  },
  loader: async ({ context: { queryClient }, deps, params }) => {
    await queryClient.ensureQueryData(getInitialDataQueryOptions());

    if (deps.search.pendingFilmId && params.id === NEW_ITEM_ID) {
      await queryClient.ensureQueryData(getPendingFilmQueryOptions(deps.search.pendingFilmId));
    }
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();
  const search = Route.useSearch();

  const { data: pendingFilm } = useSuspensePendingFilm(search.pendingFilmId);

  const pageTitle = isNewItem(id) ? 'Create Film' : 'Edit Film';

  const defaultValues = useMemo<FilmFormValues>(() => {
    if (pendingFilm) {
      return {
        ...filmDefaultFormValues,
        id: NEW_ITEM_ID,
        pendingFilmId: pendingFilm.id,
        title: pendingFilm.title,
        rating: pendingFilm.rating ?? filmDefaultFormValues.rating,
        collections: pendingFilm.collectionId ? [pendingFilm.collectionId] : [],
      };
    }

    const localValues = LocalStorage.getItem<FilmFormValues>(`film_${id}`);

    if (localValues) {
      return {
        ...localValues,
        poster: null,
      };
    }

    return {
      ...filmDefaultFormValues,
      isDraft: false,
    };
  }, [id, pendingFilm]);

  return (
    <ConsoleContentLayout title={pageTitle} backPath="/console/films">
      <Panel>
        <FilmForm values={defaultValues} />
      </Panel>
    </ConsoleContentLayout>
  );
}
