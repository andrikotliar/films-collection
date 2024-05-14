import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, NotFound } from '@/components';
import { useDocumentTitle, useScrollToTop } from '@/hooks';
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
import { useCurrentFilm } from '@/pages/film/hooks';

const FilmPage = () => {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const film = useCurrentFilm(id);

  useScrollToTop([id]);
  useDocumentTitle(film?.title);

  if (film === undefined) {
    return <Loader isFullPage />;
  }

  if (film === null || !id) {
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

          {film.related && <Related data={film.related} filmId={id} />}
        </Column>
      </Grid>
    </Wrapper>
  );
};

export default FilmPage;
