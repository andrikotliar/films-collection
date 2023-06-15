import './styles.css';
import { setBrowserTitle } from '@/heplers';
import DataViewer from '@/pages/Info/components/DataViewer';
import { filmDataExplanation } from '@/pages/Info/configs';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const InfoPage = () => {
  setBrowserTitle('Information about Films Collection App');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info">
      <div className="container info__container">
        <aside className="info__sidebar">
          <nav className="info__navigation">
            <h2>Navigation:</h2>
            <a href="#data">Data</a>
            <a href="#details">Details</a>
            <a href="#tools">Tools</a>
          </nav>
        </aside>
        <article className="info__main">
          <section className="info__section">
            <h1 className="info__title">Films Collection Application - {new Date().getFullYear()}</h1>
            <p className="info__text">
              The application is developed as my personal collection of favorite films.
            </p>
            <p className="info__text">
              All information, posters and videos was taken from open internet resources. Actor photos loads from <a href="https://www.themoviedb.org/" target="_blank" >the TMDB</a> directly.
            </p>
            <p className="info__text">Source code of the app: <a href="https://github.com/andrikotliar/filmscollection" target="_blank">https://github.com/andrikotliar/filmscollection</a></p>
          </section>
          <section className="info__section" id="data">
            <h2 className="info__section-title">Data</h2>
            <p className="info__text">
              All data stores in json-files, that are combined into the <b>database.json</b> file after the build or start command is run.
            </p>
            <p className="info__text">
              To build your own version of the list, clone the project:
            </p>
            <div className="info__code">
              <p>git clone git@github.com:andrikotliar/filmscollection.git</p>
              <p>cd filmscollection</p>
            </div>
            <p className="info__text">
              Add or delete some films form the db folder and then run commands:
            </p>
            <div className="info__code">
              <p>npm install</p>
              <p>npm start</p>
            </div>
            <p className="info__text">It will install all required packages and start the development server.</p>
            <p className="info__text">Or run following commads to build project for the production:</p>
            <div className="info__code">
              <p>npm install</p>
              <p>npm run build</p>
            </div>
            <p className="info__text">To create data for the new film, use the <Link to="/admin">Film Builder</Link> GUI.</p>
          </section>
          <section className="info__section" id="details">
            <h2 className="info__section-title">
              Film data details
            </h2>
            <DataViewer data={filmDataExplanation} />
          </section>
          <section className="info__section" id="tools">
            <h2 className="info__section-title">Tools</h2>
            <p className="info__text">There are several node scripts in the root of the project that help to build "database":</p>
            <ul className="info__list">
              <li><b>create-db.js</b> - the main script that runs on app start and build. It brings together all JSONs from the DB folder into one JSON-file.</li>
              <li><b>create-statistic.js</b> - create data for the statistic page.</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};

export default InfoPage;