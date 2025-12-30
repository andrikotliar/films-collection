import type { NEW_ITEM_ID } from '@films-collection/shared';

export type UnknownEntity = {
  id: number | typeof NEW_ITEM_ID;
  [key: PropertyKey]: unknown;
};
