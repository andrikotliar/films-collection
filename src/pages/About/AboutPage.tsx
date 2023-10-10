import classes from './AboutPage.module.css';
import { useEffect, useState } from 'react';
import { setBrowserTitle } from '@/helpers';
import { Link } from 'react-router-dom';
import { useFilmsContext } from '@/context';
import { Container } from '@/components';

const AboutPage = () => {
  const { initialFilmsList: films } = useFilmsContext();
  const [randomFilmIdx, setRandomFilmIndex] = useState<
    number | null
  >(null);

  setBrowserTitle('About - Films Collection');

  const currentFilm =
    randomFilmIdx !== null && films[randomFilmIdx];

  const generateRandomIndex = () => {
    const randomIndex = Math.floor(
      Math.random() * (films.length + 1),
    );
    setRandomFilmIndex(randomIndex);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    generateRandomIndex();
  }, []);

  return (
    <article className={classes.about}>
      <Container className={classes.wrapper}>
        <section>
          <h1 className={classes.title}>About</h1>
          <article className={classes.text}>
            <p>Hello, my name is Andrii 👋 </p>
            <p>
              I'm a big fan of films and series and like to
              collect information about them. This is the
              purpose of this app. The collection contains
              only movies I like.
            </p>
            <p>
              My favorite genres are Sci-Fi and Fantasy. In
              the app, you mostly see representatives of
              these genres. But there are several movies
              from other genres like romance or action.
            </p>
            <p>
              I created this app from scratch on my own
              using React, TypeScript and my own UI design.
              The source code are on{' '}
              <a
                href="https://github.com/andrikotliar/films-collection"
                target="_bank"
              >
                GitHub
              </a>
              .
            </p>
            <p>
              I don't use any third-party API to get data.
              Data are just JSON files. You can investigate
              them in{' '}
              <a
                href="https://github.com/andrikotliar/films-collection/tree/main/db"
                target="_blank"
              >
                the DB folder
              </a>
              .
            </p>
            <p>
              <b>
                Actor images are provided by{' '}
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                >
                  TMDB
                </a>
              </b>
            </p>
            <p>
              Have any questions? Feel free to contact me
              via{' '}
              <a href="mailto:andrii.ktlr@gmail.com">
                andrii.ktlr@gmail.com.
              </a>
            </p>
            <Link to="/" className={classes.explore}>
              Explore films
            </Link>
          </article>
        </section>
        {currentFilm && (
          <aside className={classes.sidebar}>
            <h2>Explore random film:</h2>
            <Link
              to={`/film/${currentFilm.id}`}
              className={classes.randomFilm}
            >
              <img
                src={currentFilm.posters[0]}
                alt={currentFilm.title}
              />
            </Link>
          </aside>
        )}
      </Container>
    </article>
  );
};

export default AboutPage;
