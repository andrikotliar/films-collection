import { GroupedCollections } from '../../collections/types';
import { ListType } from '../../lists/enums';

type InitialData = {
  filters: {
    general: {
      [key in ListType]: string[];
    };
    collections: GroupedCollections;
  };
};

export { InitialData };
