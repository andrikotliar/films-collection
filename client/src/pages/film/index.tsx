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
  TitleRow,
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
      <TitleRow data={film} />

      <ContentLayout>
        <SummarySection film={film} />

        <Section title="Description" isCollapsable>
          <Description
            text={film.description}
            trailerId={film.youtubeTrailerId}
            seasons={film.seriesExtension?.seasons}
            key={film.id}
          />
        </Section>

        <Section title="Crew">
          <CrewList crew={film.crew} />
        </Section>

        {film.cast.length !== 0 && (
          <Section title="Cast and Characters" isCollapsable shouldHidePaddings>
            <Cast cast={film.cast} />
          </Section>
        )}

        {film.awards && film.awards.length !== 0 && (
          <Section title="Awards" shouldHidePaddings>
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
