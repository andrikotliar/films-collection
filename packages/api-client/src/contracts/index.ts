import { authContract } from './auth.contract.js';
import { awardsContract } from './awards.contract.js';
import { collectionEventsContract } from './collection-events.contract.js';
import { collectionsContract } from './collections.contract.js';
import { countriesContract } from './countries.contract.js';
import { filesContract } from './files.contract.js';
import { filmsContract } from './films.contract.js';
import { genresContract } from './genres.contract.js';
import { initialDataContract } from './initial-data.contract.js';
import { pageContentContract } from './page-content.contract.js';
import { peopleContract } from './people.contract.js';
import { studiosContract } from './studios.contract.js';
import { usersContracts } from './users.contract.js';

export const contracts = {
  authContract,
  awardsContract,
  collectionEventsContract,
  collectionsContract,
  countriesContract,
  filesContract,
  filmsContract,
  genresContract,
  initialDataContract,
  pageContentContract,
  peopleContract,
  studiosContract,
  usersContracts,
} as const;
