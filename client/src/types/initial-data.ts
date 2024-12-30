import { CollectionType, ListType } from '@/enums';

export type InitialData = {
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
