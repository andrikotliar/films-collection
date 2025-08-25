import { fetchInitialDataQuery, fetchPendingFilmQuery, isNewItem, NEW_ITEM_ID } from '@/common';
import { BackLink, ConsoleContent, ConsoleTitle, Panel } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { object, string } from 'yup';
import { FilmForm } from './-components';
import { filmDefaultFormValues } from './-configs';
import { LocalStorage } from '@/services';
import type { FilmFormValues } from '@/routes/console/films_/-types';

const consoleFilmQueriesSchema = object({
  pendingFilmId: string(),
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

    const localValues = LocalStorage.getItem<FilmFormValues>(`films:${id}`);

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
    <ConsoleContent>
      <BackLink path="/console/films">Back to list</BackLink>
      <ConsoleTitle>{pageTitle}</ConsoleTitle>
      <Panel>
        <FilmForm values={defaultValues} />
      </Panel>
    </ConsoleContent>
  );
}
