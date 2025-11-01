import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import * as yup from 'yup';
import {
  fetchInitialDataQuery,
  fetchPendingFilmQuery,
  isNewItem,
  NEW_ITEM_ID,
  Panel,
  LocalStorage,
} from '~/common';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { FilmForm } from '~/routes/console/films_/-components';
import { filmDefaultFormValues } from '~/routes/console/films_/-configs';
import type { FilmFormValues } from '~/routes/console/films_/-types';

const consoleFilmQueriesSchema = yup.object({
  pendingFilmId: yup.string(),
});

export const Route = createFileRoute('/console/films_/$id')({
  validateSearch: (search) => {
    return consoleFilmQueriesSchema.validateSync(search);
  },
  loaderDeps: ({ search }) => {
    return {
      search,
    };
  },
  loader: async ({ context: { queryClient }, deps, params }) => {
    await queryClient.ensureQueryData(fetchInitialDataQuery());

    if (deps.search.pendingFilmId && params.id === NEW_ITEM_ID) {
      await queryClient.ensureQueryData(fetchPendingFilmQuery(deps.search.pendingFilmId));
    }
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();
  const search = Route.useSearch();

  const { data: pendingFilm } = useSuspenseQuery(fetchPendingFilmQuery(search.pendingFilmId));

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
