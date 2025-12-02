import { ListOption } from '~/shared';
import type { CurrentEvent } from '~/services/collection-events';

export type InitialData = {
  options: {
    genres: ListOption[];
    countries: ListOption[];
    studios: ListOption[];
    collections: ListOption[];
    types: ListOption<string>[];
    styles: ListOption<string>[];
    roles: ListOption<string>[];
    awards: ListOption[];
    collectionCategories: ListOption<string>[];
  };
  events: CurrentEvent[];
};
