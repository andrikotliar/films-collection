import { GetIncompleteFilmsQuerySchema } from '@films-collection/shared';
import { createFileRoute } from '@tanstack/react-router';
import { withFormModal } from '~/routes/console/-shared';
import { PartialFilmForm, QueuePage } from '~/routes/console/queue/-components';
import { getIncompleteFilmsListQueryOptions } from '~/shared';

const FilmForm = (
  props: Omit<React.ComponentProps<typeof PartialFilmForm>, 'status' | 'title'>,
) => {
  return <PartialFilmForm status="WATCHED" title="Watched Film" {...props} />;
};

export const Route = createFileRoute('/console/queue/')({
  validateSearch: (search) => {
    return GetIncompleteFilmsQuerySchema.partial().parse(search);
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(
      getIncompleteFilmsListQueryOptions({
        ...deps.search,
        status: 'WATCHED',
      }),
    );
  },
  component: withFormModal(FilmForm, RouteComponent),
});

function RouteComponent() {
  return <QueuePage status="WATCHED" addItemTitle="Add watched film" pageRoute="/console/queue/" />;
}
