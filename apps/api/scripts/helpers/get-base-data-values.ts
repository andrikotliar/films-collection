import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { VALUES_FOLDER } from '../constants/index.js';
import { MissingFolderException } from './missing-folder-exception.js';
import { readContent } from './read-file-content.js';

export const getBaseDataValues = async <T extends Record<string, unknown>>(
  valueFolders: string[],
): Promise<T> => {
  const entryPromises = valueFolders.map(async (folder) => {
    const valuesPath = path.join(import.meta.dirname, '../..', folder, VALUES_FOLDER);
    const doesFolderExist = existsSync(valuesPath);

    if (!doesFolderExist) {
      throw new MissingFolderException({ basePath: folder, destination: VALUES_FOLDER });
    }

    const values = await fs.readdir(valuesPath);

    return {
      folder: valuesPath,
      values,
    };
  });

  const entries = await Promise.all(entryPromises);
  const result = {} as Record<string, unknown>;

  for await (const entry of entries) {
    const jsonFiles = entry.values.filter((entry) => entry.endsWith('.json'));
    const promises = jsonFiles.map(async (file) => readContent(path.join(entry.folder, file)));
    const data = await Promise.all(promises);
    const filteredData = data.filter((item) => item !== null);

    for (const item of filteredData) {
      const key = path.basename(item.filePath).replace('.json', '');

      result[key] = item.data;
    }
  }

  return result as T;
};
