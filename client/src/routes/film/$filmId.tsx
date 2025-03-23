import { useDocumentTitle, useScrollToTop } from '@/hooks';
import { fetchFilmQuery } from '@/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useLastVisitedFilms } from './-hooks';
import {
  Description,
  Cast,
  Awards,
  CrewList,
  SummarySection,
  Chapters,
  NavigationRow,
  FilmPageLayout,
  ContentLayout,
  Section,
  SeasonsSummary,
} from './-components';

export const Route = createFileRoute('/film/$filmId')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(fetchFilmQuery(params.filmId));
  },
  component: FilmPageContainer,
});

function FilmPageContainer() {
  const { filmId: id } = Route.useParams();
  const { data: film } = useSuspenseQuery(fetchFilmQuery(id));

  useScrollToTop([id]);
  useDocumentTitle(film?.title);
  useLastVisitedFilms(film?.id);

  return (
    <FilmPageLayout>
      <NavigationRow />

      <ContentLayout>
        <SummarySection film={film} />

        {film.seriesExtension && (
          <Section title="Seasons summary">
            <SeasonsSummary seasons={film.seriesExtension.seasons} />
          </Section>
        )}

        <Section title="Description">
          <Description rawHtml={film.description} />
        </Section>

        <Section title="Crew">
          <CrewList crew={film.crew} />
        </Section>

        {film.cast.length !== 0 && (
          <Section title="Cast">
            <Cast cast={film.cast} />
          </Section>
        )}

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
