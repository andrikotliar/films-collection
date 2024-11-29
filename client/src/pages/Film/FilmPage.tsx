import { useParams } from '@tanstack/react-router';
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
  TitleRow,
} from './components';
import styles from './FilmPage.module.css';
import { FC } from 'react';

type FilmPageProps = {
  id: string;
};

const FilmPage: FC<FilmPageProps> = ({ id }) => {
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
      </div>
    </div>
  );
};

export { FilmPage };
