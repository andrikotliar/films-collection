import { GetIncompleteFilmsQuerySchema } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  AddItemButton,
  filmDefaultFormValues,
  List,
  useDeleteFilm,
  useFormModal,
  withFormModal,
} from '~/routes/console/-shared';
import { PartialFilmForm } from '~/routes/console/queue/-components';
import { getIncompleteFilmsListQueryOptions } from '~/shared';

const WatchedFilmsForm = (props: Omit<React.ComponentProps<typeof PartialFilmForm>, 'status'>) => {
  return <PartialFilmForm status="WATCHED" {...props} />;
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
  component: withFormModal(WatchedFilmsForm, RouteComponent),
});

function RouteComponent() {
  const search = Route.useSearch();
  const { data } = useSuspenseQuery(
    getIncompleteFilmsListQueryOptions({
      ...search,
      status: 'WATCHED',
    }),
  );
  const { onOpen } = useFormModal();

  const { mutateAsync, isPending } = useDeleteFilm();

  return (
    <>
      <AddItemButton onClick={() => onOpen(filmDefaultFormValues)}>
        Create watched film
      </AddItemButton>
      <List items={data} isFetching={isPending} onDelete={mutateAsync} onEdit={onOpen} />
    </>
  );
}
