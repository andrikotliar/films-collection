import { ListOption } from '~/common';
import type { CurrentEvent } from '~/modules/collection-events/collection-events.repository';

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
