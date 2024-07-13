import { readdir } from 'fs';

const readDirPromise = (path) => {
  return new Promise((resolve, reject) => {
    readdir(path, (error, files) => {
      if (error) {
        reject(error.message);
        return;
      }

      resolve(files);
    });
  });
};

/**
 *
 * @param {string} path
 * @returns {Promise<string[]>}
 */
const readFolder = async (path) => {
  try {
    const files = await readDirPromise(path);

    return files;
  } catch (error) {
    console.log('[ERROR]:', error);
    return [];
  }
};

export { readFolder };
