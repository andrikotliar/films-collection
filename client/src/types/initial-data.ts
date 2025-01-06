import { CollectionType, ListType } from '@/enums';

export type InitialData = {
  options: {
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
