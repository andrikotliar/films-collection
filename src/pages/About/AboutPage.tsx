import classes from './AboutPage.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFilmsContext } from '@/context';
import { Container } from '@/components';
import { useDocumentTitle } from '@/hooks';
import { buildMediaPath } from '@/helpers';

const AboutPage = () => {
  const { initialFilmsList: films } = useFilmsContext();
  const [randomFilmIdx, setRandomFilmIndex] = useState<number | null>(null);

  useDocumentTitle('About');

  const currentFilm = randomFilmIdx !== null && films[randomFilmIdx];

  const generateRandomIndex = () => {
    const randomIndex = Math.floor(Math.random() * (films.length + 1));
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
              I'm a big fan of films and series and like to collect information
              about them. This is the purpose of this app. The collection
              contains only titles I like.
            </p>
            <p>
              My favorite genres are Sci-Fi and Fantasy. In the app, you mostly
              see representatives of these genres. But there are several titles
              from other genres like romance, action, detectives etc.
            </p>
            <h2>For developers</h2>
            <p>
              The app is built with React and TypeScript. I created UI
              components from scratch inspired by existing app designs. The
              source code are on{' '}
              <a
                href="https://github.com/andrikotliar/films-collection"
                target="_bank"
              >
                GitHub
              </a>
              .
            </p>
            <p>
              I created my own database of titles. Currently data stores in
              plain JSON-files, in the near future I plan to use MongoDB for
              this purpose. For now you can investigate JSON files in{' '}
              <a
                href="https://github.com/andrikotliar/films-collection/tree/main/db"
                target="_blank"
              >
                the DB folder.
              </a>
            </p>
            <p>
              The detail explanation of each field is in{' '}
              <a
                href="https://github.com/andrikotliar/films-collection/blob/main/README.md#data-schema"
                target="_blank"
              >
                README
              </a>
              .
            </p>
          </article>
        </section>
        {currentFilm && (
          <aside className={classes.sidebar}>
            <h2>Explore random film:</h2>
            <Link to={`/film/${currentFilm.id}`} className={classes.randomFilm}>
              <img
                src={buildMediaPath('posters', currentFilm.media[0].poster)}
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
