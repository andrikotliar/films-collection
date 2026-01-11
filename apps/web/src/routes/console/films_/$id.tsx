import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  isNewItem,
  Panel,
  LocalStorage,
  getInitialDataQueryOptions,
  getPendingFilmQueryOptions,
  getAdminFilmDetailsQueryOptions,
  getMixedId,
} from '~/shared';
import { ConsoleContentLayout } from '~/routes/console/-shared';
import { FilmForm } from '~/routes/console/films_/-components';
import { filmDefaultFormValues } from '~/routes/console/films_/-configs';
import z from 'zod';
import { NEW_ITEM_ID } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { FilmFormSchema } from '~/routes/console/films_/-schemas';

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

    if (deps.search.pendingFilmId && isNewItem(params.id)) {
      await queryClient.ensureQueryData(getPendingFilmQueryOptions(deps.search.pendingFilmId));
    }

    if (!isNewItem(params.id)) {
      await queryClient.ensureQueryData(getAdminFilmDetailsQueryOptions(Number(params.id)));
    }
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();
  const search = Route.useSearch();

  const { data: pendingFilm } = useSuspenseQuery(getPendingFilmQueryOptions(search.pendingFilmId));
  const { data: film } = useSuspenseQuery(getAdminFilmDetailsQueryOptions(getMixedId(id)));

  const pageTitle = isNewItem(id) ? 'Create film' : `Edit film ${film?.title}`;

  const defaultValues = useMemo<z.infer<typeof FilmFormSchema>>(() => {
    const localValues = LocalStorage.getItem<z.infer<typeof FilmFormSchema>>(`film_${id}`);

    if (film) {
      if (!localValues) {
        return {
          ...film,
          id: Number(id),
        };
      }

      return localValues;
    }

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

    if (localValues) {
      return localValues;
    }

    return {
      ...filmDefaultFormValues,
      isDraft: false,
    };
  }, [id, pendingFilm, film]);

  return (
    <ConsoleContentLayout title={pageTitle} backPath="/console/films">
      <Panel>
        <FilmForm values={defaultValues} />
      </Panel>
    </ConsoleContentLayout>
  );
}
