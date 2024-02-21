import styles from './AboutPage.module.css';
import { useEffect } from 'react';
import { useDocumentTitle } from '@/hooks';

const AboutPage = () => {
  useDocumentTitle('About');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className={styles.about}>
      <div className={styles.content}>
        <h1 className={styles.title}>About</h1>
        <p>Hello, my name is Andrii 👋 </p>
        <p>
          I'm a big fan of films and series and like to collect information
          about them. This is the purpose of this app. The collection contains
          only titles I like.
        </p>
        <p>
          My favorite genres are Sci-Fi and Fantasy. In the app, you mostly see
          representatives of these genres. But there are several titles from
          other genres like romance, action, detectives etc.
        </p>
        <p className={styles.accent}>
          Interested in the source code of this app? It's pure React with
          TypeScript and JSON files as a "database". You can investigate code on
          the{' '}
          <a
            href="https://github.com/andrikotliar/films-collection"
            target="_bank"
          >
            {' '}
            GitHub{' '}
          </a>
          .
        </p>
        <h2>Ratings ✨</h2>
        <p>I rate titles in the collection by three-stars rating:</p>
        <p>⭐⭐⭐ - my best favorites. I've watched them countless times.</p>
        <p>
          ⭐⭐ - good titles I do like. I've watched them less times than
          previous category, but always excited to watch them one more time.
          Majority of titles in the collection have this rating.
        </p>
        <p>
          ⭐ - titles I still like but they have some nuances or were added just
          to have in the collection. I've watched them only a few times and
          usually choose to rewatch some titles from the previous category.
        </p>
        <h2>Collections Description</h2>
        <p>
          <i>To be continued...</i>
        </p>
      </div>
    </article>
  );
};

export default AboutPage;
