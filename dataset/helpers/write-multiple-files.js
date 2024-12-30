import fs from 'node:fs';
import { formatTitle } from './format-title.js';
import { logger } from './logger.js';

export const writeMultipleFiles = async ({ data, path }) => {
  if (!fs.existsSync(path)) {
    await fs.promises.mkdir(path, {
      recursive: true,
    });
  }

  for (const document of data) {
    const { _id, createdAt, updatedAt, ...entity } = document;

    const stringifiedId = _id.toString();
    const formattedTitle = formatTitle(entity.title, stringifiedId);
    const fileName = `${formattedTitle}.json`;
    const fullPath = `${path}/${fileName}`;

    const transformedDocument = {
      id: stringifiedId,
      ...entity,
    };

    await fs.promises.writeFile(
      fullPath,
      JSON.stringify(transformedDocument, undefined, 2),
      'utf-8',
    );

    logger.success(`File [${fileName}] was written to ${path}`);
  }
};
