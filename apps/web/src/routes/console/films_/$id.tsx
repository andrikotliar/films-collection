import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import {
  isNewItem,
  buildGetInitialDataQueryOptions,
  buildGetAdminFilmDetailsQueryOptions,
  getMixedId,
  buildGetFilmDraftsQueryOptions,
  buildGetAllCollectionOptionsQueryOptions,
  buildMetaTitle,
} from '~/shared';
import { filmDefaultFormValues } from '~/routes/console/-shared';
import { FilmForm } from '~/routes/console/films_/-components';
import type z from 'zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { FilmFormSchema } from '~/routes/console/films_/-components/film-form/-schemas';
import { GetAdminListQuerySchema } from '@hobbies-collection/shared';

export const Route = createFileRoute('/console/films_/$id')({
  validateSearch: (search) => GetAdminListQuerySchema.parse(search),
  loaderDeps: ({ search }) => {
    return {
      search,
    };
  },
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(buildGetInitialDataQueryOptions());
    await queryClient.ensureQueryData(buildGetFilmDraftsQueryOptions(params.id));
    await queryClient.ensureQueryData(buildGetAllCollectionOptionsQueryOptions());

    if (!isNewItem(params.id)) {
      return await queryClient.ensureQueryData(
        buildGetAdminFilmDetailsQueryOptions(Number(params.id)),
      );
    }
  },
  component: PageContainer,
  staticData: {
    title: 'Films',
    backPath: '/console/films',
    preserveSearch: true,
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: buildMetaTitle(loaderData?.title ?? 'New film'),
      },
    ],
  }),
});

function PageContainer() {
  const { id } = Route.useParams();
  const { data: film } = useSuspenseQuery(buildGetAdminFilmDetailsQueryOptions(getMixedId(id)));

  const defaultValues = useMemo<z.infer<typeof FilmFormSchema>>(() => {
    if (film) {
      return {
        ...film,
        id: Number(id),
      };
    }

    return filmDefaultFormValues;
  }, [id, film]);

  return <FilmForm values={defaultValues} />;
}
