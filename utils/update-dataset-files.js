import { filmModifier } from './modifiers.js';
import { readData, writeData, readFolder } from './helpers/index.js';
import { DATASET_FOLDER } from './constants/index.js';

const updateDatasetFiles = async () => {
  const files = await readFolder(DATASET_FOLDER);

  for (let fileName of files) {
    const data = await readData({ folder: DATASET_FOLDER, fileName });

    const { film: modifiedData } = filmModifier(data);

    await writeData(`${DATASET_FOLDER}/${fileName}`, modifiedData, 'expanded');
  }
};

updateDatasetFiles();
