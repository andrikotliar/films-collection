import { writeFile } from 'fs';

const StringifyModes = {
  MINIFIED: 'minified',
  EXPANDED: 'expanded',
};

const writeFilePromise = async (path, data) => {
  return new Promise((resolve, reject) => {
    writeFile(path, data, (error) => {
      if (error) {
        reject(error.message);
        return;
      }

      resolve();
    });
  });
};

const isMinifiedMode = (mode) => mode === StringifyModes.MINIFIED;

const getNotMinifiedData = (data) => JSON.stringify(data, undefined, 2);

/**
 *
 * @param {string} path
 * @param {Object} data
 * @param {'minified' | 'expanded'} mode
 */
const writeData = async (path, data, mode = StringifyModes.MINIFIED) => {
  try {
    const stringifiedData = isMinifiedMode(mode)
      ? JSON.stringify(data)
      : getNotMinifiedData(data);

    await writeFilePromise(path, stringifiedData);
  } catch (error) {
    console.log('[ERROR]:', error);
  }
};

export { writeData };
