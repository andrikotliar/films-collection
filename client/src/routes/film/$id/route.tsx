import { useDocumentTitle, useScrollToTop } from '@/hooks';
import { fetchFilmQuery } from '@/common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SummarySection, NavigationRow, FilmPageLayout, Tabs } from '../-components';

export const Route = createFileRoute('/film/$id')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(fetchFilmQuery(params.id));
  },
  component: FilmPageContainer,
});

function FilmPageContainer() {
  const { id } = Route.useParams();
  const { data: film } = useSuspenseQuery(fetchFilmQuery(id));

  useScrollToTop([id]);
  useDocumentTitle(film?.title);

  return (
    <FilmPageLayout>
      <NavigationRow />
      <SummarySection film={film} />
      <Tabs film={film} />
      <Outlet />
    </FilmPageLayout>
  );
}
