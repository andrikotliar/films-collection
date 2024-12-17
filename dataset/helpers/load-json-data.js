import { ObjectId } from 'mongodb';
import { logger } from './logger.js';
import { getFileData } from './get-file-data.js';

/**
 * @param {string} path
 * @returns {Promise<unknown[]>}
 */
export const loadJsonData = async (path) => {
  logger.startProcess('Started loading data from:', path);

  const data = await getFileData(path);

  const processData = data.map((item) => {
    const { id, ...restItem } = item;

    const objectId = ObjectId.createFromHexString(id);

    return {
      ...restItem,
      _id: objectId,
    };
  });

  logger.finishProcess(`Finished processing ${path}:`, data.length);

  return processData;
};
