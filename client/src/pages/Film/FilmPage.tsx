import { useParams } from 'react-router-dom';
import { Loader, NotFound } from '@/components';
import { useDocumentTitle, useOneFilm, useScrollToTop } from '@/hooks';
import { useLastVisitedFilms } from './hooks';
import {
  SectionTitle,
  Description,
  Cast,
  Awards,
  CrewList,
  Wrapper,
  SummarySection,
  Chapters,
  NavigationRow,
  Section,
  SeriesStats,
} from './components';

const FilmPage = () => {
  const { id } = useParams();

  const { data: film, isLoading } = useOneFilm(id);

  useScrollToTop([id]);
  useDocumentTitle(film?.title);
  useLastVisitedFilms(film);

  if (isLoading) {
    return <Loader isFullPage />;
  }

  if (!film || !id) {
    return <NotFound message="Film not found" />;
  }

  return (
    <Wrapper>
      <NavigationRow />

      <SummarySection film={film} />

      {film.seriesExtension && (
        <Section>
          <SectionTitle>Series Details</SectionTitle>
          <SeriesStats data={film.seriesExtension} />
        </Section>
      )}

      <Section>
        <SectionTitle>Crew</SectionTitle>
        <CrewList crew={film.crew} />
      </Section>

      <Section>
        <SectionTitle>Description</SectionTitle>
        <Description content={film.description} />
      </Section>

      <Section>
        <SectionTitle>Cast and characters</SectionTitle>
        <Cast cast={film.cast} />
      </Section>

      {film.awards && (
        <Section>
          <SectionTitle>Awards</SectionTitle>
          <Awards awards={film.awards} />
        </Section>
      )}

      {film.chapters && film.chapters.length !== 0 && (
        <Section>
          <SectionTitle>Chapters</SectionTitle>
          <Chapters data={film.chapters} filmId={film._id} key={film._id} />
        </Section>
      )}
    </Wrapper>
  );
};

export { FilmPage };
