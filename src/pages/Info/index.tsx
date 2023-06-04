import './styles.css';
import { Link } from 'react-router-dom';
import FilmSchema from '@/film-schema.json';
import { SchemaViewer } from '@/pages/Info/components';

const InfoPage = () => {
  return (
    <article className="info">
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
      <section className="info__section">
        <h2 className="info__section-title">Data</h2>
        <p className="info__text">
          All data stores in simple json-files. They are combined in the single JSON-file during building by using node-script.
        </p>
        <p className="info__text">
          To build your own version of the list, you need to clone the project:
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
        <p className="info__text">To create data for the new film you can use the <Link to="/admin">Film Builder</Link> GUI.</p>
        <p className="info__text">
          The film data has the following schema:
        </p>
        <div className="info__json">
          <div className="info__json-container">
            <SchemaViewer schema={FilmSchema} />
          </div>
        </div>
        <p></p>
      </section>
      <section className="info__section">
        <h2 className="info__section-title">Tools</h2>
        <p className="info__text">There are several node scripts in the root of the project that help to build "database":</p>
        <ul className="info__list">
          <li><b>create-db.js</b> - the main script that runs on app start and build. It brings together all JSONs from the DB folder into one JSON-file.</li>
          <li><b>create-statistic.js</b> - create data for the statistic page.</li>
        </ul>
      </section>
    </article>
  );
};

export default InfoPage;