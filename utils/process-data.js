import actors from './data/actors.json' assert { type: 'json' };
import related from './data/related.json' assert { type: 'json' };

import { readData, readFolder } from './helpers/index.js';
import { DATASET_FOLDER } from './constants/index.js';

import modifier from './modifier.js';

const processData = async () => {
  if (typeof modifier !== 'function') {
    console.log('[ERROR]:', 'Modifier function must be defined!');
    return;
  }

  const files = await readFolder(DATASET_FOLDER);
  const filesData = files.map(async (fileName) => {
    const data = await readData({ folder: DATASET_FOLDER, fileName });

    if (!data) {
      console.log('[ERROR]:', `Failed processing ${fileName}`);
    }

    return data;
  });

  const films = await Promise.all(filesData);
};

processData();
