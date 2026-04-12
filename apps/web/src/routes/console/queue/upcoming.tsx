import { GetIncompleteFilmsQuerySchema } from '@films-collection/shared';
import { createFileRoute } from '@tanstack/react-router';
import { withFormModal } from '~/routes/console/-shared';
import { PartialFilmForm, QueuePage } from '~/routes/console/queue/-components';
import { getIncompleteFilmsListQueryOptions } from '~/shared';

const FilmForm = (
  props: Omit<React.ComponentProps<typeof PartialFilmForm>, 'status' | 'title'>,
) => {
  return <PartialFilmForm status="UPCOMING" title="Upcoming Film" {...props} />;
};

export const Route = createFileRoute('/console/queue/upcoming')({
  validateSearch: (search) => {
    return GetIncompleteFilmsQuerySchema.partial().parse(search);
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(
      getIncompleteFilmsListQueryOptions({
        ...deps.search,
        status: 'UPCOMING',
      }),
    );
  },
  component: withFormModal(FilmForm, RouteComponent),
});

function RouteComponent() {
  return (
    <QueuePage
      status="UPCOMING"
      addItemTitle="Add upcoming film"
      pageRoute="/console/queue/upcoming"
    />
  );
}
