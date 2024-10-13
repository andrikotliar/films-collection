import { ObjectId } from 'mongodb';
import { logger } from './logger.js';
import { getFilesList } from './get-files-list.js';
import { getFileData } from './get-file-data.js';

/**
 * @param {string} folderPath
 * @returns {unknown[]}
 */
const loadMultipleFilesData = async (folderPath) => {
  const filesList = await getFilesList(folderPath);
  const now = new Date();

  logger.startProcess('Started loading files by path:', folderPath);

  const promises = filesList.map(async (fileName) => {
    const fileData = await getFileData(`${folderPath}/${fileName}`);

    if (!fileData) {
      throw new Error(`Failed process ${fileName}`);
    }

    const { id, ...plainData } = fileData;

    const objectId = ObjectId.createFromHexString(id);

    return {
      ...plainData,
      _id: objectId,
      createdAt: now,
      updatedAt: now,
    };
  });

  const dataset = await Promise.all(promises);

  logger.finishProcess('Finished data loading:', dataset.length);

  return dataset;
};

export { loadMultipleFilesData };
