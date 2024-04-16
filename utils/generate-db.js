import fs from 'fs';

const generateDatabaseFiles = () => {
  const files = fs.readdirSync('./db/');
  const filteredFiles = files.filter((file) => !file.startsWith('_'));

  const db = filteredFiles.map((file) => {
    const fileData = fs.readFileSync(`./db/${file}`, 'utf8');
    const film = JSON.parse(fileData);

    return film;
  });

  const sortedDb = db.sort((a, b) => (a.year < b.year ? 1 : -1));
  const ids = db.map((film) => film.id);

  fs.writeFile(
    './public/database/database.json',
    JSON.stringify(sortedDb),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Database completed!');
    },
  );

  fs.writeFile(
    './public/database/film-ids.json',
    JSON.stringify(ids),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Film IDs created!');
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
