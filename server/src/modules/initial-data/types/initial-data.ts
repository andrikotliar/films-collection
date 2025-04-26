import { ListOption } from 'src/common';
import { GetEventQueryResult } from 'src/modules/collection-events/types';

export type InitialData = {
  options: {
    genres: ListOption[];
    countries: ListOption[];
    studios: ListOption[];
    collections: ListOption[];
    types: ListOption<string>[];
    styles: ListOption<string>[];
    roles: ListOption<string>[];
  };
  event: GetEventQueryResult | null;
};
