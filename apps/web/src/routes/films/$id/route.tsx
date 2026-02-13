import { createFileRoute } from '@tanstack/react-router';
import { getFilmQueryOptions, useDocumentTitle, useScrollToTop } from '~/shared';
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
import { AwardIcon, FileTextIcon, UsersIcon } from 'lucide-react';

export const Route = createFileRoute('/films/$id')({
  loader: async ({ context, params }) => {
    return context.queryClient.ensureQueryData(getFilmQueryOptions(Number(params.id)));
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
        {film.description && film.description.length > 50 && (
          <Section title="Description" icon={<FileTextIcon />}>
            <Description rawHtml={film.description} />
          </Section>
        )}
        {film.awards.length > 0 && (
          <Section title="Awards" icon={<AwardIcon />}>
            <Awards data={film.awards} />
          </Section>
        )}
        {film.castAndCrew.length !== 0 && (
          <Section title="Cast and Crew" icon={<UsersIcon />}>
            <CastAndCrew data={film.castAndCrew} />
          </Section>
        )}
        {film.chapters.length > 0 && <Chapters data={film.chapters} filmId={film.id} />}
      </ContentLayout>
    </FilmPageLayout>
  );
}
