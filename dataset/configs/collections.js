import { loadMultipleFilesData } from '../helpers/load-multiple-files-data.js';
import { loadJsonData } from '../helpers/load-json-data.js';

/**
 * @typedef {Object} Config
 * @property {string} dbCollection
 * @property {(...args: any[]) => Promise<unknown[]>} loader
 */

/** @type {Config[]} */
export const collectionsConfig = [
  {
    dbCollection: 'films',
    loader: () => loadMultipleFilesData('./data/films'),
  },
  {
    dbCollection: 'actors',
    loader: () => loadJsonData('./data/supporting/actors.json'),
  },
  {
    dbCollection: 'chapters',
    loader: () => loadJsonData('./data/supporting/chapters.json'),
  },
  {
    dbCollection: 'awards',
    loader: () => loadJsonData('./data/supporting/awards.json'),
  },
  {
    dbCollection: 'lists',
    loader: () => loadJsonData('./data/supporting/lists.json'),
  },
  {
    dbCollection: 'collections',
    loader: () => loadJsonData('./data/supporting/collections.json'),
  },
];
