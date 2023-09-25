import './film-page.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFilmsContext } from '@/context/FilmsContext';
import { Loader } from '@/components';
import { setBrowserTitle } from '@/heplers';
import { ActorsProvider } from '@/context/ActorsContext';
import { FilmData } from '@/types';
import {
  FilmTitle,
  TopLine,
  FilmDesctiption,
  Cast,
  Awards,
  Chapters,
  SectionTitle,
  Media,
  CrewList,
  ExtraDetails,
  BoxOffice,
} from './components';

const FilmPage = () => {
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
        <section className="film-general">
          <FilmTitle title={film.title} />
          <TopLine filmData={film} />
        </section>
        <Media
          type={film.type}
          posters={film.posters}
          title={film.title}
          trailers={film.trailers}
        />

        <FilmDesctiption
          type={film.type}
          description={film.description}
        />
        
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
          <ExtraDetails filmData={film} />
        </section>

        {(film.budget || film.boxoffice) && (
          <section>
            <SectionTitle>Box Office</SectionTitle>
            <BoxOffice budget={film.budget} boxOffice={film.boxoffice} />
          </section>
        )}
        
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

export default FilmPage;