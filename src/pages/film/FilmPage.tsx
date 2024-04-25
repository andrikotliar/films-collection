import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from '@/context';
import { Loader, NotFound } from '@/components';
import { FilmData } from '@/common/types';
import { useDocumentTitle } from '@/hooks';
import {
  Title,
  SectionTitle,
  Description,
  Cast,
  Awards,
  CrewList,
  BoxOffice,
  Media,
  Wrapper,
  Column,
  Grid,
  SeasonSelect,
  TitleRow,
  Summary,
  Related,
} from './components';
import { getCurrentFilm } from './helpers';

const FilmPage = () => {
  const { id } = useParams();
  const { films } = useDataContext();
  const [film, setFilm] = useState<FilmData | null>();
  const [activeIndex, setActiveIndex] = useState(0);

  useDocumentTitle(film?.title);

  useEffect(() => {
    if (films?.length) {
      window.scrollTo(0, 0);
      const film = getCurrentFilm(films, id);
      setFilm(film);
    }
  }, [id, films]);

  if (film === undefined) {
    return <Loader isFullPage />;
  }

  if (film === null) {
    return <NotFound message="Film not found" />;
  }

  return (
    <Wrapper>
      <TitleRow>
        <Title>{film.title}</Title>
        <SeasonSelect
          seasons={film.series?.seasons}
          onChange={setActiveIndex}
        />
      </TitleRow>
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
            <SectionTitle>Summary</SectionTitle>
            <Summary film={film} activeIndex={activeIndex} />
          </section>

          <section>
            <SectionTitle>Crew</SectionTitle>
            <CrewList crew={film.crew} />
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

          {(film.budget || film.boxOffice) && (
            <section>
              <SectionTitle>Box Office</SectionTitle>
              <BoxOffice budget={film.budget} boxOffice={film.boxOffice} />
            </section>
          )}

          {film.relatedTitlesKey && id && (
            <Related relatedKey={film.relatedTitlesKey} filmId={id} />
          )}
        </Column>
      </Grid>
    </Wrapper>
  );
};

export default FilmPage;
