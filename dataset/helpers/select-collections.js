import { logger } from './logger.js';

/**
 * @typedef {typeof import('../configs/collections').collectionsConfig} Configs
 */

/**
 * @param {Configs} source
 * @param {string[]} requestedCollections
 * @returns {Configs}
 */
export const selectCollections = (source, requestedCollections) => {
  if (!requestedCollections.length) {
    return source;
  }

  const groupedCollections = requestedCollections.reduce(
    (result, currentCollection) => {
      const config = source.find(
        (config) => currentCollection === config.dbCollection,
      );

      if (!config) {
        result.toSkip.push(currentCollection);
        return result;
      }

      result.toProcess.push(config);

      return result;
    },
    {
      toSkip: [],
      toProcess: [],
    },
  );

  if (groupedCollections.toSkip.length) {
    const collectionsListString = groupedCollections.toSkip.join(', ');

    logger.warning(
      `Unknown collections [${collectionsListString}] are skipped.`,
    );
  }

  return groupedCollections.toProcess;
};
