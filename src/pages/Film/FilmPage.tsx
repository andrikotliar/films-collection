import classes from './FilmPage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context';
import { Loader } from '@/components';
import { FilmData, LinkGroup } from '@/common';
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
  Poster,
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
    return <Loader isFullPage />;
  }

  const seriesData = seriesContent(film.series);

  return (
    <div className={classes.wrapper}>
      <Title>{film.title}</Title>
      <div className={classes.layout}>
        <div className={classes.column}>
          <Poster media={film.media} title={film.title} />
          <DataLinks
            items={[
              ...(!film.series
                ? [
                    {
                      value: film.year,
                      variant: 'ocean',
                      property: 'year',
                      title: 'Release Year',
                    } as LinkGroup,
                  ]
                : []),
              {
                value: film.genres,
                property: 'genres',
                title: 'Genres',
              },
              {
                value: film.duration,
                property: 'duration',
                variant: 'clouds',
                suffix: 'min',
                title: 'Runtime',
              },
              {
                value: film.countries,
                property: 'countries',
                variant: 'clouds',
                title: `Origin ${
                  film.countries.length > 1 ? 'countries' : 'country'
                }`,
              },
              ...seriesData,
              {
                value: film.collections.map((collection) => collection.title),
                property: 'collections',
                variant: 'mars',
                title: 'Collections',
              },
              {
                value: film.production,
                property: 'production',
                variant: 'clouds',
                title: 'Studios',
              },
            ]}
          />
        </div>
        <div className={classes.column}>
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
