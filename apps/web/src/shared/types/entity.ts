import type { NEW_ITEM_ID } from '@films-collection/shared';

export type Entity<TEntity = Record<string, unknown>> = TEntity & {
  id: number | typeof NEW_ITEM_ID;
};
