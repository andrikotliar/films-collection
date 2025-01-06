import { useDocumentTitle, useScrollToTop } from '@/hooks';
import { useLastVisitedFilms } from './hooks';
import {
  SectionTitle,
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
} from './components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchFilmQuery } from '@/queries';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/film/$id');

export const FilmPage = () => {
  const { id } = routeApi.useParams();
  const { data: film } = useSuspenseQuery(fetchFilmQuery(id));

  useScrollToTop([id]);
  useDocumentTitle(film?.title);
  useLastVisitedFilms(film);

  return (
    <FilmPageLayout>
      <NavigationRow />

      <ContentLayout>
        <TitleRow data={film} />

        <SummarySection film={film} />

        <section>
          <SectionTitle>Description</SectionTitle>
          <Description content={film.description} key={film._id} />
        </section>

        <section>
          <SectionTitle>Crew</SectionTitle>
          <CrewList crew={film.crew} />
        </section>

        {film.cast.length !== 0 && (
          <section>
            <SectionTitle>Cast and characters</SectionTitle>
            <Cast cast={film.cast} />
          </section>
        )}

        {film.awards && film.awards.length !== 0 && (
          <section>
            <SectionTitle>Awards</SectionTitle>
            <Awards awards={film.awards} />
          </section>
        )}

        {film.chapters && film.chapters.length !== 0 && (
          <section>
            <SectionTitle>Chapters</SectionTitle>
            <Chapters data={film.chapters} filmId={film._id} key={film._id} />
          </section>
        )}
      </ContentLayout>
    </FilmPageLayout>
  );
};
