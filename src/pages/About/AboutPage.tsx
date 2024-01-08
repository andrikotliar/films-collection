import classes from './AboutPage.module.css';
import { useEffect } from 'react';
import { Container } from '@/components';
import { useDocumentTitle } from '@/hooks';

const AboutPage = () => {
  useDocumentTitle('About');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className={classes.about}>
      <Container className={classes.content}>
        <h1>About</h1>
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
        <p className={classes.accent}>
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
        <p>
          I like all titles in my collection, but some of them I like more and
          some less. In this app I use simple three-star system of rating.
        </p>
        <p>
          ⭐⭐⭐ - <a href="/?collections=Top+10">My best favorites</a>. I do
          love them so much and have rewatched them countless times.
        </p>
        <p>
          ⭐⭐ - Interested and excited titles. I rewatch them rarely, but have
          good memories about them and like discuss them.
        </p>
        <p>
          ⭐ - These titles I have watched not so many times. I still like them,
          but they may have some troubles in plot or whatever. This is the case
          when I could add a movie just to have it in the collection (hello,
          some{' '}
          <a href="/?collections=Marvel+Cinematic+Universe">movies from MCU</a>
          ).
        </p>
      </Container>
    </article>
  );
};

export default AboutPage;
