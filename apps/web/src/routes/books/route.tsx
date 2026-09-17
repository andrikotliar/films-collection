import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getHobbyByTitleQueryOptions, HobbyContainer, HobbyItemsGrid, HobbyTitle } from '~/shared';

export const Route = createFileRoute('/books')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getHobbyByTitleQueryOptions('Books'));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(getHobbyByTitleQueryOptions('Books'));

  return (
    <HobbyContainer>
      <HobbyTitle imageUrl={data.imageUrl} total={data.items.length}>
        {data.title} Collection
      </HobbyTitle>
      <HobbyItemsGrid items={data.items} />
    </HobbyContainer>
  );
}
