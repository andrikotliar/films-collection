import { mkdir, existsSync } from 'fs';
import actorsData from './data/actors.json' assert { type: 'json' };
import relatedFilmsData from './data/related.json' assert { type: 'json' };
import { readData, readFolder, writeData } from './helpers/index.js';
import {
  DATASET_FOLDER,
  PUBLIC_DATASET_JSON,
  PUBLIC_DATASET_FOLDER,
} from './constants/index.js';

const generateCombinedDataset = async () => {
  const files = await readFolder(DATASET_FOLDER);

  const promises = files.map(async (fileName) => {
    const film = await readData({ folder: DATASET_FOLDER, fileName });

    if (!film) {
      console.log('[ERROR]:', `Failed process ${fileName}`);
    }

    if (film.relatedTitlesKey) {
      film.related = relatedFilmsData[film.relatedTitlesKey];
    }

    return film;
  });

  const dataset = await Promise.all(promises);

  const sortedDataset = dataset.sort((a, b) => (a.year < b.year ? 1 : -1));

  const result = {
    films: sortedDataset,
    actors: actorsData,
  };

  await writeData(PUBLIC_DATASET_JSON, result);
};

const createFolderForDB = async () => {
  mkdir(PUBLIC_DATASET_FOLDER, async (error) => {
    if (error) console.log(error);
    await generateCombinedDataset();
  });
};

const init = async () => {
  try {
    if (existsSync(PUBLIC_DATASET_FOLDER)) {
      await generateCombinedDataset();
    } else {
      await createFolderForDB();
    }
  } catch (error) {
    console.error('[GENERATE ERROR]:', error?.message);
  }
};

init();
