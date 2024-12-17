import { GroupedLists } from 'src/lists/types';
import { GroupedCollections } from '../../collections/types';

export type InitialData = {
  filters: {
    general: GroupedLists;
    collections: GroupedCollections;
  };
};
