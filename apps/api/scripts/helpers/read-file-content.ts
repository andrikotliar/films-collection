import fs from 'node:fs/promises';
import { logger } from './logger.js';

export type ContentResponse<T extends Record<string, unknown>> = {
  filePath: string;
  data: T;
};

export const readContent = async <T extends Record<string, unknown>>(
  path: string,
): Promise<ContentResponse<T> | null> => {
  try {
    const content = await fs.readFile(path, 'utf-8');

    const data = JSON.parse(content) as T;
    return {
      filePath: path,
      data,
    };
  } catch (error: any) {
    logger.error(`[Reading file failed]: (${path}): ${error.message}`);
    return null;
  }
};
