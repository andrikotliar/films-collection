import fs from 'fs';
import actors from './data/actors.json' assert { type: 'json' };

const generateDatabaseFile = () => {
  const files = fs.readdirSync('./db/');
  const db = files.map((file) => {
    try {
      const fileData = fs.readFileSync(`./db/${file}`, 'utf8');
      const film = JSON.parse(fileData);

      film.cast = film.cast.map((actor) => {
        const currentActor = actors[actor.actorId];

        return {
          ...actor,
          name: currentActor?.name,
          photoUrl: currentActor?.photoUrl,
        };
      });

      return film;
    } catch (e) {
      console.error(e?.message);
    }
  });

  const sortedDb = db.sort((a, b) => (a.year < b.year ? 1 : -1));

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
      generateDatabaseFile();
    } else {
      createFolderForDB();
    }
  } catch (error) {
    console.error(error);
  }
};

init();
