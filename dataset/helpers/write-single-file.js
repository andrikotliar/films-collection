import { logger } from './logger.js';
import fs from 'node:fs';

export const writeSingleFile = async ({ collectionName, data, path }) => {
  const fileName = `${collectionName}.json`;
  const fullPath = `${path}/${fileName}`;

  const transformedData = data.map((doc) => {
    const { _id, createdAt, updatedAt, ...entity } = doc;

    return {
      id: _id.toString(),
      ...entity,
    };
  });

  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, {
      recursive: true,
    });
  }

  await fs.promises.writeFile(
    fullPath,
    JSON.stringify(transformedData, undefined, 2),
    'utf-8',
  );

  logger.success(
    `File [${fileName}] was written to ${path}. Result file contains {${data.length}} items`,
  );
};
