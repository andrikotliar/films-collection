import { type CollectionEventFilled } from './collection-event';
import { type ListOption } from './list-option';

export type InitialData = {
  options: {
    genres: ListOption[];
    collections: ListOption[];
    countries: ListOption[];
    studios: ListOption[];
    awards: ListOption<number>[];
    types: ListOption<string>[];
    styles: ListOption<string>[];
    roles: ListOption<string>[];
  };
  events: CollectionEventFilled[];
};
