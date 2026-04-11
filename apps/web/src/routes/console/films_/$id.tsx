import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  isNewItem,
  getInitialDataQueryOptions,
  getAdminFilmDetailsQueryOptions,
  getMixedId,
  getFilmDraftsQueryOptions,
} from '~/shared';
import { ConsoleContentLayout, filmDefaultFormValues } from '~/routes/console/-shared';
import { FilmForm } from '~/routes/console/films_/-components';
import type z from 'zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { FilmFormSchema } from '~/routes/console/-shared/schemas';

export const Route = createFileRoute('/console/films_/$id')({
  loaderDeps: ({ search }) => {
    return {
      search,
    };
  },
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(getInitialDataQueryOptions());

    if (!isNewItem(params.id)) {
      await queryClient.ensureQueryData(getAdminFilmDetailsQueryOptions(Number(params.id)));
    }

    await queryClient.ensureQueryData(getFilmDraftsQueryOptions(params.id));
  },
  component: PageContainer,
});

function PageContainer() {
  const { id } = Route.useParams();
  const { data: film } = useSuspenseQuery(getAdminFilmDetailsQueryOptions(getMixedId(id)));

  const pageTitle = isNewItem(id) ? 'Create film' : `Edit film ${film?.title}`;

  const defaultValues = useMemo<z.infer<typeof FilmFormSchema>>(() => {
    if (film) {
      return {
        ...film,
        id: Number(id),
      };
    }

    return filmDefaultFormValues;
  }, [id, film]);

  return (
    <ConsoleContentLayout title={pageTitle} backPath="/console/films">
      <FilmForm values={defaultValues} />
    </ConsoleContentLayout>
  );
}
