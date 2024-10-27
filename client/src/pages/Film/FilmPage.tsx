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
  SummarySection,
  Chapters,
  NavigationRow,
  SeriesStats,
} from './components';
import styles from './FilmPage.module.css';

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
    <div className={styles.filmPage}>
      <NavigationRow />

      <div className={styles.content}>
        <SummarySection film={film} />

        {film.seriesExtension && (
          <section>
            <SectionTitle>Series Details</SectionTitle>
            <SeriesStats data={film.seriesExtension} />
          </section>
        )}

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
      </div>
    </div>
  );
};

export default FilmPage;
