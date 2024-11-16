import { loadMultipleFilesData } from '../helpers/load-multiple-files-data.js';
import { loadJsonData } from '../helpers/load-json-data.js';

const collectionsConfig = [
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
];

export { collectionsConfig };
