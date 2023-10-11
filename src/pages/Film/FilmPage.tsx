import classes from './FilmPage.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context/FilmsContext';
import { Container, Loader, Select } from '@/components';
import { setBrowserTitle } from '@/helpers';
import { ActorsProvider } from '@/context/ActorsContext';
import { FilmData } from '@/common';
import {
  Title,
  SectionTitle,
  DataLinks,
  Description,
  Cast,
  Awards,
  Chapters,
  Media,
  CrewList,
  Details,
  BoxOffice,
} from './components';

const FilmPage = () => {
  const { id } = useParams();
  const { initialFilmsList } = useFilmsContext();
  const [film, setFilm] = useState<FilmData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (film) {
    setBrowserTitle(`${film.title} - Films Collection`);
  }

  const findCurrentFilm = (
    initialFilmsList: FilmData[],
  ) => {
    const foundFilm = initialFilmsList.find(
      film => film.id === id,
    );
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
          <Loader />
        </div>
      </article>
    );
  }

  const selectOptions =
    film.type.includes('Series') &&
    film.description.length > 1 &&
    film.description.map((item, index) => ({
      label: `${item.title} (${item.year})` || '',
      value: index,
    }));

  return (
    <ActorsProvider>
      <Container className={classes.wrapper}>
        <section className={classes.general}>
          <Title>{film.title}</Title>
          <DataLinks
            items={[
              {
                value: film.year,
                isAccent: true,
                property: 'year',
              },
              {
                value: film.genres,
                property: 'genres',
              },
              {
                value: film.duration,
                property: 'duration',
                isSecondary: true,
                suffix: 'min',
              },
            ]}
          />
        </section>
        <section className={classes.hero}>
          {selectOptions && (
            <div className={classes.select}>
              <Select
                options={selectOptions}
                onSelect={option =>
                  setActiveIndex(+option.value)
                }
              />
            </div>
          )}
          <Media
            posters={film.posters}
            title={film.title}
            trailers={film.trailers}
            activeIndex={activeIndex}
          />
          <Description
            type={film.type}
            description={film.description}
            activeIndex={activeIndex}
          />
        </section>

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

        <section>
          <SectionTitle>Extra Details</SectionTitle>
          <Details filmData={film} />
        </section>

        {(film.budget || film.boxoffice) && (
          <section>
            <SectionTitle>Box Office</SectionTitle>
            <BoxOffice
              budget={film.budget}
              boxOffice={film.boxoffice}
            />
          </section>
        )}

        {film.parts && (
          <section>
            <SectionTitle>Chapters</SectionTitle>
            <Chapters
              data={initialFilmsList}
              parts={film.parts}
            />
          </section>
        )}
      </Container>
    </ActorsProvider>
  );
};

export default FilmPage;
