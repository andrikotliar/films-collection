import classes from './FilmPage.module.css';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context';
import { Loader } from '@/components';
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
  BoxOffice,
  Media,
} from './components';
import { useDocumentTitle } from '@/hooks';
import { getDataLinkConfig } from '@/pages/Film/helpers';

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

  const dataLinks = useMemo(() => {
    if (!film) {
      return [];
    }

    return getDataLinkConfig(film);
  }, [film]);

  if (film === null) {
    return <Loader isFullPage />;
  }

  return (
    <div className={classes.wrapper}>
      <Title>{film.title}</Title>
      <div className={classes.layout}>
        <div className={classes.column}>
          <Media media={film.media} title={film.title} />
        </div>
        <div className={classes.column}>
          <DataLinks items={dataLinks} />

          <Description
            description={film.summary}
            media={film.media}
            seasons={film?.series?.seasons}
          />

          <CrewList crew={film.crew} />

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
    </div>
  );
};

export default FilmPage;
