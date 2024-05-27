import { processData } from './process-data.js';
import { readData, writeData, readFolder } from './helpers/index.js';
import { DATASET_FOLDER } from './constants/index.js';

const shouldWriteData = process.argv[2] === 'write';

const modifyData = async (shouldWriteData) => {
  const files = await readFolder(DATASET_FOLDER);

  for (let fileName of files) {
    const data = await readData({ folder: DATASET_FOLDER, fileName });

    const { film: modifiedData } = processData(data);

    if (shouldWriteData) {
      await writeData(fileName, modifiedData, 'expanded');
    }
  }
};

modifyData(shouldWriteData);
