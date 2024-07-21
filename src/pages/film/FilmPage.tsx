import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader, NotFound } from '@/components';
import { useDocumentTitle, useScrollToTop } from '@/hooks';
import {
  SectionTitle,
  Description,
  Cast,
  Awards,
  CrewList,
  BoxOffice,
  Wrapper,
  SeasonSelect,
  TopRow,
  Related,
  Section,
} from './components';
import { useCurrentFilm } from '@/pages/film/hooks';
import { TitleRow } from './components/title-row/TitleRow';
import { Title } from './components/title/Title';

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
      <Section>
        <Link to="/">Back to list</Link>
      </Section>

      <Section>
        <TitleRow>
          <Title>{film.title}</Title>
          <SeasonSelect
            seasons={film.series?.seasons}
            onChange={setActiveIndex}
          />
        </TitleRow>
      </Section>

      <TopRow film={film} activeIndex={activeIndex} />

      <Section>
        <SectionTitle>Description</SectionTitle>
        <Description>{film.description[activeIndex]}</Description>
      </Section>

      <Section>
        <SectionTitle>Crew</SectionTitle>
        <CrewList crew={film.crew} />
      </Section>

      <Section>
        <SectionTitle>Cast and characters</SectionTitle>
        <Cast cast={film.cast} />
      </Section>

      {film.awards && (
        <Section>
          <SectionTitle>Awards</SectionTitle>
          <Awards awards={film.awards} />
        </Section>
      )}

      {(film.budget || film.boxOffice) && (
        <Section>
          <SectionTitle>Box Office</SectionTitle>
          <BoxOffice budget={film.budget} boxOffice={film.boxOffice} />
        </Section>
      )}

      {film.related && (
        <Section>
          <SectionTitle>Chapters</SectionTitle>
          <Related data={film.related} filmId={id} />
        </Section>
      )}
    </Wrapper>
  );
};

export default FilmPage;
