import './styles.css';
import Checkbox from './components/Checkbox';

const Admin = () => {
  return (
    <div className="admin">
      <div className="admin__editor">
        <input id="title" type="text" className="admin__film-title" placeholder="New film" />
        <section className="admin__section">
          <h2 className="admin__section-title">Type</h2>
          <div className="admin__sidebar__section flex-g10">
            <Checkbox value="Film" title="Film" className="admin__type" />
            <Checkbox value="Series" title="Series" className="admin__type" />
            <Checkbox value="Animation" title="Animation" className="admin__type" />
          </div>
        </section>
        <section className="admin__section">
          <h2 className="admin__section-title">Genres</h2>
          <div className="admin__flex-g10">
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Sci-Fi" />
              <span>Sci-Fi</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Adventures" />
              <span>Adventures</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Fantasy"/>
              <span>Fantasy</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Action"/>
              <span>Action</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Drama"/>
              <span>Drama</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Comedy"/>
              <span>Comedy</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Crime"/>
              <span>Crime</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Romance"/>
              <span>Romance</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__genre" value="Thriller"/>
              <span>Thriller</span>
            </label>
          </div>
        </section>
        <section className="admin__section">
          <h2 className="admin__section-title">Media</h2>
          <div className="admin__flex-g20">
            <div className="admin__input-wrapper">
              <label for="poster">Poster</label>
              <input type="text" id="poster"/>
            </div>
            <div className="admin__input-wrapper" data-type="film">
              <label for="trailer">Trailer</label>
              <input type="text" id="trailer"/>
            </div>
          </div>
        </section>
        <section className="admin__section">
          <h2 className="admin__section-title">Synopsis</h2>
          <div className="admin__flex-g20">
            <textarea id="synopsis" className="admin__synopsis"></textarea>
          </div>
        </section>
        <section className="admin__section">
          <h2 className="admin__section-title">Creators</h2>
          <div className="admin__flex-g20">
            <div className="admin__input-wrapper">
              <label for="director">Director</label>
              <input type="text" id="director"/>
            </div>
            <div className="admin__input-wrapper">
              <label for="producers">Producers</label>
              <input type="text" id="producers"/>
            </div>
            <div className="admin__input-wrapper">
              <label for="writtens">Writtens</label>
              <input type="text" id="writtens"/>
            </div>
            <div className="admin__input-wrapper">
              <label for="music">Music</label>
              <input type="text" id="music"/>
            </div>
            <div className="admin__input-wrapper">
              <label for="cinema">Cinematography</label>
              <input type="text" id="cinema"/>
            </div>
          </div>
        </section>
        <section className="admin__section">
          <h2 className="admin__section-title">Details</h2>
          <div className="admin__flex-g20">
            <div className="admin__input-wrapper">
              <label for="studio">Production Co</label>
              <input type="text" id="production"/>
            </div>
            <div className="admin__input-wrapper">
              <label for="year">Year</label>
              <input type="text" id="year"/>
            </div>
            <div className="admin__input-wrapper">
              <label for="time">Runtime</label>
              <input type="number" id="time"/>
            </div>
            <div className="admin__input-wrapper">
              <label for="countries">Countries</label>
              <input type="text" id="countries" value="USA"/>
            </div>
            <div className="admin__row static">
              <div className="admin__input-wrapper">
                <label for="parts">Parts Title</label>
                <input type="text" id="parts" value=""/>
              </div>
              <div className="admin__input-wrapper">
                <label for="parts">Part Number</label>
                <input type="number" id="partsNumber" value=""/>
              </div>
            </div>
          </div>
        </section>
        <section className="admin__section" data-type="film">
          <h3 className="admin__section-title">Budget</h3>
          <div className="admin__row static">
            <div className="admin__input-wrapper">
              <input type="number" id="budget"/>
            </div>
            <div className="admin__select-wrapper">
              <select id="budget-million">
                <option value="million">million</option>
                <option value="billion">billion</option>
              </select>
            </div>
          </div>
        </section>
        <section className="admin__section" data-type="film">
          <h3 className="admin__section-title">Box Office</h3>
          <div className="admin__row static">
            <div className="admin__input-wrapper">
              <input type="number" id="boxoffice"/>
            </div>
            <div className="admin__select-wrapper">
              <select id="boxoffice-million">
                <option value="million">million</option>
                <option value="billion">billion</option>
              </select>
            </div>
          </div>
        </section>
        <section className="admin__section">
          <h2 className="admin__section-title">Actors</h2>
          <div id="actors" className="admin__flex-g20">
            <div className="admin__actor row static">
              <div className="admin__input-wrapper">
                <input type="text" className="admin__actor-name" placeholder="Actor"/>
              </div>
              <div className="admin__input-wrapper">
                <input type="text" className="admin__actor-character" placeholder="Character name"/>
              </div>
            </div>
          </div>
          <button type="button" id="addActor" className="admin__btn add-row-btn">Add actor</button>
        </section>
        <section className="admin__section">
          <h2 className="admin__section-title">Awards</h2>
          <div id="awards" className="admin__flex-g20">
            <div className="admin__award row static">
              <div className="admin__input-wrapper">
                <input type="text" className="admin__award-title" placeholder="Award"/>
              </div>
              <div className="admin__input-wrapper">
                <input type="text" className="admin__award-nominations" placeholder="Nominations"/>
              </div>
            </div>
          </div>
          <button type="button" id="addAward" className="admin__btn add-row-btn add-award-btn">Add award</button>
        </section>
        <section className="admin__section hidden" data-type="series">
          <h2 className="admin__section-title">Seasons</h2>
          <div className="admin__seasons">
            <div className="admin__seasons__basic">
              <div className="admin__input-wrapper">
                <label for="seasonsCount">Count</label>
                <input type="number" id="seasonsCount" value="1"/>
              </div>
              <button id="addSeasons" className="admin__add-seasons-btn btn">Add</button>
            </div>
            <div className="admin__seasons__data"></div>
          </div>
        </section>
        <section>
          <h2 className="admin__section-title">Characters</h2>
          <div className="admin__row">
            <div className="admin__input-wrapper">
              <input type="number" id="characters-num" value="0"/>
            </div>
          </div>
        </section>
        <section className="admin__section">
          <h2 className="admin__section-title">Collections</h2>
          <div className="admin__flex-g10">
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Space"/>
              <span>Space</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Marvel Cinematic Universe"/>
              <span>MCU</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Invasion"/>
              <span>Invasion</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Cars"/>
              <span>Cars</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Dystopia"/>
              <span>Dystopia</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Mysteries of the Past"/>
              <span>Mysteries of the Past</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Future"/>
              <span>Future</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Robots"/>
              <span>Robots</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Fantasy"/>
              <span>Fantasy</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="In Real World"/>
              <span>In Real World</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Based on Real Events"/>
              <span>Based on Real Events</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Superpower"/>
              <span>Superpower</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Monsters"/>
              <span>Monsters</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="DC Extended Universe"/>
              <span>DCEU</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Anime"/>
              <span>Anime</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Disaster"/>
              <span>Disaster</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Arts"/>
              <span>Arts</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Special Skills"/>
              <span>Special Skills</span>
            </label>
            <label className="admin__checkbox-wrapper">
              <input type="checkbox" className="admin__collection" value="Martial Arts"/>
              <span>Martial Arts</span>
            </label>
          </div>
        </section>
      </div>
      <div className="admin__controls">
        <button className="admin__btn admin__btn--save">Save</button>
        <button className="admin__btn admin__btn--clear">Clear</button>
      </div>
    </div>
  );
};

export default Admin;
