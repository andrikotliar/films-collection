import './styles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context/filmsContext';
import { Loader } from '@/components';
import { setBrowserTitle } from '@/heplers';
import ActorsProvider from '@/context/actorsContext';
import { FilmType } from '@/types/film';
import {
  FilmTitle,
  TopLine,
  Episodes,
  Synopsis,
  Cast,
  Awards,
  Chapters,
  CreatorsList,
  SectionTitle,
  ExtraDetails,
  SeriesMedia,
  FilmMedia
} from './components';

const Film = () => {
  const { id } = useParams();
  const { initialFilmsList } = useFilmsContext();
  const [ film, setFilm ] = useState<FilmType | null>(null);

  if(film) {
    setBrowserTitle(`${film.title} - Films Collection`)
  }
  
  const findCurrentFilm = (initialFilmsList: FilmType[]) => {
    const foundFilm = initialFilmsList.find(
      film => film.id === id
    );
    if(foundFilm) {
      setFilm(foundFilm);
    }
  };

  useEffect(() => {
    if(initialFilmsList && initialFilmsList.length) {
      window.scrollTo(0, 0);
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
      <article className="film container">
        <section className="film__general">
          <FilmTitle title={film.title} />
          <TopLine filmData={film} />
        </section>
        {!film.type.includes('Series') ? (
         <FilmMedia poster={film.poster} title={film.title} trailer={film.trailer} />
        ) : (
          <SeriesMedia seasons={film.seasons} title={film.title} poster={film.poster} />
        )}
        <Synopsis text={film.synopsis} />
        <CreatorsList filmData={film} />
        {film.type === 'Series' ? (
          <section>
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
        
        {film.type.includes('Series') && (
          <section>
            <SectionTitle>Episodes Overview</SectionTitle>
            <Episodes seasons={film.seasons} />
          </section>
        )}
        
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