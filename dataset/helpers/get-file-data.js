import fs from 'node:fs/promises';
import { logger } from './logger.js';

/**
 *
 * @param {string} path
 * @returns {Promise<{ [key: string]: unknown } | null>}
 */
export const getFileData = async (path) => {
  try {
    const data = await fs.readFile(path);
    const parsedData = JSON.parse(data);

    return parsedData;
  } catch (error) {
    logger.error('Error processing file', path, error?.message);
    return null;
  }
};
