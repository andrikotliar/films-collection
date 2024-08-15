import { useDocumentTitle, useScrollToTop } from '@/hooks';
import styles from './AboutPage.module.css';
import { RandomFilms } from './components';

const AboutPage = () => {
  useDocumentTitle('About');
  useScrollToTop([]);

  return (
    <article className={styles.content}>
      <section>
        <h1 className={styles.title}>About</h1>
        <p>Hello, my name is Andrii 👋 </p>
        <p>
          I'm a big fan of films and TV shows and like to collect information
          about them. This is the purpose of this app. The collection contains
          only films, TV shows and animation I like.
        </p>
        <p>
          My most favorite genres are Sci-Fi and Fantasy. But I also like
          animation, adventures, action, disaster. And less like detectives,
          crime and comedies.
        </p>
        <p>
          I don't give preference some actors and directors in films, but really
          like James Cameron as a director and Tom Cruise as an actor. Recently
          started investigate Quentin Tarantino's work.
        </p>
      </section>
      <section>
        <h2>App</h2>
        <p>
          My second hobby is programming. I'm a fullstack developer and this
          collection is my primary "pet" project.
        </p>
        <p>
          It's built with React and Typescript. Currently the app doesn't have
          real backend. As a data storage I use plain JSON files, that are
          collected into single JSON-file on the built time.
        </p>
        <p>
          My next plan on this app is to add backend and move data to a
          database.
        </p>
        <p>
          If you are interested in the source code, investigate it on{' '}
          <a
            href="https://github.com/andrikotliar/films-collection"
            target="_bank"
          >
            GitHub
          </a>
        </p>
      </section>
      <section>
        <h2>Ratings ✨</h2>
        <p>I rate films in the collection by three-stars rating:</p>
        <p>⭐⭐⭐ - my best favorites. I've watched them countless times.</p>
        <p>
          ⭐⭐ - good titles I do like. I've watched them less times than
          previous category, but always excited to watch them one more time.
          Majority of titles in the collection have this rating.
        </p>
        <p>
          ⭐ - titles I still like but they have some nuances or were added just
          to have in the collection. I've watched them only a few times and
          usually choose to watch one more time some titles from the previous
          categories.
        </p>
      </section>
      <section>
        <h2>Discover random films/animation</h2>
        <RandomFilms />
      </section>
    </article>
  );
};

export default AboutPage;
