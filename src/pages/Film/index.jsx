import './styles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context/filmsContext';
import { Loader } from '@/components';
import {
  FilmTitle,
  Poster,
  TopLine,
  Trailer,
  Episodes,
  Synopsis,
  Cast,
  Awards,
  Chapters,
  CreatorsList,
  SectionTitle,
  ExtraDetails,
  SeasonTrailers
} from './components';
import { setBrowserTitle } from '@/heplers';
import Collections from './components/Collections';
import ActorsProvider from '@/context/actorsContext';

const Film = () => {
  const { id } = useParams();
  const { initialFilmsList } = useFilmsContext();
  const [ film, setFilm ] = useState(null);

  if(film) {
    setBrowserTitle(`${film.title} - Films Collection`)
  }
  
  const findCurrentFilm = (initialFilmsList) => {
    const foundFilm = initialFilmsList.find(
      film => film.id === id
    );
    setFilm(foundFilm);
  };

  useEffect(() => {
    if(initialFilmsList && initialFilmsList.length) {
      findCurrentFilm(initialFilmsList);
    }
  }, [id, initialFilmsList]);

  if(film === null) {
    return (
      <article className="film">
        <Loader />
      </article>
    );
  }
  
  return (
    <ActorsProvider>
      <article className="film">
        <section className="film__general">
          <FilmTitle title={film.title} />
          <TopLine filmData={film} />
        </section>
        <div className="film__media">
          <Poster poster={film.poster} title={film.title} />
          {!film.type.includes('Series') ? (
            <Trailer trailer={film.trailer} />
          ) : (
            <SeasonTrailers seasons={film.seasons} />
          )}
        </div>
        <Synopsis text={film.synopsis} />
        <CreatorsList filmData={film} />
        {film.type.seasons ? (
          <section>120px
            <SectionTitle>Episode Details</SectionTitle>
            <Episodes seasons={film.seasons} />
          </section>
        ) : null}
      
        {film.awards ? (
          <section>
            <SectionTitle>Awards</SectionTitle>
            <Awards awards={film.awards} />
          </section>
        ) : null}
      
        <section>
          <SectionTitle>Cast and characters</SectionTitle>
          <Cast cast={film.cast} />
        </section>
        <section>
          <SectionTitle>Extra Details</SectionTitle>
          <ExtraDetails filmData={film} />
        </section>
        {film.parts && (
          <div className="film-chapters custom-scroll">
            <SectionTitle>Chapters</SectionTitle>
            <Chapters data={initialFilmsList} parts={film.parts} />
          </div>
        )}
      </article>
    </ActorsProvider>
  );
};

export default Film;