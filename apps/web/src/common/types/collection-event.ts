import type { Film } from '~/common/types/film';
import type { Collection } from './collection';

export type CollectionEvent = {
  id: number;
  title: string;
  startDateCode: number;
  endDateCode: number;
  titleFilmId: number | null;
  yearFrom: number;
  collectionId: number;
};

export type CollectionEventFilled = CollectionEvent & {
  collection: Pick<Collection, 'id' | 'title'>;
  film: Pick<Film, 'id' | 'poster'>;
  filmsCount: number;
};
