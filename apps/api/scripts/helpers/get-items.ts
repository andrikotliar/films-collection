import path from 'node:path';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { ITEMS_FOLDER } from '../constants/index.js';
import { readContent } from './read-file-content.js';
import { MissingFolderException } from './missing-folder-exception.js';

export const getItems = async <T extends Record<string, unknown>>(
  dataBasePath: string,
): Promise<T[]> => {
  const itemsPath = path.join(import.meta.dirname, '../..', dataBasePath, ITEMS_FOLDER);
  const doesFolderExist = existsSync(itemsPath);

  if (!doesFolderExist) {
    throw new MissingFolderException({ basePath: dataBasePath, destination: ITEMS_FOLDER });
  }

  const entries = await fs.readdir(itemsPath);

  const promises = entries.map(async (file) => {
    const result = await readContent<T>(path.join(itemsPath, file));

    return result ? result.data : null;
  });

  const data = await Promise.all(promises);
  const filteredData = data.filter((item) => item !== null);

  return filteredData;
};
