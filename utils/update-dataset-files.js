import modifier from './modifier.js';
import { readData, writeData, readFolder } from './helpers/index.js';
import { DATASET_FOLDER } from './constants/index.js';

const updateDatasetFiles = async () => {
  if (typeof modifier !== 'function') {
    console.log('[ERROR]:', 'Modifier function must be defined!');
    return;
  }

  const files = await readFolder(DATASET_FOLDER);

  for (let fileName of files) {
    const data = await readData({ folder: DATASET_FOLDER, fileName });

    const { film: modifiedData } = modifier(data);

    await writeData(fileName, modifiedData, 'expanded');
  }
};

updateDatasetFiles();
