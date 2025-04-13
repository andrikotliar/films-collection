import fs from 'node:fs/promises';
import path from 'node:path';

// const fs = require('fs/promises');
// const path = require('path');

/**
 *
 * @param {string} folder
 * @param {(fileName: string) => boolean} filter
 * @returns
 */
const getFilesList = async (folder, filter) => {
  const files = await fs.readdir(folder);

  if (!filter) {
    return files;
  }

  return files.filter(filter);
};

/**
 *
 * @param {string} folder
 * @param {(fileName: string) => boolean} filter
 * @returns
 */
const getFilesData = async (folder, filter) => {
  const files = await getFilesList(folder, filter);
  const results = [];

  for (const file of files) {
    const filePath = path.join(folder, file);

    try {
      const fileData = await fs.readFile(filePath);
      const parsedData = JSON.parse(fileData);

      results.push({
        data: parsedData,
        filePath,
      });
    } catch (err) {
      console.error(`[Error File Reading]: [${filePath}] - ${err.message}`);
    }
  }

  return results;
};

const writeFile = async ({ filePath, rawData, compressed = false }) => {
  try {
    let dataString;

    if (compressed) {
      dataString = JSON.stringify(rawData);
    } else {
      dataString = JSON.stringify(rawData, undefined, 2);
    }

    await fs.writeFile(filePath, dataString, 'utf-8');
  } catch (err) {
    console.error(`[Error File Writing]: [${filePath}] - ${err.message}`);
  }
};

const init = async () => {
  const films = await getFilesData(
    './films',
    (filePath) => !filePath.startsWith('_'),
  );

  const filtered = films.filter(({ data }) => data.type === 'SERIES');

  filtered.forEach((film) => {
    console.log(
      `UPDATE series_extensions SET finished_at = '${film.data.seriesExtension.finishedAt}' WHERE film_id = ${film.data.id};`,
    );
  });
};

init();
