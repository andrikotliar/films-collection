import { GroupedLists } from 'src/lists/types';
import { GroupedCollections } from '../../collections/types';

type InitialData = {
  filters: {
    general: GroupedLists;
    collections: GroupedCollections;
  };
};

export { InitialData };
