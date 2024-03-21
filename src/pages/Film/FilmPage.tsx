import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context';
import { Loader } from '@/components';
import { FilmData } from '@/common';
import { useDocumentTitle } from '@/hooks';
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
  Details,
  Wrapper,
  Column,
  Grid,
} from './components';
import { getCurrentFilm } from './helpers';

const FilmPage = () => {
  const { id } = useParams();
  const { initialFilmsList } = useFilmsContext();
  const [film, setFilm] = useState<FilmData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useDocumentTitle(film?.title);

  useEffect(() => {
    if (initialFilmsList && initialFilmsList.length) {
      window.scrollTo(0, 0);
      const film = getCurrentFilm(initialFilmsList, id);
      setFilm(film);
    }
  }, [id, initialFilmsList]);

  if (film === null) {
    return <Loader isFullPage />;
  }

  return (
    <Wrapper>
      <Title>{film.title}</Title>
      <DataLinks film={film} />
      <Grid>
        <Column>
          <Media media={film.media[activeIndex]} />
        </Column>
        <Column>
          <section>
            <SectionTitle>Description</SectionTitle>
            <Description>{film.description[activeIndex]}</Description>
          </section>

          <section>
            <SectionTitle>Crew</SectionTitle>
            <CrewList crew={film.crew} />
          </section>

          <section>
            <SectionTitle>Cast and characters</SectionTitle>
            <Cast cast={film.cast} />
          </section>

          <section>
            <SectionTitle>Details</SectionTitle>
            <Details film={film} />
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
              <Chapters parts={film.chapters} />
            </section>
          )}
        </Column>
      </Grid>
    </Wrapper>
  );
};

export default FilmPage;
