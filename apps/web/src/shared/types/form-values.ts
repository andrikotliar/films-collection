import type { NEW_ITEM_ID, OmitId, UnknownEntity } from '~/shared';

export type FormValues<TEntity extends OmitId<UnknownEntity>> = TEntity & {
  id: typeof NEW_ITEM_ID | number;
};
