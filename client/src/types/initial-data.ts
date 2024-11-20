import { CollectionType, ListType } from '@/enums';

type InitialData = {
  filters: {
    general: {
      [key in ListType]: string[];
    };
    collections: {
      [key in CollectionType]: {
        id: string;
        title: string;
      }[];
    };
  };
};

export type { InitialData };
