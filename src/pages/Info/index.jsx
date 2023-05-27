import './styles.css';
import filmJsonExample from '@/assets/images/avatar-json-example.png';
import seasonsJsonExample from '@/assets/images/stranger-things-seasons-example.png';

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
          git clone git@github.com:andrikotliar/filmscollection.git
        </div>
        <p className="info__text">Here's the example of one of films data:</p>
        <div className="info__image">
          <img src={filmJsonExample} alt="Avatar JSON file example" />
        </div>
        <p className="info__text">Series has additional field - seasons with the following data: </p>
        <div className="info__image">
          <img src={seasonsJsonExample} alt="Stranger Things Seasons JSON data example" />
        </div>
      </section>
      <section className="info__section">
        <h2 className="info__section-title">
          Explanation of some fields
        </h2>
        <ul className="info__list">
          <li><b>Type</b> - is necessary for dividing data into Films and Series, but also can have the Animation type that doesn't influence on data, but is useful for filtering.</li>
          <li><b>Poster</b> - the field contains the name of a file that is stored by the <span>/public/posters</span> path and have to have the <span>.webp</span> extension.</li>
          <li><b>Trailer</b> - is the ID part of a youtube link: https://www.youtube.com/watch?v=<span>d9MyW72ELq0</span></li>
          <li><b>Collections</b> - special type of filter, have <span>name</span> and <span>order</span> parameters. <span>The order</span> defins in which order to show films in the list.</li>
          <li><b>Parts</b> - is neccessary to show related films on a film page. It has the <span>Part</span> parameter that is similar to the Order parameter in the Collections field. It defines order of film chapters.</li>
          <li><b>Cast</b> - has two required parameters: <span>character</span> and <span>actorId</span>. The Actor ID is a reference to the actor in a separate file: <a href="https://github.com/andrikotliar/films-collection__react/blob/main/public/database/actors.json" target="_blank">actors.json</a>. This file is a collection of actor names and they photo URLs. The character parameter defined the name of a character and its image from a movie. <i className="info__deprecated">The description parameter is deprecated and won't be supported in the future</i>.</li>
        </ul>
      </section>
      <section className="info__section">
        <h2 className="info__section-title">Tools</h2>
        <p className="info__text">There are several node scripts in the root of the project that help to build "database":</p>
        <ul className="info__list">
          <li><b>createDB.js</b> - the main script that runs on app start and build. It brings together all JSONs from the DB folder into one JSON-file.</li>
          <li><b>createStatistic.js</b> - create data for the statistic page.</li>
          <li><b>buildFiltersConfig.js</b> - brings distinct values of types, genres, countries, studios. You can manually configure which parameters add to the config. Also, the script define the start year for the year filter.</li>
        </ul>
      </section>
    </article>
  );
};

export default InfoPage;