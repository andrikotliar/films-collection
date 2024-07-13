import { readFile } from 'fs';
import { join } from 'path';

const readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, (error, data) => {
      if (error) {
        reject(error.message);
        return;
      }

      const parsedData = JSON.parse(data);

      resolve(parsedData);
    });
  });
};

/**
 *
 * @param {{ folder: string, fileName: string }} params
 * @returns {Object | null}
 */
const readData = async ({ folder, fileName }) => {
  try {
    const filePath = join(folder, fileName);
    const data = await readFilePromise(filePath);

    return data;
  } catch (error) {
    console.log('[ERROR]:', error);
    return null;
  }
};

export { readData };
