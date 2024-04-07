import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context';
import { Loader } from '@/components';
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
  CollapsibleSection,
  Related,
} from './components';
import { getCurrentFilm } from './helpers';

const FilmPage = () => {
  const { id } = useParams();
  const { initialFilmsList } = useFilmsContext();
  const [film, setFilm] = useState<FilmData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useDocumentTitle(film?.title);

  useEffect(() => {
    if (initialFilmsList?.length) {
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

          <CollapsibleSection title="Summary">
            <Summary film={film} activeIndex={activeIndex} />
          </CollapsibleSection>

          <CollapsibleSection title="Crew">
            <CrewList crew={film.crew} />
          </CollapsibleSection>

          <CollapsibleSection title="Cast and characters">
            <Cast cast={film.cast} />
          </CollapsibleSection>

          {film.awards && (
            <CollapsibleSection title="Awards">
              <Awards awards={film.awards} />
            </CollapsibleSection>
          )}

          {(film.budget || film.boxOffice) && (
            <CollapsibleSection title="Box Office">
              <BoxOffice budget={film.budget} boxOffice={film.boxOffice} />
            </CollapsibleSection>
          )}

          {film.relatedTitlesKey && id && (
            <CollapsibleSection title="Chapters">
              <Related relatedKey={film.relatedTitlesKey} filmId={id} />
            </CollapsibleSection>
          )}
        </Column>
      </Grid>
    </Wrapper>
  );
};

export default FilmPage;
