import type { NEW_ITEM_ID } from '@films-collection/shared';

type StorageFilmsValue = typeof NEW_ITEM_ID | number | string;

export type LocalStorageKey =
  | 'is_console_menu_open'
  | 'authenticated'
  | `film_${StorageFilmsValue}`;
