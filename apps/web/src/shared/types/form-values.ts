import type { NEW_ITEM_ID } from '@films-collection/shared';
import type { OmitId, UnknownEntity } from '~/shared/types';

export type FormValues<TEntity extends OmitId<UnknownEntity>> = TEntity & {
  id: typeof NEW_ITEM_ID | number;
};
