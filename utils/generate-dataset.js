import fs from 'fs';
import actorsData from './data/actors.json' assert { type: 'json' };
import relatedFilmsData from './data/related.json' assert { type: 'json' };

const generateDatabaseFiles = () => {
  const files = fs.readdirSync('./dataset/json');

  const dataset = files.map((file) => {
    const fileData = fs.readFileSync(`./dataset/json/${file}`, 'utf8');
    const film = JSON.parse(fileData);

    if (film.relatedTitlesKey) {
      film.related = relatedFilmsData[film.relatedTitlesKey];
    }

    return film;
  });

  const sortedDataset = dataset.sort((a, b) => (a.year < b.year ? 1 : -1));

  const result = {
    films: sortedDataset,
    actors: actorsData,
  };

  fs.writeFile(
    './public/dataset/dataset.json',
    JSON.stringify(result),
    (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Dataset completed!');
    },
  );
};

const createFolderForDB = () => {
  fs.mkdir('./public/dataset', (error) => {
    if (error) console.log(error);
    createDB();
  });
};

const init = () => {
  try {
    if (fs.existsSync('./public/dataset')) {
      generateDatabaseFiles();
    } else {
      createFolderForDB();
    }
  } catch (error) {
    console.error(error);
  }
};

init();
