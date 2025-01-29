import { ListOption } from 'src/common';

export type InitialData = {
  options: {
    genres: ListOption[];
    countries: ListOption[];
    studios: ListOption[];
    collections: ListOption[];
    types: ListOption<string>[];
    styles: ListOption<string>[];
  };
};
