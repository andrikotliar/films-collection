import { createFileRoute } from '@tanstack/react-router';
import { fetchFilmQuery, useDocumentTitle, useScrollToTop } from '~/shared';
import {
  Awards,
  CastAndCrew,
  Chapters,
  ContentLayout,
  Description,
  FilmPageLayout,
  NavigationRow,
  Section,
  SummarySection,
} from '~/routes/films/$id/-components';

export const Route = createFileRoute('/films/$id')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(fetchFilmQuery(params.id));
  },
  component: FilmPageContainer,
});

function FilmPageContainer() {
  const { id } = Route.useParams();
  const film = Route.useLoaderData();

  useScrollToTop([id]);
  useDocumentTitle(film.title);

  return (
    <FilmPageLayout>
      <NavigationRow />
      <SummarySection film={film} />
      <ContentLayout>
        {film.description && (
          <Section title="Overview">
            <Description rawHtml={film.description} />
          </Section>
        )}
        {film.castAndCrew.length !== 0 && (
          <Section title="Cast and Crew">
            <CastAndCrew data={film.castAndCrew} />
          </Section>
        )}
        {film.awards.length !== 0 && (
          <Section title="Awards">
            <Awards data={film.awards} />
          </Section>
        )}
        {film.chapters && (
          <Section title="Chapters">
            <Chapters data={film.chapters} filmId={film.id} />
          </Section>
        )}
      </ContentLayout>
    </FilmPageLayout>
  );
}
