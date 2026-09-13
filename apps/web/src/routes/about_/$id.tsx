import { HobbyByIdQueriesSchema } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  HobbyContainer,
  HobbyItemFilters,
  HobbyItemsGrid,
  HobbyTitle,
} from '~/routes/about_/-components';
import { getHobbyRelatedCollectionsQueryOptions, getHobbyWithItemsQueryOptions } from '~/shared';

export const Route = createFileRoute('/about_/$id')({
  validateSearch: HobbyByIdQueriesSchema.parse,
  loader: async ({ context, params, location }) => {
    const hobby = await context.queryClient.ensureQueryData(
      getHobbyWithItemsQueryOptions(params.id, location.search),
    );

    await context.queryClient.ensureQueryData(getHobbyRelatedCollectionsQueryOptions(params.id));

    return hobby;
  },
  component: RouteComponent,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title} - Films Collection`,
      },
    ],
  }),
});

function RouteComponent() {
  const params = Route.useParams();
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(getHobbyWithItemsQueryOptions(params.id, search));

  return (
    <HobbyContainer>
      <HobbyTitle imageUrl={data.imageUrl} total={data.items.length}>
        {data.title}
      </HobbyTitle>
      <HobbyItemFilters hobbyId={params.id} />
      <HobbyItemsGrid items={data.items} />
    </HobbyContainer>
  );
}
