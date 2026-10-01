import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  buildGetHobbyByTitleQueryOptions,
  HobbyContainer,
  HobbyItemsGrid,
  HobbyTitle,
} from '~/shared';

export const Route = createFileRoute('/board-games')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(buildGetHobbyByTitleQueryOptions('Board Games'));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(buildGetHobbyByTitleQueryOptions('Board Games'));

  return (
    <HobbyContainer>
      <HobbyTitle imagePath={data.imagePath} total={data.items.length}>
        {data.title} Collection
      </HobbyTitle>
      <HobbyItemsGrid items={data.items} />
    </HobbyContainer>
  );
}
