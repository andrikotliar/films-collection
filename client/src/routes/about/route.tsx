import { useDocumentTitle, useScrollToTop } from '@/hooks';
import { ArticleContent } from '@/ui';
import { createFileRoute } from '@tanstack/react-router';

const AboutPageContainer = () => {
  useDocumentTitle('About');
  useScrollToTop([]);

  return (
    <ArticleContent>
      <section>
        <h1>About</h1>
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
          like James Cameron as a director and Tom Cruise as an actor.
        </p>
      </section>
      <section>
        <h2>Story of the app</h2>
        <p>
          My love for cinema started in my early childhood with movies like
          Terminator, The Matrix, and Star Wars. The Internet wasn't widespread
          then and to see a new film I had to wait until a movie was released on
          a TV. I didn't have a chance to go to the cinema due to my
          geographical location. Weekly I hoped to find a good movie in a TV
          program to see on Saturday or Sunday. Every day I looked forward to
          seeing a new episode of my favorite animation shows. Even then I tried
          drawing characters from cartoons and writing down short information
          about them in a notebook.
        </p>
        <p>
          Later I got a DVD. It gave me access to a larger collection of movies.
          One evening I wrote down a list of movies I watched and liked. After
          that, I added short plot descriptions to this list. Everything was
          done in simple notebooks.
        </p>
        <p>
          After a year or two I got my first laptop, still without the Internet
          connection, and I moved my notes into digital documents. I added more
          details about movies to the list, like directors, cast, and other
          summary information.
        </p>
        <p>
          In my teenage ages, I got familiar with Japanese anime and also became
          interested in graphical design. I converted all my notes from
          documents into banners. This idea and my delight in anime didn't last
          so long. Now my collection contains only a few representatives of this
          subtype of cinema.
        </p>
        <p>
          The last stage of this collection creation started when I learned web
          development. Firstly it was simple HTML pages, that later became
          full-fledged SPA-app which I keep working on today. This app is a kind
          of blog, where I collect my favorite movies and sometimes write
          synopses, short comments, and feelings after watching.
        </p>
        <p>
          As you can see from my collection, I like simple, mass, not
          pretentious cinema. I never was a fan of art-house and high school of
          cinema. Unlikely you face here winners of the Oscar, but face most
          movies that gain the million dollars box office. I do like all movies
          from my collection though, each of them gives me viewing pleasure.
        </p>
      </section>
      <section>
        <h2>App infrastructure</h2>
        <blockquote>
          <b>DISCLAIMER</b>: All media files, videos, and information are the
          intellectual property of its authors. All data was taken from open
          sources and used for informational purposes. Data was gathered
          manually without using scrappers or third-party APIs.
        </blockquote>
        <p>
          The Films Collection is a full-stack web application. The frontend
          uses React, the backend uses Fastify. Both are build with TypeScript.
        </p>
        <p>
          If you are interested in the source code, investigate it on{' '}
          <a
            href="https://github.com/andrikotliar/films-collection"
            target="_bank"
          >
            GitHub
          </a>
          .
        </p>
        <p>
          The repository has dataset folder where you can find all necessary
          data if you'd like to create a copy of this app.
        </p>
      </section>
      <section>
        <h2>Ratings</h2>
        <p>I rate films in the collection by three-stars rating:</p>
        <p>⭐⭐⭐: My best favorites. I've watched them countless times.</p>
        <p>
          ⭐⭐<i>⭐</i>: Good titles I do like. I've watched them less times
          than previous category, but always excited to watch them one more
          time. Majority of titles in the collection have this rating.
        </p>
        <p>
          ⭐<i>⭐</i>
          <i>⭐</i>: Titles I still like but they have some nuances or were
          added just to have in the collection. I've watched them only a few
          times and usually choose to watch one more time some titles from the
          previous categories.
        </p>
      </section>
    </ArticleContent>
  );
};

export const Route = createFileRoute('/about')({
  component: AboutPageContainer,
});
