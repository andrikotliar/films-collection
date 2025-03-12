import { useDocumentTitle, useScrollToTop } from '@/hooks';
import { useLastVisitedFilms } from './hooks';
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
} from './components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchFilmQuery } from '@/queries';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/film/$filmId');

export const FilmPage = () => {
  const { filmId: id } = routeApi.useParams();
  const { data: film } = useSuspenseQuery(fetchFilmQuery(id));

  useScrollToTop([id]);
  useDocumentTitle(film?.title);
  useLastVisitedFilms(film?.id);

  return (
    <FilmPageLayout>
      <NavigationRow />

      <ContentLayout>
        <SummarySection film={film} />

        <Section title="Description">
          <Description
            text={film.description}
            seasons={film.seriesExtension?.seasons}
            key={film.id}
          />
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
};
