import { ListOption } from './list-option';

export type InitialData = {
  options: {
    genres: ListOption[];
    collections: ListOption[];
    countries: ListOption[];
    studios: ListOption[];
    types: ListOption<string>[];
    styles: ListOption<string>[];
  };
};
