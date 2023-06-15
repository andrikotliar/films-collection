import './styles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context/FilmsContext';
import { Loader } from '@/components';
import { setBrowserTitle } from '@/heplers';
import ActorsProvider from '@/context/ActorsContext';
import { FilmData } from '@/types';
import {
  FilmTitle,
  TopLine,
  Episodes,
  Synopsis,
  Cast,
  Awards,
  Chapters,
  SectionTitle,
  SeriesMedia,
  FilmMedia,
  CrewList,
  ExtraDetails
} from './components';

const Film = () => {
  const { id } = useParams();
  const { initialFilmsList } = useFilmsContext();
  const [ film, setFilm ] = useState<FilmData | null>(null);

  if(film) {
    setBrowserTitle(`${film.title} - Films Collection`)
  }
  
  const findCurrentFilm = (initialFilmsList: FilmData[]) => {
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
      <article className="film container">
        <div className="film-loader">
          <Loader />
        </div>
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
        {(!film.type.includes('Series') && film.trailer) && (
          <FilmMedia
            poster={film.poster}
            title={film.title}
            trailer={film.trailer}
          />
        )}

        {film.type.includes('Series') && film.seasons && (
          <SeriesMedia
            seasons={film.seasons}
            title={film.title}
          />
        )}

        <Synopsis text={film.synopsis} />
        
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
        
        {film.seasons && (
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