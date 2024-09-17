import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, NotFound } from '@/components';
import { useDocumentTitle, useScrollToTop } from '@/hooks';
import { useCurrentFilm, useLastVisitedFilms } from '@/pages/film/hooks';
import {
  SectionTitle,
  Description,
  Cast,
  Awards,
  CrewList,
  Wrapper,
  SummarySection,
  Chapters,
  Section,
  NavigationRow,
} from './components';

const FilmPage = () => {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const film = useCurrentFilm(id);

  useScrollToTop([id]);
  useDocumentTitle(film?.title);
  useLastVisitedFilms(id);

  if (film === undefined) {
    return <Loader isFullPage />;
  }

  if (film === null || !id) {
    return <NotFound message="Film not found" />;
  }

  return (
    <Wrapper>
      <NavigationRow
        setActiveIndex={setActiveIndex}
        seasons={film.seriesExtension?.seasons}
      />

      <SummarySection film={film} activeIndex={activeIndex} />

      <Section>
        <SectionTitle>Crew</SectionTitle>
        <CrewList crew={film.crew} />
      </Section>

      <Section>
        <SectionTitle>
          Description
          {film.seriesExtension?.seasons[activeIndex] && (
            <span> ({film.seriesExtension.seasons[activeIndex].title})</span>
          )}
        </SectionTitle>
        <Description>{film.description[activeIndex]}</Description>
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

      {film.chapters.length && (
        <Section>
          <Chapters data={film.chapters} filmId={film._id} key={film._id} />
        </Section>
      )}
    </Wrapper>
  );
};

export default FilmPage;
