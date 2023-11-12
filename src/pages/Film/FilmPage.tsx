import classes from './FilmPage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context';
import { Container, Loader } from '@/components';
import { FilmData } from '@/common';
import {
  Title,
  SectionTitle,
  DataLinks,
  Description,
  Cast,
  Awards,
  Chapters,
  CrewList,
  Details,
  BoxOffice,
  SeriesDetails,
  Media,
} from './components';
import { useDocumentTitle } from '@/hooks';
import { seriesContent } from '@/pages/Film/helpers';

const FilmPage = () => {
  const { id } = useParams();
  const { initialFilmsList } = useFilmsContext();
  const [film, setFilm] = useState<FilmData | null>(null);

  useDocumentTitle(film?.title);

  const findCurrentFilm = (initialFilmsList: FilmData[]) => {
    const foundFilm = initialFilmsList.find((film) => film.id === id);
    if (foundFilm) {
      setFilm(foundFilm);
    }
  };

  useEffect(() => {
    if (initialFilmsList && initialFilmsList.length) {
      window.scrollTo(0, 0);
      findCurrentFilm(initialFilmsList);
    }
  }, [id, initialFilmsList]);

  if (film === null) {
    return (
      <article className="film container">
        <div className="film-loader">
          <Loader isFullPage />
        </div>
      </article>
    );
  }

  const seriesData = seriesContent(film.series);

  return (
    <Container className={classes.wrapper}>
      <section className={classes.general}>
        <Title>{film.title}</Title>
        <DataLinks
          items={[
            {
              value: film.year,
              color: 'primary',
              property: 'year',
            },
            {
              value: film.genres,
              property: 'genres',
            },
            {
              value: film.duration,
              property: 'duration',
              color: 'secondary',
              suffix: 'min',
            },
            ...seriesData,
          ]}
        />
      </section>
      <div className={classes.layout}>
        <Media media={film.media} title={film.title} />

        <div className={classes.content}>
          <Description description={film.summary.sections} />

          <CrewList crew={film.crew} />

          {film.type.includes('Series') &&
            film.series &&
            film.series.seasons.length > 1 && (
              <section>
                <SectionTitle>Series Details</SectionTitle>
                <SeriesDetails series={film.series} />
              </section>
            )}

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

          <section>
            <SectionTitle>Extra Details</SectionTitle>
            <Details filmData={film} />
          </section>

          {(film.budget || film.boxOffice) && (
            <section>
              <SectionTitle>Box Office</SectionTitle>
              <BoxOffice budget={film.budget} boxOffice={film.boxOffice} />
            </section>
          )}

          {film.chapters && (
            <section>
              <SectionTitle>Chapters</SectionTitle>
              <Chapters data={initialFilmsList} parts={film.chapters} />
            </section>
          )}
        </div>
      </div>
    </Container>
  );
};

export default FilmPage;
