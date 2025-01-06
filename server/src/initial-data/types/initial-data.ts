import { GroupedLists } from 'src/lists/types';
import { GroupedCollections } from '../../collections/types';

export type InitialData = {
  options: {
    general: GroupedLists;
    collections: GroupedCollections;
  };
};
