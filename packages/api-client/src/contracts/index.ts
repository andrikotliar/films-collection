import { createContractsGroup } from '../helpers/define-contracts.js';
import { authContract } from './auth.contract.js';
import { awardsContract } from './awards.contract.js';
import { collectionEventsContract } from './collection-events.contract.js';
import { collectionsContract } from './collections.contract.js';
import { countriesContract } from './countries.contract.js';
import { filesContract } from './files.contract.js';
import { filmsContract } from './films.contract.js';
import { genresContract } from './genres.contract.js';
import { initialDataContract } from './initial-data.contract.js';
import { articlesContract } from './articles.contract.js';
import { peopleContract } from './people.contract.js';
import { studiosContract } from './studios.contract.js';
import { usersContracts } from './users.contract.js';
import { hobbiesContract } from '~/contracts/hobbies.contract.js';

export const contracts = {
  auth: createContractsGroup('auth', authContract),
  awards: createContractsGroup('awards', awardsContract),
  collectionEvents: createContractsGroup('collection-events', collectionEventsContract),
  collections: createContractsGroup('collections', collectionsContract),
  countries: createContractsGroup('countries', countriesContract),
  files: createContractsGroup('files', filesContract),
  films: createContractsGroup('films', filmsContract),
  genres: createContractsGroup('genres', genresContract),
  initialData: createContractsGroup('initial-data', initialDataContract),
  articles: createContractsGroup('articles', articlesContract),
  people: createContractsGroup('people', peopleContract),
  studios: createContractsGroup('studios', studiosContract),
  users: createContractsGroup('users', usersContracts),
  hobbies: createContractsGroup('hobbies', hobbiesContract),
} as const;
