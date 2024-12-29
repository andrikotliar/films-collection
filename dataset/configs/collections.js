/**
 * @typedef {Object} Config
 * @property {string} dbCollection
 * @property {string} dataPath
 * @property {'single' | 'multiple'} mode
 */

/** @type {Config[]} */
export const collectionsConfig = [
  {
    dbCollection: 'films',
    dataPath: './data/films',
    mode: 'multiple',
  },
  {
    dbCollection: 'actors',
    dataPath: './data/supporting/actors.json',
    mode: 'single',
  },
  {
    dbCollection: 'chapters',
    dataPath: './data/supporting/chapters.json',
    mode: 'single',
  },
  {
    dbCollection: 'awards',
    dataPath: './data/supporting/awards.json',
    mode: 'single',
  },
  {
    dbCollection: 'lists',
    dataPath: './data/supporting/lists.json',
    mode: 'single',
  },
  {
    dbCollection: 'collections',
    dataPath: './data/supporting/collections.json',
    mode: 'single',
  },
];
