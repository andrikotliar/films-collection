import fs from 'fs';
import actorsData from './data/actors.json' assert { type: 'json' };
import relatedFilmsData from './data/related.json' assert { type: 'json' };

const generateDatabaseFiles = () => {
  const files = fs.readdirSync('./db/');

  const db = files.map((file) => {
    const fileData = fs.readFileSync(`./db/${file}`, 'utf8');
    const film = JSON.parse(fileData);

    if (film.relatedTitlesKey) {
      film.related = relatedFilmsData[film.relatedTitlesKey];
    }

    return film;
  });

  const sortedDb = db.sort((a, b) => (a.year < b.year ? 1 : -1));

  const result = {
    films: sortedDb,
    actors: actorsData,
  };

  fs.writeFile(
    './public/database/database.json',
    JSON.stringify(result),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Database completed!');
    },
  );
};

const createFolderForDB = () => {
  fs.mkdir('./public/database', (error) => {
    if (error) console.log(error);
    createDB();
  });
};

const init = () => {
  try {
    if (fs.existsSync('./public/database')) {
      generateDatabaseFiles();
    } else {
      createFolderForDB();
    }
  } catch (error) {
    console.error(error);
  }
};

init();
