import { useParams } from 'react-router-dom';
import { Loader, NotFound } from '@/components';
import { useDocumentTitle, useOneFilm, useScrollToTop } from '@/hooks';
import { useLastVisitedFilms } from '@/pages/film/hooks';
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

      <section>
        <SectionTitle>Crew</SectionTitle>
        <CrewList crew={film.crew} />
      </section>

      <section>
        <SectionTitle>Description</SectionTitle>
        <Description content={film.description} />
      </section>

      <section>
        <SectionTitle>Cast and characters</SectionTitle>
        <Cast cast={film.cast} />
      </section>

      {film.awards && (
        <section>
          <SectionTitle>Awards</SectionTitle>
          <Awards awards={film.awards} />
        </section>
      )}

      {film.chapters?.length && (
        <section>
          <SectionTitle>Chapters</SectionTitle>
          <Chapters data={film.chapters} filmId={film._id} key={film._id} />
        </section>
      )}
    </Wrapper>
  );
};

export default FilmPage;
