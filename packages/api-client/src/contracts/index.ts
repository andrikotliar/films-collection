import { authContract } from './auth.contract';
import { awardsContract } from './awards.contract';
import { chapterKeysContract } from './chapter-keys.contract';
import { collectionEventsContract } from './collection-events.contract';
import { collectionsContract } from './collections.contract';
import { countriesContract } from './countries.contract';
import { filesContract } from './files.contract';
import { filmsContract } from './films.contract';
import { genresContract } from './genres.contract';
import { initialDataContract } from './initial-data.contract';
import { pageContentContract } from './page-content.contract';
import { peopleContract } from './people.contract';
import { studiosContract } from './studios.contract';
import { usersContracts } from './users.contract';

export const contracts = {
  authContract,
  awardsContract,
  chapterKeysContract,
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
