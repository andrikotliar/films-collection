import type { NEW_ITEM_ID, OmitId } from '@/common';

type UnknownEntity = {
  id: number;
  [key: PropertyKey]: unknown;
};

export type FormValues<
  TEntity extends UnknownEntity,
  TFormField = Record<PropertyKey, unknown>,
> = OmitId<TEntity> &
  TFormField & {
    id: typeof NEW_ITEM_ID | number;
  };
