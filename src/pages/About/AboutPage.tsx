import './about-page.css';
import { useEffect } from 'react';
import { setBrowserTitle } from '@/heplers';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  setBrowserTitle('About - Films Collection');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about">
      <div className="container">
        <h1 className="about__title">About</h1>
        <article className="about__content">
          <p>Hello, my name is Andrii. I'm a big fan of movies and like to collect information about them. This is the purpose of creating this collection of films. The app represents my personal films list and usually, I call it my blog.</p>
          <p>I don't use any third-party API to get data. All data are manually collected from different resources, mainly from <a href="https://www.imdb.com/" target="_blank">the IMDB</a>. You can investigate data in the DB folder in the source code.</p>
          <p>Posters and trailer videos belong to their authors and were taken from open resources. If you consider I have to remove your content, contact me via <a href="mailto:andrii.ktlr@gmail.com">andrii.ktlr@gmail.com.</a></p>
          <p>Actor images fetch from the Movie Database: <a href="https://www.themoviedb.org/" target="_blank">https://www.themoviedb.org/</a>.</p>
        </article>
        <div className="about__footer">
          <Link to="/" className="about__explore">
            Explore films
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;