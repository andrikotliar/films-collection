import actors from './data/actors.json' assert { type: 'json' };
import related from './data/related.json' assert { type: 'json' };

import { readData, readFolder } from './helpers/index.js';
import { DATASET_FOLDER } from './constants/index.js';

import { globalDataModifier } from './modifiers.js';

const processData = async () => {
  const files = await readFolder(DATASET_FOLDER);
  const filesData = files.map(async (fileName) => {
    const data = await readData({ folder: DATASET_FOLDER, fileName });

    if (!data) {
      console.log('[ERROR]:', `Failed processing ${fileName}`);
    }

    return { ...data, fileName };
  });

  const films = await Promise.all(filesData);

  await globalDataModifier({ films, actors, related });
};

processData();
