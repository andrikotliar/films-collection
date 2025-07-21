import { useDocumentTitle, useScrollToTop } from '@/hooks';
import { fetchFilmQuery } from '@/common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  Description,
  Awards,
  CrewCastList,
  SummarySection,
  Chapters,
  NavigationRow,
  FilmPageLayout,
  ContentLayout,
  Section,
} from './-components';

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

      <ContentLayout>
        <SummarySection film={film} />

        <Section title="Overview">
          <Description rawHtml={film.description} />
        </Section>

        <Section title="Crew and Cast">
          <CrewCastList people={film.castAndCrew} />
        </Section>

        {film.awards && film.awards.length !== 0 && (
          <Section title="Awards">
            <Awards awards={film.awards} />
          </Section>
        )}

        {film.chapters && film.chapters.length !== 0 && (
          <Section title="Chapters">
            <Chapters data={film.chapters} filmId={film.id} key={film.id} />
          </Section>
        )}
      </ContentLayout>
    </FilmPageLayout>
  );
}
