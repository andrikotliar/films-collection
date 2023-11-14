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
        <h1 className={classes.title}>About</h1>
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
        <h2>For developers</h2>
        <p>
          The app is built with React and TypeScript. I created UI components
          from scratch inspired by existing app designs. The source code are on{' '}
          <a
            href="https://github.com/andrikotliar/films-collection"
            target="_bank"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          I created my own database of titles. Currently data stores in plain
          JSON-files, in the near future I plan to use MongoDB for this purpose.
          For now you can investigate JSON files in{' '}
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
      </Container>
    </article>
  );
};

export default AboutPage;
